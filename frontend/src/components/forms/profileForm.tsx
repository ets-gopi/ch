"use client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { userProfileSchema } from "@/lib/schemas/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useRef } from "react";

type UserProfileFormValues = z.infer<typeof userProfileSchema>;
export default function ProfileForm() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const form = useForm<UserProfileFormValues>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      username: "",
      bio: "",
      avatar: undefined,
    },
  });
  function onSubmit(data: UserProfileFormValues) {
    console.log("Submitted:", data);
    // submit to server, API, etc.
    // form.reset();
    // if (fileInputRef.current) {
    //   fileInputRef.current.value = "";
    // }

    router.push("/chat-room");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="mb-2">
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter Username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className="mb-2">
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Input placeholder="Enter Bio" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>

        <FormField
          control={form.control}
          name="avatar"
          render={({ field }) => (
            <FormItem className="mb-2">
              <FormLabel>Profile Picture</FormLabel>
              <FormControl>
                <Input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => field.onChange(e.target.files)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
        <Button type="submit">Create</Button>
      </form>
    </Form>
  );
}
