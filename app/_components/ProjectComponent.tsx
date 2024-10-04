import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Projects, Technology } from "@prisma/client";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Eye, GithubIcon, LinkedinIcon, LucideIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

const TechnologyPreview = ({
  title,
  imageUrl,
}: {
  title: string;
  imageUrl: string;
}) => {
  return (
    <li className="flex items-center list-item-marker">
      <div className="flex items-center gap-2 my-auto">
        <Image
          src={imageUrl}
          width={100}
          height={100}
          alt="Technology Image"
          unoptimized
          className="object-contain w-[20px]"
        />
        <h1 className="text-white text-sm">{title}</h1>
      </div>
    </li>
  );
};

const CustomButton = ({
  Icon,
  text,
  link,
}: {
  Icon: any;
  text: string;
  link: string;
}) => {
  return (
    <Link className="w-[30%]" href={link} target="_blank">
      <Button className="gap-2 w-full">
        <Icon /> {text}
      </Button>
    </Link>
  );
};

const ProjectComponent = ({ data }: { data: any }) => {
  return (
    <Dialog>
      <DialogTrigger asChild className="cursor-pointer">
        <div className="flex gap-1 flex-col items-center group">
          <div className="relative w-[100%] h-auto md:w-[200px]">
            <Image
              src={data.imageUrl}
              alt="Project Image"
              width={100}
              height={100}
              unoptimized
              loading="lazy"
              className="object-fill w-full aspect-video rounded-lg"
            />
            <div className="absolute transition-all top-1/2 left-1/2 -translate-x-1/2 z-10 -translate-y-1/2 opacity-0 group-hover:opacity-100">
              <div className="bg-black w-[40px] h-[40px] rounded-full bg-opacity-50 flex items-center justify-center">
                <Eye
                  size={20}
                  className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-500"
                />
              </div>
            </div>
            <div className="bg-black w-full transition-all top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-full absolute rounded-lg opacity-0 group-hover:opacity-30" />
          </div>
          <p className="text-sm text-muted-foreground">{data.title}</p>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Project Preview</DialogTitle>
          <DialogDescription>all project Details here</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <LiteYouTubeEmbed id={data.youtubeUrl} title="Project" />
          <h1 className="text-sm text-muted-foreground italic">Technologies</h1>
          <div className="">
            <ul className="flex flex-col gap-2 list-disc list-outside pl-2">
              {data.technologies.map((e: any, index: any) => (
                <TechnologyPreview
                  title={e.name}
                  imageUrl={e.icon}
                  key={index}
                />
              ))}
            </ul>
          </div>
          <h1 className="text-sm text-muted-foreground italic">Links</h1>
          <div className="w-full flex justify-around">
            {data.githubUrl && (
              <CustomButton
                text="GitHub"
                Icon={GithubIcon}
                link={data.githubUrl}
              />
            )}
            {data.projectUrl && (
              <CustomButton text="Preview" Icon={Eye} link={data.projectUrl} />
            )}
            {data.linkedinUrl && (
              <CustomButton
                text="Linkedin"
                Icon={LinkedinIcon}
                link={data.linkedinUrl}
              />
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectComponent;
