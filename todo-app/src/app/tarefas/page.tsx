"use client";

import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Cabecalho from "@/componentes/Cabecalho";
import ModalTarefa from "@/componentes/ModalTarefa";
import { TarefasContext } from "@/data/ContextTarefa";
import type { TarefaInterface } from "@/data";

interface TarefaProps {
	titulo: string;
	id: number;
	concluido: boolean;
}

const Tarefa: React.FC<TarefaProps> = ({ titulo, concluido, id }) => {
	const contexto = useContext(TarefasContext);
	if (!contexto) return null;

	const { toggleConclusao } = contexto;

	const classeCard = `p-3 mb-3 rounded-lg shadow-md hover:cursor-pointer hover:border ${
		concluido
			? "bg-gray-800 hover:border-gray-800"
			: "bg-gray-400 hover:border-gray-400"
	}`;

	const classeCorDoTexto = concluido ? "text-amber-50" : "";

	const escutarClique = () => {
		toggleConclusao(id);
	};

	return (
		<div className={classeCard} onClick={escutarClique}>
			<h3 className={`text-xl font-bold ${classeCorDoTexto}`}>{titulo}</h3>
			<p className={`text-sm ${classeCorDoTexto}`}>
				{concluido ? "Concluída" : "Pendente"}
			</p>
		</div>
	);
};

const Tarefas: React.FC = () => {
	const contexto = useContext(TarefasContext);
	if (!contexto) return null;

	const { tarefas } = contexto;

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
			{tarefas.map((tarefa) => (
				<Tarefa
					key={tarefa.id}
					id={tarefa.id}
					titulo={tarefa.title}
					concluido={tarefa.completed}
				/>
			))}
		</div>
	);
};

const Home = () => {
	const contexto = useContext(TarefasContext);
	const [mostrarModal, setMostrarModal] = useState(false);

	useEffect(() => {
		if (!contexto) return;

		axios
			.get("https://dummyjson.com/todos")
			.then((res) => {
				const tarefasDaApi = res.data.todos.map((tarefa: any) => ({
					id: tarefa.id,
					title: tarefa.todo,
					completed: tarefa.completed,
				}));
				tarefasDaApi.forEach((t: TarefaInterface) =>
					contexto.adicionarTarefa({ title: t.title, completed: t.completed })
				);
			})
			.catch((err) => {
				console.error("Erro ao carregar tarefas:", err);
			});
	}, [contexto]);

	if (!contexto) return null;

	const { adicionarTarefa } = contexto;

	return (
		<div className="container mx-auto p-4">
			<Cabecalho />
			<button
				onClick={() => setMostrarModal(true)}
				className="bg-blue-600 text-white px-4 py-2 rounded mb-4 hover:cursor-pointer"
			>
				Nova Tarefa
			</button>
			<Tarefas />
			{mostrarModal && (
				<ModalTarefa
					onAdicionar={(titulo: string) =>
						adicionarTarefa({ title: titulo, completed: false })
					}
					onFechar={() => setMostrarModal(false)}
				/>
			)}
		</div>
	);
};

export default Home;