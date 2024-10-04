"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
import { EditWhatImDoing } from "./edit-whatimdoing";
import { useContextProvider } from "./providers/context-provider";

const formSchema = z.object({
  description: z.string(),
  yearsOfExperience: z.coerce.number().min(1).max(255),
  trainingCourses: z.coerce.number().min(1).max(255),
  awardsCertificates: z.coerce.number().min(1).max(255),
});

export function AboutBackend({ defaultData }: { defaultData?: any }) {
  const { refreshData } = useContextProvider();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: defaultData?.aboutMe?.description || "",
      yearsOfExperience: defaultData?.aboutMe?.yearsOfExperience || 0,
      awardsCertificates: defaultData?.aboutMe?.awardsCertificates || 0,
      trainingCourses: defaultData?.aboutMe?.trainingCourses || 0,
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    const sendData = async () => {
      try {
        setLoading(true);
        const res = await axios.post(
          `/api/user/updateuserabout?email=${defaultData?.email}`,
          values
        );
        toast.success("Data added successfully");
        refreshData();
      } catch (error) {
        toast.error("Error adding data here");
      } finally {
        setLoading(false);
      }
    };
    sendData();
  }

  return (
    <>
      <Form {...form}>
        <form
          noValidate
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>About</FormLabel>
                <FormControl>
                  <Textarea placeholder="Write about yourself" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="yearsOfExperience"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Years</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Years of experience"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="trainingCourses"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Training & Courses</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Courses completed"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="awardsCertificates"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Awards & Certificates</FormLabel>
                <FormControl>
                  <Input placeholder="Awards & Certificates" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={loading}>
            {loading && <Loader2 className="animate-spin h-4 w-4 mr-2" />}
            Submit
          </Button>
        </form>
      </Form>
      <EditWhatImDoing data={defaultData?.whatIDo} />
    </>
  );
}
