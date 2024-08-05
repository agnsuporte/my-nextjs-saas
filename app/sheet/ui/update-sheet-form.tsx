"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderIcon } from "lucide-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";

import AuthFormMessage from "@/components/auth/auth-form-message";
/**
 * Components
 */
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

import { formatTimeToLocal } from "@/lib/utils";
/**
 *
 */
import { UpdateSheetSchema } from "@/schemas/sheet";
import type { Sheet } from "@/types/sheet";
import { updateSheet } from "@/actions/sheet";
import { useRouter } from "next/navigation";

interface Props {
  sheet: Sheet;
}

export default function UpdateSheetForm({ sheet }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const form = useForm<z.infer<typeof UpdateSheetSchema>>({
    resolver: zodResolver(UpdateSheetSchema),
    defaultValues: {
      id: sheet.id,
      local: sheet.local,
      date: sheet.date.toISOString().split("T")[0],
      start_time: formatTimeToLocal(sheet.start_time),
      end_time: formatTimeToLocal(sheet.end_time),
      lunch_start: formatTimeToLocal(sheet.lunch_start),
      lunch_end: formatTimeToLocal(sheet.lunch_end),
      return_lunch: formatTimeToLocal(sheet.return_lunch),
      end_work: formatTimeToLocal(sheet.end_work),
    },
  });

  const onSubmit = async (values: z.infer<typeof UpdateSheetSchema>) => {
    startTransition(async () => {
      try {
        const { success, error } = await updateSheet(values);
        if (error) {
          setError(error);
          setSuccess(success || "");
        } else {
       
          router.push("/sheet");
        }
      } catch (error) {
        setSuccess("");
        setError("Algo deu errado.");
        console.log(error);
      }
    });
  };

  return (
    <Card className="border-0">
      <CardHeader>
        <CardTitle>Registrar em Folhar</CardTitle>
        <CardDescription>Seu dia de trabalho</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="local"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Local</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="on"
                      type="text"
                      defaultValue="21/07/2024"
                      placeholder="Obra que trabalhou"
                      {...field}
                      // disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col gap-2 mb-2 md:mb-4 md:flex-row md:gap-4 w-full content-between">
              <FormField
                control={form.control}
                name="start_time"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Entrada 01</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="end_time"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Saída 01</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col gap-2 mb-2 md:mb-4 md:flex-row md:gap-4 w-full content-between">
              <FormField
                control={form.control}
                name="lunch_start"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Almoço</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lunch_end"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Almoço Retorno</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col gap-2 mb-2 md:mb-4 md:flex-row md:gap-4 w-full content-between">
              <FormField
                control={form.control}
                name="return_lunch"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Entrada 02</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="end_work"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Saída 02</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {error && (
              <AuthFormMessage type="error" message={error} title="Erro" />
            )}
            {success && (
              <AuthFormMessage
                type="success"
                message={success}
                title="Sucesso"
              />
            )}

            <Separator />

            <div className="w-full flex justify-center items-center py-3">
              <Button variant={"default"} disabled={isPending}>
                <LoaderIcon
                  className={!isPending ? "hidden" : "animate-spin mr-2"}
                />
                <span>Salvar</span>
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
