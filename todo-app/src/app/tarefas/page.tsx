"use client";

import { useState } from "react";
import Cabecalho from "@/componentes/Cabecalho";
import ModalTarefa from "@/componentes/ModalTarefa";
import { useTarefas } from "@/data/ContextTarefa";
import type { TarefaProps, TarefaInterface } from "@/types/tarefa";

const Tarefa: React.FC<TarefaProps> = ({ titulo, concluido }) => {
  const [completed, setCompleted] = useState(concluido ?? false);

  const classeCard = `p-3 mb-3 rounded-lg shadow-md hover:cursor-pointer hover:border ${
    completed ? "bg-gray-800 hover:border-gray-800" : "bg-gray-400 hover:border-gray-400"
  }`;

  const classeCorDoTexto = completed ? "text-amber-50" : "";

  const escutarClique = () => {
    setCompleted(!completed);
  };

  return (
    <div className={classeCard} onClick={escutarClique}>
      <h3 className={`text-xl font-bold ${classeCorDoTexto}`}>{titulo}</h3>
      <p className={`text-sm ${classeCorDoTexto}`}>
        {completed ? "Concluída" : "Pendente"}
      </p>
    </div>
  );
};

interface TarefasProps {
  dados: TarefaInterface[];
}

const Tarefas: React.FC<TarefasProps> = ({ dados }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {[...dados].reverse().map((tarefa) => (
        <Tarefa
          key={tarefa.id}
          titulo={tarefa.title}
          concluido={tarefa.completed}
        />
      ))}
    </div>
  );
};

const Home = () => {
  const { tarefas, adicionarTarefa } = useTarefas();
  const [mostrarModal, setMostrarModal] = useState(false);

  return (
    <div className="container mx-auto p-4 bg-black">
      <Cabecalho />
      <div className="flex justify-end mb-8">
        <button
          onClick={() => setMostrarModal(true)}
          className="bg-purple-700 hover:cursor-pointer text-white px-10 py-2 rounded"
        >
          Nova Tarefa
        </button>
      </div>

      <Tarefas dados={tarefas} />

      {mostrarModal && (
        <ModalTarefa
          onAdicionar={(titulo) => adicionarTarefa({ title: titulo, completed: false })}
          onFechar={() => setMostrarModal(false)}
        />
      )}
    </div>
  );
};

export default Home;
