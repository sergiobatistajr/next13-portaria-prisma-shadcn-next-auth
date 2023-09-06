"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-hot-toast";
import { format } from "date-fns";
import { Guest } from "@prisma/client";
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
import Container from "@/components/ui/container";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { validateMercosul } from "@/validators/mercosul";
import { validateApartment } from "@/validators/apartment";

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
    apartment: z.coerce
      .number()
      .refine(validateApartment, {
        message: "Apartamento inválido",
      })
      .nullable(),
    plate: z
      .string()
      .refine(validateMercosul, {
        message: "Placa inválida no padrão Mercosul",
      })
      .nullable(),
    model: z.string().nullable(),
    pax: z.coerce.number().int().nullable(),
  })
  .refine(
    (data) => {
      const entryDate = data.entryDate;
      const entryHour = data.entryHour.split(":");
      const exitDate = data.exitDate;
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
  )
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

const FixGuestForm = ({ initialData }: { initialData: Awaited<Guest> }) => {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...initialData,
      plate: initialData.plate ?? "",
      apartment: initialData.apartment ?? 0,
      observations: initialData.observations ?? "",
      model: initialData.model ?? "",
      pax: initialData.pax ?? 0,
      exitDate: initialData.exitDate!,
      exitHour: initialData.exitHour!,
    },
  });
  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/portaria/${initialData.id}`, values);
      toast.success(`${values.name} atualizado com sucesso`);
      router.refresh();
      router.push("/report");
    } catch (error: any) {
      toast.error("Erro ao atualizar");
    }
  };
  return (
    <div className="container">
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
                    <Input {...field} />
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
                    <Input type="time" {...field} />
                  </FormControl>
                  <FormDescription>Hora da entrada</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {initialData.plate ? (
              <FormField
                control={form.control}
                name="plate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Placa</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>Placa do veículo</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : null}
            {initialData.model ? (
              <FormField
                control={form.control}
                name="model"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Modelo</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>Modelo do veículo</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : null}
            {initialData.pax ? (
              <FormField
                control={form.control}
                name="pax"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Passante</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormDescription>Número de passageiros</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : null}
            {initialData.apartment ? (
              <FormField
                control={form.control}
                name="apartment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Apartamento</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormDescription>Número do apartamento</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : null}
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
                        onDayClick={field.onChange}
                        locale={ptBR}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>Data da saída</FormDescription>
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
                  <FormDescription>Hora da saída</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              disabled={isLoading}
              variant="outline"
              onClick={() => router.back()}
            >
              Voltar
            </Button>
            <Button disabled={isLoading} type="submit">
              Saída
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default FixGuestForm;
