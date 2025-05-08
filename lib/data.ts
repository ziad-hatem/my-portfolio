import { db } from "./prisma";

export async function getUserData() {
  const user = await db.user.findFirst({
    include: {
      aboutMe: true,
      whatIDo: true,
      mySkills: true,
      projects: {
        include: {
          technologies: true,
        },
      },
      workExperience: true,
      education: true,
    },
  });

  if (!user) {
    throw new Error("No user found");
  }

  return user;
}

export async function getProjects() {
  return db.projects.findMany({
    include: {
      technologies: true,
    },
  });
}

export async function getSkills() {
  return db.mySkills.findMany();
}

export async function getWorkExperience() {
  return db.workExperience.findMany({
    orderBy: {
      startDate: "desc",
    },
  });
}

export async function getEducation() {
  return db.education.findMany({
    orderBy: {
      startDate: "desc",
    },
  });
}
