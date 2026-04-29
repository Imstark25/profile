/* ─── Personal Info ──────────────────────────────── */
export const personal = {
  name:     "Subash Chandra Bose A",
  tagline:  "DevOps Engineer | AWS Certified | Flutter Developer",
  roles:    [
    "DevOps Engineer",
    "AWS Certified Engineer",
    "Flutter Developer",
    "Cloud Infrastructure Builder",
    "CI/CD Pipeline Architect",
  ],
  email:    "subash.a2502@gmail.com",
  phone:    "9944082553",
  location: "Tamil Nadu, India",
  github:   "https://github.com/Imstark25",
  linkedin: "https://linkedin.com/in/subash-chandra-bose-a-177284301",
  summary:
    "AWS Certified Cloud Engineer with hands-on experience building CI/CD pipelines and deploying scalable cloud-native applications using AWS, Docker, and Kubernetes. Skilled in infrastructure automation, containerized deployments, and monitoring distributed systems with Prometheus and Grafana. Experienced in DevOps best practices including Infrastructure as Code and automated deployment pipelines.",
};

/* ─── Projects ───────────────────────────────────── */
export const projects = [
  {
    title:       "Cloud-Native E-Commerce CI/CD Pipeline with AWS ECS",
    year:        "2025",
    description:
      "Built a CI/CD pipeline to deploy containerized microservices on AWS ECS Fargate. Configured blue-green deployments for zero downtime and integrated monitoring dashboards using Prometheus and Grafana. Implemented auto-scaling with CloudWatch metrics and integrated logging & alerting mechanisms.",
    tech:        ["AWS ECS", "Docker", "GitHub Actions", "AWS CodePipeline", "Prometheus", "Grafana", "Fargate"],
    link:        "https://github.com/Imstark25",
    demo:        "",
    featured:    true,
  },
  {
    title:       "CI/CD Pipeline with Monitoring for Logistics Platform",
    year:        "2025",
    description:
      "Designed automated CI/CD pipelines for logistics tracking services. Containerized applications using Docker and deployed them on Kubernetes (EKS). Implemented system monitoring & alerting using Prometheus and configured Kubernetes rolling updates for high availability deployments.",
    tech:        ["AWS", "Docker", "Kubernetes (EKS)", "Jenkins", "GitHub Actions", "Prometheus", "Grafana"],
    link:        "https://github.com/Imstark25",
    demo:        "",
    featured:    true,
  },
  {
    title:       "Automated CI/CD Infrastructure Deployment",
    year:        "2026",
    description:
      "Built an end-to-end CI/CD pipeline for automated application deployment. Provisioned AWS infrastructure using Terraform Infrastructure as Code, deployed Dockerized applications on Kubernetes clusters, and configured GitHub Actions workflows for automated builds, tests, and deployments.",
    tech:        ["AWS", "Terraform", "Docker", "Kubernetes", "GitHub Actions"],
    link:        "https://github.com/Imstark25",
    demo:        "",
    featured:    true,
  },
];

/* ─── Experience & Education ─────────────────────── */
export const experiences = [
  {
    type:        "work",
    title:       "Cloud & Flutter Developer Intern",
    company:     "Coreverse Technologies Pvt Ltd",
    date:        "Sep 2025 – Feb 2026",
    bullets: [
      "Developed cross-platform mobile applications using Flutter and Dart.",
      "Implemented scalable architecture using GetX state management and MVC design pattern.",
      "Integrated Firebase services including Firestore and Authentication.",
      "Assisted with cloud deployment workflows and monitored application logs.",
      "Managed cloud infrastructure resources and monitored system performance.",
    ],
  },
  {
    type:        "education",
    title:       "MCA — Computer Applications",
    company:     "Kongu Engineering College, Tamil Nadu",
    date:        "2024 – 2026",
    bullets: [
      "Specializing in advanced computer applications and software engineering.",
      "Engaging in cloud computing, DevOps, and distributed systems coursework.",
    ],
  },
  {
    type:        "education",
    title:       "B.Sc — Computer Science",
    company:     "Mahendra College of Arts and Science, Tamil Nadu",
    date:        "2020 – 2023",
    bullets: [
      "Graduated with a strong foundation in computer science principles.",
      "Built foundational skills in programming, system architecture and algorithms.",
    ],
  },
];

/* ─── Skills ─────────────────────────────────────── */
export const skillGroups = [
  {
    category: "Cloud & Infrastructure",
    icon:     "☁️",
    color:    "#3b82f6",
    skills: [
      { name: "AWS (EC2, S3, Lambda, ECS, EKS)", level: 90 },
      { name: "Cloud Architecture",              level: 88 },
      { name: "Terraform & IaC",                 level: 85 },
      { name: "Docker & Kubernetes",             level: 88 },
    ],
  },
  {
    category: "CI/CD & Automation",
    icon:     "⚙️",
    color:    "#8b5cf6",
    skills: [
      { name: "GitHub Actions",        level: 92 },
      { name: "AWS CodePipeline",      level: 85 },
      { name: "Jenkins",               level: 80 },
      { name: "Shell Scripting",       level: 85 },
    ],
  },
  {
    category: "Monitoring & Databases",
    icon:     "📊",
    color:    "#06b6d4",
    skills: [
      { name: "Prometheus & Grafana",  level: 83 },
      { name: "CloudWatch",            level: 85 },
      { name: "SQL & MongoDB",         level: 78 },
      { name: "Firebase Firestore",    level: 82 },
    ],
  },
  {
    category: "Development",
    icon:     "💻",
    color:    "#10b981",
    skills: [
      { name: "Python",                level: 85 },
      { name: "Dart & Flutter",        level: 80 },
      { name: "REST APIs",             level: 85 },
      { name: "System Design",         level: 80 },
    ],
  },
];

/* ─── Certifications ─────────────────────────────── */
export const certifications = [
  {
    name:   "AWS Certified Solutions Architect – Associate",
    issuer: "Amazon Web Services",
    link:   "https://aws.amazon.com/certification/",
    color:  "#FF9900",
  },
  {
    name:   "Databricks Generative AI Fundamentals",
    issuer: "Databricks",
    link:   "https://www.databricks.com/learn/certification",
    color:  "#FF3621",
  },
  {
    name:   "AWS Educate – Cloud 101 & Storage Fundamentals",
    issuer: "Amazon Web Services",
    link:   "https://aws.amazon.com/education/awseducate/",
    color:  "#FF9900",
  },
];

/* ─── Achievements ────────────────────────────────── */
export const achievements = [
  {
    title: "1st Place – AWS Cloud Quest Challenge",
    desc:  "Secured 1st position in department-level AWS Cloud Quest competition at Kongu Engineering College, demonstrating strong cloud fundamentals and problem-solving skills.",
    icon:  "🏆",
  },
];

/* ─── Tech Tag Cloud (for hero) ─────────────────── */
export const techBadges = [
  "AWS", "Docker", "Kubernetes", "Terraform", "GitHub Actions",
  "Prometheus", "Grafana", "Flutter", "Dart", "Python",
  "CI/CD", "CloudWatch", "Firebase",
];
