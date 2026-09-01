import type { User } from "@/features/profile/types/user";

export const USER: User = {
  firstName: "Khoa",
  lastName: "Truong Nguyen Anh",
  displayName: "Truong Nguyen Anh Khoa",
  username: "nhkhoa.a",
  gender: "male",
  pronouns: "he/him",
  bio: {
    en: "AI Workflow & Automation Engineer | Building intelligent workflows",
    vi: "Kỹ sư Tự động hóa & Quy trình AI | Xây dựng các quy trình thông minh",
  },
  timeZone: "Asia/Ho_Chi_Minh",
  flipSentences: {
    en: ["AI Workflow & Automation Engineer", "Building intelligent workflows"],
    vi: [
      "Kỹ sư Tự động hóa & Quy trình AI",
      "Xây dựng các quy trình thông minh",
    ],
  },
  address: "Ho Chi Minh City, Vietnam",
  phoneNumber: "Kzg0Nzk2ODAyMzk5", // E.164 format: +84 796 802 399, base64 encoded
  email: "d29yay5uaGtob2FAZ21haWwuY29t", // work.nhkhoa@gmail.com, base64 encoded
  website: "https://nhkhoa.site",
  jobTitle: {
    en: "AI Workflow & Automation Engineer",
    vi: "Kỹ sư Tự động hóa & Quy trình AI",
  },
  jobs: [
    {
      title: {
        en: "AI Workflow & Automation Engineer",
        vi: "Kỹ sư Tự động hóa & Quy trình AI",
      },
      company: "VML",
      website: "https://www.vml.com/vietnam",
    },
    {
      title: {
        en: "Graduate",
        vi: "Cử nhân",
      },
      company: "Van Lang University",
      website: "https://vlu.edu.vn/",
    },
  ],
  about: {
    en: `
- **AI Workflow & Automation Engineer** at VML, graduated from Van Lang University, with a passion for building intelligent workflows that save time and boost productivity
- Now at **22 years old**, excited to build a career at the intersection of AI and practical business solutions
- **Skills**: JavaScript/TypeScript, LangChain, OpenAI API, Claude Code, Workflow Automation tools (n8n, Zapier, Make.com)
- **Mission**: Democratizing AI automation for everyone, one workflow at a time
`,
    vi: `
- **Kỹ sư Tự động hóa & Quy trình AI** tại VML, tốt nghiệp Trường Đại học Văn Lang, với niềm đam mê xây dựng các quy trình thông minh giúp tiết kiệm thời gian và nâng cao năng suất
- Hiện **22 tuổi**, hào hứng xây dựng sự nghiệp tại giao điểm giữa AI và các giải pháp kinh doanh thực tiễn
- **Kỹ năng**: JavaScript/TypeScript, LangChain, OpenAI API, Claude Code, các công cụ Tự động hóa Quy trình (n8n, Zapier, Make.com)
- **Sứ mệnh**: Phổ cập tự động hóa AI cho mọi người, từng quy trình một
`,
  },
  avatar: "/images/me.png",
  ogImage: "/images/og-image-light.png",
  namePronunciationUrl: "", // Add audio file for name pronunciation if available
  keywords: [
    "Truong Nguyen Anh Khoa",
    "Truong Nguyen Anh Khoa",
    "Trương Nguyễn Anh Khoa",
    "nhkhoa",
    "nhkhoa.a",
    "Khoa AI",
    "Khoa VLU",
    "Khoa Van Lang",
    "Khoa CNTT",
    "Khoa HTTT",
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
