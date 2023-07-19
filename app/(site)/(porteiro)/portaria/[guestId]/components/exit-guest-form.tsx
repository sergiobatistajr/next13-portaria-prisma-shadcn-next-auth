"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-hot-toast";
import { format } from "date-fns";

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
import Container from "@/components/ui/container";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

const formSchema = z
  .object({
    name: z
      .string()
      .nonempty({ message: "O nome do proprietário é obrigatório" }),
    entryDate: z.date(),
    entryHour: z
      .string()
      .nonempty({ message: "A hora de entrada é obrigatória" }),
    exitDate: z.date({ invalid_type_error: "Data de saída inválida" }),
    exitHour: z
      .string({
        invalid_type_error: "Hora de saída inválida",
      })
      .nonempty({ message: "A hora de saída é obrigatória" }),
  })
  .refine(
    (data) => {
      const entryDate = new Date(data.entryDate);
      const entryHour = data.entryHour.split(":");
      const exitDate = new Date(data.exitDate);
      const exitHour = data.exitHour.split(":");

      const entry = new Date(
        entryDate.getFullYear(),
        entryDate.getMonth(),
        entryDate.getDate(),
        Number(entryHour[0]),
        Number(entryHour[1])
      );
      const exit = new Date(
        exitDate.getFullYear(),
        exitDate.getMonth(),
        exitDate.getDate(),
        Number(exitHour[0]),
        Number(exitHour[1])
      );

      return entry < exit;
    },
    {
      message: "A data de saída deve ser maior que a data de entrada",
      path: ["exitDate"],
    }
  );

interface ExitGuestFormProps {
  initialData: {
    id: string;
    name: string;
    entryDate: Date;
    entryHour: string;
  };
}

const ExitGuestForm: React.FC<ExitGuestFormProps> = ({ initialData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      entryDate: new Date(),
      entryHour: "",
      exitDate: new Date(),
      exitHour: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      await axios.patch(`/api/portaria/${initialData.id}`, values);
      toast.success(`Visitante ${values.name} atualizado com sucesso`);
      router.refresh();
      router.push("/portaria");
    } catch (error: any) {
      toast.error("Erro ao cadastrar atualizar visitante");
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <Container>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="pt-3 md:grid md:grid-cols-4 gap-4 mb-10">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome completo" {...field} />
                  </FormControl>
                  <FormDescription>Nome do visitante</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="entryDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data de entrada</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Input
                          className={cn(
                            " pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                          value={
                            field.value
                              ? format(field.value, "dd/MM/yyyy")
                              : "Escolha a data"
                          }
                        />
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        // @ts-ignore
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    Data de entrada do visitante
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="entryHour"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data da entrada</FormLabel>
                  <FormControl>
                    <Input type="time" {...field} />
                  </FormControl>
                  <FormDescription>
                    Hora da entrada do visitante
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="exitDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data da saída</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Input
                          className={cn(
                            " pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                          value={
                            field.value
                              ? format(field.value, "dd/MM/yyyy")
                              : "Escolha a data"
                          }
                        />
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        // @ts-ignore
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>Data da saída do visitante</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="exitHour"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hora da saída</FormLabel>
                  <FormControl>
                    <Input type="time" {...field} />
                  </FormControl>
                  <FormDescription>Hora da saída do visitante</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-x-2 flex items-center justify-start w-full">
            <Button disabled={isLoading} type="submit">
              Salvar
            </Button>
          </div>
        </form>
      </Form>
    </Container>
  );
};

export default ExitGuestForm;
