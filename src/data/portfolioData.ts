export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  role: string;
  highlights: string[];
  imageUrl: string;
  liveUrl?: string;
  githubUrl?: string;
}

export interface Experience {
  position: string;
  company: string;
  location: string;
  period: string;
  highlights: string[];
}

export interface Education {
  degree: string;
  institution: string;
  location?: string;
  period: string;
  bullets?: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  date?: string;
}

export interface PersonData {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  title: string;
  role: string;
  email: string;
  phone: string;
  linkedin: string;
  github?: string;
  summary: string;
  avatarUrl: string;
  themeAccent: {
    from: string;
    to: string;
    text: string;
    glow: string;
  };
  skills: {
    category: string;
    items: { name: string; proficiency: number }[];
  }[];
  experience: Experience[];
  education: Education[];
  certifications?: Certification[];
  achievements?: string[];
  strengths?: { title: string; description: string }[];
  languages: string[];
}

export const portfolioData: { person1: PersonData; person2: PersonData } = {
  person1: {
    id: "waqas",
    name: "Muhammad Waqas",
    firstName: "Muhammad",
    lastName: "Waqas",
    title: "Senior Software Engineer | Full-Stack MERN Developer | Web3 & Blockchain Specialist",
    role: "Full-Stack & Web3 Architect",
    email: "mw667082@gmail.com",
    phone: "+92 301-6957648",
    linkedin: "linkedin.com/in/muhammadwaqas-ishaq",
    github: "github.com/muhammadwaqas-ishaq",
    summary: "Results-driven Senior Software Engineer with 4+ years of proven expertise in full-stack development, specializing in MERN stack, React Native, and Web3/Blockchain technologies. Demonstrated success in delivering scalable, high-performance applications for global clients across fintech, real estate, and digital asset markets. Highly skilled in architecting modern microservices on AWS and deploying production-grade smart contracts.",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
    themeAccent: {
      from: "from-cyan-400",
      to: "to-emerald-400",
      text: "text-cyan-400",
      glow: "shadow-cyan-500/20",
    },
    skills: [
      {
        category: "Web3 & Blockchain",
        items: [
          { name: "Web3.js / Ethers.js", proficiency: 95 },
          { name: "Smart Contracts (Solidity)", proficiency: 92 },
          { name: "RWA Tokenization", proficiency: 90 },
          { name: "MetaMask / WalletConnect", proficiency: 95 },
          { name: "Polygon / Ethereum Networks", proficiency: 88 }
        ]
      },
      {
        category: "Frontend & Mobile",
        items: [
          { name: "React.js / Next.js", proficiency: 94 },
          { name: "React Native", proficiency: 95 },
          { name: "Expo / Ionic Framework", proficiency: 90 },
          { name: "Tailwind CSS", proficiency: 95 }
        ]
      },
      {
        category: "Backend & Systems",
        items: [
          { name: "Node.js / Express.js", proficiency: 92 },
          { name: "NestJS / GraphQL", proficiency: 85 },
          { name: "PostgreSQL / MongoDB", proficiency: 88 },
          { name: "Socket.io / WebSockets", proficiency: 90 }
        ]
      },
      {
        category: "Cloud & Devops",
        items: [
          { name: "AWS (EC2, S3, Lambda)", proficiency: 85 },
          { name: "Docker / CI/CD", proficiency: 80 },
          { name: "Vercel / Netlify", proficiency: 95 }
        ]
      }
    ],
    experience: [
      {
        position: "Senior Software Engineer",
        company: "SoftSuite Technology",
        location: "Hybrid",
        period: "March 2026 – Present",
        highlights: [
          "Engineered key modules for React Native mobile applications alongside high-performance backend systems built with Node.js, PostgreSQL, and microservices architecture.",
          "Developed and maintained responsive user interfaces across multiple domains, enhancing visual satisfaction and responsiveness.",
          "Collaborated with cross-functional teams to design robust API architectures and database structures, reducing overall development time by 25%.",
          "Implemented security best practices and performance optimization strategies, successfully decreasing page load times by 35%."
        ]
      },
      {
        position: "Senior Software Engineer",
        company: "Bave Holding LLC",
        location: "Remote",
        period: "November 2025 – February 2026",
        highlights: [
          "Architected and deployed scalable mobile and web applications serving over 1,000 students, boosting operational efficiency by 40% through custom automations.",
          "Led full-stack development initiatives utilizing modern tech stacks (React, Next, Nest, Postgres), resulting in 99.9% system uptime.",
          "Customized and automated enterprise workflows using GoHighLevel and Make.com integrations."
        ]
      },
      {
        position: "Full-Stack Software Engineer",
        company: "SmrtBooking",
        location: "Remote",
        period: "August 2024 – September 2025 (DUBAI)",
        highlights: [
          "Led end-to-end development of web and mobile applications using the MERN stack and React Native, increasing user engagement by 30%.",
          "Integrated real-time data streaming (Socket.io) and crypto APIs (Polygon network, Kafka, WebSockets, Facial Recognition) to power trading platforms and smart POS systems.",
          "Deployed and scaled secure applications on AWS and Vercel with automated test coverage."
        ]
      },
      {
        position: "Blockchain & Web3 Developer",
        company: "SoftSuite Technology",
        location: "Hybrid",
        period: "February 2024 – December 2024",
        highlights: [
          "Spearheaded decentralized applications (DApps) for global clients, ensuring 100% smart contract compliance in code audits.",
          "Built secure Real World Asset (RWA) tokenization networks enabling $5M+ in active digital investments with smooth multi-wallet connect.",
          "Developed an enterprise-grade encrypted chat app on blockchain authentication serving 10,000+ active users."
        ]
      },
      {
        position: "Full-Stack Software Developer",
        company: "PrideLogic",
        location: "Remote",
        period: "June 2023 – February 2024",
        highlights: [
          "Deployed employee management software for 100+ members, accelerating operations through customized UI flows.",
          "Integrated RESTful APIs and boosted overall page speed, achieving 50% faster API request-response loops."
        ]
      },
      {
        position: "Software Engineer (Promoted from Intern)",
        company: "Technovez",
        location: "On-Site",
        period: "March 2022 – May 2024",
        highlights: [
          "Promoted from Intern to Software Engineer in 2 months based on exceptional technical proficiency and delivering flagship systems.",
          "Maintained 10+ web and mobile apps using Ionic, Angular, React Native, and MERN stack for global healthcare and real estate clients.",
          "Built custom internal tools with Retool and Git/GitHub actions, pruning deployment times by 30%."
        ]
      }
    ],
    education: [
      {
        degree: "Bachelor of Science in Computer Science (BSCS)",
        institution: "Pakistan Institute of Engineering & Technology (PIET)",
        period: "2018 – 2022"
      }
    ],
    achievements: [
      "Successfully delivered full-stack applications across web and mobile platforms for international clients.",
      "Reduced application development time through implementation of reusable component libraries and optimized workflows.",
      "Architected and implemented scalable microservices solutions ensuring system modularity and long-term maintainability.",
      "Established comprehensive coding standards and best practices across development teams to maintain code quality.",
      "Spearheaded migration of legacy systems to modern technology stacks, enhancing overall performance and reliability.",
      "Led blockchain integration initiatives for traditional business applications, driving innovation and competitive advantage."
    ],
    languages: ["English (Fluent - Professional)", "Urdu (Native)"]
  },
  person2: {
    id: "shakeel",
    name: "Muhammad Shakeel",
    firstName: "Muhammad",
    lastName: "Shakeel",
    title: "MERN Stack Developer | CS Graduate",
    role: "Full-Stack Developer",
    email: "shakeelayaz954@gmail.com",
    phone: "+92 303 2991954",
    linkedin: "linkedin.com/in/muhammad-shakeel-ayaz",
    github: "github.com/shakeelayazjoya",
    summary: "Dedicated MERN Stack Developer and Computer Science Graduate with hands-on experience building, testing, and deploying scalable full-stack web applications. Expert in React.js, Next.js (SSR/SSG), and modern responsive CSS frameworks like Tailwind CSS. Proven ability to optimize API design, integrate robust JWT security, and scale deployments securely on modern cloud architectures.",
    avatarUrl: "/src/assets/images/shakeel_profile_1781991081280.jpg",
    themeAccent: {
      from: "from-violet-500",
      to: "to-amber-500",
      text: "text-violet-400",
      glow: "shadow-violet-500/20",
    },
    skills: [
      {
        category: "Frontend Development",
        items: [
          { name: "React.js", proficiency: 95 },
          { name: "Next.js (SSR/SSG)", proficiency: 90 },
          { name: "JavaScript (ES6+)", proficiency: 94 },
          { name: "Tailwind CSS", proficiency: 96 },
          { name: "HTML5 & CSS3", proficiency: 98 },
          { name: "Bootstrap", proficiency: 85 }
        ]
      },
      {
        category: "Backend & Testing",
        items: [
          { name: "Node.js", proficiency: 90 },
          { name: "Express.js", proficiency: 92 },
          { name: "RESTful APIs", proficiency: 95 },
          { name: "JWT Authentication", proficiency: 93 }
        ]
      },
      {
        category: "Databases & Tools",
        items: [
          { name: "MongoDB", proficiency: 90 },
          { name: "Mongoose ODM", proficiency: 92 },
          { name: "Firebase Auth/Store", proficiency: 85 },
          { name: "VS Code & Postman", proficiency: 95 }
        ]
      },
      {
        category: "Version Control & Agile",
        items: [
          { name: "Git / GitHub", proficiency: 92 },
          { name: "Agile / Scrum Methodologies", proficiency: 90 },
          { name: "Platform Deployment (Vercel/Netlify)", proficiency: 94 }
        ]
      }
    ],
    experience: [
      {
        position: "MERN Stack Developer",
        company: "SoftSuite Technologies",
        location: "Multan, PK",
        period: "December 2024 – Present",
        highlights: [
          "Develop and maintain high-performance, full-stack web applications using MongoDB, Express.js, React.js, and Node.js.",
          "Built and optimized RESTful API systems, boosting data fetching efficiency by 30%.",
          "Integrated secure JWT authentication and middle-layer authorization protocols, reinforcing application data safety.",
          "Administered MongoDB clusters, optimizing schema indexing and query routines to guarantee maximum data integrity.",
          "Deployed major systems on Vercel and Netlify, reducing deployment pipeline downtime by 15%."
        ]
      },
      {
        position: "Frontend Developer",
        company: "Maxcore Technologies",
        location: "Multan, PK",
        period: "October 2023 – October 2024",
        highlights: [
          "Developed responsive, pixel-perfect, and user-friendly interfaces using modern HTML, CSS, Tailwind CSS, JavaScript, and React.",
          "Utilized Git and GitHub for structural version control and seamless agile team collaboration."
        ]
      }
    ],
    education: [
      {
        degree: "Bachelor of Science in Computer Science",
        institution: "University of Education, Lahore — Multan Campus",
        period: "Aug 2021 – May 2025"
      }
    ],
    certifications: [
      {
        name: "Full Stack Development Certification",
        issuer: "AZ Soft & Tech"
      },
      {
        name: "National Freelance Training Program (NFTP) Certification",
        issuer: "Government of Punjab"
      }
    ],
    strengths: [
      {
        title: "Team Collaboration & Leadership",
        description: "Proven history of coordinating team timelines, leading sync sessions, and establishing smooth communication boundaries."
      },
      {
        title: "Dynamic Problem Solving",
        description: "Excellent analytics skills with focus on solving business challenges with robust backend systems."
      },
      {
        title: "Full Project Management",
        description: "Proficient at spearheading complex modules from ideation, database architecture, up to production deployments."
      },
      {
        title: "Aesthetic Design Execution",
        description: "Translating mockups into super responsive, fast, and accessible digital solutions."
      }
    ],
    languages: ["English (Fluent - Professional Workspace)", "Urdu (Native)"]
  }
};

export const sampleProjects: { [key: string]: Project[] } = {
  waqas: [
    {
      id: "rwa-token",
      title: "RWA Real Estate Tokenization Engine",
      description: "A secure, decentralized platform enabling global investments in real world assets (RWA) through fractional smart tokens.",
      longDescription: "Developed as a premier Web3 asset ecosystem, this platform tokenizes physical real estate assets on the Polygon network. Investors buy fractional ownership represented by ERC-20 compliant tokens, with direct Yield distributions automated via smart contracts. Key challenges resolved included secure multi-wallet signatures and strict ledger synchronization.",
      technologies: ["Solidity", "Ethers.js", "Polygon", "Next.js", "PostgreSQL", "Tailwind CSS"],
      role: "Lead Web3 Developer",
      highlights: [
        "Enabled $5M+ in active digital investments via fractional ownership.",
        "Guarded transaction signatures using robust Metamask and Ledger integrations.",
        "Passed rigorous smart contract code audit requirements with 100% compliance."
      ],
      imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: "heroic-minds",
      title: "Heroic Minds (Meditation Mobile App)",
      description: "A premium meditation and stress-relief mobile application using Ionic & React Native for native iOS & Android rendering.",
      longDescription: "A gorgeous mindfulness and audio meditation system that provides structured tracks, soundscapes, and breathing rhythm loops. The app manages offline capabilities and synchronizes active user statistics securely with cloud storage.",
      technologies: ["React Native", "Ionic", "Node.js", "Redux", "MongoDB"],
      role: "Senior Software Engineer",
      highlights: [
        "Constructed smooth 60fps gesture-driven breathing controls.",
        "Synchronized meditation tracks for offline playback with caching.",
        "Improved active user retention rate by 22% through clean interactive interfaces."
      ],
      imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: "pos-smrt",
      title: "SmrtBooking POS & Real-Time Trading Platform",
      description: "Enterprise multi-terminal checkout and point-of-sale platform incorporating WebSocket pipelines and facial verification.",
      longDescription: "Built for automated operations, this platform blends an ultra-responsive POS system with high-frequency WebSocket streams for real-time asset pricing metrics and client-specific checkout rules.",
      technologies: ["React", "ExpressJS", "Socket.io", "Kafka", "PostgreSQL", "AWS"],
      role: "Full-Stack Lead Architect",
      highlights: [
        "Established sub-50ms data streaming using Kafka and Socket.io pipelines.",
        "Integrated high-accuracy third-party Facial Recognition APIs.",
        "Maintained 99.9% uptime throughout major holiday stress events."
      ],
      imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=600"
    }
  ],
  shakeel: [
    {
      id: "eco-mern",
      title: "Zenith E-Commerce Dashboard Suite",
      description: "An advanced, secure modern commerce application featuring full analytics dashboard, stripe payments, and role-based permissions.",
      longDescription: "Zenith represents a full-fledged consumer commerce system equipped with comprehensive management tools. Admins track live inventory levels, inspect transaction charts, manage customer support issues, and handle secure payment handshakes with ease.",
      technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "Redux Toolkit", "JWT Auth"],
      role: "Lead Full-Stack Developer",
      highlights: [
        "Built responsive graphs displaying real-time purchase updates.",
        "Integrated robust double-pass JWT tokens with automated secure cookie rotation.",
        "Reduced administrative page speeds by 30% via lazy-loaded modules."
      ],
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: "cyber-social",
      title: "P2P Crypto-Wallet Manager",
      description: "A fast, responsive online platform designed to check cryptocurrency portfolios, record gas fees, and review ledger audits.",
      longDescription: "An elegant interactive tracker mapping multi-network asset prices. It features beautiful customized charts, responsive tables for quick transaction filters, and secure user auth frameworks utilizing Firestore.",
      technologies: ["Next.js", "Tailwind CSS", "Firebase Auth", "Mongoose", "Recharts"],
      role: "React Specialist",
      highlights: [
        "Constructed fluid Recharts visuals with smooth currency transition parameters.",
        "Programmed responsive layout grids fully compatible down to tiny touch screens.",
        "Spearheaded database optimization prunes that lowered query load times by 20%."
      ],
      imageUrl: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&q=80&w=600"
    }
  ]
};
