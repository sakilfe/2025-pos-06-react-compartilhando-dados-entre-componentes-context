"use client";

import type React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import dados, { TarefaInterface } from "@/data";
import Cabecalho from "@/componentes/Cabecalho";
import ModalTarefa from "@/componentes/ModalTarefa";

interface TarefaProps {
	titulo: string;
	concluido?: boolean;
}

const Tarefa: React.FC<TarefaProps> = ({ titulo, concluido }) => {
	const [estaConcluido, setEstaConcluido] = useState(concluido);

	const classeCard = `p-3 mb-3 rounded-lg shadow-md hover:cursor-pointer hover:border ${
		estaConcluido
			? "bg-gray-800 hover:border-gray-800"
			: "bg-gray-400 hover:border-gray-400"
	}`;

	const classeCorDoTexto = estaConcluido ? "text-amber-50" : "";

	const escutarClique = () => {
		console.log(`A tarefa '${titulo}' foi clicada!`);
		setEstaConcluido(!estaConcluido);
	};

	return (
		<div className={classeCard} onClick={escutarClique}>
			<h3 className={`text-xl font-bold ${classeCorDoTexto}`}>{titulo}</h3>
			<p className={`text-sm ${classeCorDoTexto}`}>
				{estaConcluido ? "Concluída" : "Pendente"}
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
			{dados.map((tarefa) => (
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
	const [tarefas, setTarefas] = useState<TarefaInterface[]>([]);
	const [mostrarModal, setMostrarModal] = useState(false);

  useEffect(() => {
    axios.get("https://dummyjson.com/todos")
      .then((res) => {
        setTarefas(res.data.todos);
      })
      .catch((err) => {
        console.error("Erro ao carregar tarefas:", err);
      });
  }, []);

	const adicionarTarefa = (titulo: string) => {
		const novaTarefa: TarefaInterface = {
			id: Date.now(),
			title: titulo,
			completed: false,
		};
		setTarefas((prev) => [...prev, novaTarefa]);
	};

	return (
		<div className="container mx-auto p-4">
			<Cabecalho />
			<button
				onClick={() => setMostrarModal(true)}
				className="bg-blue-600 text-white px-4 py-2 rounded mb-4 hover:cursor-pointer"
			>
				Nova Tarefa
			</button>
			<Tarefas dados={tarefas} />
			{mostrarModal && (
				<ModalTarefa
					onAdicionar={adicionarTarefa}
					onFechar={() => setMostrarModal(false)}
				/>
			)}
		</div>
	);
};

export default Home;