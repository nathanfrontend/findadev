"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
const formSchema = z.object({
  search: z.string().min(0).max(50),
});
function SearchBar() {
  const router = useRouter();
  const query = useSearchParams();
  const search = query.get("search");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: query.get("search") ?? "",
    },
  });
  useEffect(() => {
    form.setValue("search", search ?? "");
  }, [search, form]);

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.search) {
      router.push(`/browse?search=${values.search}`);
    } else {
      router.push("/browse");
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2">
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="w-[440px]"
                  placeholder="Filter rooms by keywords, such as typescript, next.js, python"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">
          <SearchIcon className="mr-2" /> Search
        </Button>
      </form>
    </Form>
  );
}

export default SearchBar;
