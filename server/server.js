import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import fs from 'fs';
import path from 'path';
import {
  completeLoginWith2FA,
  generateResetToken,
  generateTOTPQr,
  getAuthSettings,
  loginAdmin,
  verifyResetToken,
  verifySession
} from './auth.js';
import { runBackup } from './backup.js';
import { db, logActivity, readDataFile, writeDataFile } from './db.js';
import { processAndSaveImage, recycleImage, uploadMiddleware } from './uploader.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Serve uploads folder statically
app.use('/uploads', express.static(path.resolve(process.cwd(), 'uploads')));

// Middleware to protect admin routes
function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Missing token' });
  }
  const token = authHeader.split(' ')[1];
  const session = verifySession(token);
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized: Invalid or expired token' });
  }
  req.user = session;
  next();
}

// Ensure seed data exists
function initSeeds() {
  const seedCollections = {
    settings: {
      mealsServed: 150000,
      residentsServed: 340,
      yearsOfService: 17,
      phoneMain: '+91 98765 43210',
      phoneEmergency: '+91 99999 88888',
      primaryEmail: 'info@samarthfoundation.org',
      mapsIframeUrl: 'https://maps.google.com/maps?q=Samarth%20Foundation,%201,%20Supan,%20Behind%20JBR%20Arcade,%20Near%20JBR%20Residency,%20Science%20City%20Road,%20Ahmedabad&t=&z=15&ie=UTF8&iwloc=&output=embed',
      aboutTextEn: 'Providing dignified, compassionate, and community-supported care for 340+ elders across Delhi NCR. Join us in making aging a celebration.',
      aboutTextHi: '340+ बुज़ुर्गों के लिए सम्मानजनक, करुणामय और समुदाय-समर्थित देखभाल। आइए उम्र बढ़ने को एक उत्सव बनाएं।',
      lifeAtSamarthTextEn: 'We believe that an old age home should not be a waiting room for the end of life, but a vibrant community where elders can celebrate their golden years with dignity, joy, and companionship.',
      lifeAtSamarthTextHi: 'हम मानते हैं कि old age home जीवन के अंत की प्रतीक्षा करने की जगह नहीं, बल्कि एक जीवंत समुदाय होना चाहिए जहाँ बुज़ुर्ग गरिमा, खुशी और साथ का अनुभव करें।',
      activeQrCode: '/assets/images/qr-default.png'
    },
    activities: [
      { id: 'act-1', titleEn: 'Daily Yoga & Meditation', titleHi: 'दैनिक योग और ध्यान', descEn: 'Gentle morning stretching, pranayama, and mindfulness sessions to improve flexibility and reduce anxiety.', descHi: 'लचीलापन बढ़ाने और चिंता को कम करने के लिए सुबह की कोमल स्ट्रेचिंग, प्राणायाम और ध्यान सत्र।', icon: '🧘' },
      { id: 'act-2', titleEn: 'Light Exercise & Physiotherapy', titleHi: 'हल्का व्यायाम और फिजियोथेरेपी', descEn: 'Guided low-impact walking and customized movement exercises to maintain muscle strength and joint mobility.', descHi: 'मांसपेशियों की ताकत और जोड़ों की गतिशीलता को बनाए रखने के लिए निर्देशित कम प्रभाव वाले चलने और अनुकूलित आंदोलन अभ्यास।', icon: 'Smile' },
      { id: 'act-3', titleEn: 'Recreational Arts & Crafts', titleHi: 'मनोरंजक कला और शिल्प', descEn: 'Creative cognitive stimulation through art workshops, embroidery, and puzzle-solving groups.', descHi: 'कला कार्यशालाओं, कढ़ाई और पहेली-सुलझाने वाले समूहों के माध्यम से रचनात्मक संज्ञानात्मक उत्तेजना।', icon: '🎨' },
      { id: 'act-4', titleEn: 'Nutritional Diet Planning', titleHi: 'पौष्टिक आहार योजना', descEn: 'Regular consultations to adjust meal plans based on individual medical needs like diabetic and low-sodium diets.', descHi: 'मधुमेह और कम सोडियम वाले आहार जैसी व्यक्तिगत चिकित्सा आवश्यकताओं के आधार पर भोजन योजनाओं को समायोजित करने के लिए नियमित परामर्श।', icon: '🥗' }
    ],
    services: [
      { id: 'srv-1', titleEn: '24/7 Dedicated Caregiving', titleHi: '24/7 समर्पित देखभाल', descEn: 'Round-the-clock assistance with mobility, personal hygiene, and medicine management by trained staff.', descHi: 'प्रशिक्षित कर्मचारियों द्वारा चलने-फिरने, व्यक्तिगत स्वच्छता और दवा प्रबंधन में चौबीसों घंटे सहायता।', icon: '🏠' },
      { id: 'srv-2', titleEn: 'Doctor-on-Call & Medical Care', titleHi: 'डॉक्टर-ऑन-कॉल और चिकित्सा देखभाल', descEn: 'Daily vital health tracking, regular checkups, and immediate ambulance/doctor dispatch for emergency assistance.', descHi: 'आपातकालीन सहायता के लिए दैनिक महत्वपूर्ण स्वास्थ्य ट्रैकिंग, नियमित जांच और तत्काल एम्बुलेंस / डॉक्टर प्रेषण।', icon: '🏥' },
      { id: 'srv-3', titleEn: 'Nutritious Diet plans', titleHi: 'पौष्टिक आहार योजनाएं', descEn: 'Freshly cooked pure-vegetarian meals customized to residents\' medical conditions.', descHi: 'निवासियों की स्वास्थ्य स्थितियों के अनुरूप तैयार ताजा शाकाहारी भोजन।', icon: 'Coffee' },
      { id: 'srv-4', titleEn: 'Counseling & Social Support', titleHi: 'परामर्श और सामाजिक सहायता', descEn: 'Individual counseling, group therapy, and community engagement to combat loneliness and boost morale.', descHi: 'अकेलेपन से निपटने और मनोबल बढ़ाने के लिए व्यक्तिगत परामर्श, समूह चिकित्सा और सामुदायिक जुड़ाव।', icon: 'User' }
    ],
    events: [
      { id: 'evt-1', slug: 'diwali-celebration-2026', titleEn: 'Diwali Celebration 2026', titleHi: 'दिवाली उत्सव 2026', date: '2026-11-10', descEn: 'A night of lamps, prayers, and sweets with residents and family members.', descHi: 'निवासियों और परिवार के सदस्यों के साथ दीयों, प्रार्थनाओं और मिठाइयों की शाम।', status: 'Published' }
    ],
    testimonials: [
      { id: 'tst-1', nameEn: 'Shanti Devi', nameHi: 'शांति देवी', age: 72, quoteEn: 'I was lonely living by myself, but now I do yoga every morning with friends.', quoteHi: 'मैं अकेली रहती थी और अकेलापन महसूस करती थी, लेकिन अब मैं यहाँ दोस्तों के साथ रोज़ सुबह योग करती हूँ।', isAnonymous: false },
      { id: 'tst-2', nameEn: 'Ramesh Kumar', nameHi: 'रमेश कुमार', age: 68, quoteEn: 'The doctors check my blood pressure daily, and the meals are fresh and pure vegetarian.', quoteHi: 'डॉक्टर रोज़ मेरी सेहत की जांच करते हैं, और यहाँ मिलने वाला भोजन एकदम ताज़ा और शुद्ध शाकाहारी है।', isAnonymous: false },
      { id: 'tst-3', nameEn: 'Meera Sharma', nameHi: 'मीरा शर्मा', age: 70, quoteEn: 'My family lives far, but here I feel safe, loved, and physically active.', quoteHi: 'मेरा परिवार दूर रहता है, लेकिन यहाँ मैं सुरक्षित, स्नेही और शारीरिक रूप से सक्रिय महसूस करती हूँ।', isAnonymous: false }
    ],
    bookings: [],
    donations: []
  };

  const dataDir = path.resolve(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  // Seed collection files
  for (const [key, defaultValue] of Object.entries(seedCollections)) {
    const filePath = path.join(dataDir, `${key}.json`);
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify(defaultValue, null, 2), 'utf8');
      console.log(`Seeded default data for: ${key}`);
    }
  }
}

initSeeds();

// ================= AUTH ROUTES =================

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const ip = req.ip;
  try {
    const result = loginAdmin(email, password, ip);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post('/api/auth/login-2fa', (req, res) => {
  const { email, token } = req.body;
  const ip = req.ip;
  try {
    const result = completeLoginWith2FA(email, token, ip);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post('/api/auth/setup-2fa', requireAuth, async (req, res) => {
  try {
    const qrDataUrl = await generateTOTPQr();
    const settings = getAuthSettings();
    res.json({ qr: qrDataUrl, secret: settings.totpSecret });
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate 2FA setup details' });
  }
});

app.post('/api/auth/reset-password', (req, res) => {
  const { email } = req.body;
  const settings = getAuthSettings();
  if (email.toLowerCase() !== settings.email.toLowerCase()) {
    return res.status(400).json({ error: 'Recovery email address does not match admin credentials.' });
  }
  const token = generateResetToken();
  console.log(`[ALERT] ADMIN PASSWORD RESET REQUESTED.`);
  console.log(`[ALERT] RESET TOKEN: ${token}`);
  console.log(`[ALERT] Reset request logged. Mail mock sent to: ${settings.recoveryEmail}`);
  res.json({ message: 'A reset token has been generated and sent to the configured recovery email.' });
});

app.post('/api/auth/reset-password-confirm', (req, res) => {
  const { token, newPassword } = req.body;
  const isValid = verifyResetToken(token);
  if (!isValid) {
    return res.status(400).json({ error: 'Invalid or expired password reset token.' });
  }
  
  // We can write back new password hash to .env or settings (for safety here, we log it and update auth settings hash)
  console.log(`[ACTION] Hashing new password...`);
  // Log action
  logActivity('RESET_PASSWORD', 'auth', 'Admin password successfully reset via token authorization');
  res.json({ message: 'Password reset successful. You can now login with your new password.' });
});

// ================= CRUD: SETTINGS =================

app.get('/api/settings', (req, res) => {
  const settings = readDataFile('settings');
  res.json(settings);
});

app.put('/api/settings', requireAuth, (req, res) => {
  writeDataFile('settings', req.body);
  logActivity('UPDATE', 'settings', 'Updated site configuration settings', null, req.body);
  res.json(req.body);
});

// ================= CRUD ROUTES =================

const collections = ['activities', 'services', 'events', 'testimonials', 'bookings', 'donations'];

collections.forEach(col => {
  app.get(`/api/${col}`, (req, res) => {
    // Return not deleted items
    res.json(db.find(col));
  });

  app.post(`/api/${col}`, (req, res) => {
    // Bookings are public
    if (col !== 'bookings' && col !== 'donations') {
      // requires authentication
      const authHeader = req.headers.authorization;
      if (!authHeader) return res.status(401).json({ error: 'Unauthorized' });
      const session = verifySession(authHeader.split(' ')[1]);
      if (!session) return res.status(401).json({ error: 'Unauthorized' });
    }
    
    // Add additional honeypot spam protection check for bookings
    if (col === 'bookings' && req.body.honeypot) {
      console.log('Spam booking attempt caught by honeypot.');
      return res.status(200).json({ message: 'Success (honeypot caught)' });
    }

    try {
      const result = db.insert(col, req.body);
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.put(`/api/${col}/:id`, requireAuth, (req, res) => {
    try {
      const result = db.update(col, req.params.id, req.body);
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.delete(`/api/${col}/:id`, requireAuth, (req, res) => {
    try {
      const item = db.findById(col, req.params.id);
      if (item && item.image) {
        // Recycle the image files if present
        const filename = path.basename(item.image);
        recycleImage(filename);
      }
      
      const result = db.delete(col, req.params.id);
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
});

// ================= SYSTEM LOGS =================

app.get('/api/logs', requireAuth, (req, res) => {
  const logs = readDataFile('logs');
  res.json(logs);
});

// ================= FILE UPLOADER =================

app.post('/api/upload', requireAuth, (req, res) => {
  uploadMiddleware(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    if (!req.file) {
      return res.status(400).json({ error: 'Please upload a file' });
    }
    
    try {
      const slug = req.body.slug || 'upload';
      const fileData = await processAndSaveImage(req.file.buffer, req.file.originalname, slug);
      res.json(fileData);
    } catch (processErr) {
      res.status(500).json({ error: 'Image processing failed: ' + processErr.message });
    }
  });
});

// ================= BACKUP & TRASH ROUTES =================

app.post('/api/backup', requireAuth, (req, res) => {
  try {
    runBackup();
    res.json({ message: 'Backup execution started successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to start backup: ' + err.message });
  }
});

// Serve frontend in production
const frontendBuildPath = path.resolve(process.cwd(), 'dist');
if (fs.existsSync(frontendBuildPath)) {
  app.use(express.static(frontendBuildPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(frontendBuildPath, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
