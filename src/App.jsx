import { useEffect, useMemo, useRef, useState } from 'react';

const assets = {
  hero: new URL('../assets/images/hero.png', import.meta.url).href,
  community: new URL('../assets/images/community.png', import.meta.url).href,
  volunteer: new URL('../assets/images/volunteer.png', import.meta.url).href,
  galleryCelebration: new URL('../assets/images/gallery_celebration.png', import.meta.url).href,
  galleryMedical: new URL('../assets/images/gallery_medical.png', import.meta.url).href,
  galleryYoga: new URL('../assets/images/gallery_yoga.png', import.meta.url).href,
  galleryArt: new URL('../assets/images/gallery_art.png', import.meta.url).href
};

const TEXT = {
  en: {
    nav: { about: 'About', services: 'Services', residents: 'Residents', happiness: 'Happiness', programs: 'Programs', gallery: 'Gallery', volunteer: 'Volunteer', contact: 'Contact' },
    lang: 'English / हिंदी',
    heroBadge: 'Serving Since 2008',
    heroLead: 'Because Every Elder Deserves to',
    heroEmphasis: 'Feel at Home',
    heroSub: 'Providing dignified, compassionate, and community-supported care for 340+ elders across Delhi NCR. Join us in making aging a celebration.',
    donate: 'Donate Now',
    story: 'Watch Our Story',
    trust: ['80G Certified', 'FCRA Registered', '17 Years of Service', 'English + Hindi Support'],
    residentLabel: 'Our Community',
    residentTitle: 'Life at Aadhaar Ashram',
    residentSub: 'We believe that an old age home should not be a waiting room for the end of life, but a vibrant community where elders can celebrate their golden years with dignity, joy, and companionship.',
    happinessLabel: 'Monthly Happiness Feed',
    happinessTitle: 'How Our Residents Feel',
    happinessSub: 'Real-time insights into the comfort and happiness of our community members.',
    donateLabel: 'Make an Impact',
    donateTitle: 'Your Gift Changes Lives',
    donateSub: 'Just ₹500 provides a month of warm, nutritious meals for an elder. All donations are 100% transparent and eligible for 80G tax exemption.',
    volunteerLabel: 'Join Our Community',
    volunteerTitle: 'Share Your Time. Change a Life.',
    volunteerSub: 'Our volunteers are the heartbeat of Aadhaar Ashram. Whether you have 2 hours a week or can join for special events, your presence brings immense joy to our residents.',
    contentLabel: 'Content And Admin',
    contentTitle: 'Stories Need A Clear Workflow',
    contentSub: 'The final site needs resident stories, short videos, and approvals that team members can manage without editing raw HTML.',
    accessibilityLabel: 'Language And Accessibility',
    accessibilityTitle: 'Built For English And Hindi',
    accessibilitySub: 'The plan calls for bilingual content, readable typography, keyboard support, and checks that keep the layout stable on mobile and desktop.',
    servicesLabel: 'What We Provide',
    servicesTitle: 'Complete Care, Every Day',
    servicesSub: 'We offer a full spectrum of professional services designed to nurture physical health, emotional wellbeing, and community connection for every resident.',
    programsLabel: 'Daily Life',
    programsTitle: 'Programs That Bring Joy',
    programsSub: 'From morning yoga to evening cultural programs, every day at Aadhaar Ashram is designed to nurture the mind, body, and spirit.',
    journeyLabel: 'Our Journey',
    journeyTitle: 'Stories From Our Community',
    journeySub: 'Every month brings new celebrations, milestones, and moments of connection. Here are some highlights from our community.',
    galleryLabel: 'Gallery',
    galleryTitle: 'Life in Pictures',
    gallerySub: 'A glimpse into the warmth, joy, and community of Aadhaar Ashram — captured in real moments.',
    instaLabel: 'Follow Our Journey',
    instaTitle: 'We Are on Instagram',
    instaHandle: '@aadhaarashram',
    contactLabel: 'Contact',
    contactTitle: 'Talk To The Team',
    contactSub: 'Use the form for donation questions, volunteer requests, resident story submissions, or general support.',
    contactDetails: 'Contact Details',
    contactNext: 'What Happens Next',
    contactNote: 'Messages route to the right owner: donations, volunteer intake, content, or operations. That keeps the workflow aligned with the team plan in the docs.',
    contactButton: 'Send Message',
    volunteerButton: 'Apply Now',
    newsletterButton: 'Subscribe',
    donateSecure: 'Donate Securely',
    donateTabs: ['Monthly', 'One-Time'],
    galleryFilters: { all: 'All', celebration: 'Celebrations', wellness: 'Wellness', healthcare: 'Healthcare', activities: 'Activities' },
    contactReason: 'Reason For Contact',
    contactPlaceholder: 'Choose one',
    contactReasons: ['Donation', 'Volunteer', 'Resident Story', 'General Query'],
    contactName: 'Your Name',
    contactEmail: 'Email Address',
    contactMessage: 'Message',
    volunteerEmail: 'Your Email Address',
    residentQuote: 'I thought I had lost my family, but here, I found a new one. I laugh more now than I have in years.',
    residentAttribution: 'Shanti Devi, 72',
    accessibilityChecks: ['Check contrast, touch targets, and readable line lengths.', 'Keep labels, placeholders, and form hints clear on small screens.', 'Verify language switching does not break the layout.', 'Test keyboard navigation before release.'],
    adminLabel: 'Login And Admin',
    adminTitle: 'Functional Team Workspace',
    adminSub: 'Use the local demo login to review submissions, publish resident stories, and inspect the queued backend records without editing raw HTML.',
    adminEmail: 'Admin Email',
    adminPassword: 'Password',
    adminLogin: 'Sign In',
    adminLogout: 'Sign Out',
    adminStoryTitle: 'Add Resident Story',
    adminStoryName: 'Resident Name',
    adminStoryQuote: 'Story Quote',
    adminStoryImage: 'Image URL',
    adminStoryVideo: 'Video URL',
    adminStorySave: 'Save Story',
    dashboardTitle: 'Impact Dashboard',
    dashboardSub: 'This dashboard aggregates the local submission queue. It is functional in-browser and ready to be replaced by a real API later.',
    backendLabel: 'Backend Integration',
    backendTitle: 'Local Queue Simulation',
    backendSub: 'Contact, volunteer, newsletter, donation, and story entries are stored in browser localStorage to model the expected backend workflow.',
    donationFlowTitle: 'Donation Flow',
    donationFlowSub: 'Choose an amount, provide donor details, and submit to the local queue. This is a working client-side simulation of the planned donation pipeline.',
    donationName: 'Donor Name',
    donationEmail: 'Donor Email',
    donationNote: 'Donation Note',
    donationSubmit: 'Complete Donation',
    communityLabel: 'Community Engagement',
    communityTitle: 'Showcase Activities From The Docs',
    communitySub: 'Open mic, children interaction, and community engagement are represented here as part of the planned resident activity showcase.',
    workflowCards: [
      ['📝', 'Resident Story CMS Pattern', 'Use repeatable story cards for text, photos, captions, and short videos so the team can publish updates consistently.', 'Ready for CMS handoff'],
      ['🔐', 'Admin Panel And Roles', 'Define who can draft, review, and publish content, plus how login access maps to content ownership and moderation.', 'Login + approval workflow'],
      ['🤝', 'Team Ownership', 'Keep content, media, forms, and backend workstreams separate so the team can review progress weekly and ship safely.', 'Weekly review cadence']
    ]
  },
  hi: {
    nav: { about: 'परिचय', services: 'सेवाएँ', residents: 'निवासी', happiness: 'खुशी', programs: 'कार्यक्रम', gallery: 'गैलरी', volunteer: 'स्वयंसेवा', contact: 'संपर्क' },
    lang: 'हिंदी / English',
    heroBadge: '2008 से सेवा',
    heroLead: 'क्योंकि हर बुज़ुर्ग को',
    heroEmphasis: 'घर जैसा महसूस होना चाहिए',
    heroSub: '340+ बुज़ुर्गों के लिए सम्मानजनक, करुणामय और समुदाय-समर्थित देखभाल। आइए उम्र बढ़ने को एक उत्सव बनाएं।',
    donate: 'दान करें',
    story: 'हमारी कहानी देखें',
    trust: ['80G प्रमाणित', 'FCRA पंजीकृत', '17 वर्षों की सेवा', 'English + Hindi समर्थन'],
    residentLabel: 'हमारा समुदाय',
    residentTitle: 'आदhaar आश्रम में जीवन',
    residentSub: 'हम मानते हैं कि old age home जीवन के अंत की प्रतीक्षा करने की जगह नहीं, बल्कि एक जीवंत समुदाय होना चाहिए जहाँ बुज़ुर्ग गरिमा, खुशी और साथ का अनुभव करें।',
    happinessLabel: 'मासिक खुशी फ़ीड',
    happinessTitle: 'हमारे निवासी कैसा महसूस करते हैं',
    happinessSub: 'हमारे समुदाय के comfort और happiness की वास्तविक जानकारी।',
    donateLabel: 'प्रभाव डालें',
    donateTitle: 'आपका सहयोग जीवन बदलता है',
    donateSub: 'केवल ₹500 एक बुज़ुर्ग के लिए एक महीने के गरम, पौष्टिक भोजन प्रदान करता है। सभी दान 100% पारदर्शी हैं और 80G tax exemption के पात्र हैं।',
    volunteerLabel: 'हमारे समुदाय से जुड़ें',
    volunteerTitle: 'अपना समय साझा करें. एक जीवन बदलें.',
    volunteerSub: 'हमारे स्वयंसेवक Aadhaar Ashram की धड़कन हैं। चाहे आपके पास हफ्ते में 2 घंटे हों या विशेष कार्यक्रमों में शामिल हो सकें, आपकी उपस्थिति हमारे निवासियों के लिए बड़ी खुशी लाती है।',
    contentLabel: 'सामग्री और एडमिन',
    contentTitle: 'कहानियों के लिए स्पष्ट workflow चाहिए',
    contentSub: 'अंतिम साइट में resident stories, short videos, और approvals ऐसे हों कि टीम raw HTML बदले बिना content manage कर सके।',
    accessibilityLabel: 'भाषा और पहुँचनीयता',
    accessibilityTitle: 'English और Hindi के लिए तैयार',
    accessibilitySub: 'योजना bilingual content, readable typography, keyboard support, और mobile/desktop पर stable layout पर केंद्रित है।',
    servicesLabel: 'हम क्या प्रदान करते हैं',
    servicesTitle: 'हर दिन सम्पूर्ण देखभाल',
    servicesSub: 'हमारी सेवाएँ शारीरिक स्वास्थ्य, भावनात्मक wellbeing, और समुदायिक जुड़ाव को पोषित करने के लिए हैं।',
    programsLabel: 'दैनिक जीवन',
    programsTitle: 'खुशी लाने वाले कार्यक्रम',
    programsSub: 'सुबह योग से शाम के सांस्कृतिक कार्यक्रमों तक, हर दिन मन, शरीर और आत्मा को पोषण देने के लिए बनाया गया है।',
    journeyLabel: 'हमारी यात्रा',
    journeyTitle: 'समुदाय की कहानियाँ',
    journeySub: 'हर महीने नई celebrations, milestones, और connection के पल आते हैं।',
    galleryLabel: 'गैलरी',
    galleryTitle: 'तस्वीरों में जीवन',
    gallerySub: 'Aadhaar Ashram की गर्माहट, खुशी, और community की झलक — वास्तविक क्षणों में।',
    instaLabel: 'हमारी यात्रा फ़ॉलो करें',
    instaTitle: 'हम Instagram पर हैं',
    instaHandle: '@aadhaarashram',
    contactLabel: 'संपर्क',
    contactTitle: 'टीम से बात करें',
    contactSub: 'दान, स्वयंसेवा, resident story submissions, या सामान्य सहायता के लिए फ़ॉर्म का उपयोग करें।',
    contactDetails: 'संपर्क विवरण',
    contactNext: 'आगे क्या होगा',
    contactNote: 'संदेश सही owner तक पहुँचते हैं: donations, volunteer intake, content, या operations. इससे docs के अनुसार workflow aligned रहता है।',
    contactButton: 'संदेश भेजें',
    volunteerButton: 'अभी आवेदन करें',
    newsletterButton: 'सदस्यता लें',
    donateSecure: 'सुरक्षित दान करें',
    donateTabs: ['मासिक', 'एक बार'],
    galleryFilters: { all: 'सभी', celebration: 'उत्सव', wellness: 'स्वास्थ्य', healthcare: 'चिकित्सा', activities: 'गतिविधियाँ' },
    contactReason: 'संपर्क का कारण',
    contactPlaceholder: 'एक चुनें',
    contactReasons: ['दान', 'स्वयंसेवा', 'निवासी कहानी', 'सामान्य प्रश्न'],
    contactName: 'आपका नाम',
    contactEmail: 'ईमेल पता',
    contactMessage: 'संदेश',
    volunteerEmail: 'आपका ईमेल पता',
    residentQuote: 'मुझे लगा था कि मैंने अपना परिवार खो दिया है, लेकिन यहाँ मुझे एक नया परिवार मिला। अब मैं पहले से कहीं ज़्यादा हँसती हूँ।',
    residentAttribution: 'शांति देवी, 72',
    accessibilityChecks: ['Contrast, touch targets, और readable line lengths की जाँच करें।', 'Labels, placeholders, और form hints छोटे स्क्रीन पर साफ़ रखें।', 'Language switch से layout न बिगड़े, यह verify करें।', 'Release से पहले keyboard navigation test करें।'],
    adminLabel: 'लॉगिन और एडमिन',
    adminTitle: 'Functional Team Workspace',
    adminSub: 'Local demo login से submissions review करें, resident stories publish करें, और queued backend records देखें — raw HTML बदले बिना।',
    adminEmail: 'Admin Email',
    adminPassword: 'Password',
    adminLogin: 'Sign In',
    adminLogout: 'Sign Out',
    adminStoryTitle: 'Resident Story जोड़ें',
    adminStoryName: 'Resident Name',
    adminStoryQuote: 'Story Quote',
    adminStoryImage: 'Image URL',
    adminStoryVideo: 'Video URL',
    adminStorySave: 'Save Story',
    dashboardTitle: 'Impact Dashboard',
    dashboardSub: 'यह dashboard local submission queue को aggregate करता है। यह browser में functional है और आगे real API से replace किया जा सकता है।',
    backendLabel: 'Backend Integration',
    backendTitle: 'Local Queue Simulation',
    backendSub: 'Contact, volunteer, newsletter, donation, और story entries browser localStorage में सेव होती हैं ताकि expected backend workflow simulate हो सके।',
    donationFlowTitle: 'Donation Flow',
    donationFlowSub: 'Amount चुनें, donor details भरें, और local queue में submit करें। यह planned donation pipeline का working client-side simulation है।',
    donationName: 'Donor Name',
    donationEmail: 'Donor Email',
    donationNote: 'Donation Note',
    donationSubmit: 'Complete Donation',
    communityLabel: 'Community Engagement',
    communityTitle: 'Docs से Activities Showcase',
    communitySub: 'Open mic, children interaction, और community engagement को resident activity showcase के रूप में यहाँ दिखाया गया है।',
    workflowCards: [
      ['📝', 'Resident Story CMS Pattern', 'Text, photos, captions, और short videos के लिए repeatable cards रखें ताकि team consistent updates publish कर सके।', 'CMS handoff ready'],
      ['🔐', 'Admin Panel और Roles', 'कौन draft, review, और publish कर सकता है — इसे define करें, साथ ही login access और moderation mapping तय करें।', 'Login + approval workflow'],
      ['🤝', 'टीम Ownership', 'Content, media, forms, और backend workstreams को अलग रखें ताकि weekly review में progress सुरक्षित रहे।', 'Weekly cadence']
    ]
  }
};

const services = [
  ['🏥', '24/7 Medical Care', 'Round-the-clock access to qualified nursing staff and on-call doctors. Regular checkups, emergency response, and specialist consultations.', '1 Doctor on-call always', 'green'],
  ['🥗', 'Nutritious Meals', 'Three balanced, dietician-approved meals daily plus evening snacks. Menus designed for elderly nutritional needs and medical requirements.', '3 meals + snacks daily', 'green'],
  ['🏠', 'Safe Accommodation', 'Clean, comfortable private and shared rooms with elder-friendly design — grab bars, ramps, soft lighting, and 24/7 security.', '340 residents served', 'gold'],
  ['💬', 'Emotional Counseling', 'Certified counselors provide individual and group sessions. We address loneliness, grief, and adjustment challenges with compassion.', 'Weekly group sessions', 'default'],
  ['🎨', 'Recreational Activities', 'Yoga, art, music, gardening, cultural programs, and festive celebrations. Every day brings new opportunities for joy and connection.', 'Daily activity programs', 'green'],
  ['🤝', 'Community Programs', 'Intergenerational events, skill-sharing workshops, and volunteer-driven programs that keep residents connected to the wider community.', '1,200+ active volunteers', 'gold'],
  ['🕊️', 'Spiritual Support', 'Prayer rooms, meditation sessions, and religious observances for all faiths. Spiritual wellbeing matters as much as physical health.', 'Multi-faith support', 'default'],
  ['📱', 'Family Connectivity', 'Regular family visits, video call assistance, and monthly family update reports. We bridge the gap between residents and their loved ones.', 'Digital connect support', 'green'],
  ['🚨', 'Emergency Response', '24/7 emergency helpline, ambulance tie-ups, and immediate family notification protocols ensure every resident is safe and supported.', 'Response within 10 mins', 'gold']
];

const programs = [
  ['🧘', 'Morning Yoga & Wellness', 'Gentle yoga, pranayama, and stretching sessions every morning led by certified instructors, improving flexibility, balance, and mood.'],
  ['🎨', 'Arts & Crafts Studio', 'Painting, pottery, embroidery, and creative workshops that spark joy and provide a meaningful creative outlet for residents.'],
  ['🎵', 'Music & Cultural Programs', 'Weekly bhajan sessions, classical music evenings, and cultural performances that celebrate India’s rich heritage and traditions.'],
  ['🌱', 'Therapeutic Gardening', 'Tending to our community garden provides residents with purpose, fresh air, and the therapeutic benefits of nurturing living things.']
];

const stories = [
  { name: 'Ramesh Kumar', date: '2 days ago', quote: 'The staff treats us like family. I feel safe and cared for every single day.', image: assets.community, tags: ['Care Quality', 'Staff'], video: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { name: 'Meera Sharma', date: '5 days ago', quote: 'The food is delicious and reminds me of home. They remember my preferences!', image: assets.galleryMedical, tags: ['Food', 'Comfort'], video: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { name: 'Anil Patel', date: '1 week ago', quote: 'I’ve made wonderful friends here. We play cards, share stories, and laugh together daily.', image: assets.galleryYoga, tags: ['Community', 'Activities'], video: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }
];

const timeline = [
  ['🎉', 'November 2024', 'Celebration', 'Grand Diwali Celebration', 'Over 340 residents celebrated Diwali with diyas, rangoli, sweets, and live bhajans. Families joined in for an evening of warmth and togetherness.', assets.galleryCelebration],
  ['🏥', 'October 2024', 'Healthcare', 'Free Eye & Dental Camp', 'In partnership with Apollo Hospital, we organized a free health screening camp. 200+ residents received eye tests, dental checkups, and free medicines.', assets.galleryMedical],
  ['🧘', 'September 2024', 'Wellness', 'International Yoga Day', '150 residents participated in our special Yoga Day event with a certified instructor. Local media covered the heartwarming session.', assets.galleryYoga],
  ['🎨', 'August 2024', 'Community', 'Resident Art Exhibition', 'Our first-ever art exhibition featuring 60 paintings by residents. The event raised ₹45,000 for our wellness activities fund.', assets.galleryArt]
];

const galleryItems = [
  ['celebration', 'Diwali Celebration 2024', assets.galleryCelebration, 'Residents celebrating Diwali with diyas and rangoli'],
  ['healthcare', 'Monthly Health Checkup', assets.galleryMedical, 'Doctor providing medical care to elderly resident'],
  ['wellness', 'Morning Yoga Session', assets.galleryYoga, 'Group yoga session in the garden'],
  ['activities', 'Creative Arts Workshop', assets.galleryArt, 'Elder resident painting at art class'],
  ['wellness', 'Community Afternoon', assets.community, 'Residents socializing and playing games'],
  ['activities', 'Volunteer Activity Day', assets.volunteer, 'Volunteer helping resident with gentle yoga']
];

const instagramPosts = [
  ['POST', 'Diwali magic at Aadhaar Ashram!', assets.galleryCelebration, '✨ Diwali magic at Aadhaar Ashram! Our elders lit up the night with joy 🪔 #Diwali2024'],
  ['REEL', 'Sunrise yoga with our beautiful community.', assets.galleryYoga, '🌅 Sunrise yoga with our beautiful community. Every morning starts with peace 🧘 #MorningYoga'],
  ['POST', 'Our art exhibition raised ₹45,000.', assets.galleryArt, '🎨 Our art exhibition raised ₹45,000 for resident wellness! Creativity knows no age 💛'],
  ['POST', 'Free health camp with Apollo Hospital.', assets.galleryMedical, '🏥 Free health camp with Apollo Hospital. 200+ residents checked! Thank you to our partners 💙'],
  ['REEL', 'Chess afternoon — friendships built one move at a time.', assets.community, '♟️ Chess afternoon — where friendships are built one move at a time. #CommunityLove'],
  ['POST', 'Volunteers are pure gold.', assets.volunteer, '💚 Our volunteers are pure gold! Want to join? Link in bio 🙌 #VolunteerLife']
];

const donationAmounts = [
  [500, 'Meals for 1 month'],
  [1000, 'Medical Care'],
  [2500, 'Full Sponsorship']
];

const policyContent = {
  privacy: {
    title: 'Privacy Policy',
    body: 'We collect your name, email, and phone when you donate or volunteer. Payment details are processed securely and never stored. We never sell your data. Email info@aadhaarashram.org for data requests.'
  },
  terms: {
    title: 'Terms of Service',
    body: 'All donations are voluntary and non-refundable. 80G receipts are issued within 7 days. Volunteers must be 18+. All content is property of Aadhaar Ashram and used with resident consent.'
  }
};

const demoCredentials = {
  email: 'admin@aadhaarashram.org',
  password: 'Samarth2026!'
};

const storageKeys = {
  adminSession: 'aadhaar-admin-session',
  appData: 'aadhaar-app-data',
  storyDrafts: 'aadhaar-story-drafts'
};

const initialAppData = {
  contacts: [],
  volunteers: [],
  donations: [],
  newsletter: [],
  storyDrafts: []
};

function SectionHeader({ label, title, subtitle }) {
  return (
    <div className="text-center">
      <span className="section-label">{label}</span>
      <h2 className="section-title">{title}</h2>
      <p className="section-subtitle" style={{ margin: '0 auto' }}>{subtitle}</p>
    </div>
  );
}

function SidebarIcon({ name }) {
  switch (name) {
    case 'dashboard':
      return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 13h8V3H3v10zm10 8h8V11h-8v10zM13 3v6h8V3h-8zM3 21h8v-6H3v6z" /></svg>;
    case 'projects':
      return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 4H3v16h18V8h-9l-2-4z" /></svg>;
    case 'analytics':
      return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 19h16M7 16V9M12 16V5M17 16v-7" /></svg>;
    case 'team':
      return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm10 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" /></svg>;
    case 'settings':
      return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19.14 12.94a7.43 7.43 0 0 0 .05-.94 7.43 7.43 0 0 0-.05-.94l2.03-1.58a.5.5 0 0 0 .12-.63l-1.92-3.32a.5.5 0 0 0-.6-.22l-2.39.96a7.08 7.08 0 0 0-1.63-.94l-.36-2.54a.5.5 0 0 0-.5-.42h-3.84a.5.5 0 0 0-.5.42l-.36 2.54c-.58.22-1.12.53-1.63.94l-2.39-.96a.5.5 0 0 0-.6.22L2.71 7.85a.5.5 0 0 0 .12.63l2.03 1.58a7.43 7.43 0 0 0-.05.94c0 .32.02.63.05.94l-2.03 1.58a.5.5 0 0 0-.12.63l1.92 3.32a.5.5 0 0 0 .6.22l2.39-.96c.5.4 1.05.72 1.63.94l.36 2.54a.5.5 0 0 0 .5.42h3.84a.5.5 0 0 0 .5-.42l.36-2.54c.58-.22 1.12-.53 1.63-.94l2.39.96a.5.5 0 0 0 .6-.22l1.92-3.32a.5.5 0 0 0-.12-.63l-2.03-1.58zM12 15.5A3.5 3.5 0 1 1 12 8a3.5 3.5 0 0 1 0 7.5z" /></svg>;
    case 'chevron':
      return <svg viewBox="0 0 24 24" aria-hidden="true"><polyline points="15 18 9 12 15 6" /></svg>;
    case 'link':
      return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 13a5 5 0 0 1 0-7l2-2a5 5 0 0 1 7 7l-1 1"/><path d="M14 11a5 5 0 0 1 0 7l-2 2a5 5 0 0 1-7-7l1-1"/></svg>;
    default:
      return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /></svg>;
  }
}

export default function App() {
  const [language, setLanguage] = useState('en');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [donationTab, setDonationTab] = useState('monthly');
  const [selectedAmount, setSelectedAmount] = useState(500);
  const [customAmount, setCustomAmount] = useState('500');
  const [galleryFilter, setGalleryFilter] = useState('all');
  const [overlay, setOverlay] = useState(null);
  const [toast, setToast] = useState(null);
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [adminSession, setAdminSession] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(storageKeys.adminSession) || 'null');
    } catch {
      return null;
    }
  });
  const [appData, setAppData] = useState(() => {
    try {
      return { ...initialAppData, ...(JSON.parse(localStorage.getItem(storageKeys.appData) || '{}')) };
    } catch {
      return initialAppData;
    }
  });
  const [storyDraft, setStoryDraft] = useState({
    name: '',
    quote: '',
    image: assets.community,
    video: ''
  });
  const toastTimer = useRef(null);

  const t = TEXT[language];
  const visibleGalleryItems = useMemo(() => galleryItems.filter(([category]) => galleryFilter === 'all' || category === galleryFilter), [galleryFilter]);
  const publishedResidentStories = useMemo(
    () => [...appData.storyDrafts, ...stories].slice(0, 6),
    [appData.storyDrafts]
  );
  const languageLabel = t.lang;

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.find((entry) => entry.isIntersecting);
      if (visible) setActiveSection(visible.target.id);
    }, { rootMargin: '-35% 0px -55% 0px', threshold: 0.1 });
    document.querySelectorAll('section[id]').forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMobileNavOpen(false);
        setOverlay(null);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => () => clearTimeout(toastTimer.current), []);

  useEffect(() => {
    localStorage.setItem(storageKeys.adminSession, JSON.stringify(adminSession));
  }, [adminSession]);

  useEffect(() => {
    localStorage.setItem(storageKeys.appData, JSON.stringify(appData));
  }, [appData]);

  const showToast = (message) => {
    setToast(message);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 3600);
  };

  const appendRecord = (bucket, record, successMessage) => {
    setAppData((current) => {
      const next = {
        ...current,
        [bucket]: [...current[bucket], { ...record, createdAt: new Date().toISOString() }]
      };
      return next;
    });
    showToast(successMessage);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    if (adminEmail.trim().toLowerCase() === demoCredentials.email && adminPassword === demoCredentials.password) {
      const session = { email: demoCredentials.email, role: 'admin', name: 'Team Admin' };
      setAdminSession(session);
      setAdminEmail('');
      setAdminPassword('');
      showToast('Admin login successful.');
      return;
    }
    showToast('Invalid admin credentials.');
  };

  const handleLogout = () => {
    setAdminSession(null);
    showToast('Admin session cleared.');
  };

  const handleStorySave = (event) => {
    event.preventDefault();
    if (!adminSession) {
      showToast('Login required before publishing stories.');
      return;
    }
    if (!storyDraft.name.trim() || !storyDraft.quote.trim()) {
      showToast('Resident name and quote are required.');
      return;
    }
    appendRecord(
      'storyDrafts',
      { ...storyDraft },
      'Resident story saved locally and added to the feed.'
    );
    setStoryDraft({ name: '', quote: '', image: assets.community, video: '' });
  };

  const handleSubmission = (bucket, successMessage) => (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    appendRecord(bucket, Object.fromEntries(formData.entries()), successMessage);
    form.reset();
    if (bucket === 'donations') {
      setCustomAmount(String(selectedAmount));
    }
  };

  const scrollToSection = (id) => (event) => {
    event.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMobileNavOpen(false);
  };

  const sidebarPrimaryItems = [
    { id: 'about', label: language === 'hi' ? 'डैशबोर्ड' : 'Dashboard', icon: 'dashboard' },
    { id: 'services', label: language === 'hi' ? 'प्रोजेक्ट्स' : 'Projects', icon: 'projects' },
    { id: 'happiness', label: language === 'hi' ? 'एनालिटिक्स' : 'Analytics', icon: 'analytics' },
    { id: 'volunteer', label: language === 'hi' ? 'टीम' : 'Team', icon: 'team' },
    { id: 'contact', label: language === 'hi' ? 'सेटिंग्स' : 'Settings', icon: 'settings' }
  ];
  const sidebarSecondaryItems = [
    { id: 'residents', label: t.nav.residents, icon: 'link' },
    { id: 'donate', label: language === 'hi' ? 'दान' : 'Donate', icon: 'link' },
    { id: 'programs', label: t.nav.programs, icon: 'link' },
    { id: 'events', label: language === 'hi' ? 'इवेंट्स' : 'Events', icon: 'link' },
    { id: 'gallery', label: t.nav.gallery, icon: 'link' },
    { id: 'content-workflow', label: language === 'hi' ? 'Workflow' : 'Workflow', icon: 'link' },
    { id: 'accessibility', label: language === 'hi' ? 'पहुँच' : 'Accessibility', icon: 'link' },
    { id: 'community', label: language === 'hi' ? 'समुदाय' : 'Community', icon: 'link' },
    { id: 'admin', label: 'Admin', icon: 'link' }
  ];
  const galleryLabels = t.galleryFilters;
  const openPolicy = (key) => setOverlay({ type: 'policy', ...policyContent[key] });
  const closeOverlay = () => setOverlay(null);
  return (
    <>
      <div className={`app-shell ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        <button
          type="button"
          className="sidebar-mobile-toggle"
          aria-label={mobileNavOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileNavOpen}
          onClick={() => setMobileNavOpen((current) => !current)}
        >
          <span></span><span></span><span></span>
        </button>

        <aside className={`sidebar ${mobileNavOpen ? 'open' : ''} ${sidebarCollapsed ? 'collapsed' : ''}`} aria-label="Sidebar navigation">
          <div className="sidebar-header">
            <a href="#about" className="sidebar-brand" onClick={scrollToSection('about')}>
              <div className="sidebar-brand__mark">AA</div>
              <div className="sidebar-brand__text">
                <strong>Aadhaar Ashram</strong>
                <span>Where Every Elder Finds Home</span>
              </div>
            </a>
            <button
              type="button"
              className="sidebar-collapse-toggle"
              aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              aria-expanded={!sidebarCollapsed}
              onClick={() => setSidebarCollapsed((current) => !current)}
            >
              <SidebarIcon name="chevron" />
            </button>
          </div>

          <div className="sidebar-body">
            <div className="sidebar-group">
              <div className="sidebar-group__label">{language === 'hi' ? 'मुख्य' : 'Main'}</div>
              <nav aria-label="Primary navigation" className="sidebar-nav">
                {sidebarPrimaryItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`sidebar-link ${activeSection === item.id ? 'active' : ''}`}
                    aria-current={activeSection === item.id ? 'page' : undefined}
                    aria-label={item.label}
                    onClick={scrollToSection(item.id)}
                  >
                    <span className="sidebar-link__icon"><SidebarIcon name={item.icon} /></span>
                    <span className="sidebar-link__text">{item.label}</span>
                  </a>
                ))}
              </nav>
            </div>

            <div className="sidebar-group">
              <div className="sidebar-group__label">{language === 'hi' ? 'शॉर्टकट' : 'Shortcuts'}</div>
              <nav aria-label="Section navigation" className="sidebar-nav">
                {sidebarSecondaryItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`sidebar-link sidebar-link--secondary ${activeSection === item.id ? 'active' : ''}`}
                    aria-current={activeSection === item.id ? 'page' : undefined}
                    aria-label={item.label}
                    onClick={scrollToSection(item.id)}
                  >
                    <span className="sidebar-link__icon"><SidebarIcon name={item.icon} /></span>
                    <span className="sidebar-link__text">{item.label}</span>
                  </a>
                ))}
              </nav>
            </div>
          </div>

          <div className="sidebar-footer">
            <div className="sidebar-profile">
              <div className="sidebar-profile__avatar" aria-hidden="true">{(adminSession?.name || 'AA').slice(0, 2).toUpperCase()}</div>
              <div className="sidebar-profile__copy">
                <strong>{adminSession?.name || 'Aadhaar Admin'}</strong>
                <span>{adminSession?.email || 'team@aadhaarashram.org'}</span>
              </div>
            </div>
            <div className="sidebar-footer-actions">
              <a href="#contact" className="sidebar-footer-link" onClick={scrollToSection('contact')}>Settings</a>
              <button
                type="button"
                className="sidebar-footer-link sidebar-footer-link--button"
                onClick={() => {
                  if (adminSession) {
                    handleLogout();
                  } else {
                    showToast('Demo profile signed out.');
                  }
                }}
              >
                Log Out
              </button>
            </div>
          </div>
        </aside>

        <button
          type="button"
          className={`sidebar-backdrop ${mobileNavOpen ? 'open' : ''}`}
          aria-label="Close navigation menu"
          onClick={() => setMobileNavOpen(false)}
        />

        <div className="app-content">
          <main id="main">
            <section className="hero">
          <div className="hero-bg hero-bg-img"><img src={assets.hero} alt="Elderly woman smiling peacefully in a garden" /></div>
          <div className="hero-overlay"></div>
          <div className="hero-content container">
            <div className="hero-inner">
              <div className="hero-badge anim-fade-up"><span className="dot"></span> {t.heroBadge}</div>
              <h1 className="anim-fade-up delay-1">{t.heroLead} <em>{t.heroEmphasis}</em>.</h1>
              <p className="hero-sub anim-fade-up delay-2">{t.heroSub}</p>
              <div className="hero-actions anim-fade-up delay-3">
                <a href="#donate" className="btn btn-primary btn-lg" onClick={scrollToSection('donate')}>{t.donate}</a>
                <button className="hero-video-btn" type="button" onClick={() => setOverlay({ type: 'video', title: t.story, src: 'https://www.youtube.com/embed/dQw4w9WgXcQ' })}>
                  <div className="hero-play"><svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg></div>
                  {t.story}
                </button>
              </div>
              <div className="hero-trust anim-fade-up delay-4">
                <div className="trust-strip" style={{ justifyContent: 'flex-start', background: 'transparent', border: 'none', padding: 0 }}>
                  {t.trust.map((item) => (
                    <span className="trust-item" key={item}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>{item}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="hero-scroll"><span>Scroll</span><div className="hero-scroll-bar"></div></div>
            </section>

        <section id="about" className="section bg-warm">
          <div className="container">
            <div className="grid-4">
              {[['340+', 'Elders Given Home'], ['17', 'Years of Service'], ['1200+', 'Active Volunteers'], ['96%', 'Care Rating']].map(([value, label], index) => (
                <div className={`impact-card animate anim-fade-up delay-${index + 1}`} key={label}><span className="impact-number">{value}</span><span className="impact-label">{label}</span></div>
              ))}
            </div>
          </div>
        </section>

        <section id="residents" className="section section-lg">
          <div className="container">
            <div className="story-block">
              <div className="story-image-wrap animate anim-fade-right"><img src={assets.community} alt="Elders playing games and smiling" /></div>
              <div className="story-content animate anim-fade-left">
                <span className="section-label">{t.residentLabel}</span>
                <h2 className="section-title">{t.residentTitle}</h2>
                <p>{t.residentSub}</p>
                <p>Every day is filled with engaging activities, nutritious meals, expert medical care, and most importantly—the warmth of a family.</p>
                <blockquote className="story-quote">“{t.residentQuote}”<span style={{ fontSize: 'var(--text-sm)', fontFamily: 'var(--font-body)', fontStyle: 'normal', fontWeight: 600, color: 'var(--clr-primary)', marginTop: 8, display: 'block' }}>— {t.residentAttribution}</span></blockquote>
                <a href="#programs" className="btn btn-secondary mt-4" onClick={scrollToSection('programs')}>{t.nav.programs}</a>
              </div>
            </div>
          </div>
        </section>

        <section id="happiness" className="section section-lg bg-warm">
          <div className="container">
            <SectionHeader label={t.happinessLabel} title={t.happinessTitle} subtitle={t.happinessSub} />
            <div className="happiness-stats animate anim-fade-up">
              {[['😊', '92%', 'Overall Satisfaction'], ['🏠', '95%', 'Feel at Home'], ['❤️', '89%', 'Emotional Well-being'], ['🍽️', '97%', 'Food Quality']].map(([emoji, value, label]) => (
                <div className="happiness-stat" key={label}><div className="happiness-emoji">{emoji}</div><div className="happiness-number">{value}</div><div className="happiness-label">{label}</div></div>
              ))}
            </div>
            <div className="happiness-feed">
                    {publishedResidentStories.map((story, index) => (
                        <div className={`happiness-card animate anim-fade-up delay-${index + 1}`} key={story.name}>
                          <div className="happiness-media">
                            <img src={story.image} alt={story.name} className="happiness-image" />
                    <button className="happiness-play-btn" type="button" onClick={() => story.video ? setOverlay({ type: 'video', title: story.name, src: story.video }) : showToast('No video attached for this story yet.')}>
                      <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                    </button>
                  </div>
                  <div className="happiness-card-content">
                    <div className="happiness-card-header"><div><div className="happiness-name">{story.name}</div><div className="happiness-date">{story.date || 'Recently added'}</div></div><div className="happiness-rating">★★★★★</div></div>
                    <p>“{story.quote}”</p>
                    <div className="happiness-tags">{(story.tags || ['Community']).map((tag) => <span className={`tag ${tag === 'Care Quality' || tag === 'Food' ? 'tag-green' : 'tag-amber'}`} key={tag}>{tag}</span>)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="donate" className="section section-lg bg-amber text-inverse" style={{ color: '#fff' }}>
          <div className="container">
            <div className="grid-2" style={{ alignItems: 'center' }}>
              <div className="animate anim-fade-right">
                <span className="section-label" style={{ color: '#fff' }}>{t.donateLabel}</span>
                <h2 className="section-title" style={{ color: '#fff' }}>{t.donateTitle}</h2>
                <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: 'var(--text-lg)', marginBottom: 'var(--space-6)' }}>{t.donateSub}</p>
                <ul style={{ marginBottom: 'var(--space-8)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>{['Monthly health checkups & medicines', 'Daily balanced, elder-friendly meals', '24/7 dedicated caregiving staff'].map((item) => <li className="flex" style={{ gap: 12, alignItems: 'center' }} key={item}><div style={{ background: 'rgba(255,255,255,0.2)', width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✓</div><span>{item}</span></li>)}</ul>
              </div>
              <div className="animate anim-fade-left">
                <div className="donation-widget">
                  <div className="donation-tabs">
                    {t.donateTabs.map((label, index) => {
                      const tabValue = index === 0 ? 'monthly' : 'one-time';
                      return <button key={tabValue} type="button" className={`donation-tab ${donationTab === tabValue ? 'active' : ''}`} onClick={() => setDonationTab(tabValue)}>{label}</button>;
                    })}
                  </div>
                  <div className="donation-amounts">
                    {donationAmounts.map(([amount, impact]) => <button key={amount} type="button" className={`donation-amount-btn ${selectedAmount === amount ? 'active' : ''}`} onClick={() => { setSelectedAmount(amount); setCustomAmount(String(amount)); }}><span className="amount">₹{amount}</span><span className="impact">{donationTab === 'monthly' ? impact : 'One-time support'}</span></button>)}
                  </div>
                  <div className="donation-custom"><label className="donation-custom-label">Custom Amount</label><div className="donation-custom-input-wrap"><span className="donation-currency">₹</span><input type="number" className="donation-custom-input" value={customAmount} min="100" onChange={(event) => setCustomAmount(event.target.value)} /></div></div>
                  <button type="button" className="btn btn-primary donate-secure-btn" style={{ width: '100%' }} onClick={() => setOverlay({ type: 'donation', amount: Number(customAmount) || selectedAmount, plan: donationTab })}>{t.donateSecure} 🔒</button>
                  <div className="donation-trust"><span className="trust-badge"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>Secure Payment</span><span className="trust-badge"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>80G Tax Receipt</span></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="volunteer" className="section section-lg bg-warm">
          <div className="container">
            <div className="story-block reverse">
              <div className="story-image-wrap animate anim-fade-left"><img src={assets.volunteer} alt="Volunteer helping elder with yoga" /></div>
              <div className="story-content animate anim-fade-right">
                <span className="section-label">{t.volunteerLabel}</span>
                <h2 className="section-title">{t.volunteerTitle}</h2>
                <p>{t.volunteerSub}</p>
                <div style={{ display: 'flex', gap: 'var(--space-4)', margin: 'var(--space-6) 0', flexWrap: 'wrap' }}>{['Companion Visitor', 'Activity Facilitator', 'Digital Literacy Coach'].map((item) => <span className="tag tag-green" key={item}>{item}</span>)}</div>
                <p className="text-sm"><em>Join 1,200+ volunteers across Delhi NCR.</em></p>
                  <form id="volunteer-form" style={{ marginTop: 'var(--space-6)', display: 'flex', gap: 'var(--space-3)' }} onSubmit={handleSubmission('volunteers', 'Volunteer request saved locally. The team will review it within 24 hours.')}>
                    <label htmlFor="volunteer-email" className="sr-only">{t.volunteerEmail}</label>
                    <input id="volunteer-email" name="email" type="email" className="form-input" placeholder={t.volunteerEmail} required style={{ flex: 1 }} aria-required="true" />
                    <button type="submit" className="btn btn-green">{t.volunteerButton}</button>
                  </form>
                </div>
              </div>
            </div>
        </section>

        <section id="content-workflow" className="section section-lg">
          <div className="container">
            <SectionHeader label={t.contentLabel} title={t.contentTitle} subtitle={t.contentSub} />
            <div className="grid-3">
              {t.workflowCards.map(([icon, title, body, stat], index) => (
                <div className={`service-card animate anim-fade-up delay-${index + 1}`} key={title}>
                  <div className="service-icon">{icon}</div>
                  <h3>{title}</h3>
                  <p>{body}</p>
                  <span className="service-stat" style={{ color: index === 1 ? 'var(--clr-secondary-dark)' : index === 2 ? 'var(--clr-gold)' : undefined }}>{stat}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="accessibility" className="section bg-warm">
          <div className="container">
            <div className="grid-2" style={{ alignItems: 'start' }}>
              <div className="animate anim-fade-right">
                <span className="section-label">{t.accessibilityLabel}</span>
                <h2 className="section-title">{t.accessibilityTitle}</h2>
                <p>{t.accessibilitySub}</p>
                <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap', marginTop: 'var(--space-6)' }}>
                  <span className="tag tag-green">English</span>
                  <span className="tag tag-green">Hindi</span>
                  <span className="tag tag-amber">Mobile first</span>
                  <span className="tag tag-amber">Keyboard friendly</span>
                </div>
              </div>
              <div className="section-note animate anim-fade-left">
                <div className="service-icon green">✅</div>
                <h3>Accessibility Checklist</h3>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', marginTop: 'var(--space-4)' }}>
                  {t.accessibilityChecks.map((item) => <li className="flex" style={{ gap: 10, alignItems: 'flex-start' }} key={item}><span aria-hidden="true">•</span><span>{item}</span></li>)}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="section section-lg">
          <div className="container">
            <SectionHeader label={t.servicesLabel} title={t.servicesTitle} subtitle={t.servicesSub} />
            <div className="services-grid">
              {services.map(([icon, title, body, stat, accent], index) => (
                <div className={`service-card animate anim-fade-up delay-${(index % 3) + 1}`} key={title}>
                  <div className={`service-icon ${accent === 'green' ? 'green' : accent === 'gold' ? 'gold' : ''}`}>{icon}</div>
                  <h3>{title}</h3>
                  <p>{body}</p>
                  <span className="service-stat" style={{ color: accent === 'green' ? 'var(--clr-secondary-dark)' : accent === 'gold' ? 'var(--clr-gold)' : undefined }}>{stat}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="programs" className="section bg-warm">
          <div className="container">
            <SectionHeader label={t.programsLabel} title={t.programsTitle} subtitle={t.programsSub} />
            <div className="programs-grid">
              {programs.map(([icon, title, body], index) => (
                <div className={`program-feature-card animate anim-fade-up delay-${index + 1}`} key={title}>
                  <div className="program-feature-icon">{icon}</div>
                  <div>
                    <h4>{title}</h4>
                    <p>{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="events" className="section section-lg">
          <div className="container">
            <SectionHeader label={t.journeyLabel} title={t.journeyTitle} subtitle={t.journeySub} />
            <div className="timeline">
              {timeline.map(([icon, date, tag, title, body, image], index) => (
                <div className={`timeline-item animate ${index % 2 === 0 ? 'anim-fade-right' : 'anim-fade-left'}`} key={title}>
                  <div className="timeline-dot"></div>
                  <div className="timeline-card">
                    <img src={image} alt={title} className="timeline-img" />
                    <div className="timeline-date">{icon} {date}<span className={`timeline-tag ${tag === 'Wellness' ? 'green' : tag === 'Celebration' ? 'gold' : ''}`}>{tag}</span></div>
                    <h4>{title}</h4>
                    <p>{body}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center" style={{ marginTop: 'var(--space-12)' }}><a href="#gallery" className="btn btn-secondary" onClick={scrollToSection('gallery')}>View All Events →</a></div>
          </div>
        </section>

        <section id="gallery" className="section bg-warm">
          <div className="container">
            <SectionHeader label={t.galleryLabel} title={t.galleryTitle} subtitle={t.gallerySub} />
            <div className="gallery-filter-bar" style={{ justifyContent: 'center', marginTop: 'var(--space-8)' }}>
              {Object.entries(galleryLabels).map(([id, label]) => <button key={id} type="button" className={`gallery-filter-btn ${galleryFilter === id ? 'active' : ''}`} onClick={() => setGalleryFilter(id)}>{label}</button>)}
            </div>
            <div className="gallery-masonry" style={{ marginTop: 'var(--space-8)' }}>
              {visibleGalleryItems.map(([category, title, image, alt]) => (
                <button key={title} type="button" className="gallery-masonry-item" data-category={category} aria-label={`Open ${title} photo`} onClick={() => setOverlay({ type: 'image', title, image, caption: alt })}>
                  <img src={image} alt={alt} loading="lazy" />
                  <div className="gallery-masonry-overlay"><span className="gallery-masonry-caption">{title}</span></div>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section id="instagram" className="section section-lg">
          <div className="container">
            <div className="insta-section-header">
              <div><span className="section-label">{t.instaLabel}</span><h2 className="section-title" style={{ marginBottom: 0 }}>{t.instaTitle}</h2></div>
              <a href="https://instagram.com/aadhaarashram" target="_blank" rel="noopener" className="insta-handle"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>{t.instaHandle}</a>
            </div>
            <div className="insta-grid">
              {instagramPosts.map(([type, title, image, caption], index) => (
                <button key={title} type="button" className={`insta-post animate anim-scale-in delay-${index + 1}`} onClick={() => setOverlay({ type: 'image', title, image, caption })}>
                  <img src={image} alt={title} loading="lazy" />
                  <div className="insta-post-overlay"><div className="insta-post-overlay-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /></svg></div><p className="insta-post-caption">{caption}</p></div>
                  <span className="insta-post-type">{type}</span>
                </button>
              ))}
            </div>
            <div className="insta-cta"><a href="https://instagram.com/aadhaarashram" target="_blank" rel="noopener" className="btn btn-secondary"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /></svg>Follow {t.instaHandle}</a></div>
          </div>
        </section>

        <section id="contact" className="section section-lg">
          <div className="container">
            <div className="grid-2" style={{ alignItems: 'start' }}>
              <div className="animate anim-fade-right">
                <span className="section-label">{t.contactLabel}</span>
                <h2 className="section-title">{t.contactTitle}</h2>
                <p className="section-subtitle" style={{ marginBottom: 'var(--space-6)' }}>{t.contactSub}</p>
                <div className="section-note" style={{ marginBottom: 'var(--space-4)' }}><h3 style={{ marginBottom: 'var(--space-3)' }}>{t.contactDetails}</h3><p style={{ marginBottom: 'var(--space-2)' }}><strong>Phone:</strong> +91 98100 00000</p><p style={{ marginBottom: 'var(--space-2)' }}><strong>Email:</strong> info@aadhaarashram.org</p><p style={{ marginBottom: 'var(--space-2)' }}><strong>Response time:</strong> Within 24 hours</p><p style={{ marginBottom: 0 }}><strong>Languages:</strong> English and Hindi</p></div>
                <div className="section-note"><h3 style={{ marginBottom: 'var(--space-3)' }}>{t.contactNext}</h3><p style={{ marginBottom: 0 }}>{t.contactNote}</p></div>
              </div>
              <div className="animate anim-fade-left">
                <div className="donation-widget">
                  <h3 style={{ marginBottom: 'var(--space-4)' }}>Send A Message</h3>
                  <form id="contact-form" onSubmit={handleSubmission('contacts', 'Message saved locally. The team will respond within 24 hours.')}>
                    <div className="form-group"><label htmlFor="contact-name" className="form-label">{t.contactName} <span className="required">*</span></label><input id="contact-name" name="name" type="text" className="form-input" required /></div>
                    <div className="form-group"><label htmlFor="contact-email" className="form-label">{t.contactEmail} <span className="required">*</span></label><input id="contact-email" name="email" type="email" className="form-input" required /></div>
                    <div className="form-group"><label htmlFor="contact-subject" className="form-label">{t.contactReason} <span className="required">*</span></label><select id="contact-subject" name="subject" className="form-select" required><option value="">{t.contactPlaceholder}</option>{t.contactReasons.map((reason) => <option key={reason}>{reason}</option>)}</select></div>
                    <div className="form-group"><label htmlFor="contact-message" className="form-label">{t.contactMessage} <span className="required">*</span></label><textarea id="contact-message" name="message" className="form-textarea" required></textarea></div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>{t.contactButton}</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="community" className="section section-lg bg-warm">
          <div className="container">
            <SectionHeader label={t.communityLabel} title={t.communityTitle} subtitle={t.communitySub} />
            <div className="grid-3">
              {[
                ['🎤', 'Open Mic Sessions', 'A resident-friendly stage for poetry, songs, and storytelling.'],
                ['👧', 'Children Interaction', 'Intergenerational visits with children from local schools and orphanages.'],
                ['🌐', 'Community Engagement', 'Volunteer-led activities that build shared ownership and connection.']
              ].map(([icon, title, body]) => (
                <div className="service-card" key={title}>
                  <div className="service-icon green">{icon}</div>
                  <h3>{title}</h3>
                  <p>{body}</p>
                  <span className="service-stat">Ready for documentation</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="admin" className="section section-lg">
          <div className="container">
            <SectionHeader label={t.adminLabel} title={t.adminTitle} subtitle={t.adminSub} />
            <div className="grid-2" style={{ alignItems: 'start' }}>
              <div className="section-note">
                {adminSession ? (
                  <>
                    <div className="flex" style={{ justifyContent: 'space-between', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                      <div>
                        <h3 style={{ marginBottom: 4 }}>Signed in as {adminSession.email}</h3>
                        <p style={{ marginBottom: 0 }}>Role: {adminSession.role}</p>
                      </div>
                      <button type="button" className="btn btn-secondary btn-sm" onClick={handleLogout}>{t.adminLogout}</button>
                    </div>
                    <h4 style={{ marginBottom: 12 }}>{t.adminStoryTitle}</h4>
                    <form onSubmit={handleStorySave}>
                      <div className="form-group"><label className="form-label" htmlFor="story-name">{t.adminStoryName} <span className="required">*</span></label><input id="story-name" className="form-input" value={storyDraft.name} onChange={(event) => setStoryDraft((current) => ({ ...current, name: event.target.value }))} /></div>
                      <div className="form-group"><label className="form-label" htmlFor="story-quote">{t.adminStoryQuote} <span className="required">*</span></label><textarea id="story-quote" className="form-textarea" value={storyDraft.quote} onChange={(event) => setStoryDraft((current) => ({ ...current, quote: event.target.value }))} /></div>
                      <div className="form-group"><label className="form-label" htmlFor="story-image">{t.adminStoryImage}</label><input id="story-image" className="form-input" value={storyDraft.image} onChange={(event) => setStoryDraft((current) => ({ ...current, image: event.target.value }))} /></div>
                      <div className="form-group"><label className="form-label" htmlFor="story-video">{t.adminStoryVideo}</label><input id="story-video" className="form-input" value={storyDraft.video} onChange={(event) => setStoryDraft((current) => ({ ...current, video: event.target.value }))} /></div>
                      <button type="submit" className="btn btn-primary">{t.adminStorySave}</button>
                    </form>
                  </>
                ) : (
                  <form onSubmit={handleLogin}>
                    <h3 style={{ marginBottom: 12 }}>{t.adminLogin}</h3>
                    <div className="form-group"><label className="form-label" htmlFor="admin-email">{t.adminEmail} <span className="required">*</span></label><input id="admin-email" className="form-input" type="email" value={adminEmail} onChange={(event) => setAdminEmail(event.target.value)} /></div>
                    <div className="form-group"><label className="form-label" htmlFor="admin-password">{t.adminPassword} <span className="required">*</span></label><input id="admin-password" className="form-input" type="password" value={adminPassword} onChange={(event) => setAdminPassword(event.target.value)} /></div>
                    <button type="submit" className="btn btn-green">{t.adminLogin}</button>
                  </form>
                )}
              </div>

              <div className="section-note">
                <h3 style={{ marginBottom: 8 }}>{t.dashboardTitle}</h3>
                <p style={{ marginBottom: 16 }}>{t.dashboardSub}</p>
                <div className="grid-2" style={{ gap: 16 }}>
                  <div className="impact-card"><span className="impact-number">{appData.contacts.length}</span><span className="impact-label">Contacts</span></div>
                  <div className="impact-card"><span className="impact-number">{appData.volunteers.length}</span><span className="impact-label">Volunteers</span></div>
                  <div className="impact-card"><span className="impact-number">{appData.donations.length}</span><span className="impact-label">Donations</span></div>
                  <div className="impact-card"><span className="impact-number">{appData.newsletter.length}</span><span className="impact-label">Subscribers</span></div>
                </div>
                <div style={{ marginTop: 20 }}>
                  <h4 style={{ marginBottom: 12 }}>{t.backendTitle}</h4>
                  <p style={{ marginBottom: 12 }}>{t.backendSub}</p>
                  <div className="footer-links">
                    <span className="tag tag-green">LocalStorage queue</span>
                    <span className="tag tag-amber">No server required</span>
                    <span className="tag tag-amber">Admin publish flow</span>
                  </div>
                  <div style={{ marginTop: 20 }}>
                    <h4 style={{ marginBottom: 12 }}>Recent Queue</h4>
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                      {[
                        ...appData.contacts.slice(-1).map((item) => ({ type: 'Contact', value: item.subject || item.email || item.name || 'Contact submission' })),
                        ...appData.volunteers.slice(-1).map((item) => ({ type: 'Volunteer', value: item.email || 'Volunteer submission' })),
                        ...appData.donations.slice(-1).map((item) => ({ type: 'Donation', value: item.amount ? `₹${item.amount}` : 'Donation submission' })),
                        ...appData.newsletter.slice(-1).map((item) => ({ type: 'Newsletter', value: item.email || 'Subscriber' })),
                        ...appData.storyDrafts.slice(-1).map((item) => ({ type: 'Story', value: item.name || 'Resident story' }))
                      ].slice(0, 5).map((entry) => (
                        <li key={`${entry.type}-${entry.value}`} className="section-note" style={{ padding: 12, marginBottom: 0 }}>
                          <strong>{entry.type}:</strong> {entry.value}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="name">Aadhaar Ashram</div>
              <div className="tagline">Where Every Elder Finds Home</div>
              <p>Providing dignified, compassionate care for elderly individuals in Delhi NCR since 2008. We believe aging should be a celebration of life.</p>
              <div style={{ margin: 'var(--space-4) 0', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                <a href="tel:+919810000000" style={{ color: 'rgba(255,255,255,0.85)', fontSize: 15, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }} aria-label="Call Aadhaar Ashram"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.6 3.41 2 2 0 0 1 3.6 1.25h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z" /></svg>+91 98100 00000</a>
                <a href="mailto:info@aadhaarashram.org" style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }} aria-label="Email Aadhaar Ashram"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>info@aadhaarashram.org</a>
              </div>
              <div className="footer-socials"><a href="https://facebook.com/aadhaarashram" target="_blank" rel="noopener" className="footer-social-link" aria-label="Facebook"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg></a><a href="https://instagram.com/aadhaarashram" target="_blank" rel="noopener" className="footer-social-link" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a></div>
            </div>
            <div className="footer-col"><h4>Quick Links</h4><div className="footer-links"><a href="#about" onClick={scrollToSection('about')}>About Us</a><a href="#services" onClick={scrollToSection('services')}>Our Services</a><a href="#residents" onClick={scrollToSection('residents')}>Resident Stories</a><a href="#events" onClick={scrollToSection('events')}>Events & Timeline</a><a href="#gallery" onClick={scrollToSection('gallery')}>Photo Gallery</a></div></div>
            <div className="footer-col"><h4>Get Involved</h4><div className="footer-links"><a href="#donate" onClick={scrollToSection('donate')}>Donate Monthly</a><a href="#donate" onClick={scrollToSection('donate')}>Sponsor a Meal</a><a href="#volunteer" onClick={scrollToSection('volunteer')}>Become a Volunteer</a><a href="#volunteer" onClick={scrollToSection('volunteer')}>Corporate CSR</a><a href="#contact" onClick={scrollToSection('contact')}>Contact Us</a></div></div>
            <div className="footer-col">
              <h4>Newsletter</h4>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', marginBottom: 12 }}>Get quarterly impact updates.</p>
              <form className="footer-newsletter" onSubmit={handleSubmission('newsletter', 'Subscribed locally. You will receive our next impact update.')}>
                <label htmlFor="newsletter-email" className="sr-only">Email Address for Newsletter</label>
                <input id="newsletter-email" name="email" type="email" placeholder="Email Address" aria-label="Email Address for Newsletter" />
                <button className="btn btn-primary btn-sm" style={{ width: '100%' }} type="submit">{t.newsletterButton}</button>
              </form>
              <div className="footer-reg">NGO Darpan ID: DL/2009/00028<br />80G Reg: DEL/80G/2008/112</div>
            </div>
          </div>
          <div className="footer-bottom"><div>&copy; 2026 Aadhaar Ashram. All rights reserved.</div><div style={{ display: 'flex', gap: 20 }}><button type="button" className="open-policy" onClick={() => openPolicy('privacy')}>Privacy Policy</button><button type="button" className="open-policy" onClick={() => openPolicy('terms')}>Terms of Service</button></div></div>
        </div>
      </footer>
        </div>

      {overlay ? (
        <div className="site-modal-overlay" role="presentation" onClick={closeOverlay}>
          <div className={`site-modal ${overlay.type === 'policy' ? 'site-modal--policy' : ''}`} role="dialog" aria-modal="true" aria-label={overlay.title} onClick={(event) => event.stopPropagation()}>
            <button className="site-modal__close" type="button" onClick={closeOverlay} aria-label="Close modal">×</button>
            {overlay.type === 'donation' && (
              <div>
                <h2 style={{ fontFamily: 'var(--font-heading)', marginBottom: 12 }}>{t.donationFlowTitle}</h2>
                <p style={{ color: 'var(--clr-text-mid)', lineHeight: 1.8, marginBottom: 24 }}>{t.donationFlowSub}</p>
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    const formData = new FormData(event.currentTarget);
                    appendRecord(
                      'donations',
                      {
                        ...Object.fromEntries(formData.entries()),
                        amount: overlay.amount,
                        plan: overlay.plan
                      },
                      `Donation recorded locally for ₹${overlay.amount}.`
                    );
                    closeOverlay();
                  }}
                >
                  <div className="form-group">
                    <label className="form-label" htmlFor="donor-name">{t.donationName} <span className="required">*</span></label>
                    <input id="donor-name" name="name" type="text" className="form-input" required />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="donor-email">{t.donationEmail} <span className="required">*</span></label>
                    <input id="donor-email" name="email" type="email" className="form-input" required />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="donation-note">{t.donationNote}</label>
                    <textarea id="donation-note" name="note" className="form-textarea" placeholder="Optional note" />
                  </div>
                  <button className="btn btn-primary" type="submit" style={{ width: '100%' }}>{t.donationSubmit}</button>
                </form>
              </div>
            )}
            {overlay.type === 'video' && <iframe className="site-modal__media" src={`${overlay.src}?autoplay=1`} title={overlay.title} allow="autoplay; encrypted-media" allowFullScreen></iframe>}
            {overlay.type === 'image' && <><img className="site-modal__image" src={overlay.image} alt={overlay.title} /><div className="site-modal__caption"><h3 style={{ marginBottom: 8 }}>{overlay.title}</h3><p>{overlay.caption}</p></div></>}
            {overlay.type === 'policy' && <div><h2 style={{ fontFamily: 'var(--font-heading)', marginBottom: 20 }}>{overlay.title}</h2><p style={{ color: 'var(--clr-text-mid)', lineHeight: 1.8 }}>{overlay.body}</p></div>}
          </div>
        </div>
      ) : null}

      {toast ? <div className="site-toast site-toast--success" role="status" aria-live="polite"><span className="site-toast__title">Update</span><span>{toast}</span></div> : null}
      </div>
    </>
  );
}
