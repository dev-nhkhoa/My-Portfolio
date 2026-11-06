import type { User } from "@/features/profile/types/user";

export const USER: User = {
  firstName: "Khoa",
  lastName: "Truong Nguyen Anh",
  displayName: "Khoa Truong Nguyen Anh",
  username: "nhkhoa.a",
  gender: "male",
  pronouns: "he/him",
  bio: {
    en: "AI Automation & AI Video Maker Freelancer",
    vi: "AI Automation & AI Video Maker Freelancer",
  },
  timeZone: "Asia/Ho_Chi_Minh",
  flipSentences: {
    en: ["AI Automation Freelancer", "AI Video Maker Freelancer"],
    vi: ["AI Automation Freelancer", "AI Video Maker Freelancer"],
  },
  address: "Ho Chi Minh City, Vietnam",
  phoneNumber: "Kzg0Nzk2ODAyMzk5", // E.164 format: +84 796 802 399, base64 encoded
  email: "d29yay5uaGtob2FAZ21haWwuY29t", // work.nhkhoa@gmail.com, base64 encoded
  website: "https://nhkhoa.site",
  jobTitle: {
    en: "AI Automation & AI Video Maker Freelancer",
    vi: "AI Automation & AI Video Maker Freelancer",
  },
  jobs: [
    {
      title: {
        en: "AI Workflow & Automation Engineer",
        vi: "AI Workflow & Automation Engineer",
      },
      company: "VML Vietnam",
      website: "https://www.vml.com/vietnam",
    },
  ],
  about: {
    en: `Hi, I'm Khoa, a freelancer in Ho Chi Minh City. I build AI automation workflows and make AI-generated video and imagery for brands and creators.`,
    vi: `Xin chào, mình là Khoa, freelancer tại TP. Hồ Chí Minh. Mình xây dựng quy trình tự động hóa bằng AI và làm video, hình ảnh AI cho thương hiệu và nhà sáng tạo nội dung.`,
  },
  avatar: "/images/me.png",
  ogImage: "/images/og-image-light.png",
  namePronunciationUrl: "", // Add audio file for name pronunciation if available
  keywords: [
    "Truong Nguyen Anh Khoa",
    "Khoa Truong Nguyen Anh",
    "Trương Nguyễn Anh Khoa",
    "Khoa Trương Nguyễn Anh",
    "Khoa Truong",
    "Khoa Truong VML",
    "nhkhoa",
    "nhkhoa.a",
    "Khoa AI",
    "ai automation freelancer",
    "ai video maker",
    "ai video freelancer",
    "ai film maker",
    "ai workflow automation engineer",
    "ai automation developer",
    "ai developer vietnam",
    "automation developer",
    "vml",
    "vml vietnam",
    "n8n automation",
    "make automation",
    "openclaw",
    "ai agent",
    "workflow automation",
  ],
  dateCreated: "2026-04-15",
};
