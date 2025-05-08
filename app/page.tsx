import dynamic from "next/dynamic";
import { Suspense } from "react";
import { getUserData } from "@/lib/data";
import type { Metadata } from "next";
import Script from "next/script";
import {
  generatePersonSchema,
  generateProjectSchema,
  generateSkillSchema,
  generateWorkExperienceSchema,
  generateEducationSchema,
} from "@/components/structured-data";

// Dynamically import components with loading states
const Hero = dynamic(() => import("@/components/sections/hero"), {
  loading: () => (
    <div className="min-h-screen flex items-center justify-center">
      Loading...
    </div>
  ),
});
const AboutMe = dynamic(() => import("@/components/sections/about-me"));
const WhatIDo = dynamic(() => import("@/components/sections/what-i-do"));
const Skills = dynamic(() => import("@/components/sections/skills"));
const Projects = dynamic(() => import("@/components/sections/projects"));
const Experience = dynamic(() => import("@/components/sections/experience"));
const Education = dynamic(() => import("@/components/sections/education"));
const Contact = dynamic(() => import("@/components/sections/contact"));

export async function generateMetadata(): Promise<Metadata> {
  const userData = await getUserData();

  return {
    title: `${userData.name || "Professional"} | ${userData.position || "Web Developer"}`,
    description:
      userData.aboutMe?.description ||
      "Professional portfolio showcasing my projects and skills",
    openGraph: {
      title: `${userData.name || "Professional"} | ${userData.position || "Web Developer"}`,
      description:
        userData.aboutMe?.description ||
        "Professional portfolio showcasing my projects and skills",
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: userData.name || "Portfolio Owner",
        },
      ],
    },
    icons: {
      icon: [
        { url: "/favicon.ico" },
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      ],
      apple: [{ url: "/apple-touch-icon.png" }],
      other: [
        {
          rel: "android-chrome-512x512",
          url: "/android-chrome-512x512.png",
          sizes: "512x512",
        },
      ],
    },
    manifest: "/site.webmanifest",
    twitter: {
      title: `${userData.name || "Professional"} | ${userData.position || "Web Developer"}`,
      description:
        userData.aboutMe?.description ||
        "Professional portfolio showcasing my projects and skills",
      images: ["/og-image.jpg"],
    },
  };
}

export default async function Home() {
  const userData = await getUserData();

  // Generate structured data
  const personSchema = generatePersonSchema(userData);
  const projectsSchema = userData.projects.map((project: any) =>
    generateProjectSchema(project)
  );
  const skillsSchema = generateSkillSchema(userData.mySkills);
  const workExperienceSchema = generateWorkExperienceSchema(
    userData.workExperience
  );
  const educationSchema = generateEducationSchema(userData.education);

  return (
    <>
      <Script
        id="schema-person"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <Script
        id="schema-projects"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsSchema) }}
      />
      <Script
        id="schema-skills"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(skillsSchema) }}
      />
      <Script
        id="schema-work"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(workExperienceSchema),
        }}
      />
      <Script
        id="schema-education"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(educationSchema) }}
      />

      <main className="min-h-screen">
        <Hero user={userData} />
        <Suspense
          fallback={
            <div className="h-96 flex items-center justify-center">
              Loading...
            </div>
          }
        >
          <AboutMe aboutMe={userData.aboutMe} />
        </Suspense>
        <Suspense
          fallback={
            <div className="h-96 flex items-center justify-center">
              Loading...
            </div>
          }
        >
          <WhatIDo whatIDo={userData.whatIDo} />
        </Suspense>
        <Suspense
          fallback={
            <div className="h-96 flex items-center justify-center">
              Loading...
            </div>
          }
        >
          <Skills skills={userData.mySkills} />
        </Suspense>
        <Suspense
          fallback={
            <div className="h-96 flex items-center justify-center">
              Loading...
            </div>
          }
        >
          <Projects projects={userData.projects} />
        </Suspense>
        <Suspense
          fallback={
            <div className="h-96 flex items-center justify-center">
              Loading...
            </div>
          }
        >
          <Experience workExperience={userData.workExperience} />
        </Suspense>
        <Suspense
          fallback={
            <div className="h-96 flex items-center justify-center">
              Loading...
            </div>
          }
        >
          <Education education={userData.education} />
        </Suspense>
        <Suspense
          fallback={
            <div className="h-96 flex items-center justify-center">
              Loading...
            </div>
          }
        >
          <Contact userId={userData.id} />
        </Suspense>
      </main>
    </>
  );
}
