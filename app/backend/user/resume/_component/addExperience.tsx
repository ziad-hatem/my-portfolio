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
import { WhatIDo, WorkExperience } from "@prisma/client";
import { Loader2, Plus } from "lucide-react";
import * as React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Input } from "@/components/ui/input";
import axios from "axios";
import { addDays } from "date-fns";
import { DateRange } from "react-day-picker";
import toast from "react-hot-toast";
import { DatePickerWithRange } from "./DateRangePicker";

const formSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1).max(255),
  date: z.any(),
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
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 30) as Date,
  });

  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });
  const { reset } = form;
  React.useEffect(() => {
    reset({
      title: isEdit && details ? details.title : "",
      description: isEdit && details ? details.description : "",
      date:
        isEdit && details
          ? setDate({ from: details.startDate, to: details.endDate })
          : date,
    });
  }, [isEdit, details, reset, open]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formattedValues = {
      ...values,
      id: isEdit && details.id,
      startDate: date?.from,
      endDate: date?.to,
    };

    if (isEdit) {
      try {
        setLoading(true);
        await axios.patch(
          "/api/user/addexperience?email=ziadhatemdev@gmail.com",
          formattedValues
        );
        toast.success("Update Experience Success");
        setIsEdit(false);
        refreshData();
        setLoading(false);
      } catch (error) {
        console.log(error);
        toast.error("Update Experience Failed");
        setLoading(false);
      }
    } else {
      try {
        setLoading(true);
        await axios.post(
          "/api/user/addexperience?email=ziadhatemdev@gmail.com",
          formattedValues
        );
        toast.success("Add Experience Success");
        setOpen(false);
        refreshData();
        setLoading(false);
      } catch (error) {
        console.log(error);
        toast.error("Add Experience Failed");
        setLoading(false);
      }
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
            <DrawerTitle>Add Your Experience</DrawerTitle>
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
                      <Input placeholder="Placeholder" {...field} />
                    </FormControl>
                    <FormDescription>Description</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input placeholder="Placeholder" {...field} />
                    </FormControl>
                    <FormDescription>Description</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date</FormLabel>
                    <DatePickerWithRange
                      date={date}
                      setDate={setDate}
                      className="rounded-md border"
                      {...field}
                    />
                    <FormDescription>
                      Select the start and end date of your education.
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
