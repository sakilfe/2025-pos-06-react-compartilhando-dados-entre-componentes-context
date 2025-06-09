"use client";

import { createContext, useState, type ReactNode } from "react";
import type { TarefaInterface } from "./index";

interface TarefasContextType {
	tarefas: TarefaInterface[];
	adicionarTarefa: (novaTarefa: Omit<TarefaInterface, "id">) => void;
	toggleConclusao: (id: number) => void;
}

export const TarefasContext = createContext<TarefasContextType | null>(null);

const TarefasProvider = ({ children }: { children: ReactNode }) => {
	const [tarefas, setTarefas] = useState<TarefaInterface[]>([
		{
			id: 1,
			title: "Tarefa exemplo",
			completed: false,
		},
	]);

	const adicionarTarefa = (novaTarefa: Omit<TarefaInterface, "id">) => {
		setTarefas((prev) => [
			...prev,
			{
				...novaTarefa,
				id: prev.length > 0 ? Math.max(...prev.map((t) => t.id)) + 1 : 1,
			},
		]);
	};

	const toggleConclusao = (id: number) => {
		setTarefas((prev) =>
			prev.map((tarefa) =>
				tarefa.id === id ? { ...tarefa, completed: !tarefa.completed } : tarefa
			)
		);
	};

	return (
		<TarefasContext.Provider
			value={{ tarefas, adicionarTarefa, toggleConclusao }}
		>
			{children}
		</TarefasContext.Provider>
	);
};

export default TarefasProvider;
