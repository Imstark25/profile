/* ─── Personal Info ──────────────────────────────── */
export const personal = {
  name:     "Subash Chandra Bose A",
  tagline:  "Salesforce Administrator · AWS Cloud Engineer · Flutter Developer",
  headline: "Building CRM solutions, cloud infrastructure, and cross-platform apps",
  bio:      "MCA graduate with hands-on experience in Salesforce CRM administration, AWS cloud architecture, and Flutter mobile development. Certified AWS Solutions Architect with a track record of building end-to-end systems — from Salesforce Flow automation to containerized CI/CD pipelines and production Flutter apps.",
  email:    "subash.a2502@gmail.com",
  phone:    "9944082553",
  location: "Chennai, India",
  github:   "https://github.com/Imstark25",
  linkedin: "https://linkedin.com/in/subash-chandra-bose-a-177284301",
  summary:
    "MCA graduate specializing in Salesforce CRM, AWS Cloud, and Flutter development. AWS Certified Solutions Architect with internship experience at Coreverse Technologies. Skilled in building scalable CRM systems, automated CI/CD pipelines, and cross-platform mobile applications.",
  roles: [
    "Salesforce Administrator",
    "AWS Cloud Engineer",
    "Flutter Developer",
    "MCA Graduate 2025",
  ],
};

/* ─── Stats ──────────────────────────────────────── */
export const stats = [
  { value: "4",    label: "Certifications" },
  { value: "3+",   label: "Featured Projects" },
  { value: "1",    label: "Internship" },
  { value: "MCA",  label: "Graduate 2025" },
];

/* ─── Skill Categories ───────────────────────────── */
export const skillCategories = [
  {
    label:  "Salesforce",
    color:  "#00A1E0",
    glow:   "rgba(0,161,224,0.10)",
    border: "rgba(0,161,224,0.20)",
    icon:   "☁️",
    description: "CRM platform administration & automation",
    skills: [
      { name: "Salesforce CRM",               level: 80 },
      { name: "Custom Objects & Fields",       level: 78 },
      { name: "Reports & Dashboards",          level: 82 },
      { name: "Validation Rules",              level: 76 },
      { name: "Flow Builder",                  level: 74 },
      { name: "Profiles & Permission Sets",    level: 72 },
    ],
  },
  {
    label:  "Cloud & DevOps",
    color:  "#FF9900",
    glow:   "rgba(255,153,0,0.10)",
    border: "rgba(255,153,0,0.20)",
    icon:   "⚡",
    description: "AWS certified cloud & container orchestration",
    skills: [
      { name: "AWS (EC2, S3, IAM, Lambda)",   level: 82 },
      { name: "Docker & Docker Compose",       level: 75 },
      { name: "Kubernetes",                    level: 62 },
      { name: "Terraform (IaC)",               level: 68 },
      { name: "GitHub Actions (CI/CD)",        level: 76 },
      { name: "Prometheus & Grafana",          level: 58 },
    ],
  },
  {
    label:  "Development",
    color:  "#54C5F8",
    glow:   "rgba(84,197,248,0.10)",
    border: "rgba(84,197,248,0.20)",
    icon:   "📱",
    description: "Cross-platform apps, scripting & databases",
    skills: [
      { name: "Flutter & Dart",               level: 80 },
      { name: "Firebase",                      level: 74 },
      { name: "Python",                        level: 70 },
      { name: "SQL",                           level: 72 },
      { name: "REST APIs",                     level: 68 },
      { name: "Git & GitHub",                  level: 82 },
    ],
  },
];

/* ─── Legacy alias for components that use coreSkills ── */
export const coreSkills = skillCategories.flatMap(c =>
  c.skills.map(s => ({ ...s, icon: c.icon, label: c.label, subTools: '' }))
);

/* ─── Full Stack Grid ────────────────────────────── */
export const stackGroups = [
  {
    title: "Salesforce",
    tools: ["Salesforce CRM", "Flow Builder", "Custom Objects", "Reports", "Dashboards", "Validation Rules", "Permission Sets"],
  },
  {
    title: "Cloud & DevOps",
    tools: ["AWS EC2", "AWS S3", "AWS IAM", "AWS Lambda", "Docker", "Kubernetes", "Terraform", "GitHub Actions"],
  },
  {
    title: "Development",
    tools: ["Flutter", "Dart", "Firebase", "Python", "SQL", "REST APIs"],
  },
  {
    title: "Tools",
    tools: ["VS Code", "Postman", "Git", "Linux", "Prometheus", "Grafana"],
  },
];

/* ─── Certifications ─────────────────────────────── */
export const certifications = [
  {
    name:     "AWS Certified Solutions Architect – Associate",
    issuer:   "Amazon Web Services",
    year:     "2024",
    link:     "https://aws.amazon.com/certification/certified-solutions-architect-associate/",
    color:    "#FF9900",
    glow:     "rgba(255,153,0,0.15)",
    border:   "rgba(255,153,0,0.25)",
    badge:    "AWS",
    featured: true,
  },
  {
    name:     "Databricks Generative AI Fundamentals",
    issuer:   "Databricks",
    year:     "2024",
    link:     "https://www.databricks.com/learn/certification/generative-ai-fundamentals",
    color:    "#FF3621",
    glow:     "rgba(255,54,33,0.12)",
    border:   "rgba(255,54,33,0.22)",
    badge:    "DB",
    featured: false,
  },
  {
    name:     "AWS Educate – Cloud 101",
    issuer:   "Amazon Web Services",
    year:     "2023",
    link:     "https://aws.amazon.com/education/awseducate/",
    color:    "#FF9900",
    glow:     "rgba(255,153,0,0.12)",
    border:   "rgba(255,153,0,0.22)",
    badge:    "AWS",
    featured: false,
  },
  {
    name:     "Anthropic Claude – Code in Action",
    issuer:   "Anthropic",
    year:     "2025",
    link:     "https://www.anthropic.com/",
    color:    "#CC785C",
    glow:     "rgba(204,120,92,0.12)",
    border:   "rgba(204,120,92,0.22)",
    badge:    "AI",
    featured: false,
  },
];

/* ─── Experience ─────────────────────────────────── */
export const experiences = [
  {
    title:       "Cloud & Flutter Developer Intern",
    company:     "Coreverse Technologies Pvt Ltd",
    date:        "2024 – 2025",
    type:        "internship",
    description: "Worked as a Cloud & Flutter Developer intern, contributing to AWS infrastructure setup and Flutter mobile application development. Gained hands-on experience with cloud deployments, CI/CD pipelines, and cross-platform mobile apps in a professional setting.",
    tech:        ["Flutter", "Dart", "AWS", "Firebase", "Docker", "Git"],
  },
  {
    title:       "Salesforce CRM – Final Year Project",
    company:     "Kongu Engineering College (MCA)",
    date:        "2024 – 2025",
    type:        "project",
    description: "Built a Student Admission Management System on Salesforce CRM as the final year MCA project. Implemented custom objects, automation flows, reports, dashboards, and role-based access using Profiles and Permission Sets.",
    tech:        ["Salesforce CRM", "Flow Builder", "Custom Objects", "Reports", "Dashboards"],
  },
  {
    title:       "1st Place – AWS Cloud Quest Challenge",
    company:     "Department Hackathon, Kongu Engineering College",
    date:        "2024",
    type:        "achievement",
    description: "Won the department-level AWS Cloud Quest competition, demonstrating strong AWS fundamentals including EC2, S3, IAM, and Lambda. Competed against final-year peers in a timed cloud architecture challenge.",
    tech:        ["AWS EC2", "AWS S3", "AWS IAM", "AWS Lambda"],
  },
  {
    title:       "Self-Learning – Certifications & Projects",
    company:     "Personal Development",
    date:        "2023 – Present",
    type:        "learning",
    description: "Continuously upskilling through AWS certifications, Databricks GenAI, and Claude AI courses. Building real-world projects spanning Salesforce CRM, containerized DevOps pipelines, and Terraform infrastructure automation.",
    tech:        ["AWS", "Salesforce", "Terraform", "Docker", "Flutter"],
  },
];

/* ─── Projects ───────────────────────────────────── */
export const projects = [
  {
    title:       "Student Admission Management System",
    year:        "2025",
    description: "A full-featured Salesforce CRM solution for managing student admissions end-to-end — from inquiry to enrollment. Built custom objects, automated approval workflows using Flow Builder, and created executive dashboards for real-time insights.",
    bullets: [
      "Designed custom Salesforce objects for Student, Application, and Enrollment records",
      "Built automated admission Flow with approval stages, email alerts, and validation rules",
      "Created role-based access with Profiles, Permission Sets, and Record-Level Security",
      "Developed 10+ real-time reports and executive dashboards for admin oversight",
    ],
    tech:        ["Salesforce CRM", "Flow Builder", "Custom Objects", "Reports", "Dashboards", "Validation Rules"],
    link:        "https://github.com/Imstark25",
    demo:        "",
    featured:    true,
    color:       "#00A1E0",
  },
  {
    title:       "CI/CD Pipeline with Monitoring for Logistics Platform",
    year:        "2025",
    description: "End-to-end DevOps pipeline for a logistics platform — containerized with Docker, orchestrated on Kubernetes, with full observability via Prometheus and Grafana dashboards monitoring system health in real time.",
    bullets: [
      "Containerized the logistics API with Docker and orchestrated via Kubernetes (K8s)",
      "Built GitHub Actions CI/CD pipeline: test → build → push → deploy stages",
      "Set up Prometheus scraping + Grafana dashboards for CPU, memory, and latency metrics",
      "Configured auto-scaling and health checks for zero-downtime deployments",
    ],
    tech:        ["AWS", "Docker", "Kubernetes", "GitHub Actions", "Prometheus", "Grafana"],
    link:        "https://github.com/Imstark25",
    demo:        "",
    featured:    true,
    color:       "#FF9900",
  },
  {
    title:       "Automated CI/CD Infrastructure Deployment",
    year:        "2024",
    description: "Infrastructure-as-Code project using Terraform to provision full AWS environments — VPC, EC2, S3, IAM — with GitHub Actions automating plan, validate, and apply stages on every push to main.",
    bullets: [
      "Wrote modular Terraform configs for VPC, EC2 instances, S3 buckets, and IAM roles",
      "GitHub Actions workflow: terraform fmt → validate → plan → apply on merge to main",
      "State management using AWS S3 backend with DynamoDB locking for team safety",
      "Reduced environment setup time from hours to under 8 minutes end-to-end",
    ],
    tech:        ["Terraform", "AWS", "GitHub Actions", "S3 Backend", "IAM", "EC2"],
    link:        "https://github.com/Imstark25",
    demo:        "",
    featured:    true,
    color:       "#54C5F8",
  },
];

/* ─── Achievements ────────────────────────────────── */
export const achievements = [
  {
    title: "1st Place — AWS Cloud Quest Challenge",
    desc:  "Won department-level AWS Cloud Quest at Kongu Engineering College, demonstrating strong cloud fundamentals.",
    icon:  "🏆",
  },
];

/* ─── Tech Tag Cloud ────────────────────────────── */
export const techBadges = [
  "Salesforce", "AWS", "Flutter", "Docker", "Terraform",
  "Kubernetes", "GitHub Actions", "Python", "SQL", "Firebase",
];
