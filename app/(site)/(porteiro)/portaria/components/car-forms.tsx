"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import axios from "axios";

import { validateMercosul } from "@/validators/mercosul";
import { validateApartment } from "@/validators/apartment";
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
  plate: z
    .string()
    .nonempty({ message: "A placa é obrigatória" })
    .refine(validateMercosul, {
      message: "Placa inválida no padrão Mercosul",
    }),
  observations: z.string().optional(),
  model: z.string().nonempty({ message: "O modelo é obrigatório" }),
  pax: z.coerce
    .number()
    .int()
    .positive({ message: "O número de passageiros deve ser no mínimo 1" }),
  apartment: z.coerce
    .number()
    .refine(validateApartment, {
      message: "Apartamento inválido",
    })
    .optional(),
  name: z
    .string()
    .nonempty({ message: "O nome do proprietário é obrigatório" }),
  entryDate: z
    .string()
    .nonempty({ message: "A data de entrada é obrigatória" }),
  entryHour: z
    .string()
    .nonempty({ message: "A hora de entrada é obrigatória" }),
});

const CarForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      apartment: 0,
      model: "",
      pax: 0,
      plate: "",
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
      router.refresh();
      form.reset();
    } catch (error: any) {
      toast.error("Erro ao cadastrar visitante");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10"
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
                <FormDescription>Este é o nome do Visitante</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="plate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Placa</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Placa do carro"
                    {...field}
                    value={field.value.toLocaleUpperCase()}
                  />
                </FormControl>
                <FormDescription>Este é a placa do carro</FormDescription>
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
                  <Input placeholder="Modelo do carro" {...field} />
                </FormControl>
                <FormDescription>Modelo do carro</FormDescription>
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
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormDescription>Data da entrada</FormDescription>
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
            name="pax"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Passantes</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Passantes" {...field} />
                </FormControl>
                <FormDescription>Quantidade de passante</FormDescription>
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
                  <Input type="number" placeholder="Apartamento" {...field} />
                </FormControl>
                <FormDescription>Apartamento</FormDescription>
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
          <div className="col-span-1 md:col-span-3 flex justify-start">
            <Button disabled={isLoading} type="submit">
              Salvar
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CarForm;
