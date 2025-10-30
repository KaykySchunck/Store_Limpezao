"use client";

import { formatCurrency } from "@/modules/formatters/format-currency";
import React from "react";

export default function StoreItemComponent({ imageUrl, name, value }: any) {
  return (
    <div
      style={{ padding: "1rem" }}
      className="bg-white rounded-lg shadow-md flex flex-col items-center text-center gap-4 border border-black"
    >
      <img
        src={imageUrl}
        alt={name}
        className="w-full h-40 object-cover rounded-md"
      />

      <div className="flex flex-col gap-2">
        <h3 className="font-semibold text-lg text-gray-800">{name}</h3>
        <p className="text-green-600 font-medium">{formatCurrency(value)}</p>
      </div>
    </div>
  );
}
