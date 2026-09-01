import type { Experience } from "../types/experiences";

export const EXPERIENCES: Experience[] = [
  {
    id: "vml",
    companyName: "VML Vietnam",
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
        skills: [
          "Artificial Intelligence (AI)",
          "Large Language Model (LLM)",
          "Workflow Automation",
          "Business Analytics",
        ],
      },
    ],
    isCurrentEmployer: true,
  },
  {
    id: "aht-tech",
    companyName: "AHT Tech",
    companyLogo:
      "https://cdn-new.topcv.vn/unsafe/https://static.topcv.vn/company_logos/bnuMovsJU7qsIR2NBw68wdgtCN9jl59v_1737512386____8e38d39c50f1ffc5ab349a913fe37e4d.png",
    positions: [
      {
        id: "erp-functional-consultant-intern",
        title: {
          en: "Functional Consultant Intern",
          vi: "Thực tập sinh tư vấn nghiệp vụ",
        },
        employmentPeriod: {
          start: "05.2025",
          end: "08.2025",
        },
        employmentType: {
          en: "Internship",
          vi: "Thực tập sinh",
        },
        icon: "business",
        description: {
          en: "Participated in requirement gathering to build an Odoo-based CRM module for a major coffee and franchise business in Vietnam.",
          vi: "Tham gia thu thập yêu cầu để xây dựng module CRM trên nền tảng Odoo cho một doanh nghiệp cà phê và nhượng quyền lớn tại Việt Nam.",
        },
        skills: ["Business Analytics", "Enterprise Resource Planning (ERP)"],
      },
    ],
  },
  // {
  //   id: "education",
  //   companyName: "Education",
  //   positions: [
  //     {
  //       id: "van-lang-university",
  //       title: {
  //         en: "Information Systems - Digital Transformation",
  //         vi: "Ngành hệ thống Thông tin - Chuyển đổi số",
  //       },
  //       employmentPeriod: {
  //         start: "2022",
  //         end: "2026",
  //       },
  //       employmentType: {
  //         en: "Bachelor's Degree",
  //         vi: "Cử nhân",
  //       },
  //       icon: "education",
  //       description: {
  //         en: "- Graduate from Van Lang University.",
  //         vi: "- Tốt nghiệp Trường Đại học Văn Lang.",
  //       },
  //       skills: [
  //         "Artificial Intelligence (AI)",
  //         "Large Language Model (LLM)",
  //         "Business Analytics",
  //       ],
  //     }
  //   ],
  // },
];
