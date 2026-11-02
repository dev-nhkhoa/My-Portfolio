import type { User } from "@/features/profile/types/user";

export const USER: User = {
  firstName: "Khoa",
  lastName: "Truong Nguyen Anh",
  displayName: "Khoa Truong Nguyen Anh",
  username: "nhkhoa.a",
  gender: "male",
  pronouns: "he/him",
  bio: {
    en: "AI Workflow & Automation Engineer",
    vi: "AI Workflow & Automation Engineer",
  },
  timeZone: "Asia/Ho_Chi_Minh",
  flipSentences: {
    en: ["AI Workflow & Automation Engineer", "AI Film Maker & AI Freelancer"],
    vi: ["AI Workflow & Automation Engineer", "AI Film Maker & AI Freelancer"],
  },
  address: "Ho Chi Minh City, Vietnam",
  phoneNumber: "Kzg0Nzk2ODAyMzk5", // E.164 format: +84 796 802 399, base64 encoded
  email: "d29yay5uaGtob2FAZ21haWwuY29t", // work.nhkhoa@gmail.com, base64 encoded
  website: "https://nhkhoa.site",
  jobTitle: {
    en: "AI Workflow & Automation Engineer",
    vi: "AI Workflow & Automation Engineer",
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
    {
      title: {
        en: "Graduated",
        vi: "Tốt nghiệp",
      },
      company: "Van Lang University",
      website: "https://vlu.edu.vn/",
    },
  ],
  about: {
    en: `Hi, I'm Khoa! I'm currently an AI Automation Engineer at VML. I'm into everything AI, from coding to image and video generation. Besides building automation systems, I'm also a part-time AI Film Maker in my spare time :)`,
    vi: `Xin chào, mình là Khoa! Mình hiện tại đang là AI Automation Engineer tại VML. Mình hứng thú tất cả mọi thứ liên quan đến AI từ coding, tạo ảnh, tạo video,... Ngoài việc xây dựng các kiến trúc hệ thống tự động hóa, mình còn là một part-time AI Film Maker trong thời gian rảnh :)`,
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
    "Khoa VLU",
    "Khoa Van Lang",
    "Khoa CNTT",
    "Khoa HTTT",
    "Khoa VMK",
    "ai workflow automation engineer",
    "ai automation developer",
    "ai developer vietnam",
    "automation developer",
    "vml",
    "vml vietnam",
    "n8n automation",
    "make automation",
    "langchain developer",
    "openclaw",
    "ai agent",
    "workflow automation",
  ],
  dateCreated: "2026-04-15",
};
