"use client";

import Image from "next/image";
import signin from "../../../public/images/shopPhone.webp";
import { Button } from "@/components/ui/Button";
import { SignInContainer } from "@/modules/auth/sign-in";

export default function Login() {
  return (
    <main className="flex min-h-screen">
      <div className="w-1/2 flex items-center justify-center bg-white p-8">
        <div className="w-full max-w-md">
          <div className="mb-4 gap-2 flex flex-col items-center">
            <h1 className="text-3xl font-medium">Acesse sua conta</h1>
            <p className="text-gray-500 text-center">
              Preencha os campos abaixo para entrar na sua conta e acessar a
              plataforma
            </p>
          </div>
          <SignInContainer />
          <div className="text-center mt-4">
            <p className="text-gray-600 mb-2">Não tem uma conta?</p>
            <Button
              variant="outline"
              onClick={() => window.location.href = '/sign-up'}
            >
              Criar conta
            </Button>
          </div>
        </div>
      </div>
      <div className="w-1/2 h-screen relative">
        <Image
          src={signin}
          alt="Loja no celular"
          layout="fill"
          objectFit="cover"
        />
      </div>
    </main>
  );
}
