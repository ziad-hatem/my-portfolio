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
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  image: z.any(),
  position: z.string().min(1).max(255),
  name: z.string().min(1).max(9999),
  email: z.string().email().min(1).max(255),
  number: z.coerce.string().min(1),
  location: z.string().min(1).max(255),
  linkedinUrl: z.string().min(1).max(255),
});

function UploadForm() {
  const [submitting, setSubmitting] = useState(false);
  const [image, setImage] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: null,
      position: "",
      name: "",
      email: "",
      number: "",
      location: "",
      linkedinUrl: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setSubmitting(true);
      const response = await axios.post("/api/addData", values, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const data = await response.data;
      toast.success("Data added successfully");
    } catch (error) {
      console.log(error);
      toast.error("Error adding data");
    } finally {
      setSubmitting(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    } else {
      setImage(null);
    }
  };

  return (
    <Form {...form}>
      <form
        noValidate
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 mx-8 my-8"
      >
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => {
            const { onChange, ref } = field;
            return (
              <FormItem className="w-[300px] px-3">
                <FormLabel>Profile picture</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={(e) => {
                      handleImageChange(e);
                      onChange(e.target.files);
                    }}
                    ref={ref}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        {image && (
          <div className="w-[300px] px-3">
            <img
              src={image}
              alt="Selected Image"
              className="object-contain w-full h-auto"
            />
          </div>
        )}
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
                <Input placeholder="" {...field} />
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
              <FormDescription></FormDescription>
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
              <FormDescription></FormDescription>
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
          {submitting && <Loader2 className="animate-spin h-4 w-4 mr-2" />}
          Submit
        </Button>
      </form>
    </Form>
  );
}
export default UploadForm;
