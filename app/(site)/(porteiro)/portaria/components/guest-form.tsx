"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import axios from "axios";

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
import { toast } from "react-hot-toast";

const formSchema = z.object({
  name: z
    .string()
    .nonempty({ message: "O nome do proprietário é obrigatório" }),
  observations: z.string().optional(),
  entryDate: z
    .string()
    .nonempty({ message: "A data de entrada é obrigatória" }),
  entryHour: z
    .string()
    .nonempty({ message: "A hora de entrada é obrigatória" }),
});

const GuestForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      observations: "",
      entryDate: "",
      entryHour: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      await axios.post("/api/portaria", values);
      toast.success(`Visitante ${values.name} cadastrado com sucesso`);
    } catch (error: any) {
      toast.error("Erro ao cadastrar visitante");
    } finally {
      setIsLoading(false);
      form.reset();
      router.refresh();
    }
  }

  return (
    <div className="flex items-center justify-normal mt-6">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="md:grid md:grid-cols-4 gap-4 mb-10"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input placeholder="Nome completo" {...field} />
                </FormControl>
                <FormDescription>Nome do passante</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="entryDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Data de Entrada</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormDescription>Data de entrada</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="entryHour"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hora da entrada</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormDescription>Hora da entrada</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="observations"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Observação</FormLabel>
                <FormControl>
                  <Input placeholder="Observação" {...field} />
                </FormControl>
                <FormDescription>Observação</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="md:col-span-1 flex justify-start">
            <Button disabled={isLoading} type="submit">
              Salvar
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default GuestForm;
