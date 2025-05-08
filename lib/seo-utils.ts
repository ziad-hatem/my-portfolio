export function generateSeoTitle(name: string | null, position: string | null): string {
  const defaultName = name || "Professional"
  const defaultPosition = position || "Web Developer"

  return `${defaultName} | ${defaultPosition}`
}

export function truncateDescription(description: string | undefined, maxLength = 160): string {
  if (!description) return "Professional portfolio showcasing projects and skills in web development."

  if (description.length <= maxLength) return description

  // Find the last space before maxLength
  const lastSpace = description.substring(0, maxLength).lastIndexOf(" ")

  // If no space found, just cut at maxLength
  const truncateAt = lastSpace > 0 ? lastSpace : maxLength

  return `${description.substring(0, truncateAt)}...`
}

export function generateKeywords(name: string | null, position: string | null, skills: any[]): string[] {
  const baseKeywords = [
    "portfolio",
    "web developer",
    "frontend developer",
    "full-stack developer",
    "software engineer",
    "web design",
  ]

  // Add name if available
  if (name) {
    baseKeywords.push(name)
  }

  // Add position if available
  if (position) {
    baseKeywords.push(position)
  }

  // Add skills
  const skillKeywords = skills.map((skill) => skill.name)

  return [...baseKeywords, ...skillKeywords]
}
