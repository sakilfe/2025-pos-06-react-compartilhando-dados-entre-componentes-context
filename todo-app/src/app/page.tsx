"use client";

import Link from "next/link";
import Cabecalho from "@/componentes/Cabecalho";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-black">
      <Cabecalho />
      <h1 className="text-2xl font-bold mb-4 text-white">Página Inicial</h1>
      <Link
        href="/tarefas"
        className="bg-amber-500 hover:bg-amber-400 text-black px-4 py-2 rounded cursor-pointer"
      >
        Ir para Tarefas
      </Link>
    </div>
  );
}