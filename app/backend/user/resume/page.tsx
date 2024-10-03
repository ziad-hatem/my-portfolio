"use client";
import { useContextProvider } from "@/app/_components/providers/context-provider";
import { Separator } from "@/components/ui/separator";
import { Education } from "./_component/Education";
import { Experience } from "./_component/Experience";
import { Technologies } from "./_component/Technologies";

const page = () => {
  const { userData } = useContextProvider();
  console.log(userData);

  return (
    <div className="px-5 py-10">
      <h1 className="text-xl text-muted-foreground">Education</h1>
      <Education data={userData?.education} />
      <Separator className="my-5" />
      <h1 className="text-xl text-muted-foreground">Work Experience</h1>
      <Experience data={userData?.workExperience} />
      <Separator className="my-5" />
      <h1 className="text-xl text-muted-foreground">Technologies</h1>
      <Technologies data={userData?.mySkills} />
    </div>
  );
};

export default page;
