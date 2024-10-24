"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { UploadDropzone } from "@uploadthing/react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import FileUpload from "./file-upload";
import { useState } from "react";
import toast from "react-hot-toast";
import { User } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  image: z.any(),
  position: z.string().min(1).max(255),
  name: z.string().min(1).max(9999),
  email: z.string().email().min(1).max(255),
  number: z.coerce.string().min(1),
  location: z.string().min(1).max(255),
  linkedinUrl: z.string().min(1).max(255),
});

function UpdateForm({ defaultValues }: { defaultValues: any }) {
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: defaultValues.image || "",
      position: defaultValues.position || "",
      name: defaultValues.name || "",
      email: defaultValues.email,
      number: defaultValues.phoneNumber || "",
      location: defaultValues.location || "",
      linkedinUrl: defaultValues.linkedinUrl || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setSubmitting(true);
      const response = await axios.post(
        "/api/user/updateuser",
        {
          ...values,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      toast.success("Data Updated successfully");
      router.push("/backend");
    } catch (error) {
      console.log(error);
      toast.error("Error Update data");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form
        noValidate
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 mx-8"
      >
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => {
            return (
              <FormItem className="w-[300px] px-3">
                <FormLabel>Profile picture</FormLabel>
                <FormControl>
                  <FileUpload
                    apiEndpoint="imageUploader"
                    value={field.value}
                    onChange={(files) => field.onChange(files)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="position"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Position</FormLabel>
              <FormControl>
                <Input placeholder="Enter your position" {...field} />
              </FormControl>
              <FormDescription>
                This is the position that will be used in the dashboard.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your name" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Write your number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="linkedinUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Linkedin Url</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription>
                This is the linkedin url that will be used in the dashboard.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={submitting}>
          Submit
        </Button>
      </form>
    </Form>
  );
}
export default UpdateForm;
