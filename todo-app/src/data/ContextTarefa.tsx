"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
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

	const adicionarTarefa = (novaTarefa: Omit<TarefaInterface, "id">) => {
		const id = Date.now();
		setTarefas((prev) => [...prev, { id, ...novaTarefa }]);
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
