/* ─── Personal Info ──────────────────────────────── */
export const personal = {
  name:     "Subash Chandra Bose A",
  tagline:  "Aspiring DevOps Engineer",
  headline: "Learning, building, and growing one deployment at a time",
  bio:      "A fresher with a passion for DevOps and cloud technologies. I've been hands-on with AWS, Docker, and CI/CD tools through projects and self-learning — eager to contribute to a real team and grow fast.",
  email:    "subash.a2502@gmail.com",
  phone:    "9944082553",
  location: "Chennai, India",
  github:   "https://github.com/Imstark25",
  linkedin: "https://linkedin.com/in/subash-chandra-bose-a-177284301",
  summary:
    "Fresh graduate with foundational knowledge in DevOps, cloud computing, and containerization. Actively building projects and earning certifications to bridge the gap between learning and production-ready skills.",
  roles: [
    "Aspiring DevOps Engineer",
    "Cloud Enthusiast",
    "AWS Learner",
    "Open Source Explorer",
  ],
};

/* ─── Stats ──────────────────────────────────────── */
export const stats = [
  { value: "3+",   label: "Personal Projects" },
  { value: "2",    label: "AWS Certifications" },
  { value: "1",    label: "Hackathon Win" },
  { value: "100%", label: "Eager to Learn" },
];

/* ─── Core Skills ────────────────────────────────── */
export const coreSkills = [
  {
    icon:     "🐳",
    name:     "Docker",
    subTools: "Containers, Compose, Images",
    level:    65,
    label:    "Learning",
  },
  {
    icon:     "☁️",
    name:     "AWS",
    subTools: "EC2, S3, IAM, Lambda basics",
    level:    60,
    label:    "Learning",
  },
  {
    icon:     "🔄",
    name:     "CI/CD",
    subTools: "GitHub Actions, basic pipelines",
    level:    55,
    label:    "Learning",
  },
  {
    icon:     "🐍",
    name:     "Python",
    subTools: "Scripting, automation basics",
    level:    60,
    label:    "Learning",
  },
  {
    icon:     "🔀",
    name:     "Git & GitHub",
    subTools: "Version control, branching, PRs",
    level:    70,
    label:    "Comfortable",
  },
  {
    icon:     "☸️",
    name:     "Kubernetes",
    subTools: "Pods, deployments — beginner level",
    level:    35,
    label:    "Beginner",
  },
  {
    icon:     "🏗️",
    name:     "Terraform",
    subTools: "Basic IaC, HCL syntax",
    level:    40,
    label:    "Beginner",
  },
  {
    icon:     "🐧",
    name:     "Linux",
    subTools: "CLI, bash scripting, file system",
    level:    65,
    label:    "Learning",
  },
];

/* ─── Full Stack Grid ────────────────────────────── */
export const stackGroups = [
  {
    title: "Cloud & Infra",
    tools: ["AWS EC2", "AWS S3", "AWS IAM", "AWS Lambda", "AWS Educate"],
  },
  {
    title: "Containers",
    tools: ["Docker", "Docker Compose", "Dockerfile", "Docker Hub"],
  },
  {
    title: "CI/CD & Automation",
    tools: ["GitHub Actions", "Git", "Bash Scripting", "Python Scripts"],
  },
  {
    title: "Learning Next",
    tools: ["Kubernetes", "Terraform", "Prometheus", "Grafana", "Ansible"],
  },
];

/* ─── Experience ─────────────────────────────────── */
export const experiences = [
  {
    title:       "Final Year Project — DevOps Pipeline",
    company:     "Kongu Engineering College",
    date:        "2024 – 2025",
    description: "Built a CI/CD pipeline for a college project using GitHub Actions and Docker. Deployed a simple web app to AWS EC2 with automated build and test stages. This was my first hands-on experience with real DevOps workflows.",
    tech:        ["GitHub Actions", "Docker", "AWS EC2", "Python", "Git"],
  },
  {
    title:       "AWS Cloud Quest — 1st Place Winner",
    company:     "Department Hackathon, KEC",
    date:        "2024",
    description: "Won the department-level AWS Cloud Quest competition. Demonstrated practical knowledge of AWS core services including EC2, S3, IAM, and basic serverless with Lambda.",
    tech:        ["AWS EC2", "AWS S3", "AWS IAM", "AWS Lambda"],
  },
  {
    title:       "Self-Learning — DevOps & Cloud",
    company:     "Personal Development",
    date:        "2023 – Present",
    description: "Actively learning DevOps through online courses, hands-on labs, and personal projects. Completed AWS certifications and Databricks Generative AI Fundamentals. Building side projects to practice Docker, CI/CD, and cloud deployment.",
    tech:        ["AWS", "Docker", "Terraform", "GitHub Actions", "Linux"],
  },
];

/* ─── Projects ───────────────────────────────────── */
export const projects = [
  {
    title:       "Dockerized Web App with CI/CD",
    year:        "2025",
    description: "Containerized a simple Node.js app using Docker and set up a GitHub Actions pipeline to auto-build and push images.",
    bullets: [
      "Wrote a Dockerfile and docker-compose.yml from scratch",
      "GitHub Actions workflow: build → test → push to Docker Hub",
      "Deployed to AWS EC2 via SSH on every main branch push",
    ],
    tech:        ["Docker", "GitHub Actions", "AWS EC2", "Node.js"],
    link:        "https://github.com/Imstark25",
    demo:        "",
    featured:    true,
  },
  {
    title:       "AWS Infrastructure Setup",
    year:        "2025",
    description: "Manually provisioned a small AWS environment with EC2, S3, and IAM roles as part of learning cloud fundamentals.",
    bullets: [
      "Created EC2 instances, configured security groups and key pairs",
      "Set up S3 buckets with versioning and basic bucket policies",
      "Wrote basic Terraform config to recreate the setup as IaC",
    ],
    tech:        ["AWS EC2", "AWS S3", "IAM", "Terraform"],
    link:        "https://github.com/Imstark25",
    demo:        "",
    featured:    true,
  },
  {
    title:       "Automated Backup Script",
    year:        "2024",
    description: "Wrote a Python + Bash script to automatically back up important directories to AWS S3 on a schedule.",
    bullets: [
      "Python script using boto3 to upload files to S3",
      "Cron job on Linux for scheduled execution",
      "Email notification on success/failure",
    ],
    tech:        ["Python", "AWS S3", "Linux", "Bash", "Cron"],
    link:        "https://github.com/Imstark25",
    demo:        "",
    featured:    false,
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

/* ─── Tech Tag Cloud ────────────────────────────── */
export const techBadges = [
  "AWS", "Docker", "GitHub Actions", "Python",
  "Git", "Linux", "Terraform", "Kubernetes",
];
