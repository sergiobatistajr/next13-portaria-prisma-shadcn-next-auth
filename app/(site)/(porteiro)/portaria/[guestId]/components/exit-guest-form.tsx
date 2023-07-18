import { Guest } from "@prisma/client";
("use client");

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-hot-toast";

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
import { validateApartment } from "@/validators/apartment";
import { validateMercosul } from "@/validators/mercosul";

const formSchema = z.object({
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

interface ExitGuestFormProps {
  initialData: Guest;
}

const ExitGuestForm: React.FC<ExitGuestFormProps> = ({ initialData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      observations: "",
      entryDate: "",
      entryHour: new Date().toISOString().substr(0, 10),
      plate: "",
      apartment: 0,
      model: "",
      pax: 0,
    },
  });
  return (
    <div>
      <h1>Exit Guest Form</h1>
      <p>Guest: {initialData?.name}</p>
    </div>
  );
};

export default ExitGuestForm;
