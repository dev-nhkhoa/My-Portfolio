import type { Project } from "../types/projects";

export const PROJECTS: Project[] = [
  {
    id: "sakura - voice expense tracker",
    title: {
      en: "Sakura - Voice Expense Tracker",
      vi: "Sakura - Voice Expense Tracker",
    },
    period: { start: "4.2026" },
    link: "https://sakuramoney.app",
    skills: [
      "Artificial Intelligence (AI)",
      "Large Language Model (LLM)",
      "Full-Stack Development",
    ],
    isExpanded: true,
    description: {
      en: `An IOS Native app that make managing personal finance simple stress less.`,
      vi: `App IOS mang lại trải nghiệm quản lý tài chính cá nhân một cách dễ dàng và nhẹ nhàng.`,
    },
    logo: "/logos/sakura-light.png",
    logoDark: "/logos/sakura-dark.png",
  },
  {
    id: "vnx-academy",
    title: {
      en: "VnX Academy - Graduation Project",
      vi: "VnX Academy - Đồ án Tốt nghiệp",
    },
    period: { start: "10.2025", end: "03.2026" },
    link: "",
    skills: [
      "Artificial Intelligence (AI)",
      "Large Language Model (LLM)",
      "Business Analytics",
    ],
    isExpanded: true,
    description: {
      en: `AI-powered learning platform like Coursera or Udemy, offering personalized course recommendations.`,
      vi: `Nền tảng học tập trực tuyến tương tự Coursera hay Udemy được tích hợp AI để tối ưu hóa việc gợi ý các khóa học cá nhân hóa cho người dùng.`,
    },
    logo: "https://api.dicebear.com/7.x/shapes/svg?seed=VnX+Academy",
  },
  {
    id: "trustifycsr-landing-page",
    title: {
      en: "TrustifyCSR - Transparent Blockchain Charity Solution",
      vi: "TrustifyCSR - Giải pháp Từ thiện Minh bạch trên Blockchain",
    },
    period: { start: "02.2025", end: "06.2025" },
    link: "https://github.com/dev-nhkhoa/TrustifyCSR-Website",
    skills: ["Full-Stack Development"],
    isExpanded: false,
    description: {
      en: `A blockchain-based platform that brings full transparency to charity by securely tracking and verifying every donation.`,
      vi: `Hệ thống minh bạch từ thiện dựa trên nền tảng Blockchain mang lại khả năng truy vết và xác thực trên mỗi giao dịch.`,
    },
    logo: "https://api.dicebear.com/7.x/shapes/svg?seed=TrustifyCSR+Landing+Page+Website",
  },
  {
    id: "calendar-vlu",
    title: {
      en: "CalendarVLU Web Extension- Syncronize VLU learning schedule into Google Calendar",
      vi: "CalendarVLU Web Extension - Đồng bộ lịch học của VLU với Google Calendar",
    },
    period: { start: "02.2023", end: "05.2026" },
    link: "https://github.com/dev-nhkhoa/calendarVLU2.0",
    skills: ["Full-Stack Development", "GoogleAPI"],
    isExpanded: false,
    description: {
      en: `Chrome Web Extension support VLU student on syncronize the learning schedule into Google Calendar for more easy to manage.`,
      vi: `Chrome Web Extension hỗ trợ sinh viên Văn Lang trong việc đồng bộ lịch học của mình lên Google Calendar để dễ dàng quản lý.`,
    },
    logo: "https://api.dicebear.com/7.x/shapes/svg?seed=calendarVLU",
  },
];
