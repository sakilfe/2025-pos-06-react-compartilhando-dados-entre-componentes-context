"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import axios from "axios";
import type { TarefaInterface } from "@/types/tarefa";

interface TarefasContextType {
  tarefas: TarefaInterface[];
  adicionarTarefa: (novaTarefa: Omit<TarefaInterface, "id">) => void;
  toggleConclusao: (id: number) => void;
}

export const TarefasContext = createContext<TarefasContextType | null>(null);

export const TarefasProvider = ({ children }: { children: ReactNode }) => {
  const [tarefas, setTarefas] = useState<TarefaInterface[]>([]);

  useEffect(() => {
    axios
      .get("https://dummyjson.com/todos")
      .then((res) => {
        const tarefasAPI = res.data.todos.map((t: any) => ({
          id: t.id,
          title: t.todo,
          completed: t.completed,
        }));
        setTarefas(tarefasAPI);
      })
      .catch((err) => console.error("Erro ao buscar tarefas:", err));
  }, []);

  const adicionarTarefa = async (novaTarefa: Omit<TarefaInterface, "id">) => {
    try {
      const res = await axios.post("https://dummyjson.com/todos/add", {
        todo: novaTarefa.title,
        completed: novaTarefa.completed,
        userId: 1,
      });

      const nova = {
        id: res.data.id,
        title: res.data.todo,
        completed: res.data.completed,
      };

      setTarefas((prev) => [...prev, nova]);
    } catch (error) {
      console.error("Erro ao adicionar tarefa:", error);
    }
  };

  const toggleConclusao = (id: number) => {
    setTarefas((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  return (
    <TarefasContext.Provider value={{ tarefas, adicionarTarefa, toggleConclusao }}>
      {children}
    </TarefasContext.Provider>
  );
};

export const useTarefas = () => {
  const contexto = useContext(TarefasContext);
  if (!contexto) throw new Error("useTarefas deve ser usado dentro do TarefasProvider");
  return contexto;
};
