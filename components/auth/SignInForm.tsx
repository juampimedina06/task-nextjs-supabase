"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import toast from "react-hot-toast";
import { AuthFormProps } from "./AuthForm";

const formSchema = z.object({
  email: z.string().email("Correo inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
});

type FormData = z.infer<typeof formSchema>;

const SignInForm = ({ setTypeSelected }: AuthFormProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      console.log(data);
      toast.success("Login OK (mock)");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Error inesperado";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const googleSignIn = async () => {
    toast("Google login pendiente");
  };

  const githubSignIn = async () => {
    toast("Github login pendiente");
  };

  return (
    <div className="w-full backdrop-blur-xl py-2 rounded-4xl">
      <div className="text-center">
        <h1 className="text-3xl font-semibold my-4">Iniciar Sesión</h1>
        <p className="text-sm text-muted-foreground mb-8">
          Ingresa para acceder
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mx-4 space-y-4">
        {/* Email */}
        <div>
          <label className="text-sm">Correo</label>
          <Input
            type="email"
            placeholder="name@example.com"
            disabled={isLoading}
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="text-sm">Contraseña</label>
          <Input
            type="password"
            placeholder="*****"
            disabled={isLoading}
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Recover */}
        <div
          onClick={() => setTypeSelected("recover-password")}
          className="underline text-sm text-end cursor-pointer"
        >
          ¿Olvidaste tu contraseña?
        </div>

        {/* Submit */}
        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading && (
            <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
          )}
          Ingresar
        </Button>

        {/* Divider */}
        <div className="text-center text-xs text-muted-foreground">
          — o continúa con —
        </div>

        {/* OAuth */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={googleSignIn}
            disabled={isLoading}
          >
            Google
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={githubSignIn}
            disabled={isLoading}
          >
            Github
          </Button>
        </div>
      </form>

      <p className="text-center text-sm mt-4">
        ¿No tienes cuenta?{" "}
        <span
          onClick={() => setTypeSelected("sign-up")}
          className="underline cursor-pointer"
        >
          Regístrate
        </span>
      </p>
    </div>
  );
};

export default SignInForm;