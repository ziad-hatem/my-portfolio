export function generatePersonSchema(user: any) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: user.name,
    url: process.env.NEXT_PUBLIC_APP_URL || "https://your-portfolio-domain.com",
    image: user.image,
    jobTitle: user.position,
    email: user.email,
    telephone: user.phoneNumber,
    sameAs: [
      user.linkedinUrl,
      // Add other social profiles here
    ].filter(Boolean),
    worksFor: {
      "@type": "Organization",
      name: "Current Company", // Replace with actual company name if available
    },
    description: user.aboutMe?.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: user.location,
    },
  }
}

export function generateProjectSchema(project: any) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: project.title,
    codeRepository: project.githubUrl,
    url: project.projectUrl,
    image: project.imageUrl,
    programmingLanguage: project.technologies.map((tech: any) => tech.name),
    author: {
      "@type": "Person",
      name: "Your Name", // Replace with actual name
    },
  }
}

export function generateSkillSchema(skills: any[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: skills.map((skill, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Thing",
        name: skill.name,
        image: skill.icon,
      },
    })),
  }
}

export function generateWorkExperienceSchema(experiences: any[]) {
  return experiences.map((experience) => ({
    "@context": "https://schema.org",
    "@type": "WorkExperience",
    name: experience.title,
    description: experience.description,
    startDate: experience.startDate,
    endDate: experience.endDate || "Present",
  }))
}

export function generateEducationSchema(educations: any[]) {
  return educations.map((education) => ({
    "@context": "https://schema.org",
    "@type": "EducationalOccupationalCredential",
    name: education.title,
    description: education.description,
    startDate: education.startDate,
    endDate: education.endDate,
  }))
}
