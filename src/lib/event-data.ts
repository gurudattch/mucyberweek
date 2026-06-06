// Event data configuration — edit this file to update all site content
export const eventInfo = {
  name: "Cyber Security Week 2026",
  shortName: "CSW 2026",
  university: "Mandsaur University, Mandsaur",
  tagline: "Defend. Detect. Dominate.",
  dates: "OCT 12 - 16, 2026",
  startDate: "2026-10-12T09:00:00",
  endDate: "2026-10-16T18:00:00",
  venue: "Mandsaur University Campus, Mandsaur, Madhya Pradesh",
  description:
    "A week-long immersive cybersecurity event featuring hands-on workshops, Capture The Flag competitions, expert talks, and networking opportunities. Join us to explore the frontiers of cybersecurity and build the skills to defend the digital world.",
  registrationLink: "#register",
  ctfRegistrationLink: "#ctf",
};

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Schedule", href: "#schedule" },
  { label: "Events", href: "#events" },
  { label: "CTF", href: "#ctf" },
  { label: "Speakers", href: "#speakers" },
  { label: "Team", href: "#team" },
  { label: "Sponsors", href: "#sponsors" },
  { label: "FAQ", href: "#faq" },
  { label: "Register", href: "#register" },
];

export const stats = [
  { label: "Days", value: "7", icon: "Calendar" },
  { label: "Events", value: "15+", icon: "Zap" },
  { label: "Speakers", value: "10+", icon: "Users" },
  { label: "Prizes", value: "₹50K+", icon: "Trophy" },
];

export interface TimelineDay {
  day: number; date: string; title: string; description: string;
  events: { time: string; name: string; type: string }[];
}

// export const timeline: TimelineDay[] = [
//   { day: 1, date: "July 14", title: "Inauguration Day", description: "Grand opening ceremony with chief guest address and keynote session",
//     events: [
//       { time: "09:00 AM", name: "Registration & Welcome Kit", type: "registration" },
//       { time: "10:00 AM", name: "Inauguration Ceremony & Lamp Lighting", type: "ceremony" },
//       { time: "11:00 AM", name: "Chief Guest Address", type: "keynote" },
//       { time: "12:00 PM", name: "Keynote: Future of Cybersecurity in India", type: "keynote" },
//       { time: "02:00 PM", name: "Ice Breaker: Cyber Trivia Challenge", type: "activity" },
//       { time: "04:00 PM", name: "Campus Tour & Networking", type: "networking" },
//     ]},
//   { day: 2, date: "July 15", title: "Ethical Hacking Workshop", description: "Hands-on workshop covering penetration testing and ethical hacking",
//     events: [
//       { time: "09:00 AM", name: "Introduction to Ethical Hacking", type: "workshop" },
//       { time: "11:00 AM", name: "Hands-on: Reconnaissance & Scanning", type: "workshop" },
//       { time: "01:00 PM", name: "Lunch Break", type: "break" },
//       { time: "02:00 PM", name: "Hands-on: Exploitation Techniques", type: "workshop" },
//       { time: "04:00 PM", name: "CTF Practice Session", type: "activity" },
//     ]},
//   { day: 3, date: "July 16", title: "Web Application Security", description: "Deep dive into web vulnerabilities, OWASP Top 10, and secure coding",
//     events: [
//       { time: "09:00 AM", name: "OWASP Top 10 Deep Dive", type: "workshop" },
//       { time: "11:00 AM", name: "Hands-on: SQL Injection & XSS", type: "workshop" },
//       { time: "01:00 PM", name: "Lunch Break", type: "break" },
//       { time: "02:00 PM", name: "Hands-on: Auth Bypass & CSRF", type: "workshop" },
//       { time: "04:00 PM", name: "Bug Bounty: Tips & Strategies", type: "talk" },
//     ]},
//   { day: 4, date: "July 17", title: "Digital Forensics & IR", description: "Learn forensic investigation and incident handling",
//     events: [
//       { time: "09:00 AM", name: "Introduction to Digital Forensics", type: "workshop" },
//       { time: "11:00 AM", name: "Hands-on: Disk & Memory Forensics", type: "workshop" },
//       { time: "01:00 PM", name: "Lunch Break", type: "break" },
//       { time: "02:00 PM", name: "Hands-on: Network Forensics & Log Analysis", type: "workshop" },
//       { time: "04:00 PM", name: "Case Study: Real-World Incident Response", type: "talk" },
//     ]},
//   { day: 5, date: "July 18", title: "CTF Competition Day", description: "The ultimate Capture The Flag challenge!",
//     events: [
//       { time: "09:00 AM", name: "CTF Briefing & Rules", type: "ceremony" },
//       { time: "09:30 AM", name: "CTF Competition Begins", type: "competition" },
//       { time: "01:00 PM", name: "Lunch (Competition Continues)", type: "break" },
//       { time: "05:00 PM", name: "CTF Ends", type: "competition" },
//       { time: "05:30 PM", name: "Write-up Presentations", type: "activity" },
//       { time: "06:30 PM", name: "CTF Results & Awards", type: "ceremony" },
//     ]},
//   { day: 6, date: "July 19", title: "Expert Talks & Panels", description: "Industry experts on cybersecurity careers, threats, and innovations",
//     events: [
//       { time: "09:00 AM", name: "Talk: AI in Cybersecurity", type: "talk" },
//       { time: "10:30 AM", name: "Talk: Cloud Security & Zero Trust", type: "talk" },
//       { time: "12:00 PM", name: "Panel: Career Paths in Cybersecurity", type: "panel" },
//       { time: "01:00 PM", name: "Lunch Break", type: "break" },
//       { time: "02:00 PM", name: "Talk: Threat Intelligence & OSINT", type: "talk" },
//       { time: "03:30 PM", name: "Fireside Chat: Women in Cybersecurity", type: "panel" },
//       { time: "05:00 PM", name: "Quiz Competition Finals", type: "competition" },
//     ]},
//   { day: 7, date: "July 20", title: "Valedictory Ceremony", description: "Grand closing with prize distribution",
//     events: [
//       { time: "09:00 AM", name: "Open CTF / Hackathon (Optional)", type: "activity" },
//       { time: "11:00 AM", name: "Closing Keynote: Building a Secure Future", type: "keynote" },
//       { time: "12:00 PM", name: "Valedictory Address", type: "ceremony" },
//       { time: "01:00 PM", name: "Lunch Break", type: "break" },
//       { time: "02:00 PM", name: "Prize Distribution & Awards", type: "ceremony" },
//       { time: "03:30 PM", name: "Vote of Thanks & Group Photo", type: "ceremony" },
//       { time: "04:00 PM", name: "Closing & Networking", type: "networking" },
//     ]},
// ];

export const events = [
  {
    "id": "day1-cyber-hygiene",
    "title": "Inauguration & Cyber Hygiene Awareness Session",
    "description": "Learn safe internet practices, password security, phishing awareness, social engineering prevention, and digital safety fundamentals.",
    "icon": "Shield",
    "category": "Talk",
    "date": "Day 1",
    "time": "11:00 AM",
    "venue": "Seminar Hall"
  },
  {
    "id": "day1-quiz",
    "title": "Cyber Hygiene Quiz Competition",
    "description": "Interactive quiz competition focused on cyber awareness, online safety, cybersecurity basics, and current cyber threats.",
    "icon": "Brain",
    "category": "Competition",
    "date": "Day 1",
    "time": "02:00 PM",
    "venue": "Auditorium"
  },
  {
    "id": "day1-qa",
    "title": "Expert Q&A Session",
    "description": "Open interaction session where participants can ask questions about cybersecurity, careers, and industry trends.",
    "icon": "MessageSquare",
    "category": "Q&A",
    "date": "Day 1",
    "time": "03:45 PM",
    "venue": "Seminar Hall"
  },
  {
    "id": "day1-awards",
    "title": "Quiz Winner Announcement",
    "description": "Recognition of Quiz Champion, runners-up, and Women Cyber Excellence Award winner.",
    "icon": "Award",
    "category": "Ceremony",
    "date": "Day 1",
    "time": "04:30 PM",
    "venue": "Main Auditorium"
  },
  {
    "id": "day2-fundamentals",
    "title": "Cybersecurity Fundamentals",
    "description": "Introduction to networking, ethical hacking, web security, cryptography, digital forensics, and cybersecurity fundamentals.",
    "icon": "BookOpen",
    "category": "Talk",
    "date": "Day 2",
    "time": "09:00 AM",
    "venue": "Seminar Hall"
  },
  // {
  //   "id": "day2-intermediate",
  //   "title": "Intermediate Cybersecurity Session",
  //   "description": "Explore vulnerability assessment, threat intelligence, secure coding, and practical cybersecurity concepts.",
  //   "icon": "ShieldCheck",
  //   "category": "Talk",
  //   "date": "Day 2",
  //   "time": "11:00 AM",
  //   "venue": "Seminar Hall"
  // },
  {
    "id": "day2-qa",
    "title": "Technical Q&A Session",
    "description": "Interactive discussion with speakers covering cybersecurity concepts and industry practices.",
    "icon": "MessageSquare",
    "category": "Q&A",
    "date": "Day 2",
    "time": "11:00 PM",
    "venue": "Seminar Hall"
  },
  {
    "id": "day2-jeopardy-ctf",
    "title": "Jeopardy Style CTF",
    "description": "4-hour Capture The Flag competition featuring Web Exploitation, Cryptography, Forensics, OSINT, Reverse Engineering, and Misc challenges.",
    "icon": "Flag",
    "category": "Competition",
    "date": "Day 2",
    "time": "12:00 PM",
    "venue": "Computer Labs"
  },
  {
    "id": "day2-ctf-awards",
    "title": "CTF Winner Announcement",
    "description": "Recognition of Jeopardy CTF winners and top-performing participants.",
    "icon": "Trophy",
    "category": "Ceremony",
    "date": "Day 2",
    "time": "03:30 PM",
    "venue": "Main Auditorium"
  },
  {
    "id": "day3-advanced-cyber",
    "title": "Advanced Cybersecurity Session",
    "description": "Sessions on cloud security, AI in cybersecurity, incident response, threat hunting, and advanced penetration testing.",
    "icon": "Cpu",
    "category": "Talk",
    "date": "Day 3",
    "time": "09:00 AM",
    "venue": "Seminar Hall"
  },
  {
    "id": "day3-career-guidance",
    "title": "Cybersecurity Career Guidance",
    "description": "Career roadmap covering certifications, bug bounty, CVE research, internships, placements, and higher studies.",
    "icon": "Briefcase",
    "category": "Talk",
    "date": "Day 3",
    "time": "11:00 AM",
    "venue": "Seminar Hall"
  },
  {
    "id": "day3-panel-qa",
    "title": "Career & Industry Q&A",
    "description": "Panel discussion and interactive Q&A session with cybersecurity professionals and researchers.",
    "icon": "Users",
    "category": "Panel",
    "date": "Day 3",
    "time": "01:30 PM",
    "venue": "Seminar Hall"
  },
  {
    "id": "day3-boot2root",
    "title": "Boot-to-Root CTF",
    "description": "Hands-on attack and defense competition involving enumeration, exploitation, privilege escalation, and flag capture.",
    "icon": "Terminal",
    "category": "Competition",
    "date": "Day 3",
    "time": "02:30 PM",
    "venue": "Computer Labs"
  },
  {
    "id": "day3-valedictory",
    "title": "Grand Valedictory & Prize Distribution",
    "description": "Final winner announcements, prize distribution, certificates, Women Cyber Excellence Award, and closing ceremony.",
    "icon": "Award",
    "category": "Ceremony",
    "date": "Day 3",
    "time": "05:30 PM",
    "venue": "Main Auditorium"
  },
];

export const ctfInfo = {
  title: "Capture The Flag 2026", tagline: "Hack. Solve. Conquer.", format: "Jeopardy-Style CTF",
  teamSize: "1–4 Members", duration: "5 Hours", date: "July 18, 2026", time: "9:30 AM – 5:30 PM", prizePool: "₹00,000+",
  categories: [
    { name: "Web Exploitation", description: "SQL Injection, XSS, Auth Bypass, SSRF and more", icon: "Globe", difficulty: "Easy to Hard" },
    { name: "Cryptography", description: "Classical ciphers, RSA, AES, hash cracking", icon: "Lock", difficulty: "Medium to Hard" },
    { name: "Reverse Engineering", description: "Binary analysis, malware reverse, crackmes", icon: "Cog", difficulty: "Medium to Hard" },
    { name: "Forensics", description: "Disk forensics, memory dumps, steganography", icon: "Search", difficulty: "Easy to Medium" },
    { name: "OSINT", description: "Open-source intelligence gathering and analysis", icon: "Eye", difficulty: "Easy to Medium" },
    { name: "Miscellaneous", description: "Programming, logic puzzles, surprise challenges", icon: "Puzzle", difficulty: "Easy to Hard" },
  ],
  rules: [
    "Teams of 1–4 members only", "No sharing flags/solutions between teams",
    "No attacking CTF infrastructure", "No brute-forcing flags",
    "All challenges must be solved ethically", "Organizers' decisions are final",
    "No automated scanning tools unless specified", "Flag format: CSW{something_here}",
  ],
};

export const speakers = [
 {
    id: "1",
    name: "To Be Announced",
    designation: "",
    organization: "",
    bio: "",
    topic: "",
    isChiefGuest: true,
  },
];

export const teamMembers = [
 {
    id: "1",
    name: "To Be Announced",
    role: "",
    department: "",
  }
];

export interface Sponsor {
  id: string;
  name: string;
  tier: "platinum" | "gold" | "silver" | "community";
  description: string;
  website?: string;
  logo?: string;
}

export const sponsors: Sponsor[] = [
  {
    id: "1",
    name: "VibSecuriry",
    tier: "platinum",
    description: "LLM penetration testing & AI Security",
    website: "https://vibsecurity.com/",
    logo: "https://vibsecurity.com/assets/logo-BQssgiAJ.png",
  },
  {
    id: "2",
    name: "Certiwall",
    tier: "platinum",
    description: "Certificate Management Systems",
    website: "https://www.certiwall.in",
    logo: "https://avatars.githubusercontent.com/u/222141003?v=4",
  },
  {
    id: "3",
    name: "SecOps Group",
    tier: "gold",
    description: "Cyber Security Certifications",
    website: "https://secops.group",
    logo: "/sponsors/secops.png",
  },
];

export const partners = [
  { id: "1", name: "Mandsaur University", type: "Host Institution" },
];

export const faqs = [
  { question: "Who can participate?", answer: "Open to all students, professionals, and cybersecurity enthusiasts. Some workshops may have prerequisites. CTF is open to all skill levels." },
  { question: "Is there a registration fee?", answer: "Registration details will be announced soon. Early bird discounts available for students. Some community events are free." },
  { question: "Do I need prior cybersecurity knowledge?", answer: "Not at all! We have events for all skill levels — from beginners to advanced. Workshops start from basics." },
  { question: "How do I register for CTF?", answer: "CTF registration is available on this website. Register as a team of 1-4 members. Links will be activated closer to the event." },
  { question: "What should I bring to workshops?", answer: "Bring your own laptop with required software pre-installed (instructions shared via email). Carry your charger." },
  { question: "Are certificates provided?", answer: "Yes! Participation certificates for all attendees. Special certificates and prizes for CTF winners and quiz toppers." },
  { question: "Is accommodation available?", answer: "Limited accommodation for outstation participants on first-come basis. Contact the organizing team for details." },
  { question: "How can I become a sponsor?", answer: "Reach out to us at csw@mandsauruniversity.edu.in for sponsorship packages and partnership opportunities." },
];

export const eventTypes: Record<string, { color: string; label: string }> = {
  ceremony: { color: "bg-amber-500/20 text-amber-400 border-amber-500/30", label: "Ceremony" },
  keynote: { color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30", label: "Keynote" },
  workshop: { color: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30", label: "Workshop" },
  talk: { color: "bg-purple-500/20 text-purple-400 border-purple-500/30", label: "Talk" },
  panel: { color: "bg-pink-500/20 text-pink-400 border-pink-500/30", label: "Panel" },
  competition: { color: "bg-green-500/20 text-green-400 border-green-500/30", label: "Competition" },
  activity: { color: "bg-orange-500/20 text-orange-400 border-orange-500/30", label: "Activity" },
  networking: { color: "bg-blue-500/20 text-blue-400 border-blue-500/30", label: "Networking" },
  break: { color: "bg-gray-500/20 text-gray-400 border-gray-500/30", label: "Break" },
  registration: { color: "bg-teal-500/20 text-teal-400 border-teal-500/30", label: "Registration" },
};
