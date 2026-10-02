export type Subject =
  | "Health & Safety"
  | "Compliance"
  | "IT & Cyber Security"
  | "Leadership & Management";

export type Course = {
  slug: string;
  title: string;
  subject: Subject;
  modules: number;
  hours: number;
  price: number;
  image: string;
};

export const PRICE = 15;

export const popularCourses: Course[] = [
  {
    slug: "fire-safety-awareness",
    title: "Fire Safety Awareness",
    subject: "Health & Safety",
    modules: 4,
    hours: 2,
    price: PRICE,
    image: "/images/courses/fire-safety-awareness.png",
  },
  {
    slug: "emergency-first-aid-at-work",
    title: "Emergency First Aid at Work",
    subject: "Health & Safety",
    modules: 4,
    hours: 2,
    price: PRICE,
    image: "/images/courses/emergency-first-aid.png",
  },
  {
    slug: "gdpr",
    title: "GDPR",
    subject: "IT & Cyber Security",
    modules: 5,
    hours: 2,
    price: PRICE,
    image: "/images/courses/gdpr.png",
  },
  {
    slug: "unconscious-bias",
    title: "Unconscious Bias",
    subject: "Compliance",
    modules: 6,
    hours: 2,
    price: PRICE,
    image: "/images/courses/unconscious-bias.png",
  },
  {
    slug: "manual-handling",
    title: "Manual handling",
    subject: "Health & Safety",
    modules: 6,
    hours: 3,
    price: PRICE,
    image: "/images/courses/manual-handling.png",
  },
  {
    slug: "cybersecurity-awareness-training",
    title: "Cybersecurity Awareness Training",
    subject: "IT & Cyber Security",
    modules: 5,
    hours: 2,
    price: PRICE,
    image: "/images/courses/cybersecurity-awareness.png",
  },
];

export const subjects = [
  {
    slug: "health-safety",
    name: "Health & Safety",
    count: 8,
    courses:
      "Fire Safety Awareness · Emergency First Aid at Work · Manual handling · Mental Health & Wellbeing · and 4 more",
    image: "/images/subjects/health-safety.png",
  },
  {
    slug: "compliance",
    name: "Compliance",
    count: 4,
    courses: "Unconscious Bias · Prevent and Radicalisation · Equality, Diversity & Inclusion",
    image: "/images/subjects/compliance.png",
  },
  {
    slug: "it-cyber-security",
    name: "IT & Cyber Security",
    count: 4,
    image: "/images/subjects/it-cyber-security.png",
  },
  {
    slug: "leadership-management",
    name: "Leadership & Management",
    count: 2,
    image: "/images/subjects/leadership-management.png",
  },
] as const;

export const trustedBy = [
  { name: "Elizabeth School of London", src: "/images/logos/elizabeth-school-of-london.png", w: 117, h: 36 },
  { name: "William College", src: "/images/logos/william-college.png", w: 74, h: 36 },
  { name: "Univive", src: "/images/logos/univive.png", w: 115, h: 32 },
  { name: "Victoria College of Arts and Design", src: "/images/logos/vcad.png", w: 96, h: 36 },
  { name: "London Professional College", src: "/images/logos/london-professional-college.png", w: 199, h: 32 },
];

export const steps = [
  {
    title: "Choose your course",
    body: "Pick one for yourself, or select company purchase for your team.",
  },
  {
    title: "Complete checkout",
    body: "One-off payment. You get instant access straight away.",
  },
  {
    title: "Pass and download",
    body: "Finish the final assessment and your CPD certificate is issued. Anyone can verify it with Certificate Checker.",
  },
];

export const included = [
  {
    icon: "/icons/bolt.svg",
    title: "Instant access",
    body: "Start the moment you enrol. No waiting for a fixed start date.",
  },
  {
    icon: "/icons/device.svg",
    title: "Self-paced, any device",
    body: "Online modules you can learn at your own speed.",
  },
  {
    icon: "/icons/check.svg",
    title: "Quizzes, then your certificate",
    body: "Module quizzes, a final assessment, and a CPD Certificate of Completion.",
  },
];

export const teamCourseOptions = [
  "Unconscious Bias",
  "GDPR",
  "Reporting Accidents and Incidents",
  "E-Safety",
  "De-Escalation Practices",
  "Cybersecurity Awareness Training",
  "Fire Safety Awareness",
  "Manual handling",
];

export const testimonials = {
  featured: {
    quote:
      "I learned practical concepts and skills that are directly applicable to my role. The course content was well-structured and relevant, and the examples helped reinforce the learning.",
    name: "Md Merazul H.",
    role: "HR Assistant",
  },
  others: [
    {
      quote:
        "The course materials were exceptionally clear, concise, and easy to follow. The hands-on examples, videos and supplementary articles were particularly valuable.",
      name: "Dipto B.",
      role: "IT Specialist",
    },
    {
      quote:
        "The courses provided a solid understanding of essential topics such as fire safety, equality, diversity and inclusion, and harassment and sexual misconduct.",
      name: "Bushra J.",
      role: "HR Assistant",
    },
  ],
};

export const faqs = [
  {
    q: "What is the best online compliance training platform for small businesses in the UK?",
    a: "educateU is built for UK small businesses that need compliance training without the subscription trap. Every course is BCS or CPD-accredited, priced as a one-off, includes your certificate in the price, and comes with real support from a UK-based team.",
  },
  {
    q: "Are CPD courses for small business owners worth it in the UK?",
    a: "Yes. CPD-certified training shows regulators, insurers and clients that your team is competent in areas like fire safety, data protection and safeguarding. At £15 per course with the certificate included, the cost is predictable and the record is permanent.",
  },
  {
    q: "Who can take courses on educateU?",
    a: "Anyone. Individual learners can enrol themselves, and UK businesses can use company purchase to enrol a whole team at once and track completions in one place.",
  },
  {
    q: "How do I enrol in a course?",
    a: "Pick a course, choose individual or company purchase, and complete checkout. Access is instant, so you can start the first module straight away.",
  },
  {
    q: "Does educateU charge a subscription, or is it a one-off payment?",
    a: "One-off. You pay once per course, the certificate is included, and there are no recurring fees, seat licences or “+ VAT” surprises.",
  },
];

export const nav = [
  { label: "Courses", href: "#courses" },
  { label: "About Us", href: "#about" },
  { label: "Support Hub", href: "#faq" },
  { label: "Certificate Checker", href: "#certificate" },
  { label: "Contact Us", href: "#contact" },
];


/** Courses that rotate through the hero showcase, in order. */
export const heroShowcase: Course[] = [
  popularCourses[0], // Fire Safety Awareness (matches the design's resting state)
  popularCourses[1], // Emergency First Aid at Work
  {
    slug: "mental-health-wellbeing",
    title: "Mental Health & Wellbeing",
    subject: "Health & Safety",
    modules: 5,
    hours: 3,
    price: PRICE,
    image: "/images/courses/mental-health-wellbeing.png",
  },
  popularCourses[2], // GDPR
  popularCourses[3], // Unconscious Bias
  popularCourses[4], // Manual handling
  popularCourses[5], // Cybersecurity Awareness Training
];
