import dayjs from "dayjs";

import { SITE_INFO } from "@/config/site";
import { getAllPosts } from "@/features/blog/data/posts";
import { getLLMText } from "@/features/blog/lib/get-llm-text";
import { EXPERIENCES } from "@/features/profile/data/experiences";
import { PROJECTS } from "@/features/profile/data/projects";
import { SOCIAL_LINKS } from "@/features/profile/data/social-links";
import { TECH_STACK } from "@/features/profile/data/tech-stack";
import { USER } from "@/features/profile/data/user";

const allPosts = getAllPosts();

const aboutText = `## About

${USER.about.en.trim()}

### Personal Information

- First Name: ${USER.firstName}
- Last Name: ${USER.lastName}
- Display Name: ${USER.displayName}
- Location: ${USER.address}
- Website: ${USER.website}

### Social Links

${SOCIAL_LINKS.map((item) => `- [${item.title}](${item.href})`).join("\n")}

### Tech Stack

${TECH_STACK.map((item) => `- [${item.title}](${item.href})`).join("\n")}\n`;

const experienceText = `## Experience

${EXPERIENCES.map((item) =>
  item.positions
    .map((position) => {
      const skills = position.skills?.map((skill) => skill).join(", ") || "N/A";
      const description = position.description
        ? `\n\n${position.description.en.trim()}`
        : "";
      return `### ${position.title.en} | ${item.companyName}\n\nDuration: ${position.employmentPeriod.start} - ${position.employmentPeriod.end || "Present"}\n\nSkills: ${skills}${description}`;
    })
    .join("\n\n")
).join("\n\n")}
`;

const projectsText = `## Projects

${PROJECTS.map((item) => {
  const skills = `\n\nSkills: ${item.skills.join(", ")}`;
  const description = item.description
    ? `\n\n${item.description.en.trim()}`
    : "";
  return `### ${item.title.en}\n\nProject URL: ${item.link}${skills}${description}`;
}).join("\n\n")}
`;

async function getBlogContent() {
  const text = await Promise.all(
    allPosts.map(
      async (item) =>
        `---\ntitle: "${item.metadata.title}"\ndescription: "${item.metadata.description}"\nlast_updated: "${dayjs(item.metadata.updatedAt).format("MMMM D, YYYY")}"\nsource: "${SITE_INFO.url}/blog/${item.slug}"\n---\n\n${await getLLMText(item)}`
    )
  );
  return text.join("\n\n");
}

async function getContent() {
  return `<SYSTEM>This document contains comprehensive information about ${USER.displayName}'s professional profile, portfolio, and blog content. It includes personal details, work experience, projects, and all published blog posts. This data is formatted for consumption by Large Language Models (LLMs) to provide accurate and up-to-date information about ${USER.displayName}'s background, skills, and expertise as ${USER.jobTitle.en}.</SYSTEM>

# nhkhoa.site

> The portfolio and blog of ${USER.displayName} (Vietnamese: Trương Nguyễn Anh Khoa), ${USER.jobTitle.en}, based in ${USER.address}. Works on AI automation workflows and AI video production.

${aboutText}
${experienceText}
${projectsText}

## Blog

${await getBlogContent()}`;
}

export const dynamic = "force-static";

export async function GET() {
  return new Response(await getContent(), {
    headers: {
      "Content-Type": "text/markdown;charset=utf-8",
    },
  });
}
