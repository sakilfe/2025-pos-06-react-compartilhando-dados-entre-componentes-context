"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
	const pathname = usePathname();

	return (
		<nav className="bg-blue-600 text-white p-4 shadow-md">
			<div className="container mx-auto flex justify-between items-center">
				<Link href="/" className="text-xl font-bold">
					Tarefas App
				</Link>
				<div className="space-x-4">
					<Link
						href="/tarefas"
						className={`hover:underline ${
							pathname === "/tarefas" ? "font-bold" : ""
						}`}
					>
						Lista
					</Link>
					<Link
						href="/tarefas/nova"
						className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-blue-50 transition"
					>
						Nova Tarefa
					</Link>
				</div>
			</div>
		</nav>
	);
}

export default Navbar;