"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { createRoomAction } from "./actions";
import { Textarea } from "@/components/ui/textarea";
import { FancyMultiSelect } from "@/components/ui/multi-select";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Slash } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(1).max(50),
  description: z.string().min(1).max(250),
  githubRepo: z.string().min(1).max(50),
  tags: z.string().array().min(1).max(50),
  createdAt: z.date().default(new Date()),
  updatedAt: z.date().default(new Date()),
});
export type form = z.infer<typeof formSchema>;
export function CreateRoomForm() {
  const { toast } = useToast();
  const router = useRouter();
  const session = useSession();
  const form = useForm<form>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      githubRepo: "",
      tags: [],
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const room = await createRoomAction(values);
    toast({
      title: "Room Created",
      description: "Your room was successfully created",
    });
    router.push(`/rooms/${room.id}`);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex items-center space-x-4 ">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <Button variant="ghost" disabled>
                  <Avatar className="mr-2 h-8 w-8">
                    <AvatarImage src={session?.data?.user.image ?? ""} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  {session?.data?.user.name!}
                </Button>
              </FormItem>
            )}
          />
          <Slash />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Dev Finder Is Awesome" />
                </FormControl>
                <FormDescription>
                  This is your public room name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Im working on a side project, come join me"
                  className="resize-none"
                />
              </FormControl>
              <FormDescription>
                Please describe what you are developing
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="githubRepo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Github Repo</FormLabel>
              <FormControl>
                <Input {...field} placeholder="https://github.com/" />
              </FormControl>
              <FormDescription>
                Please put a link to the project you are working on
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <FancyMultiSelect form={form} />
              </FormControl>
              <FormDescription>
                List your programming languages, frameworks, libraries so people
                can find you content
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
