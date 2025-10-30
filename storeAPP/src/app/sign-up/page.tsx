"use client";

import Image from "next/image";
import PhoneInteraction from "../../../public/images/PhoneInteraction.webp";
import { Button } from "@/components/ui";
import { useEffect, Suspense } from "react";
import toast from "react-hot-toast";
import SignUpContainer from "@/modules/sign-up/sign-up.container";

export default function SignUp() {
  return (
    <main className="flex min-h-screen">
      <div className="w-1/2 flex items-center justify-center bg-white p-8">
        <div className="w-full max-w-md">
          <div className="gap-2 flex flex-col items-center">
            <h1 className="text-3xl font-medium">Crie sua conta</h1>
            <p className="text-gray-500 text-center">
              Preencha os campos abaixo para criar sua conta e ter sua loja
              online na palma da sua mão
            </p>
          </div>

          <SignUpContainer />
          <div className="text-center">
            <p className="text-gray-600 mb-2">Já tem uma conta?</p>
            <Button
              variant="outline"
              onClick={() => window.location.href = '/login'}
            >
              Fazer login
            </Button>
          </div>
        </div>
      </div>
      <div className="w-1/2 h-screen relative">
        <Image
          src={PhoneInteraction}
          alt="Loja no celular"
          layout="fill"
          objectFit="cover"
        />
      </div>
    </main>
  );
}
