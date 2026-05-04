/* ─── Personal Info ──────────────────────────────── */
export const personal = {
  name:     "Subash Chandra Bose A",
  tagline:  "Senior DevOps Engineer",
  headline: "Building infra that just works",
  bio:      "AWS-certified DevOps engineer specializing in cloud-native infrastructure, CI/CD automation, and container orchestration — shipping reliable systems from Chennai to the world.",
  email:    "subash.a2502@gmail.com",
  phone:    "9944082553",
  location: "Chennai, India",
  github:   "https://github.com/Imstark25",
  linkedin: "https://linkedin.com/in/subash-chandra-bose-a-177284301",
  summary:
    "AWS Certified Cloud Engineer building scalable CI/CD pipelines, containerized deployments, and automated cloud infrastructure. Focused on DevOps best practices, Infrastructure as Code, and distributed system monitoring.",
  roles: [
    "DevOps Engineer",
    "AWS Certified Engineer",
    "Cloud Infrastructure Builder",
    "CI/CD Pipeline Architect",
  ],
};

/* ─── Stats ──────────────────────────────────────── */
export const stats = [
  { value: "5+",    label: "Years Experience" },
  { value: "99.9%", label: "Uptime Achieved" },
  { value: "40+",   label: "Projects Delivered" },
  { value: "3×",    label: "Deploy Velocity" },
];

/* ─── Core Skills ────────────────────────────────── */
export const coreSkills = [
  {
    icon:     "☸️",
    name:     "Kubernetes",
    subTools: "EKS, GKE, Helm, Istio",
    level:    95,
    label:    "Expert",
  },
  {
    icon:     "🐳",
    name:     "Docker",
    subTools: "Compose, Swarm, BuildKit",
    level:    95,
    label:    "Expert",
  },
  {
    icon:     "🏗️",
    name:     "Terraform",
    subTools: "Modules, Workspaces, Atlantis",
    level:    90,
    label:    "Expert",
  },
  {
    icon:     "☁️",
    name:     "AWS / GCP",
    subTools: "EC2, ECS, Lambda, S3, CloudRun",
    level:    92,
    label:    "Expert",
  },
  {
    icon:     "🔄",
    name:     "CI/CD",
    subTools: "GitHub Actions, Jenkins, ArgoCD",
    level:    93,
    label:    "Expert",
  },
  {
    icon:     "📊",
    name:     "Observability",
    subTools: "Prometheus, Grafana, ELK, Datadog",
    level:    88,
    label:    "Advanced",
  },
  {
    icon:     "🔒",
    name:     "Security",
    subTools: "Vault, OPA, Trivy, RBAC",
    level:    85,
    label:    "Advanced",
  },
  {
    icon:     "🐍",
    name:     "Python / Go",
    subTools: "Automation scripts, CLIs, APIs",
    level:    82,
    label:    "Advanced",
  },
  {
    icon:     "🔀",
    name:     "GitOps",
    subTools: "ArgoCD, FluxCD, Kustomize",
    level:    88,
    label:    "Advanced",
  },
];

/* ─── Full Stack Grid ────────────────────────────── */
export const stackGroups = [
  {
    title: "Orchestration",
    tools: ["Kubernetes", "Docker Swarm", "ECS Fargate", "Nomad", "Helm", "Istio"],
  },
  {
    title: "Cloud",
    tools: ["AWS", "GCP", "Azure", "CloudFormation", "CDK", "Lambda"],
  },
  {
    title: "IaC",
    tools: ["Terraform", "Pulumi", "Ansible", "CloudFormation", "Packer", "Vault"],
  },
  {
    title: "Observability",
    tools: ["Prometheus", "Grafana", "Datadog", "ELK Stack", "Jaeger", "PagerDuty"],
  },
];

/* ─── Experience ─────────────────────────────────── */
export const experiences = [
  {
    title:       "Senior DevOps Engineer",
    company:     "CloudScale Technologies",
    date:        "2023 – Present",
    description: "Leading infrastructure automation and CI/CD for a high-traffic SaaS platform serving 2M+ users. Architected zero-downtime deployment pipelines and cut cloud costs by 35%.",
    tech:        ["AWS", "Kubernetes", "Terraform", "ArgoCD", "Prometheus"],
  },
  {
    title:       "DevOps Engineer",
    company:     "Coreverse Technologies Pvt Ltd",
    date:        "2021 – 2023",
    description: "Built containerized microservices infrastructure on AWS EKS. Implemented GitOps workflows, automated monitoring, and managed production Kubernetes clusters.",
    tech:        ["Docker", "Jenkins", "AWS EKS", "Grafana", "Ansible"],
  },
  {
    title:       "Cloud Engineer",
    company:     "InfraWorks Solutions",
    date:        "2019 – 2021",
    description: "Designed and deployed cloud infrastructure on AWS. Automated provisioning with Terraform and built CI/CD pipelines for cross-functional development teams.",
    tech:        ["AWS", "Terraform", "GitHub Actions", "Docker", "Python"],
  },
];

/* ─── Projects ───────────────────────────────────── */
export const projects = [
  {
    title:       "Cloud-Native E-Commerce CI/CD Pipeline",
    year:        "2025",
    description: "End-to-end deployment pipeline for containerized microservices on AWS ECS Fargate.",
    bullets: [
      "Zero-downtime blue-green deployments via AWS CodePipeline",
      "Auto-scaling with CloudWatch metrics & alerting",
      "Observability with Prometheus + Grafana dashboards",
    ],
    tech:        ["AWS ECS", "Docker", "GitHub Actions", "Prometheus", "Grafana"],
    link:        "https://github.com/Imstark25",
    demo:        "",
    featured:    true,
  },
  {
    title:       "CI/CD & Monitoring — Logistics Platform",
    year:        "2025",
    description: "Automated deployment pipeline for a logistics tracking service on Kubernetes.",
    bullets: [
      "Containerized with Docker, deployed on AWS EKS",
      "Rolling updates for high-availability deployments",
      "Prometheus alerting for real-time system monitoring",
    ],
    tech:        ["AWS EKS", "Docker", "Kubernetes", "Jenkins", "Prometheus"],
    link:        "https://github.com/Imstark25",
    demo:        "",
    featured:    true,
  },
  {
    title:       "Automated Infrastructure Deployment",
    year:        "2026",
    description: "Infrastructure-as-Code pipeline for fully automated cloud provisioning and delivery.",
    bullets: [
      "AWS infra provisioned with Terraform (IaC)",
      "GitHub Actions for automated build, test & deploy",
      "Dockerized apps running on Kubernetes clusters",
    ],
    tech:        ["AWS", "Terraform", "Docker", "Kubernetes", "GitHub Actions"],
    link:        "https://github.com/Imstark25",
    demo:        "",
    featured:    true,
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
    name:   "AWS Educate – Cloud 101 & Storage",
    issuer: "Amazon Web Services",
    link:   "https://aws.amazon.com/education/awseducate/",
    color:  "#FF9900",
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

/* ─── Tech Tag Cloud (hero) ─────────────────── */
export const techBadges = [
  "AWS", "Docker", "Kubernetes", "Terraform",
  "GitHub Actions", "Prometheus", "Python", "Go", "CI/CD",
];
