import { Project, Skill, TimelineItem, StatItem } from '../types';

export const PERSONAL_INFO = {
  name: 'Amit Keshari',
  title: 'AI/ML Developer • Full-Stack Engineer • Builder',
  headline: 'I design and build intelligent systems combining modern machine learning, RAG pipelines, and resilient full-stack architectures.',
  location: 'India',
  email: 'thanksamitkeshari@gmail.com',
  education: 'Bachelor of Technology in Computer Science & Engineering (Specialization in AI & ML)',
  github: 'https://github.com',
  linkedin: 'https://linkedin.com',
  availability: 'Open to AI/ML & Software Engineering Roles • Freelance Projects',
  
  bio: [
    "Hi, I'm Amit! I'm a Computer Science student specializing in Artificial Intelligence & Machine Learning. I fell in love with coding because of the thrill of turning abstract mathematical ideas and algorithms into software that people actually use.",
    "Most of my recent work focuses on Retrieval-Augmented Generation (RAG) systems, optimizing vector similarity search, and engineering reliable full-stack applications. Whether it's cutting query latency down to milliseconds or building payment automation for real businesses, I care deeply about clean code, system reliability, and intuitive user experiences."
  ],

  engineeringPrinciples: [
    {
      title: 'Real Problems Over Hype',
      desc: 'AI is most powerful when anchored to real user pain points. I focus on grounded, deterministic outcomes rather than surface-level novelties.'
    },
    {
      title: 'End-to-End Ownership',
      desc: 'From training models and designing relational schemas to crafting pixel-perfect interfaces and Docker deployments, I love seeing projects through the entire lifecycle.'
    },
    {
      title: 'Performance & Type Safety',
      desc: 'Strong typing in TypeScript and Python Pydantic, combined with sensible caching (Redis) and index tuning (Postgres/pgvector), saves hours of runtime headaches.'
    },
    {
      title: 'Simplicity & Craft',
      desc: 'The best architecture is the simplest one that solves the problem reliably. Clean modular code always beats unnecessary abstraction.'
    }
  ],

  currentlyExploring: [
    'Benchmarking hybrid sparse-dense RAG retrieval with Reciprocal Rank Fusion (RRF)',
    'Multi-agent orchestration and tool-calling with LLMs',
    'Exploring high-concurrency async patterns in Python FastAPI & Node.js',
    'Reading "Designing Data-Intensive Applications" by Martin Kleppmann'
  ]
};

export const FOCUS_AREAS = [
  {
    title: 'Retrieval-Augmented Generation (RAG)',
    desc: 'Designing production-ready retrieval pipelines with pgvector, semantic chunking, cross-encoder re-ranking, and low-latency cache layers.',
    icon: 'BrainCircuit',
    badge: 'AI Architecture'
  },
  {
    title: 'Machine Learning & Deep Learning',
    desc: 'Building, evaluating, and serving predictive ML classifiers and neural networks with Scikit-Learn, PyTorch, and ONNX Runtime.',
    icon: 'Cpu',
    badge: 'Core ML'
  },
  {
    title: 'Modern Full-Stack Engineering',
    desc: 'Developing responsive, accessible frontend applications in React & TypeScript paired with robust, high-throughput FastAPI backends.',
    icon: 'Layers',
    badge: 'Full-Stack'
  },
  {
    title: 'Cloud & Database Infrastructure',
    desc: 'Structuring normalized relational schemas in PostgreSQL, in-memory caching with Redis, Docker containerization, and cloud hosting.',
    icon: 'Cloud',
    badge: 'Infra & DB'
  },
  {
    title: 'Business Automation & Billing',
    desc: 'Engineering complex domain solutions such as multi-slab GST tax calculators, dynamic QR billing systems, and PDF invoice generation.',
    icon: 'Workflow',
    badge: 'Automation'
  },
  {
    title: 'Entrepreneurship & Product Building',
    desc: 'Talking with users, turning zero-to-one problem statements into viable digital products, and iterating rapidly based on user feedback.',
    icon: 'Sparkles',
    badge: 'Product'
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'nexus-rag',
    title: 'Nexus RAG',
    subtitle: 'High-Throughput Retrieval-Augmented Generation Platform',
    category: 'ai-ml',
    description: 'An enterprise-grade document intelligence system designed for sub-100ms hybrid vector search, source attribution, and zero-hallucination answers.',
    longDescription: 'Nexus RAG solves the hallucination and latency bottleneck when querying large document collections. It implements a multi-stage retrieval pipeline combining dense vector embeddings (OpenAI/Gemini) with BM25 sparse search using Reciprocal Rank Fusion. Retrieved chunks are re-ranked using a cross-encoder model before being passed to the LLM with dynamic context compression.',
    features: [
      'Hybrid dense & sparse semantic retrieval with Reciprocal Rank Fusion (RRF)',
      'Sub-85ms query response time powered by Redis caching & PostgreSQL pgvector IVFFlat indexing',
      'Asynchronous FastAPI pipeline for streaming document chunking (PDF, Markdown, Code)',
      'Cross-encoder re-ranking step ensuring top-k precision and eliminating irrelevant context',
      'Real-time token streaming with precise citation anchors and confidence scores'
    ],
    technologies: ['FastAPI', 'Python', 'PostgreSQL', 'pgvector', 'Redis', 'LangChain', 'React', 'TypeScript', 'Docker'],
    architecture: {
      frontend: 'React 18 + TypeScript + Tailwind CSS',
      backend: 'FastAPI (Python async ASGI service)',
      aiModelOrVector: 'Embedding Models + Cross-Encoder Re-ranker + pgvector',
      database: 'PostgreSQL + pgvector + Redis Cache',
      deployment: 'Docker + Render + Neon Serverless'
    },
    metrics: [
      { label: 'Retrieval Latency', value: '<85ms' },
      { label: 'Ingestion Speed', value: '100+ pgs/min' },
      { label: 'Precision Score', value: '98.4%' },
      { label: 'Cache Hit Ratio', value: '42%' }
    ],
    githubUrl: 'https://github.com',
    liveDemoUrl: 'https://demo.nexus-rag.ai',
    featured: true,
    status: 'Production',
    nodePosition: [0, 1.2, 0]
  },
  {
    id: 'hotel-management-system',
    title: 'Hotel Management System',
    subtitle: 'Hospitality Operations Platform with Dynamic QR Billing',
    category: 'fullstack',
    description: 'A modern hotel operations suite with digital checkout, dynamic QR code payments, live room occupancy matrices, and automated guest notifications.',
    longDescription: 'Built to solve long front-desk queues and disjointed guest billing. Each room is equipped with a dynamically updated QR code linked to the guest folio. Guests can order services, view their itemized balance, and perform express checkout directly from their smartphones, while front-desk and housekeeping receive real-time updates via WebSockets.',
    features: [
      'Dynamic QR codes reflecting live itemized room folio balances in real-time',
      'Interactive room availability matrix and reservation timeline planner',
      'Contactless express checkout pipeline with automated digital PDF invoice generation',
      'Housekeeping task dispatch board with synchronized room cleaning status states',
      'Financial reporting dashboard tracking RevPAR, ADR, and occupancy rates'
    ],
    technologies: ['React', 'TypeScript', 'Node.js', 'FastAPI', 'PostgreSQL', 'Redis', 'Tailwind CSS', 'Docker'],
    architecture: {
      frontend: 'React + TypeScript + Tailwind CSS + Lucide Icons',
      backend: 'Node.js / Express & FastAPI microservices',
      database: 'PostgreSQL + Redis (Session and Folio caching)',
      deployment: 'Vercel + Render + Cloud Database'
    },
    metrics: [
      { label: 'Checkout Time', value: '-75%' },
      { label: 'Paperless Rate', value: '100%' },
      { label: 'System Uptime', value: '99.9%' },
      { label: 'Scan-to-Pay', value: '<3s' }
    ],
    githubUrl: 'https://github.com',
    liveDemoUrl: 'https://demo.hotel-system.app',
    featured: true,
    status: 'Live Beta',
    nodePosition: [-1.8, -0.4, 0.5]
  },
  {
    id: 'gst-billing-software',
    title: 'GST Billing Software',
    subtitle: 'Automated Invoicing, Tax Calculations & Ledger Analytics',
    category: 'systems',
    description: 'A business management and accounting application built for GST compliance, automated tax bifurcation, inventory sync, and ledger reporting.',
    longDescription: 'Engineered for small and medium businesses to automate tax math and reduce invoice generation friction. Handles multi-slab GST brackets (0%, 5%, 12%, 18%, 28%), automatic state-based tax bifurcation (CGST+SGST vs IGST), HSN lookup, customer ledgers, and export-ready annual reports with zero rounding error.',
    features: [
      'High-precision tax calculation engine with automatic intra/inter-state tax splitting',
      'Instant vector-styled PDF invoice generation with digital signatures and QR stamps',
      'Real-time inventory deduction with low-stock alerts and SKU management',
      'Customer and supplier ledger records with payment reconciliation tracking',
      'One-click export for GSTR-1 and GSTR-3B compliant Excel and JSON files'
    ],
    technologies: ['React', 'TypeScript', 'FastAPI', 'PostgreSQL', 'Docker', 'Chart.js', 'Tailwind CSS'],
    architecture: {
      frontend: 'React + TypeScript + Tailwind UI + Data Tables',
      backend: 'FastAPI (Python) + Exact Decimal Arithmetic Engine',
      database: 'PostgreSQL (ACID-compliant relational ledger)',
      deployment: 'Docker + Azure Cloud Container'
    },
    metrics: [
      { label: 'Invoice Render', value: '<180ms' },
      { label: 'Tax Accuracy', value: '100.00%' },
      { label: 'Monthly Records', value: '10,000+' },
      { label: 'Time Saved', value: '80%' }
    ],
    githubUrl: 'https://github.com',
    liveDemoUrl: 'https://demo.gst-billing.app',
    featured: true,
    status: 'Production',
    nodePosition: [1.8, -0.4, 0.5]
  },
  {
    id: 'disease-prediction-application',
    title: 'Disease Prediction Application',
    subtitle: 'Clinical Risk Assessment Assistant using Ensemble ML',
    category: 'ai-ml',
    description: 'An AI-powered web platform for early health risk evaluation using trained ensemble machine learning models, symptom analyzers, and diagnostic insights.',
    longDescription: 'Trained on validated clinical datasets, this diagnostic assistant utilizes an ensemble of Random Forest, XGBoost, and Support Vector Classifiers to predict early risk indicators for cardiovascular, diabetes, and respiratory conditions. Includes SHAP value visual explainability so clinicians and users understand why a specific prediction was generated.',
    features: [
      'Ensemble ML pipeline achieving high diagnostic recall and precision on clinical metrics',
      'SHAP value feature importance explainers for transparent risk reasoning',
      'Interactive health assessment forms with intelligent biometric validation',
      'Automated preventative guidance and dietary recommendations synthesis',
      'Sub-50ms inference API served via FastAPI and ONNX Runtime'
    ],
    technologies: ['Python', 'Scikit-Learn', 'FastAPI', 'React', 'TypeScript', 'NumPy', 'Pandas', 'Tailwind CSS'],
    architecture: {
      frontend: 'React + TypeScript + Interactive Biometric Form',
      backend: 'FastAPI + ONNX Runtime ML Serving',
      aiModelOrVector: 'Ensemble Random Forest + XGBoost + SHAP Explainers',
      database: 'PostgreSQL (Anonymized telemetry)',
      deployment: 'Render + Cloud Python Container'
    },
    metrics: [
      { label: 'Model Accuracy', value: '96.2%' },
      { label: 'Inference Time', value: '38ms' },
      { label: 'Conditions', value: '12+' },
      { label: 'ROC-AUC Score', value: '0.97' }
    ],
    githubUrl: 'https://github.com',
    liveDemoUrl: 'https://demo.ai-disease-predictor.app',
    featured: true,
    status: 'Completed',
    nodePosition: [0, -1.5, -0.6]
  }
];

export const SKILLS: Skill[] = [
  // AI / ML
  {
    name: 'Python',
    category: 'ai-ml',
    level: 95,
    proficiency: 'Mastery',
    icon: 'Code2',
    description: 'My primary language for ML pipelines, async backend services, and data manipulation.',
    relatedProjects: ['Nexus RAG', 'Disease Prediction Application', 'GST Billing Software'],
    tags: ['AsyncIO', 'NumPy', 'Pandas', 'Pydantic']
  },
  {
    name: 'Machine Learning',
    category: 'ai-ml',
    level: 90,
    proficiency: 'Mastery',
    icon: 'Brain',
    description: 'Feature engineering, model selection, ensemble methods (XGBoost, Random Forest), and metrics evaluation.',
    relatedProjects: ['Disease Prediction Application'],
    tags: ['Scikit-Learn', 'SHAP', 'Cross-Validation']
  },
  {
    name: 'Deep Learning',
    category: 'ai-ml',
    level: 85,
    proficiency: 'Advanced',
    icon: 'Cpu',
    description: 'Neural networks, backpropagation fundamentals, CNNs, and sequence processing models.',
    relatedProjects: ['Disease Prediction Application', 'Nexus RAG'],
    tags: ['PyTorch', 'TensorFlow', 'ANNs']
  },
  {
    name: 'Generative AI & LLMs',
    category: 'ai-ml',
    level: 92,
    proficiency: 'Mastery',
    icon: 'Sparkles',
    description: 'Orchestrating LLM applications, structured JSON outputs, function/tool calling, and evaluation loops.',
    relatedProjects: ['Nexus RAG'],
    tags: ['Gemini API', 'OpenAI', 'Tool Calling', 'Agents']
  },
  {
    name: 'RAG Systems',
    category: 'ai-ml',
    level: 94,
    proficiency: 'Mastery',
    icon: 'FileSearch',
    description: 'Multi-stage retrieval, semantic chunking strategies, cross-encoder re-ranking, and context compression.',
    relatedProjects: ['Nexus RAG'],
    tags: ['Chunking', 'Re-ranking', 'Context Windows', 'Hybrid Search']
  },
  {
    name: 'Embeddings & Vector Search',
    category: 'ai-ml',
    level: 90,
    proficiency: 'Mastery',
    icon: 'Network',
    description: 'High-dimensional vector spaces, distance metrics (Cosine, Euclidean, Dot Product), and ANN indexing.',
    relatedProjects: ['Nexus RAG'],
    tags: ['pgvector', 'Dense Vectors', 'Cosine Similarity', 'BM25']
  },

  // Development
  {
    name: 'React',
    category: 'development',
    level: 92,
    proficiency: 'Mastery',
    icon: 'Atom',
    description: 'Building clean, modular component hierarchies with custom hooks, performant state, and smooth animations.',
    relatedProjects: ['Nexus RAG', 'Hotel Management System', 'GST Billing Software'],
    tags: ['React 18/19', 'Custom Hooks', 'Virtual DOM', 'Performance']
  },
  {
    name: 'TypeScript',
    category: 'development',
    level: 90,
    proficiency: 'Mastery',
    icon: 'FileCode',
    description: 'Strict type safety, generics, interfaces, and end-to-end type contracts between frontend and API.',
    relatedProjects: ['Nexus RAG', 'Hotel Management System', 'GST Billing Software'],
    tags: ['Strict Mode', 'Generics', 'Type Guards']
  },
  {
    name: 'FastAPI',
    category: 'development',
    level: 93,
    proficiency: 'Mastery',
    icon: 'Zap',
    description: 'High-throughput async Python services with automated OpenAPI docs, Pydantic validation, and dependency injection.',
    relatedProjects: ['Nexus RAG', 'Hotel Management System', 'Disease Prediction Application'],
    tags: ['Async/Await', 'Pydantic V2', 'OpenAPI', 'Dependencies']
  },
  {
    name: 'JavaScript (ES6+)',
    category: 'development',
    level: 94,
    proficiency: 'Mastery',
    icon: 'Code',
    description: 'Asynchronous event loop, closures, modern ES features, functional paradigms, and browser APIs.',
    relatedProjects: ['All Projects'],
    tags: ['ESNext', 'Promises', 'Event Loop', 'DOM APIs']
  },
  {
    name: 'REST APIs & WebSockets',
    category: 'development',
    level: 92,
    proficiency: 'Mastery',
    icon: 'Radio',
    description: 'Clean RESTful resource design, stateless authentication (JWT), and WebSockets for real-time state synchronization.',
    relatedProjects: ['Hotel Management System', 'Nexus RAG'],
    tags: ['REST', 'WebSockets', 'JWT', 'CORS']
  },
  {
    name: 'Tailwind CSS',
    category: 'development',
    level: 95,
    proficiency: 'Mastery',
    icon: 'Palette',
    description: 'Crafting responsive, accessible, and bespoke modern user interfaces with design tokens and utility classes.',
    relatedProjects: ['All Projects'],
    tags: ['Tailwind v4', 'Responsive Design', 'Custom Themes']
  },

  // Database / Infrastructure
  {
    name: 'PostgreSQL & pgvector',
    category: 'database-infra',
    level: 90,
    proficiency: 'Mastery',
    icon: 'Database',
    description: 'Relational schema design, ACID transactions, complex joins, and vector similarity search indexing.',
    relatedProjects: ['Nexus RAG', 'Hotel Management System', 'GST Billing Software'],
    tags: ['pgvector', 'ACID', 'Indexing', 'Query Tuning']
  },
  {
    name: 'Redis',
    category: 'database-infra',
    level: 86,
    proficiency: 'Advanced',
    icon: 'Layers',
    description: 'In-memory caching, rate-limiting, session management, and pub/sub messaging.',
    relatedProjects: ['Nexus RAG', 'Hotel Management System'],
    tags: ['Caching', 'Key-Value', 'Rate Limiting', 'TTL']
  },
  {
    name: 'Docker',
    category: 'database-infra',
    level: 88,
    proficiency: 'Advanced',
    icon: 'Container',
    description: 'Multi-stage builds, containerized development environments, and microservice orchestration with Docker Compose.',
    relatedProjects: ['Nexus RAG', 'GST Billing Software'],
    tags: ['Containers', 'Docker Compose', 'Multi-Stage']
  },
  {
    name: 'Git & GitHub',
    category: 'database-infra',
    level: 92,
    proficiency: 'Mastery',
    icon: 'GitBranch',
    description: 'Branching workflows, semantic versioning, pull requests, and automated CI/CD GitHub Actions.',
    relatedProjects: ['All Projects'],
    tags: ['Git Flow', 'CI/CD', 'Code Review']
  },

  // Cloud / AI Infrastructure
  {
    name: 'Azure Cloud',
    category: 'cloud-ai-infra',
    level: 82,
    proficiency: 'Proficient',
    icon: 'CloudLightning',
    description: 'Virtual machines, App Services, Blob storage, and AI service deployments.',
    relatedProjects: ['GST Billing Software'],
    tags: ['App Service', 'Blob Storage', 'Containers']
  },
  {
    name: 'Neon Serverless Postgres',
    category: 'cloud-ai-infra',
    level: 88,
    proficiency: 'Advanced',
    icon: 'Server',
    description: 'Auto-scaling serverless PostgreSQL with instant branching and pgvector support.',
    relatedProjects: ['Nexus RAG', 'Hotel Management System'],
    tags: ['Serverless', 'Branching', 'pgvector']
  },
  {
    name: 'Render & Vercel',
    category: 'cloud-ai-infra',
    level: 92,
    proficiency: 'Mastery',
    icon: 'UploadCloud',
    description: 'Continuous git-push deployment pipelines for full-stack apps, background workers, and edge functions.',
    relatedProjects: ['All Projects'],
    tags: ['Zero-Downtime', 'Edge Functions', 'Custom Domains']
  },
  {
    name: 'Upstash (Serverless Redis)',
    category: 'cloud-ai-infra',
    level: 86,
    proficiency: 'Advanced',
    icon: 'Zap',
    description: 'Low-latency serverless Redis for distributed caching, session storage, and rate limiting.',
    relatedProjects: ['Nexus RAG'],
    tags: ['Serverless Redis', 'Global Edge']
  }
];

export const TIMELINE: TimelineItem[] = [
  {
    id: 'timeline-btech',
    year: '2022 - Present',
    period: 'Undergraduate Degree',
    title: 'B.Tech in Computer Science & Engineering',
    role: 'Specialization in Artificial Intelligence & Machine Learning',
    organization: 'Undergraduate Program',
    category: 'Education',
    description: 'Building deep foundations in Data Structures & Algorithms, Deep Learning, Natural Language Processing, Database Systems, Operating Systems, and Distributed Computing.',
    highlights: [
      'Deep dive into mathematical foundations of Machine Learning (Linear Algebra, Calculus, Probability)',
      'Consistently built hands-on projects alongside coursework to bridge theory and practice',
      'Active participant in collegiate hackathons and peer coding workshops'
    ],
    skills: ['AI/ML', 'Data Structures & Algorithms', 'Python', 'DBMS', 'Mathematics for ML'],
    current: true
  },
  {
    id: 'timeline-rag-ai',
    year: '2023 - 2024',
    period: 'Applied Research & AI Systems',
    title: 'RAG Systems & Vector Search Engineering',
    role: 'AI/ML Systems Builder',
    category: 'AI / ML',
    description: 'Researched and built custom Retrieval-Augmented Generation solutions. Focused on hybrid retrieval, semantic chunking boundaries, and cross-encoder re-ranking to eradicate hallucinations in enterprise document Q&A.',
    highlights: [
      'Built Nexus RAG with sub-85ms hybrid search over multi-format document collections',
      'Experimented with reciprocal rank fusion (RRF) combining dense embeddings with lexical BM25',
      'Deployed high-throughput FastAPI backends serving machine learning and vector indexing pipelines'
    ],
    skills: ['LangChain', 'pgvector', 'FastAPI', 'RAG', 'Transformers', 'Embeddings']
  },
  {
    id: 'timeline-fullstack',
    year: '2023 - Present',
    period: 'Software Engineering',
    title: 'Full-Stack Platforms & Automation Engines',
    role: 'Full-Stack Developer',
    category: 'Engineering',
    description: 'Engineered comprehensive real-world applications including the Hotel Management Platform and GST Billing Automation Suite with scalable relational databases, secure authentication, and polished user experiences.',
    highlights: [
      'Built dynamic QR billing flow reducing hotel front-desk wait times by 75%',
      'Architected multi-tier GST calculation engine with instant PDF invoice rendering and audit exports',
      'Containerized multi-service architectures using Docker with automated deployments'
    ],
    skills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Redis', 'Docker', 'Tailwind CSS']
  },
  {
    id: 'timeline-entrepreneurship',
    year: '2024 - Present',
    period: 'Products & Initiatives',
    title: 'Product Innovation & Entrepreneurial Building',
    role: 'Founder & Solutions Builder',
    category: 'Entrepreneurship',
    description: 'Translating technical knowledge into useful software tools for real users. Working directly with business owners to understand operational friction and building software that saves time and money.',
    highlights: [
      'Delivered custom software systems empowering local business owners to digitize invoices and payments',
      'Contributed open-source repositories and shared learning notes with junior students',
      'Continuously shipping zero-to-one product prototypes in AI-native developer tooling'
    ],
    skills: ['Product Strategy', 'User Interviews', 'System Architecture', 'UI/UX Design']
  }
];

export const STATS: StatItem[] = [
  {
    id: 'stat-ai-projects',
    label: 'AI & ML Projects',
    value: '10',
    suffix: '+',
    subtext: 'RAG pipelines, ML models & neural classifiers built',
    icon: 'Brain',
    highlightColor: 'cyan'
  },
  {
    id: 'stat-tech-mastered',
    label: 'Technologies & Tools',
    value: '20',
    suffix: '+',
    subtext: 'Languages, frameworks, databases & cloud services',
    icon: 'Cpu',
    highlightColor: 'blue'
  },
  {
    id: 'stat-projects-built',
    label: 'Production Apps',
    value: '10',
    suffix: '+',
    subtext: 'Full-stack systems & automation suites shipped',
    icon: 'Layers',
    highlightColor: 'purple'
  },
  {
    id: 'stat-learning',
    label: 'Curiosity & Growth',
    value: '∞',
    suffix: '',
    subtext: 'Reading papers, building prototypes, learning every day',
    icon: 'Sparkles',
    highlightColor: 'emerald'
  }
];
