import type { Project } from "../types/projects";

export const PROJECTS: Project[] = [
  {
    id: "etsy-automation-shop",
    title: "Automated Etsy Commerce Studio",
    period: { start: "03.2026" },
    link: "",
    skills: ["n8n", "Make", "Claude", "ComfyUI", "Hugging Face"],
    isExpanded: true,
    description: {
      en: `Built and operated digital product stores on Etsy with a target of **90% workflow automation** across ideation, production, and operations.

**Highlights**
- **Store Operations:** Developed and managed **three automated Etsy shops** for digital products.
- **Creative Direction:** Built a themed product line for **kids' room wall art** designed to evolve with child development stages.
- **Production Pipeline:** Implemented a paint-by-number pipeline covering image generation, color-region extraction, and algorithmic numbering (e.g., **K-means segmentation**).
- **Automation Impact:** Delivered end-to-end automations to reduce manual effort and increase publishing speed.`,
      vi: `Xây dựng và vận hành các cửa hàng sản phẩm số trên Etsy với mục tiêu **tự động hóa 90% quy trình** xuyên suốt ý tưởng, sản xuất và vận hành.

**Điểm nổi bật**
- **Vận hành cửa hàng:** Phát triển và quản lý **ba cửa hàng Etsy tự động** cho sản phẩm số.
- **Định hướng sáng tạo:** Xây dựng dòng sản phẩm tranh treo tường phòng trẻ em được thiết kế để phát triển theo các giai đoạn của trẻ.
- **Quy trình sản xuất:** Triển khai pipeline tranh tô màu theo số bao gồm tạo ảnh, tách vùng màu và đánh số theo thuật toán (ví dụ **phân đoạn K-means**).
- **Tác động tự động hóa:** Cung cấp các quy trình tự động đầu-cuối để giảm thao tác thủ công và tăng tốc độ xuất bản.`,
    },
    logo: "https://api.dicebear.com/7.x/shapes/svg?seed=Etsy+Automation+Shop",
  },
  {
    id: "vnx-academy",
    title: "VnX Academy",
    period: { start: "10.2025", end: "03.2026" },
    link: "",
    skills: [
      "Next.js",
      "shadcn/ui",
      "PostgreSQL",
      "pgvector",
      "Docker",
      "LangChain",
      "RAG",
      "Agentic RAG",
      "Prisma",
      "Open edX",
    ],
    isExpanded: true,
    description: {
      en: `Graduation capstone project in **Information Systems for Digital Transformation**, co-developed with one teammate.

**Highlights**
- **Platform Architecture:** Designed and built an education-focused e-commerce platform integrated with LLM capabilities to improve learner and customer experience.
- **Core Stack:** Used **Open edX** as the LMS/CMS core and **Next.js** for storefront, landing pages, and e-commerce workflows.
- **AI Layer:** Implemented **LangChain + RAG + Agentic RAG** using Google Embeddings and Groq-hosted models.
- **Core Modules:** Delivered three strategic modules: e-commerce, instructor-created roadmap system (inspired by roadmap.sh), and personalized AI features.
- **Student Guidance:** Built AI-powered features for personalized chatbot support, role-based skill assessment, and major-fit evaluation for IT faculty enrollment support.`,
      vi: `Đồ án tốt nghiệp ngành **Hệ thống Thông tin cho Chuyển đổi số**, đồng phát triển cùng một thành viên.

**Điểm nổi bật**
- **Kiến trúc nền tảng:** Thiết kế và xây dựng nền tảng thương mại điện tử giáo dục tích hợp năng lực LLM để cải thiện trải nghiệm người học và khách hàng.
- **Nền tảng công nghệ:** Sử dụng **Open edX** làm lõi LMS/CMS và **Next.js** cho storefront, landing page và quy trình thương mại điện tử.
- **Lớp AI:** Triển khai **LangChain + RAG + Agentic RAG** với Google Embeddings và các mô hình chạy trên Groq.
- **Các module cốt lõi:** Cung cấp ba module chiến lược: thương mại điện tử, hệ thống lộ trình do giảng viên tạo (lấy cảm hứng từ roadmap.sh), và các tính năng AI cá nhân hóa.
- **Hỗ trợ sinh viên:** Xây dựng các tính năng ứng dụng AI cho chatbot cá nhân hóa, đánh giá kỹ năng theo vai trò và đánh giá mức độ phù hợp ngành học để hỗ trợ tuyển sinh khoa CNTT.`,
    },
    logo: "https://api.dicebear.com/7.x/shapes/svg?seed=VnX+Academy",
  },
  {
    id: "trustifycsr-landing-page",
    title: "TrustifyCSR Landing Page",
    period: { start: "04.2025", end: "06.2025" },
    link: "https://github.com/dev-nhkhoa/TrustifyCSR-Website",
    skills: ["React", "TypeScript", "Vite", "Tailwind CSS", "shadcn/ui"],
    isExpanded: false,
    description: {
      en: `A modern product website presenting a **blockchain-powered charity transparency** solution, inspired by Arbor Verification Tech.

**Highlights**
- **Brand Positioning:** Crafted a clear and trust-centered product narrative.
- **UX Direction:** Designed for clarity, credibility, and conversion-focused storytelling.
- **Delivery Stack:** Built with **React, TypeScript, Vite, Tailwind CSS, and shadcn/ui**.`,
      vi: `Một website sản phẩm hiện đại giới thiệu giải pháp **minh bạch từ thiện ứng dụng blockchain**, lấy cảm hứng từ Arbor Verification Tech.

**Điểm nổi bật**
- **Định vị thương hiệu:** Xây dựng câu chuyện sản phẩm rõ ràng và lấy niềm tin làm trọng tâm.
- **Định hướng UX:** Thiết kế hướng tới sự rõ ràng, đáng tin cậy và kể chuyện tập trung vào chuyển đổi.
- **Công nghệ triển khai:** Xây dựng với **React, TypeScript, Vite, Tailwind CSS và shadcn/ui**.`,
    },
    logo: "https://api.dicebear.com/7.x/shapes/svg?seed=TrustifyCSR+Landing+Page+Website",
  },
  {
    id: "calendar-vlu-2",
    title: "CalendarVLU 2.0",
    period: { start: "02.2023" },
    link: "https://github.com/dev-nhkhoa/calendarVLU2.0",
    skills: [
      "TypeScript",
      "Next.js",
      "Prisma",
      "Zustand",
      "Google API",
      "MongoDB",
    ],
    isExpanded: false,
    description: {
      en: `CalendarVLU 2.0 is a web application purpose-built for Van Lang University students to manage class and exam schedules efficiently across desktop and mobile.

**Highlights**
- **Schedule Export:** Export class and exam schedules to **CSV** for easy storage and sharing.
- **Calendar Sync:** Synchronize schedules with **Google Calendar** (Outlook support planned).
- **Collaboration:** Share schedules with classmates to keep teams aligned.
- **Reliability:** Support automatic updates when institutional schedules change.

This version is a full redesign and enhancement of the original CalendarVLU, delivered end-to-end with a strong focus on usability and student productivity.`,
      vi: `CalendarVLU 2.0 là ứng dụng web được xây dựng riêng cho sinh viên Trường Đại học Văn Lang để quản lý lịch học và lịch thi hiệu quả trên cả máy tính và di động.

**Điểm nổi bật**
- **Xuất lịch:** Xuất lịch học và lịch thi ra **CSV** để dễ dàng lưu trữ và chia sẻ.
- **Đồng bộ lịch:** Đồng bộ lịch với **Google Calendar** (dự kiến hỗ trợ Outlook).
- **Cộng tác:** Chia sẻ lịch với bạn học để giữ cả nhóm đồng bộ.
- **Độ tin cậy:** Hỗ trợ tự động cập nhật khi lịch của nhà trường thay đổi.

Phiên bản này là bản thiết kế lại và nâng cấp toàn diện từ CalendarVLU gốc, được thực hiện đầu-cuối với trọng tâm mạnh mẽ vào tính khả dụng và năng suất của sinh viên.`,
    },
    logo: "https://api.dicebear.com/7.x/shapes/svg?seed=calendarVLU",
  },
];
