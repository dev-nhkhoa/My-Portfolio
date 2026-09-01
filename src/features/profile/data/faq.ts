import { USER } from "@/features/profile/data/user";
import type { Localized } from "@/i18n/localized";

export type FaqItem = {
  question: Localized<string>;
  /** Answer-first: lead with the direct claim, then context. Kept to 2-3 sentences. */
  answer: Localized<string>;
};

const currentCompany = USER.jobs[0]?.company ?? "VML";

/**
 * Questions people actually ask a search or AI engine about Khoa.
 *
 * These are rendered as visible page content AND emitted as FAQPage schema —
 * both are required. Schema whose answers do not appear on the page is a
 * structured-data violation, so keep the two in sync by construction.
 */
export const FAQ: FaqItem[] = [
  {
    question: {
      en: `Who is ${USER.displayName}?`,
      vi: `${USER.displayName} là ai?`,
    },
    answer: {
      en: `${USER.displayName} (Vietnamese: Trương Nguyễn Anh Khoa) is an ${USER.jobTitle} at ${currentCompany}, based in ${USER.address}. He graduated from Van Lang University and builds AI-driven automation workflows that reduce manual work for business teams.`,
      vi: `${USER.displayName} (Trương Nguyễn Anh Khoa) là một ${USER.jobTitle} tại ${currentCompany}, sống tại ${USER.address}. Anh tốt nghiệp Trường Đại học Văn Lang và xây dựng các quy trình tự động hóa ứng dụng AI giúp giảm công việc thủ công cho các đội nhóm doanh nghiệp.`,
    },
  },
  {
    question: {
      en: `What does ${USER.firstName} do as an ${USER.jobTitle}?`,
      vi: `${USER.firstName} làm gì với vai trò ${USER.jobTitle}?`,
    },
    answer: {
      en: `He designs and ships automation workflows that connect large language models to real business systems. Day to day that means building agent pipelines with n8n, Make.com, and LangChain, and integrating LLM APIs into existing product and marketing operations.`,
      vi: `Anh thiết kế và triển khai các quy trình tự động hóa kết nối các mô hình ngôn ngữ lớn với hệ thống doanh nghiệp thực tế. Công việc hằng ngày là xây dựng các pipeline agent với n8n, Make.com và LangChain, đồng thời tích hợp các API LLM vào hoạt động sản phẩm và marketing hiện có.`,
    },
  },
  {
    question: {
      en: `Where did ${USER.displayName} study?`,
      vi: `${USER.displayName} đã học ở đâu?`,
    },
    answer: {
      en: `He graduated from Van Lang University in Ho Chi Minh City, Vietnam. His graduation thesis integrated Agentic RAG and large language models into an educational e-commerce platform, VnX Academy, built on Open edX.`,
      vi: `Anh tốt nghiệp Trường Đại học Văn Lang tại Thành phố Hồ Chí Minh, Việt Nam. Đồ án tốt nghiệp của anh tích hợp Agentic RAG và các mô hình ngôn ngữ lớn vào nền tảng thương mại điện tử giáo dục VnX Academy, xây dựng trên Open edX.`,
    },
  },
  {
    question: {
      en: `What technologies does ${USER.firstName} work with?`,
      vi: `${USER.firstName} làm việc với những công nghệ nào?`,
    },
    answer: {
      en: `His core stack is TypeScript and JavaScript, with LangChain, the OpenAI API, and Claude for LLM work, and n8n, Make.com, and Zapier for workflow automation. He also builds web applications with Next.js and React.`,
      vi: `Nền tảng công nghệ chính của anh là TypeScript và JavaScript, cùng LangChain, OpenAI API và Claude cho các tác vụ LLM, và n8n, Make.com, Zapier cho tự động hóa quy trình. Anh cũng xây dựng ứng dụng web với Next.js và React.`,
    },
  },
  {
    question: {
      en: "What is Agentic RAG?",
      vi: "Agentic RAG là gì?",
    },
    answer: {
      en: `Agentic RAG is retrieval-augmented generation where an autonomous agent decides what to retrieve, when to retrieve it, and whether the result is sufficient — rather than following one fixed retrieval step. ${USER.firstName} applied this pattern in VnX Academy to personalise learning paths across thousands of courses.`,
      vi: `Agentic RAG là kỹ thuật retrieval-augmented generation trong đó một agent tự động quyết định truy xuất cái gì, khi nào truy xuất và liệu kết quả đã đủ hay chưa — thay vì chỉ theo một bước truy xuất cố định. ${USER.firstName} đã áp dụng mô hình này trong VnX Academy để cá nhân hóa lộ trình học tập trên hàng ngàn khóa học.`,
    },
  },
  {
    question: {
      en: `How can I contact ${USER.displayName}?`,
      vi: `Làm sao để liên hệ với ${USER.displayName}?`,
    },
    answer: {
      en: `He is reachable through the social profiles linked on this site, including LinkedIn and GitHub. He is based in ${USER.address} and works in the Asia/Ho_Chi_Minh time zone.`,
      vi: `Bạn có thể liên hệ với anh qua các hồ sơ mạng xã hội được liên kết trên trang này, bao gồm LinkedIn và GitHub. Anh sống tại ${USER.address} và làm việc theo múi giờ Asia/Ho_Chi_Minh.`,
    },
  },
];
