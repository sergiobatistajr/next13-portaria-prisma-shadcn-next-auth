"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-hot-toast";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

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
import { validateApartment } from "@/validators/apartment";
import { validateMercosul } from "@/validators/mercosul";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

const formSchema = z
  .object({
    plate: z
      .string()
      .refine(validateMercosul, {
        message: "Placa inválida no padrão Mercosul",
      })
      .optional(),
    observations: z.string().optional(),
    model: z.string().optional(),
    pax: z.coerce.number().int().optional(),
    apartment: z.coerce
      .number()
      .refine(validateApartment, {
        message: "Apartamento inválido",
      })
      .optional(),
    name: z.string().nonempty({ message: "O nome é obrigatório" }),
    entryDate: z.date(),
    entryHour: z
      .string()
      .nonempty({ message: "A hora de entrada é obrigatória" }),
  })
  .refine(
    (data) => {
      if (data.model && !data.plate) {
        return false;
      }
      return true;
    },
    {
      params: ["plate", "model"],
      message: "Modelo só pode ser preenchido se a placa for preenchida",
      path: ["plate"],
    }
  )
  .refine(
    (data) => {
      if (data.plate && !data.model) {
        return false;
      }
      return true;
    },
    {
      params: ["plate", "model"],
      message: "Modelo é obrigatório se a placa for preenchida",
      path: ["model"],
    }
  )
  .refine(
    (value) => {
      if (value.plate && !value.pax) {
        return false;
      }
      return true;
    },
    {
      params: ["plate", "pax"],
      message: "Número de passageiros é obrigatório se a placa for preenchida",
      path: ["pax"],
    }
  )
  .refine(
    (value) => {
      if (value.pax && !value.plate) {
        return false;
      }
      return true;
    },
    {
      params: ["plate", "pax"],
      message:
        "Número de passageiros só pode ser preenchido se a placa for preenchida",
      path: ["plate"],
    }
  );

const GuestForm = () => {
  const [isCar, setIsCar] = useState(true);
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      observations: "",
      plate: "",
      apartment: 0,
      model: "",
      pax: 0,
      entryDate: new Date(),
      entryHour: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await axios.post("/api/portaria", values);
      toast.success(`${values.name} cadastrado com sucesso`);
      router.refresh();
      router.push("/portaria");
    } catch (error: any) {
      toast.error("Erro ao cadastrar");
    }
  }

  return (
    <div className="container">
      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button onClick={() => setIsCar(!isCar)}>
          {isCar ? "Entrada de Pedestre" : "Entrada de Carro"}
        </Button>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="md:grid md:grid-cols-4 gap-4 mb-10">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Nome completo"
                      {...field}
                    />
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
                  <FormLabel>Data da entrada</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Input
                          disabled={isLoading}
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
                        locale={ptBR}
                        selected={field.value}
                        onDayClick={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
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
                    <Input disabled={isLoading} type="time" {...field} />
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
                    <Input
                      disabled={isLoading}
                      placeholder="Observação"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Observação sobre a entrada</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {isCar && (
              <>
                <FormField
                  control={form.control}
                  name="plate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Placa</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          placeholder="Veículo"
                          {...field}
                          onChange={(e) =>
                            field.onChange(e.target.value.toUpperCase())
                          }
                        />
                      </FormControl>
                      <FormDescription>Placa do veículo</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="model"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Modelo</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          placeholder="Modelo"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>Modelo do veículo</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="pax"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Passante</FormLabel>
                      <FormControl>
                        <Input disabled={isLoading} type="number" {...field} />
                      </FormControl>
                      <FormDescription>Número de passageiros</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="apartment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Apartamento</FormLabel>
                      <FormControl>
                        <Input {...field} disabled={isLoading} type="number" />
                      </FormControl>
                      <FormDescription>Número do apartamento</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              disabled={isLoading}
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              Voltar
            </Button>
            <Button disabled={isLoading} type="submit">
              Entrar
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default GuestForm;
