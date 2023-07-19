"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { User } from "@prisma/client";

const roles = ["admin", "porteiro", "relatorio"];

const formSchema = z.object({
  name: z.string().min(3, "Nome muito curto"),
  username: z.string().min(3, "Usuário muito curto"),
  role: z.enum(["admin", "porteiro", "relatorio"]),
});
interface EditUserFormProps {
  initialValues: User;
}

const EditUser: React.FC<EditUserFormProps> = ({ initialValues }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues || {
      name: "",
      username: "",
      role: "relatorio",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      await axios.post("/api/register", values);
      toast.success("Usuário cadastrado com sucesso!");
      router.refresh();
    } catch (error: any) {
      toast.error("Ocorreu um erro ao cadastrar o usuário!");
    } finally {
      setIsLoading(false);
      form.reset();
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="pt-5 md:grid md:grid-cols-4 gap-4 mb-10">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input placeholder="Nome completo" {...field} />
                </FormControl>
                <FormDescription>Este é seu nome completo</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Usuário</FormLabel>
                <FormControl>
                  <Input placeholder="Seu usuário" {...field} />
                </FormControl>
                <FormDescription>Este é seu usuário</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Função</FormLabel>
                <Select
                  // @ts-ignore
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleciona sua função" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role} value={role}>
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>Esta é sua função</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="space-x-2 flex items-center justify-start w-full">
          <Button disabled={isLoading} type="submit">
            Cadastar
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EditUser;
