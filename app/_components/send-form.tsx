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
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
const formSchema = z.object({
  fullname: z.string().min(1).max(255),
  email: z.string().min(1).max(255),
  message: z.string().min(1),
  subject: z.string().min(1),
});

const SendForm = () => {
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      email: "",
      message: "",
      subject: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const toastId = toast.loading("Sending Message");
    try {
      setLoading(true);
      await axios.post("/api/send", values);
      toast.success("Message Sent", { id: toastId });
    } catch (error) {
      toast.error("Failed to send message");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }
  return (
    <Form {...form}>
      <form
        noValidate
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 w-full"
      >
        <div className="flex w-full gap-3 justify-around">
          {" "}
          <FormField
            control={form.control}
            name="fullname"
            render={({ field }) => (
              <FormItem className="w-[50%]">
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Full Name"
                    className="border-[#3A3A3A]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-[50%] border-white">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Email Address"
                    className="border-[#3A3A3A]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject</FormLabel>
              <FormControl>
                <Input
                  placeholder="Subject"
                  className="border-[#3A3A3A]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Placeholder"
                  rows={10}
                  className="border-[#3A3A3A]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          variant={"secondary"}
          type="submit"
          className="flex gap-2 mt-auto"
          disabled={loading}
        >
          Send <Send className="h-4 w-4" />
        </Button>
      </form>
    </Form>
  );
};

export default SendForm;
