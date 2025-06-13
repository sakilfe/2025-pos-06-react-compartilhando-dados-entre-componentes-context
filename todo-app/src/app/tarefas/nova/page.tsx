"use client";

import Cabecalho from "@/componentes/Cabecalho";
import ModalTarefa from "@/componentes/ModalTarefa";
import { useTarefas } from "@/data/ContextTarefa";

const NovaTarefa = () => {
	const { adicionarTarefa } = useTarefas();

	const onAdicionar = (titulo: string) => {
		adicionarTarefa({ title: titulo, completed: false });
	};

	return (
		<div className="container mx-auto p-4">
			<Cabecalho />
			<ModalTarefa addTarefa={onAdicionar} />
		</div>
	);
};

export default NovaTarefa;
