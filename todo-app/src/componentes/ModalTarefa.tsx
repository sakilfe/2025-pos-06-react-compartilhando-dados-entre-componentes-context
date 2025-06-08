import type React from "react";
import { useState } from "react";

interface ModalTarefaProps {
	onAdicionar: (titulo: string) => void;
	onFechar: () => void;
}

const ModalTarefa: React.FC<ModalTarefaProps> = ({ onAdicionar, onFechar }) => {
	const [novoTitulo, setNovoTitulo] = useState("");

	const adicionarTarefa = () => {
		if (novoTitulo.trim() !== "") {
			onAdicionar(novoTitulo);
			onFechar(); 
		}
	};

	return (
		<div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
			<div className="bg-white p-6 rounded-lg shadow-lg w-96">
				<h2 className="text-xl font-bold mb-4">Nova Tarefa</h2>
				<input
					type="text"
					className="border p-2 w-full mb-4"
					placeholder="Digite o título da tarefa"
					value={novoTitulo}
					onChange={(e) => setNovoTitulo(e.target.value)}
				/>
				<div className="flex justify-between">
					<button
						onClick={adicionarTarefa}
						className="bg-green-600 text-white px-4 py-2 rounded"
					>
						Adicionar
					</button>
					<button
						onClick={onFechar}
						className="bg-gray-400 text-white px-4 py-2 rounded"
					>
						Cancelar
					</button>
				</div>
			</div>
		</div>
	);
};

export default ModalTarefa;