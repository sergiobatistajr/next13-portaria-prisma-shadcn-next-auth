"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

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
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { useResetModal } from "@/hooks/use-reset-modal";

interface ResetModalProps {
  isOpen: boolean;
  onClose: () => void;
  id: string;
}
const formSchema = z
  .object({
    password: z.string().min(3, "Senha muito curta"),
    confirmPassword: z.string().min(3, "Senha muito curta"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Senhas não conferem",
    path: ["confirmPassword"],
  });

export const ResetModal: React.FC<ResetModalProps> = ({
  isOpen,
  onClose,
  id,
}) => {
  const [isloading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const useModal = useResetModal();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      await axios.patch(`/api/users/${id}`, values);
      toast.success("Senha resetada com sucesso!");
      router.refresh();
      router.push("/admin");
    } catch (error: any) {
      toast.error("Ocorreu um erro ao resetar a senha!");
    } finally {
      setIsLoading(false);
      form.reset();
      useModal.onClose();
    }
  }

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      title="Resetar senha"
      description="Resetar senha do usuário"
      isOpen={isOpen}
      onClose={onClose}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="*******" {...field} />
                </FormControl>
                <FormDescription>Este é a sua nova senha</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nova senha</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="*******" {...field} />
                </FormControl>
                <FormDescription>Confirme sua senha</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isloading} variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button disabled={isloading} variant="destructive" type="submit">
            Continuar
          </Button>
        </form>
      </Form>
    </Modal>
  );
};
