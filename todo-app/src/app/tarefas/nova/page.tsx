"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Cabecalho from "@/componentes/Cabecalho";
import ModalTarefa from "@/componentes/ModalTarefa";
import { useTarefas } from "@/data/ContextTarefa";

const NovaTarefa = () => {
	const { adicionarTarefa } = useTarefas();
	const [mostrarModal, setMostrarModal] = useState(true);
	const router = useRouter();

	const onAdicionar = (titulo: string) => {
		adicionarTarefa({ title: titulo, completed: false });
		router.push("/tarefas");
	};

	const onFechar = () => {
		router.push("/tarefas"); 
	};

	return (
		<div className="container mx-auto p-4">
			<Cabecalho />
			{mostrarModal && (
				<ModalTarefa onAdicionar={onAdicionar} onFechar={onFechar} />
			)}
		</div>
	);
};

export default NovaTarefa;
