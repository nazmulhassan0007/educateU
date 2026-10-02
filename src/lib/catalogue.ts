import { PRICE, type Subject } from "./data";

export type CatalogueCourse = {
  slug: string;
  title: string;
  subject: Subject;
  hours: number;
  price: number;
  description: string;
  image: string;
};

const img = {
  fire: "/images/courses/fire-safety-awareness.png",
  firstAid: "/images/courses/emergency-first-aid.png",
  gdpr: "/images/courses/gdpr.png",
  bias: "/images/courses/unconscious-bias.png",
  manual: "/images/courses/manual-handling.png",
  cyber: "/images/courses/cybersecurity-awareness.png",
  mental: "/images/courses/mental-health-wellbeing.png",
  workshop: "/images/courses/workshop.png",
  hs: "/images/subjects/health-safety.png",
  compliance: "/images/subjects/compliance.png",
  leadership: "/images/subjects/leadership-management.png",
};

/** All 18 courses on educateU Business, copy taken from the live catalogue. */
export const catalogue: CatalogueCourse[] = [
  { slug: "classroom-crisis-intervention-training", title: "Classroom Crisis Intervention Training", subject: "Leadership & Management", hours: 3, price: PRICE, image: img.workshop, description: "Recognise, prevent, and respond to classroom crisis situations confidently." },
  { slug: "customer-service", title: "Customer Service", subject: "Leadership & Management", hours: 3, price: PRICE, image: img.leadership, description: "Deliver excellent, inclusive customer service across an educational setting." },
  { slug: "cybersecurity-awareness-training", title: "Cybersecurity Awareness Training", subject: "IT & Cyber Security", hours: 2, price: PRICE, image: img.cyber, description: "Recognise and respond to common cyber threats in the workplace." },
  { slug: "de-escalation-practices", title: "De-Escalation Practices", subject: "Health & Safety", hours: 3, price: PRICE, image: img.compliance, description: "Learn to calm tense situations and prevent conflict at work." },
  { slug: "e-safety", title: "E-Safety", subject: "IT & Cyber Security", hours: 3, price: PRICE, image: img.gdpr, description: "Protect learners and staff online with essential e-safety training." },
  { slug: "emergency-first-aid-at-work", title: "Emergency First Aid at Work", subject: "Health & Safety", hours: 2, price: PRICE, image: img.firstAid, description: "Essential emergency first aid skills for the workplace." },
  { slug: "equality-diversity-inclusion", title: "Equality, Diversity & Inclusion", subject: "Compliance", hours: 2, price: PRICE, image: img.compliance, description: "Practical introduction to equality, diversity and inclusion at work." },
  { slug: "fire-safety-awareness", title: "Fire Safety Awareness", subject: "Health & Safety", hours: 2, price: PRICE, image: img.fire, description: "Essential fire safety training for employees in any industry." },
  { slug: "gdpr", title: "GDPR", subject: "IT & Cyber Security", hours: 2, price: PRICE, image: img.gdpr, description: "Understand UK GDPR principles, data subject rights, and breach reporting." },
  { slug: "harassment-and-sexual-misconduct", title: "Harassment and Sexual Misconduct", subject: "Health & Safety", hours: 3, price: PRICE, image: img.workshop, description: "Recognise, prevent and respond to harassment and sexual misconduct." },
  { slug: "health-safety-for-employee", title: "Health & Safety for Employees", subject: "Health & Safety", hours: 2, price: PRICE, image: img.hs, description: "Essential workplace health and safety training for all employees." },
  { slug: "manual-handling", title: "Manual Handling", subject: "Health & Safety", hours: 3, price: PRICE, image: img.manual, description: "Manual handling awareness, risk assessment and safe handling techniques." },
  { slug: "mental-health-wellbeing", title: "Mental Health & Wellbeing", subject: "Health & Safety", hours: 3, price: PRICE, image: img.mental, description: "Understand mental health, spot the signs, support wellbeing at work." },
  { slug: "online-data-protection", title: "Online Data Protection", subject: "IT & Cyber Security", hours: 3, price: PRICE, image: img.cyber, description: "Data protection training covering UK GDPR, consent, rights and breaches." },
  { slug: "prevent-and-radicalisation", title: "Prevent and Radicalisation", subject: "Compliance", hours: 3, price: PRICE, image: img.bias, description: "Understand the UK Prevent duty, radicalisation, extremism and Channel referrals." },
  { slug: "reporting-accidents-and-incidents", title: "Reporting Accidents and Incidents", subject: "Health & Safety", hours: 2, price: PRICE, image: img.hs, description: "Learn to report workplace accidents, incidents, and near misses correctly." },
  { slug: "safeguarding-in-further-education", title: "Safeguarding in Further Education", subject: "Compliance", hours: 3, price: PRICE, image: img.compliance, description: "Recognise, respond to and report safeguarding concerns in further education." },
  { slug: "unconscious-bias", title: "Unconscious Bias", subject: "Compliance", hours: 2, price: PRICE, image: img.bias, description: "Understand unconscious bias, recognise its impact, and reduce biased decision-making effectively." },
];

export const subjectsList: Subject[] = ["Health & Safety", "Compliance", "IT & Cyber Security", "Leadership & Management"];

export const learnerReviews = [
  {
    quote:
      "I completed the courses and gained a comprehensive, in-depth understanding of the subjects. The course materials were exceptionally clear, concise, and easy to follow, which greatly facilitated effective learning.",
    name: "Dipto B.",
    role: "IT Specialist",
  },
  {
    quote:
      "The courses were highly useful and provided a solid understanding of essential topics such as fire safety, equality, diversity and inclusion, harassment and sexual misconduct, and prevent and radicalisation.",
    name: "Bushra J.",
    role: "HR Assistant",
  },
  {
    quote:
      "I learned practical concepts and skills that are directly applicable to my role, particularly in improving my understanding of key processes and best practices. The course content was well-structured and relevant.",
    name: "Md Merazul H.",
    role: "HR Assistant",
  },
  {
    quote:
      "The courses were highly useful and provided a solid understanding of essential topics such as fire safety, equality, diversity and inclusion, harassment and sexual misconduct.",
    name: "Atanu B.",
    role: "Senior PHP Developer",
  },
];
