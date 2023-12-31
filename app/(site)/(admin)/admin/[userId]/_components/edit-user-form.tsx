"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { User } from "@prisma/client";
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
import { Checkbox } from "@/components/ui/checkbox";

enum UserRole {
  Admin = "admin",
  Porteiro = "porteiro",
  Relatorio = "relatorio",
}

const formSchema = z
  .object({
    name: z.string().min(3, "Nome muito curto"),
    username: z.string().min(3, "Usuário muito curto"),
    role: z.enum(["admin", "porteiro", "relatorio"]),
    isActive: z.boolean(),
    password: z.string().optional(),
    confirmPassword: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.password && data.confirmPassword) {
        return data.password === data.confirmPassword;
      }
      return true;
    },
    {
      message: "As senhas não são iguais",
      path: ["confirmPassword"],
    }
  );
interface EditUserFormProps {
  initialValues: Awaited<User>;
}

const EditUser: React.FC<EditUserFormProps> = ({ initialValues }) => {
  const [isShow, setIsShow] = useState(false);
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...initialValues,
      password: "",
      confirmPassword: "",
    },
  });
  const isLoading = form.formState.isSubmitting;
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await axios.patch(`/api/users/${initialValues.id}`, values);
      toast.success("Usuário atualizado com sucesso!");
      router.refresh();
      router.push("/admin");
    } catch (error: any) {
      toast.error("Ocorreu um erro ao atualizar o usuário!");
    }
  }

  return (
    <div className="container">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {!isShow && (
            <div className="pt-5 md:grid md:grid-cols-4 gap-4 mb-10">
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
                      <Input
                        disabled={isLoading}
                        placeholder="Seu usuário"
                        {...field}
                      />
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
                      disabled={isLoading}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleciona sua função" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(UserRole).map((role) => (
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
              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        disabled={isLoading}
                        checked={field.value}
                        // @ts-ignore
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Ativo</FormLabel>
                      <FormDescription>
                        Selecione se o usuário está ativo ou inativo
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          )}
          <Button
            variant="link"
            type="button"
            disabled={isLoading}
            onClick={() => setIsShow(!isShow)}
          >
            {isShow ? "Ocultar" : "Mostrar"} Resetar senha
          </Button>
          {isShow && (
            <div className="pt-5 md:grid md:grid-cols-4 gap-4 mb-10">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nova senha</FormLabel>
                    <FormControl>
                      <Input disabled={isLoading} type="password" {...field} />
                    </FormControl>
                    <FormDescription>Está é sua senha</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirme a nova senha</FormLabel>
                    <FormControl>
                      <Input disabled={isLoading} type="password" {...field} />
                    </FormControl>
                    <FormDescription>Confirme a senha</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
          <div className="space-x-2 flex justify-end">
            <Button
              type="button"
              disabled={isLoading}
              variant="outline"
              onClick={() => router.back()}
            >
              Voltar
            </Button>
            <Button disabled={isLoading} type="submit">
              Salvar
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EditUser;
