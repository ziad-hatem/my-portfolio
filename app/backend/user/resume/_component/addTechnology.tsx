"use client";
import { useContextProvider } from "@/app/_components/providers/context-provider";
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
import axios from "axios";
import { addDays } from "date-fns";
import { DateRange } from "react-day-picker";
import toast from "react-hot-toast";
import FileUpload from "@/app/_components/file-upload";

const formSchema = z.object({
  name: z.string().min(1).max(255),
  icon: z.any(),
});

function Component({
  isEdit = false,
  setIsEdit = () => {},
  details = null,
}: {
  isEdit: boolean;
  details?: any | null;
  setIsEdit: (isEdit: boolean) => void;
}) {
  const { userData, refreshData } = useContextProvider();

  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      icon: "",
    },
  });
  const { reset } = form;
  React.useEffect(() => {
    reset({
      name: isEdit && details ? details.name : "",
      icon: isEdit && details ? details.icon : "",
    });
  }, [isEdit, details, reset, open]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const { icon, ...rest } = values;
    const formattedValues = {
      ...rest,
      id: isEdit && details.id,
      icon,
    };

    try {
      if (isEdit) {
        setLoading(true);
        await axios.patch(
          "/api/user/myskills?email=ziadhatem2022@gmail.com",
          formattedValues
        );
        toast.success("Update Skills Success");
        setIsEdit(false);
        setLoading(false);
      } else {
        setLoading(true);
        await axios.post(
          "/api/user/myskills?email=ziadhatem2022@gmail.com",
          formattedValues
        );
        toast.success("Add Skills Success");
        setOpen(false);
      }
      refreshData();
    } catch (error) {
      console.error(error);
      toast.error("Operation Failed");
    } finally {
      setLoading(false);
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
            <DrawerTitle>Add You're Skills</DrawerTitle>
          </DrawerHeader>
          <Form {...form}>
            <form
              noValidate
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8"
            >
              <FormField
                control={form.control}
                name="icon"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Icon</FormLabel>
                    <FormControl>
                      <FileUpload
                        apiEndpoint="imageUploader"
                        value={field.value}
                        onChange={(files) => field.onChange(files)}
                      />
                    </FormControl>
                    <FormDescription>Please upload an icon.</FormDescription>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>name</FormLabel>
                    <FormControl>
                      <Input placeholder="Placeholder" {...field} />
                    </FormControl>
                    <FormDescription>Description</FormDescription>
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
