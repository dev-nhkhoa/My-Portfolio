import type { Experience } from "../types/experiences";

export const EXPERIENCES: Experience[] = [
  {
    id: "vml",
    companyName: "VML Vietnam",
    companyWebsite: "https://www.vml.com/vietnam",
    companyLogo: "/logos/vml-light.svg",
    companyLogoDark: "/logos/vml-dark.svg",
    positions: [
      {
        id: "vml-ai-workflow-automation-engineer",
        title: {
          en: "AI Workflow & Automation Engineer",
          vi: "AI Workflow & Automation Engineer",
        },
        employmentPeriod: {
          start: "06.2026",
        },
        employmentType: {
          en: "Full-time",
          vi: "Toàn thời gian",
        },
        icon: "code",
        isExpanded: true,
        description: {
          en: "I lead AI-related projects at VML Vietnam and work on improving how the company operates, from day-to-day tasks to team-wide processes.",
          vi: "Mình phụ trách các dự án liên quan đến AI tại VML Vietnam, đồng thời tối ưu công việc và quy trình vận hành của công ty, từ tác vụ hằng ngày đến quy trình chung của các nhóm.",
        },
      },
    ],
    isCurrentEmployer: true,
  },
];
