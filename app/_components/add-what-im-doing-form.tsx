"use client";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Plus } from "lucide-react";
import * as React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useContextProvider } from "./providers/context-provider";
import { WhatIDo } from "@prisma/client";

const formSchema = z.object({
  title: z.string(),
  text: z.string().min(1).max(255),
});

function Component({
  isEdit = false,
  setIsEdit = () => {},
  details = null,
}: {
  isEdit: boolean;
  details?: WhatIDo | null;
  setIsEdit: (isEdit: boolean) => void;
}) {
  const { userData, refreshData } = useContextProvider();
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: isEdit ? details?.title : "",
      text: isEdit ? details?.text : "",
    },
  });
  const { reset } = form;
  React.useEffect(() => {
    reset({
      title: isEdit && details ? details.title : "",
      text: isEdit && details ? details.text : "",
    });
  }, [isEdit, details, reset]);
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const data = {
      email: userData?.email!,
      title: values.title.trim(),
      text: values.text.trim(),
      id: details?.id || null,
    };

    const response = await fetch(
      isEdit ? "/api/user/updatewhatimdoing" : "/api/user/whatimdoing",
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );

    if (response.ok) {
      toast.success("Data added successfully");
      setLoading(false);
      isEdit ? setIsEdit(false) : setOpen(false);
      refreshData();
    } else {
      setLoading(false);
      toast.error(response.statusText);
    }
  }

  return (
    <Drawer open={isEdit || open} onOpenChange={isEdit ? setIsEdit : setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Plus className="h-4 w-4" /> Add
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-sm:px-2">
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Add What You're Doing</DrawerTitle>
          </DrawerHeader>
          <Form {...form}>
            <form
              noValidate
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Title" {...field} />
                    </FormControl>
                    <FormDescription>
                      Title for What You're Doing
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="text"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Text</FormLabel>
                    <FormControl>
                      <Textarea
                        className="min-h-28"
                        placeholder="Description"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Description For What's you're Doing
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DrawerFooter>
                <Button
                  type="submit"
                  className="flex items-center gap-2"
                  disabled={loading}
                >
                  {loading && <Loader2 className="h-4 w-4 animate-spin" />}{" "}
                  Submit
                </Button>
                <DrawerClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </form>
          </Form>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default Component;
