"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import FileUpload from "@/app/_components/file-upload";
import TechnologyForProject from "./technologies-Project";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useContextProvider } from "@/app/_components/providers/context-provider";

const formSchema = z.object({
  title: z.string().min(1).max(255),
  imageUrl: z.any(),
  youtubeUrl: z.string().min(1).max(255),
  projectUrl: z.string().url().min(1).max(255),
  linkedinUrl: z.string().url().min(1).max(400),
  githubUrl: z.string().url().min(1).max(255),
});

export function CreateProject() {
  const [addedTechs, setAddedTechs] = useState<string[]>([]);
  const { refreshData } = useContextProvider();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      imageUrl: "",
      youtubeUrl: "",
      projectUrl: "",
      linkedinUrl: "",
      githubUrl: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const formattedValues = {
      ...values,
      technologies: addedTechs,
    };

    try {
      const response = await axios.post(
        "/api/user/project?email=ziadhatemdev@gmail.com",
        formattedValues
      );
      toast.success("Project created successfully");
      router.push("/backend/user/projects");
      refreshData();
    } catch (error) {
      console.error("Error creating project:", error);
      toast.success("Error While created Project");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        noValidate
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 p-10"
      >
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <FileUpload
                  apiEndpoint="imageUploader"
                  value={field.value}
                  onChange={(files) => field.onChange(files)}
                />
              </FormControl>
              <FormDescription>Description</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter project title" {...field} />
              </FormControl>
              <FormDescription>
                Provide a title for your project.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="youtubeUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Youtube URL</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com" {...field} />
              </FormControl>
              <FormDescription>
                Provide the URL of your project.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="projectUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project URL</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com" {...field} />
              </FormControl>
              <FormDescription>
                Provide the URL of your project.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="linkedinUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>LinkedIn URL</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://linkedin.com/in/yourprofile"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Provide your LinkedIn profile URL.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="githubUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>GitHub URL</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://github.com/yourprofile"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Provide your GitHub profile URL.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <TechnologyForProject
          addedTechs={addedTechs}
          setAddedTechs={setAddedTechs}
        />

        <Button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
