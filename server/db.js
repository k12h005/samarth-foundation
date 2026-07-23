import fs from 'fs';
import path from 'path';

const DATA_DIR = path.resolve(process.cwd(), 'data');

// Ensure directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Log directory
const LOGS_FILE = path.join(DATA_DIR, 'logs.json');

export function logActivity(action, target, details, before = null, after = null) {
  try {
    const logs = readDataFile('logs');
    const newLog = {
      id: Date.now().toString(36) + Math.random().toString(36).substr(2, 5),
      timestamp: new Date().toISOString(),
      action,
      target,
      details,
      before,
      after
    };
    logs.unshift(newLog); // Newest first
    writeDataFile('logs', logs, false); // Don't log logging itself
  } catch (err) {
    console.error('Failed to log activity:', err);
  }
}

export function readDataFile(collection) {
  const filePath = path.join(DATA_DIR, `${collection}.json`);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([], null, 2), 'utf8');
    return [];
  }
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data || '[]');
  } catch (err) {
    console.error(`Error reading ${collection}.json:`, err);
    return [];
  }
}

export function writeDataFile(collection, data, triggerLog = true) {
  const filePath = path.join(DATA_DIR, `${collection}.json`);
  const tempPath = `${filePath}.tmp`;
  try {
    fs.writeFileSync(tempPath, JSON.stringify(data, null, 2), 'utf8');
    fs.renameSync(tempPath, filePath);
  } catch (err) {
    console.error(`Error writing ${collection}.json:`, err);
    if (fs.existsSync(tempPath)) {
      try { fs.unlinkSync(tempPath); } catch (_) {}
    }
    throw err;
  }
}

export const db = {
  // Find all not soft-deleted
  find(collection) {
    const items = readDataFile(collection);
    return items.filter(item => !item.deletedAt);
  },

  // Find all including soft-deleted
  findAllRaw(collection) {
    return readDataFile(collection);
  },

  findById(collection, id) {
    const items = readDataFile(collection);
    return items.find(item => item.id === id && !item.deletedAt);
  },

  insert(collection, item, user = 'admin') {
    const items = readDataFile(collection);
    const newItem = {
      ...item,
      id: Date.now().toString(36) + Math.random().toString(36).substr(2, 5),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    items.push(newItem);
    writeDataFile(collection, items);
    
    logActivity('CREATE', collection, `Created item in ${collection} with ID: ${newItem.id}`, null, newItem);
    return newItem;
  },

  update(collection, id, updates, user = 'admin') {
    const items = readDataFile(collection);
    const idx = items.findIndex(item => item.id === id && !item.deletedAt);
    if (idx === -1) throw new Error('Item not found');

    const before = JSON.parse(JSON.stringify(items[idx]));
    const updatedItem = {
      ...items[idx],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    items[idx] = updatedItem;
    writeDataFile(collection, items);

    logActivity('UPDATE', collection, `Updated item ${id} in ${collection}`, before, updatedItem);
    return updatedItem;
  },

  // Soft delete
  delete(collection, id, user = 'admin') {
    const items = readDataFile(collection);
    const idx = items.findIndex(item => item.id === id && !item.deletedAt);
    if (idx === -1) throw new Error('Item not found');

    const before = JSON.parse(JSON.stringify(items[idx]));
    items[idx].deletedAt = new Date().toISOString();
    writeDataFile(collection, items);

    logActivity('DELETE', collection, `Soft deleted item ${id} in ${collection}`, before, items[idx]);
    return items[idx];
  },

  // For hard deletes (e.g. recycle bin pruning or trash purging)
  hardDelete(collection, id) {
    const items = readDataFile(collection);
    const idx = items.findIndex(item => item.id === id);
    if (idx === -1) throw new Error('Item not found');

    const before = JSON.parse(JSON.stringify(items[idx]));
    items.splice(idx, 1);
    writeDataFile(collection, items);

    logActivity('HARD_DELETE', collection, `Permanently deleted item ${id} in ${collection}`, before, null);
  }
};
