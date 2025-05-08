"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import SectionHeading from "@/components/ui/section-heading"
import { submitContactForm } from "@/lib/actions"

gsap.registerPlugin(ScrollTrigger)

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phoneNumber: z.string().min(5, {
    message: "Phone number must be at least 5 characters.",
  }),
  category: z.enum(["general", "project", "job", "collaboration"], {
    required_error: "Please select a category.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
})

interface ContactProps {
  userId: string
}

export default function Contact({ userId }: ContactProps) {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formStatus, setFormStatus] = useState<{
    type: "success" | "error" | null
    message: string | null
  }>({
    type: null,
    message: null,
  })
  const sectionRef = useRef<HTMLElement>(null)
  const formRef = useRef<HTMLDivElement>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      category: "general",
      message: "",
    },
  })

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Form animation
      gsap.fromTo(
        formRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 80%",
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true)
      setFormStatus({ type: null, message: null })

      const result = await submitContactForm(userId, values)

      if (result.success) {
        setFormStatus({
          type: "success",
          message: "Thank you for your message! I'll get back to you soon. Please check your email for a confirmation.",
        })
        form.reset()
      } else {
        setFormStatus({
          type: "error",
          message: "There was a problem sending your message. Please try again.",
        })
      }
    } catch (error) {
      setFormStatus({
        type: "error",
        message: "There was a problem sending your message. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" ref={sectionRef} className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-3xl">
        <SectionHeading title="Contact Me" subtitle="Get in touch" />

        <div ref={formRef} className="mt-12">
          {formStatus.type && (
            <Alert
              variant={formStatus.type === "success" ? "default" : "destructive"}
              className="mb-6 animate-in fade-in-50 slide-in-from-bottom-5 duration-300"
            >
              {formStatus.type === "success" ? (
                <CheckCircle2 className="h-4 w-4" />
              ) : (
                <AlertCircle className="h-4 w-4" />
              )}
              <AlertTitle>{formStatus.type === "success" ? "Success!" : "Error!"}</AlertTitle>
              <AlertDescription>{formStatus.message}</AlertDescription>
            </Alert>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} />
                      </FormControl>
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
                        <Input placeholder="Your email" type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Your phone number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Inquiry Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="general">General Inquiry</SelectItem>
                          <SelectItem value="project">Project Inquiry</SelectItem>
                          <SelectItem value="job">Job Opportunity</SelectItem>
                          <SelectItem value="collaboration">Collaboration</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>Select the type of inquiry to help me respond appropriately.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Your message" className="min-h-32" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Send className="h-4 w-4" />
                    Send Message
                  </span>
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  )
}
