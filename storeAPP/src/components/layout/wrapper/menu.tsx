"use client";

import {
  URL_CATEGORIES,
  URL_DASHBOARD,
  URL_ITENS,
  URL_MERCHANT,
  URL_STORE_DASHBOARD,
  URL_STORE_EDIT,
} from "@/constants/urls";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const NAVIGATION = [
  // {
  //   label: "Dashboard",
  //   pathname: URL_DASHBOARD,
  // },
  {
    label: "Criar loja",
    pathname: URL_STORE_DASHBOARD,
  },
  {
    label: "Categorias",
    pathname: URL_CATEGORIES,
  },
  {
    label: "Selecionar itens",
    pathname: URL_ITENS,
  },
];

type Props = {
  merchantId: string;
  action?: ReactNode;
};

export function Menu(inProps: Props) {
  const { merchantId, action } = inProps;
  const pathname = usePathname();

  return (
    <nav className="flex items-center justify-between mt-6 -ml-3 whitespace-nowrap">
      <ul className="flex gap-2">
        {NAVIGATION.map((navigation) => {
          const baseUrl = `${URL_MERCHANT}/${merchantId}`;

          const isActive = Array.isArray(navigation.pathname)
            ? navigation.pathname.find((path) =>
                `${baseUrl}${path}`.includes(pathname)
              )
            : `${baseUrl}${navigation.pathname}`.includes(pathname);

          const href = `${baseUrl}${
            Array.isArray(navigation.pathname)
              ? navigation.pathname[0]
              : navigation.pathname
          }`;

          return (
            <Link
              key={navigation.label}
              href={href}
              className={cn(
                "text-sm font-medium text-center text-gray-400 dark:text-gray-700 rounded-[8px] py-1.5 px-3 transition-all ring-offset-background hover:bg-gray-50 hover:text-blue dark:hover:text-blue-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2",
                {
                  "text-blue dark:text-blue-700 bg-gray-50": isActive,
                }
              )}
            >
              {navigation.label}
            </Link>
          );
        })}
      </ul>
      {action}
    </nav>
  );
}
