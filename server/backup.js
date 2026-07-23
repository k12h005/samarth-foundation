import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';

const BACKUPS_DIR = path.resolve(process.cwd(), 'backups');
const DATA_DIR = path.resolve(process.cwd(), 'data');
const UPLOADS_DIR = path.resolve(process.cwd(), 'uploads');

if (!fs.existsSync(BACKUPS_DIR)) {
  fs.mkdirSync(BACKUPS_DIR, { recursive: true });
}

export function runBackup() {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupFile = path.join(BACKUPS_DIR, `backup-${timestamp}.zip`);

  console.log(`Starting backup: ${backupFile}`);

  // Cross-platform command (powershell Compress-Archive on Windows, tar/zip on Linux/Unix)
  let cmd = '';
  if (process.platform === 'win32') {
    cmd = `powershell -Command "Compress-Archive -Path '${DATA_DIR}', '${UPLOADS_DIR}' -DestinationPath '${backupFile}' -Force"`;
  } else {
    cmd = `zip -r "${backupFile}" "${DATA_DIR}" "${UPLOADS_DIR}"`;
  }

  exec(cmd, (err, stdout, stderr) => {
    if (err) {
      console.error('Backup creation failed:', err);
      return;
    }
    console.log('Backup zip file successfully created.');
    
    // Prune old backups (keep last 30 days)
    pruneOldBackups();

    // Mirror to cloud via rclone if configured
    runRcloneMirror(backupFile);
  });
}

function pruneOldBackups() {
  try {
    const files = fs.readdirSync(BACKUPS_DIR);
    const now = Date.now();
    const limit = 30 * 24 * 60 * 60 * 1000; // 30 days in ms

    files.forEach(file => {
      const filePath = path.join(BACKUPS_DIR, file);
      const stat = fs.statSync(filePath);
      if (now - stat.mtimeMs > limit) {
        fs.unlinkSync(filePath);
        console.log(`Pruned old backup file: ${file}`);
      }
    });
  } catch (err) {
    console.error('Error pruning old backups:', err);
  }
}

function runRcloneMirror(backupFile) {
  // If rclone config exists, mirror the backup folder
  // Admin can set RCLONE_REMOTE in env vars (e.g. 'gdrive:samarth-backups')
  const remote = process.env.RCLONE_REMOTE;
  if (!remote) {
    console.log('RCLONE_REMOTE not configured. Skipping off-server cloud mirror.');
    return;
  }

  console.log(`Mirroring backups to rclone destination: ${remote}`);
  exec(`rclone sync "${BACKUPS_DIR}" "${remote}"`, (err, stdout, stderr) => {
    if (err) {
      console.error('Rclone mirroring failed:', err);
      return;
    }
    console.log('Rclone sync completed successfully.');
  });
}

// Automatically run backup once a day (if server is running)
// 86400000 ms = 24 hours
setInterval(runBackup, 24 * 60 * 60 * 1000);
