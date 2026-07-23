import { useEffect, useRef, useState } from 'react';
import { TEXT, assets } from './constants';
import { api } from './services/api';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Toast from './components/common/Toast';
import GarlandDivider from './components/common/GarlandDivider';

import Hero from './features/home/Hero';
import Stats from './features/home/Stats';
import Residents from './features/home/Residents';
import Testimonials from './features/home/Testimonials';
import Services from './features/home/Services';
import Programs from './features/home/Programs';
import EventsSlider from './features/home/EventsSlider';
import ContactForm from './features/home/ContactForm';
import VolunteerSection from './features/home/VolunteerSection';

import DonationFlow from './features/donations/DonationFlow';
import DonationOverlay from './features/donations/DonationOverlay';

import AdminLogin from './features/admin/AdminLogin';
import AdminDashboard from './features/admin/AdminDashboard';

export default function App() {
  const [language, setLanguage] = useState('en');
  const [activeSection, setActiveSection] = useState('about');
  const [donationTab, setDonationTab] = useState('monthly');
  const [selectedAmount, setSelectedAmount] = useState(500);
  const [customAmount, setCustomAmount] = useState('500');
  const [overlay, setOverlay] = useState(null);
  const [toast, setToast] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // Path-based routing for Admin Panel and Events Registry
  const [isAdminRoute, setIsAdminRoute] = useState(
    window.location.pathname === '/admin' || window.location.hash === '#admin'
  );
  const [isEventsRoute, setIsEventsRoute] = useState(
    window.location.pathname === '/events' || window.location.hash === '#events-all'
  );

  // Settings
  const [settings, setSettings] = useState({
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
    activeQrCode: '',
    heroSlides: [
      'https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?q=80&w=1200&auto=format&fit=crop'
    ]
  });

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [activities, setActivities] = useState([]);
  const [services, setServices] = useState([]);
  const [events, setEvents] = useState([]);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [testimonials, setTestimonials] = useState([]);
  
  const [bookings, setBookings] = useState([]);
  const [donations, setDonations] = useState([]);
  const [logs, setLogs] = useState([]);

  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [qrCode2FA, setQrCode2FA] = useState('');

  const [adminSession, setAdminSession] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('sf-admin-token') || 'null');
    } catch {
      return null;
    }
  });

  const [adminActiveTab, setAdminActiveTab] = useState('activities');
  const [editingItem, setEditingItem] = useState(null);
  const [editType, setEditType] = useState('');

  const toastTimer = useRef(null);
  const t = TEXT[language];
  const [isAdminSidebarOpen, setIsAdminSidebarOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleRouteChange = () => {
      setIsAdminRoute(window.location.pathname === '/admin' || window.location.hash === '#admin');
      setIsEventsRoute(window.location.pathname === '/events' || window.location.hash === '#events-all');
    };
    window.addEventListener('popstate', handleRouteChange);
    window.addEventListener('hashchange', handleRouteChange);
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
      window.removeEventListener('hashchange', handleRouteChange);
    };
  }, []);

  // Scroll header styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Autoplay hero slideshow
  useEffect(() => {
    const slides = settings.heroSlides || [];
    if (slides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
    }, 5600);
    return () => clearInterval(interval);
  }, [settings.heroSlides]);

  const fetchData = async () => {
    try {
      const settingsData = await api.getSettings();
      if (settingsData) setSettings(settingsData);
    } catch { /* use defaults */ }

    try {
      const actData = await api.getList('activities');
      if (actData.length > 0) setActivities(actData);
    } catch { /* use defaults */ }

    try {
      const srvData = await api.getList('services');
      if (srvData.length > 0) setServices(srvData);
    } catch { /* use defaults */ }

    try {
      const evtData = await api.getList('events');
      if (evtData.length > 0) setEvents(evtData);
    } catch { /* use defaults */ }

    try {
      const tstData = await api.getList('testimonials');
      if (tstData.length > 0) setTestimonials(tstData);
    } catch { /* use defaults */ }
  };

  const fetchAdminData = async () => {
    if (!adminSession) return;
    try {
      const bookingsData = await api.getAdminList('bookings', adminSession.token, handleAuthError);
      if (bookingsData) setBookings(bookingsData);

      const donationsData = await api.getAdminList('donations', adminSession.token, handleAuthError);
      if (donationsData) setDonations(donationsData);

      const logsData = await api.getAdminList('logs', adminSession.token, handleAuthError);
      if (logsData) setLogs(logsData);
    } catch (err) {
      console.error('Failed to fetch admin data:', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (adminSession) {
      fetchAdminData();
    }
  }, [adminSession]);

  // Autoplay events slider
  useEffect(() => {
    const activeEvents = events
      .filter(e => e.status === 'Published')
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 3);
    if (activeEvents.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentEventIndex(prev => (prev + 1) % activeEvents.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [events]);

  const showToast = (message) => {
    setToast(message);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 3600);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const data = await api.login(adminEmail, adminPassword);
      if (data.token) {
        setAdminSession(data);
        localStorage.setItem('sf-admin-token', JSON.stringify(data));
        showToast('Login successful!');
      }
    } catch (err) {
      // Local Sandbox Fallback
      if (adminEmail.toLowerCase() === 'admin@samarthfoundation.org' && adminPassword === 'admin123') {
        const fallbackSession = { token: 'mock-session-jwt-token', expiresAt: Date.now() + 12 * 60 * 60 * 1000 };
        setAdminSession(fallbackSession);
        localStorage.setItem('sf-admin-token', JSON.stringify(fallbackSession));
        showToast('Login successful (Local Sandbox Fallback)');
      } else {
        showToast(err.message || 'Invalid credentials');
      }
    }
  };

  const handleSetup2FA = async () => {
    try {
      const data = await api.setup2FA(adminSession.token, handleAuthError);
      if (data.qr) {
        setQrCode2FA(data.qr);
        showToast('Scan QR code with your Authenticator app.');
      }
    } catch {
      showToast('Failed to setup 2FA');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('sf-admin-token');
    setAdminSession(null);
    showToast('Admin session cleared.');
  };

  const handleAuthError = () => {
    localStorage.removeItem('sf-admin-token');
    setAdminSession(null);
    showToast('Session expired. Please log in again.');
  };

  const translateToHindi = async (text) => {
    if (!text) return '';
    try {
      const res = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=hi&dt=t&q=${encodeURIComponent(text)}`);
      if (res.ok) {
        const data = await res.json();
        return data[0].map(item => item[0]).join('');
      }
    } catch (err) {
      console.error("Translation error", err);
    }
    return text;
  };

  const saveItem = async (type, payload, id = null) => {
    let finalPayload = { ...payload };
    if (type === 'activities' || type === 'services' || type === 'events') {
      if (finalPayload.titleEn && !finalPayload.titleHi) {
        finalPayload.titleHi = await translateToHindi(finalPayload.titleEn);
      }
      if (finalPayload.descEn && !finalPayload.descHi) {
        finalPayload.descHi = await translateToHindi(finalPayload.descEn);
      }
    }

    try {
      await api.saveItem(type, finalPayload, id, adminSession.token, handleAuthError);
      showToast(`${type.toUpperCase()} saved successfully.`);
      fetchData();
      fetchAdminData();
      setEditingItem(null);
    } catch {
      showToast('Error saving item');
    }
  };

  const deleteItem = async (type, id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    try {
      await api.deleteItem(type, id, adminSession.token, handleAuthError);
      showToast(`${type} item deleted.`);
      fetchData();
      fetchAdminData();
    } catch {
      showToast('Error deleting item');
    }
  };

  const handleSettingsUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.updateSettings(settings, adminSession.token, handleAuthError);
      showToast('Settings updated successfully.');
      fetchData();
    } catch {
      showToast('Error updating settings');
    }
  };

  const triggerBackup = async () => {
    try {
      await api.triggerBackup(adminSession.token, handleAuthError);
      showToast('Backup process triggered successfully.');
    } catch {
      showToast('Failed to trigger backup');
    }
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());
    try {
      await api.submitBooking(payload);
      showToast('Booking request submitted. The team will review it shortly.');
      e.target.reset();
    } catch {
      showToast('Error submitting booking');
    }
  };

  const handleDonationSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = {
      ...Object.fromEntries(formData.entries()),
      amount: overlay.amount,
      plan: overlay.plan
    };
    try {
      await api.submitDonation(payload);
      showToast(`Donation recorded for ₹${overlay.amount}.`);
      setOverlay(null);
    } catch {
      showToast('Error saving donation');
    }
  };

  const scrollToSection = (id) => (event) => {
    event.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const closeOverlay = () => setOverlay(null);

  // ================= ADMIN ROUTE RENDER =================
  if (isAdminRoute) {
    if (!adminSession) {
      return (
        <AdminLogin
          adminEmail={adminEmail}
          setAdminEmail={setAdminEmail}
          adminPassword={adminPassword}
          setAdminPassword={setAdminPassword}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          handleLogin={handleLogin}
          t={t}
        />
      );
    }

    return (
      <AdminDashboard
        isAdminSidebarOpen={isAdminSidebarOpen}
        setIsAdminSidebarOpen={setIsAdminSidebarOpen}
        adminActiveTab={adminActiveTab}
        setAdminActiveTab={setAdminActiveTab}
        editingItem={editingItem}
        setEditingItem={setEditingItem}
        editType={editType}
        setEditType={setEditType}
        qrCode2FA={qrCode2FA}
        activities={activities}
        services={services}
        events={events}
        bookings={bookings}
        donations={donations}
        settings={settings}
        setSettings={setSettings}
        logs={logs}
        triggerBackup={triggerBackup}
        handleSetup2FA={handleSetup2FA}
        handleLogout={handleLogout}
        saveItem={saveItem}
        deleteItem={deleteItem}
        handleSettingsUpdate={handleSettingsUpdate}
      />
    );
  }

  // ================= EVENTS SUBPAGE ROUTE =================
  if (isEventsRoute) {
    const publishedEvents = events.filter(e => e.status === 'Published');
    const eventsByYear = {};
    publishedEvents.forEach(evt => {
      const year = evt.date ? new Date(evt.date).getFullYear() : 'Ongoing';
      if (!eventsByYear[year]) eventsByYear[year] = [];
      eventsByYear[year].push(evt);
    });

    const sortedYears = Object.keys(eventsByYear).sort((a, b) => {
      if (a === 'Ongoing') return -1;
      if (b === 'Ongoing') return 1;
      return Number(b) - Number(a);
    });

    sortedYears.forEach(year => {
      eventsByYear[year].sort((a, b) => new Date(b.date) - new Date(a.date));
    });

    return (
      <div className="app-shell" style={{ background: 'var(--clr-bg)', minHeight: '100vh', paddingTop: 'var(--nav-height)' }}>
        <header className="top-navbar scrolled">
          <div className="top-navbar-inner">
            <a href="/" className="top-navbar-logo">
              <div className="top-navbar-logo-icon">SF</div>
              <div className="top-navbar-logo-text">
                <strong>Samarth NGO</strong>
                <span>Dignity for Every Elder</span>
              </div>
            </a>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button className="btn btn-secondary btn-sm header-lang-btn" onClick={() => setLanguage(l => l === 'en' ? 'hi' : 'en')}>
                {t.lang}
              </button>
              <a href="/" className="btn btn-primary btn-sm" style={{ display: 'inline-flex', textDecoration: 'none' }}>
                ← {language === 'hi' ? 'मुख्य पृष्ठ' : 'Back to Home'}
              </a>
            </div>
          </div>
        </header>

        <main style={{ padding: '60px 0' }}>
          <div className="container">
            <div className="text-center" style={{ marginBottom: '60px' }}>
              <span className="section-label" style={{ display: 'inline-block', marginBottom: '8px' }}>{language === 'hi' ? 'आयोजन पंजी' : 'Celebrations Registry'}</span>
              <h1 style={{ marginBottom: '16px', fontFamily: 'var(--font-heading)' }}>{language === 'hi' ? 'सभी इवेंट्स और उत्सव' : 'All Events & Celebrations'}</h1>
              <p style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--clr-text-mid)' }}>
                {language === 'hi' 
                  ? 'हमारे निवासियों के साथ मनाए गए सभी सांस्कृतिक कार्यक्रमों, स्वास्थ्य शिविरों और त्योहारों का लेखा-जोखा।' 
                  : 'A complete history of cultural festivals, health checkup camps, and milestones celebrated with our residents.'}
              </p>
            </div>

            {sortedYears.length === 0 ? (
              <div className="text-center" style={{ padding: '40px', background: '#fff', borderRadius: '16px', border: '1px solid var(--clr-border-light)' }}>
                <p>{language === 'hi' ? 'कोई इवेंट नहीं मिला।' : 'No events found.'}</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
                {sortedYears.map(year => (
                  <div key={year} style={{ borderBottom: '1px solid var(--clr-border-light)', paddingBottom: '32px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                      <h2 style={{ fontSize: '32px', fontFamily: 'var(--font-heading)', color: 'var(--clr-primary-dark)', margin: 0 }}>
                        {year}
                      </h2>
                      <div style={{ flexGrow: 1, height: '1px', background: 'var(--clr-border-light)' }}></div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
                      {eventsByYear[year].map(evt => {
                        const relatedAct = activities.find(a => a.id === evt.relatedActivityId);
                        return (
                          <div 
                            key={evt.id} 
                            style={{ 
                              background: '#fff', 
                              borderRadius: '16px', 
                              border: '1px solid var(--clr-border-light)', 
                              boxShadow: 'var(--shadow-sm)', 
                              overflow: 'hidden',
                              display: 'flex',
                              flexDirection: 'column'
                            }}
                          >
                            {evt.image && (
                              <div style={{ width: '100%', height: '180px', overflow: 'hidden' }}>
                                <img src={evt.image} alt={evt.titleEn} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                              </div>
                            )}
                            <div style={{ padding: '24px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                              <div className="tag tag-amber" style={{ alignSelf: 'flex-start', marginBottom: '12px' }}>
                                🗓️ {evt.date}
                              </div>
                              <h3 style={{ fontSize: '18px', margin: '0 0 10px 0' }}>
                                {language === 'hi' ? evt.titleHi : evt.titleEn}
                              </h3>
                              <p style={{ fontSize: '14px', color: 'var(--clr-text-mid)', margin: '0 0 20px 0', lineHeight: 1.5, flexGrow: 1 }}>
                                {language === 'hi' ? evt.descHi : evt.descEn}
                              </p>
                              {relatedAct && (
                                <a 
                                  href="/#programs" 
                                  style={{ 
                                    fontSize: '13px', 
                                    color: 'var(--clr-primary)', 
                                    fontWeight: '600', 
                                    textDecoration: 'none',
                                    marginTop: 'auto'
                                  }}
                                >
                                  {language === 'hi' ? `संबंधित कार्यक्रम: ${relatedAct.titleHi}` : `Related Program: ${relatedAct.titleEn}`} ➜
                                </a>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>

        <footer style={{ background: '#1A1410', color: 'rgba(255,255,255,0.75)', padding: '40px 0 20px' }}>
          <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '20px' }}>
              <div>&copy; 2026 Samarth Foundation. All rights reserved.</div>
              <a href="/" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>
                ← {language === 'hi' ? 'मुख्य पृष्ठ पर वापस जाएं' : 'Back to Main Homepage'}
              </a>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  // ================= PUBLIC LANDING PAGE =================
  return (
    <>
      <Header
        language={language}
        setLanguage={setLanguage}
        activeSection={activeSection}
        scrollToSection={scrollToSection}
        isScrolled={isScrolled}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        t={t}
      />

      <div className="app-content">
        <main id="main">
          <Hero
            settings={settings}
            currentSlideIndex={currentSlideIndex}
            t={t}
            setOverlay={setOverlay}
          />

          <Stats settings={settings} />

          <Residents
            settings={settings}
            language={language}
            t={t}
          />

          <Testimonials
            testimonials={testimonials}
            language={language}
            t={t}
          />

          <Services
            services={services}
            language={language}
            t={t}
          />

          <Programs
            activities={activities}
            language={language}
            t={t}
          />

          <EventsSlider
            events={events}
            activities={activities}
            currentEventIndex={currentEventIndex}
            setCurrentEventIndex={setCurrentEventIndex}
            language={language}
            scrollToSection={scrollToSection}
            t={t}
          />

          <DonationFlow
            settings={settings}
            donationTab={donationTab}
            setDonationTab={setDonationTab}
            selectedAmount={selectedAmount}
            setSelectedAmount={setSelectedAmount}
            customAmount={customAmount}
            setCustomAmount={setCustomAmount}
            setOverlay={setOverlay}
            t={t}
          />

          <VolunteerSection
            handleBookingSubmit={handleBookingSubmit}
            t={t}
          />

          <ContactForm
            settings={settings}
            showToast={showToast}
            t={t}
          />
        </main>

        <Footer
          settings={settings}
          scrollToSection={scrollToSection}
          setOverlay={setOverlay}
        />
      </div>

      {/* OVERLAY MODALS */}
      {overlay ? (
        <div className="site-modal-overlay" role="presentation" onClick={closeOverlay}>
          <div className="site-modal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
            <button className="site-modal__close" type="button" onClick={closeOverlay}>×</button>
            
            {overlay.type === 'donation' && (
              <DonationOverlay
                overlay={overlay}
                settings={settings}
                handleDonationSubmit={handleDonationSubmit}
                t={t}
              />
            )}

            {overlay.type === 'all-events' && (
              <div>
                <h2>Events Register & Calendar</h2>
                <p>Track all upcoming celebrations and past activities conducted at Samarth NGO.</p>
                <div style={{ marginTop: '20px' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ background: '#f5f5f5', textAlign: 'left' }}>
                        <th style={{ padding: 12 }}>Date</th>
                        <th style={{ padding: 12 }}>Title</th>
                        <th style={{ padding: 12 }}>Details</th>
                      </tr>
                    </thead>
                    <tbody>
                      {events.filter(e => e.status === 'Published').map((item) => (
                        <tr key={item.id} style={{ borderBottom: '1px solid #eee' }}>
                          <td style={{ padding: 12, whiteSpace: 'nowrap' }}>{item.date}</td>
                          <td style={{ padding: 12, fontWeight: 'bold' }}>{language === 'hi' ? item.titleHi : item.titleEn}</td>
                          <td style={{ padding: 12 }}>{language === 'hi' ? item.descHi : item.descEn}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {overlay.type === 'video' && (
              <iframe
                className="site-modal__media"
                src={`${overlay.src}?autoplay=1`}
                title={overlay.title}
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            )}
            
            {overlay.type === 'policy' && (
              <div>
                <h2>{overlay.title}</h2>
                <p style={{ color: 'var(--clr-text-mid)', lineHeight: 1.8 }}>{overlay.body}</p>
              </div>
            )}
          </div>
        </div>
      ) : null}

      <Toast message={toast} />
    </>
  );
}
