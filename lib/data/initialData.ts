export interface StudentProfile {
  id: string;
  name: string;
  rollNumber: string;
  college: string;
  collegeShort: string;
  branch: string;
  year: number;
  semester: number;
  section: string;
  isCR: boolean;
  avatarUrl: string;
  bio: string;
  cgpa: number;
  sgpa: number;
  overallAttendance: number;
  projectsCount: number;
  liveProjectsCount: number;
  networkCount: number;
  readinessScore: number;
  resumeScore: number;
  skillsVerifiedCount: number;
  skillsTotalCount: number;
  leetcodeStreak: number;
  expenseSpentToday: number;
  feeDues: number;
}

export interface SubjectItem {
  id: string;
  code: string;
  name: string;
  credits: number;
  faculty: string;
  attended: number;
  total: number;
  isElective?: boolean;
  nextSchedule: string;
}

export interface TaskItem {
  id: string;
  title: string;
  badgeText?: string;
  badgeVariant?: 'urgent' | 'high' | 'closing' | 'normal';
  details?: string;
  completed: boolean;
  category: 'academic' | 'tasks' | 'prep' | 'career';
}

export interface FeedPost {
  id: string;
  authorName: string;
  authorRole: string;
  authorAvatar?: string;
  timeAgo: string;
  isVerified?: boolean;
  isPinned?: boolean;
  category: 'notice' | 'coding' | 'doubt' | 'event';
  title?: string;
  content: string;
  attachmentName?: string;
  attachmentSize?: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked?: boolean;
  isBookmarked?: boolean;
  tags?: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  statusBadge: string;
  statusColor: string;
  tagline: string;
  techStack: string[];
  role: string;
  demoUrl?: string;
  progressPercent?: number;
}

export interface SkillItem {
  id: string;
  name: string;
  level: 'Intermediate' | 'Proficient' | 'Advanced';
  rating: number;
  endorsements: string;
}

export interface JobApplication {
  id: string;
  company: string;
  role: string;
  stage: 'applied' | 'oa' | 'interview' | 'offer';
  dueText?: string;
  platform?: string;
  dateText?: string;
  isPriority?: boolean;
}

export interface TimelineMemory {
  id: string;
  period: string;
  badgeText: string;
  badgeType: 'elected' | 'internship' | 'podium' | 'organizing' | 'day1';
  title: string;
  description: string;
  tags: string[];
}

export const initialProfile: StudentProfile = {
  id: 'rahul-dtu-2024',
  name: 'Rahul Sharma',
  rollNumber: '219CS094',
  college: 'Delhi Technological University (DTU)',
  collegeShort: 'DTU',
  branch: 'B.Tech Computer Science & Engineering',
  year: 3,
  semester: 6,
  section: 'B',
  isCR: true,
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
  bio: 'Passionate about full-stack dev, distributed systems & campus robotics. Class Representative (CR) for Section B.',
  cgpa: 8.64,
  sgpa: 8.78,
  overallAttendance: 81.4,
  projectsCount: 5,
  liveProjectsCount: 2,
  networkCount: 248,
  readinessScore: 78,
  resumeScore: 90,
  skillsVerifiedCount: 8,
  skillsTotalCount: 9,
  leetcodeStreak: 18,
  expenseSpentToday: 420,
  feeDues: 1420
};

export const initialSubjects: SubjectItem[] = [
  {
    id: 'sub-1',
    code: 'CS-302',
    name: 'Database Management Systems',
    credits: 4,
    faculty: 'Dr. Ananya Roy',
    attended: 26,
    total: 30,
    isElective: false,
    nextSchedule: 'Today, 2:00 PM (Lab 4)'
  },
  {
    id: 'sub-2',
    code: 'CS-304',
    name: 'Operating Systems',
    credits: 4,
    faculty: 'Prof. K. Muralidhar',
    attended: 23,
    total: 31,
    isElective: false,
    nextSchedule: 'Tomorrow, 9:15 AM • LH-102'
  },
  {
    id: 'sub-3',
    code: 'CS-306',
    name: 'Computer Networks',
    credits: 3,
    faculty: 'Dr. R. Venkat',
    attended: 23,
    total: 29,
    isElective: false,
    nextSchedule: 'Friday, 11:30 AM'
  },
  {
    id: 'sub-4',
    code: 'CS-308',
    name: 'Software Engineering & Agile',
    credits: 3,
    faculty: 'Prof. Neha Gupta',
    attended: 27,
    total: 30,
    isElective: false,
    nextSchedule: 'Thursday, 10:15 AM'
  },
  {
    id: 'sub-5',
    code: 'CS-312',
    name: 'Machine Learning Elective',
    credits: 4,
    faculty: 'Dr. Siddharth Sen',
    attended: 23,
    total: 28,
    isElective: true,
    nextSchedule: 'Monday, 3:00 PM'
  }
];

export const initialTasks: TaskItem[] = [
  {
    id: 'task-1',
    title: 'Submit Computer Networks Lab Assignment 4',
    badgeText: 'DUE 5:00 PM',
    badgeVariant: 'urgent',
    details: 'Attach packet trace wireshark capture file (.pcap)',
    completed: false,
    category: 'academic'
  },
  {
    id: 'task-2',
    title: 'Prep notes for DBMS surprise quiz',
    badgeText: 'HIGH PRIORITY',
    badgeVariant: 'high',
    details: 'Focus: Normalization (3NF & BCNF) and B+ Trees',
    completed: false,
    category: 'prep'
  },
  {
    id: 'task-3',
    title: 'Register for HackNIT Techfest',
    badgeText: 'CLOSES TONIGHT',
    badgeVariant: 'closing',
    details: 'Squad of 4: Rahul, Priya, Rohan & Kabir',
    completed: false,
    category: 'tasks'
  }
];

export const initialProjects: ProjectItem[] = [
  {
    id: 'proj-1',
    title: 'SmartCampus Parking IoT System',
    statusBadge: 'DEPLOYED & LIVE DEMO',
    statusColor: 'emerald',
    tagline: 'Automated license plate & parking slot allocation backend',
    techStack: ['Python', 'React', 'MQTT', 'OpenCV'],
    role: 'Lead Dev + 3 Collaborators',
    demoUrl: 'https://smart-parking-dtu.demo',
    progressPercent: 100
  },
  {
    id: 'proj-2',
    title: 'EdTech Quiz Platform (MERN Stack)',
    statusBadge: 'IN PROGRESS • MILESTONE 3/4',
    statusColor: 'blue',
    tagline: 'Real-time adaptive testing with WebSockets & Redis leaderboard',
    techStack: ['Node.js', 'MongoDB', 'TailwindCSS'],
    role: 'Full Stack Dev',
    progressPercent: 75
  }
];

export const initialSkills: SkillItem[] = [
  {
    id: 'sk-1',
    name: 'Data Structures & Algorithms',
    level: 'Advanced',
    rating: 4.5,
    endorsements: '14 Peer Endorsements'
  },
  {
    id: 'sk-2',
    name: 'React & TypeScript',
    level: 'Proficient',
    rating: 4.0,
    endorsements: '11 Endorsements'
  },
  {
    id: 'sk-3',
    name: 'Database Systems (SQL)',
    level: 'Proficient',
    rating: 4.0,
    endorsements: 'Verified Lab Exam'
  },
  {
    id: 'sk-4',
    name: 'Cloud / AWS',
    level: 'Intermediate',
    rating: 3.0,
    endorsements: 'AWS Certified'
  }
];

export const initialApplications: JobApplication[] = [
  {
    id: 'job-1',
    company: 'PhonePe',
    role: 'Round 1: Technical & System Concepts',
    stage: 'interview',
    dateText: 'Tuesday, Oct 29 • 04:30 PM',
    isPriority: true
  },
  {
    id: 'job-2',
    company: 'Zomato',
    role: 'SDE Intern',
    stage: 'oa',
    dueText: 'Due in 19 hours (HackerRank)',
    platform: 'HackerRank'
  },
  {
    id: 'job-3',
    company: 'Atlassian',
    role: 'Systems Intern',
    stage: 'oa',
    dueText: 'Window closes Oct 31'
  },
  {
    id: 'job-4',
    company: 'Microsoft',
    role: 'Software Intern',
    stage: 'applied'
  },
  {
    id: 'job-5',
    company: 'Razorpay',
    role: 'Frontend Intern',
    stage: 'applied'
  },
  {
    id: 'job-6',
    company: 'Swiggy',
    role: 'Backend Intern',
    stage: 'applied'
  }
];

export const initialTimeline: TimelineMemory[] = [
  {
    id: 'tl-1',
    period: 'OCT 2024 • SEM 6',
    badgeText: 'Elected',
    badgeType: 'elected',
    title: 'Elected Class Representative & Started Major Project',
    description: 'Chosen as Section B CR. Initiated Distributed Systems campus microservices architecture capstone under Dr. S. Rao.',
    tags: ['Leadership', 'Go / gRPC']
  },
  {
    id: 'tl-2',
    period: 'JUL 2024 • SUMMER',
    badgeText: 'Internship',
    badgeType: 'internship',
    title: 'Completed 8-Week Software Internship at TechCorp Bangalore',
    description: 'Built latency-sensitive caching layers for high-throughput messaging infrastructure. Received pre-placement interview invite.',
    tags: ['Redis', 'Kubernetes', 'Certificate']
  },
  {
    id: 'tl-3',
    period: 'APR 2024 • SEM 5',
    badgeText: 'Podium',
    badgeType: 'podium',
    title: 'Secured SGPA 8.78 • 1st Runner Up in Inter-College Hackathon',
    description: '36-hour hackathon winning project: AI-driven autonomous campus lost-and-found mesh tracker built with 3 batchmates.',
    tags: ['SGPA 8.78', 'HackDTU']
  },
  {
    id: 'tl-4',
    period: 'DEC 2023 • SEM 4',
    badgeText: 'Organizing',
    badgeType: 'organizing',
    title: "Organized TechKriti '23 Workshop for 300+ Freshers",
    description: 'Conducted hands-on sessions on Git, Linux command line, and Docker starter sessions in Pragati Hall Auditorium.',
    tags: ['TechKriti', 'Workshop']
  },
  {
    id: 'tl-5',
    period: 'AUG 2022 • SEM 1',
    badgeText: 'Day 1',
    badgeType: 'day1',
    title: 'Day 1 at DTU — Orientation & Joined Coding Society',
    description: 'Stepped onto Bawana Road campus for central registration. Enrolled in Crio Developers Club as a rookie contributor.',
    tags: ['Orientation', 'DTU Life']
  }
];

export const initialPosts: FeedPost[] = [
  {
    id: 'post-1',
    authorName: 'Dean of Academic Affairs',
    authorRole: 'Administrative Council',
    timeAgo: '2 hours ago',
    isVerified: true,
    isPinned: true,
    category: 'notice',
    title: 'Mid-Semester Examination Schedule & Room Allocations Released',
    content: 'Exams commence from Nov 4th. Hall tickets available on the university student portal. Ensure minimum 75% attendance criteria is met before reporting to examination halls.',
    attachmentName: 'MidSem_Exam_Schedule_Nov2024.pdf',
    attachmentSize: '340 KB',
    likes: 312,
    comments: 48,
    shares: 89,
    tags: ['Official Notice', 'Exams']
  },
  {
    id: 'post-2',
    authorName: 'ACM Student Chapter • Coding Club',
    authorRole: 'Technical Society',
    timeAgo: '4 hours ago',
    isVerified: true,
    isPinned: false,
    category: 'coding',
    title: 'HackCampus 2024 Registrations Open!',
    content: 'Registrations for HackCampus 2024 are now live! 36-hour hackathon with cash prizes of ₹50,000 sponsored by tech partners. Themes include AI in Education, Fintech, and Smart Campus. 🚀 Nov 16-17 • Campus Auditorium • Free Entry • Open to all branches.',
    likes: 142,
    comments: 28,
    shares: 45,
    tags: ['Hackathon', 'Coding Club']
  },
  {
    id: 'post-3',
    authorName: 'Priya Nair',
    authorRole: '3rd Year CS-B',
    timeAgo: '5 hours ago',
    category: 'doubt',
    title: 'Peer Doubt: DBMS Previous Year Papers',
    content: "Does anyone have previous year solved question papers for Prof. Roy's DBMS mid-term? Willing to share OS concurrency handwritten notes in return! 📝",
    attachmentName: 'OS_Concurrency_Notes_Unit3.pdf',
    attachmentSize: '1.8 MB',
    likes: 24,
    comments: 12,
    shares: 7,
    tags: ['DBMS', 'Assignments', 'Peer Doubt']
  }
];
