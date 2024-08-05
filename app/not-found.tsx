import { FaceFrownIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-2">
      <FaceFrownIcon className="w-10 text-gray-400" />
      <h2 className="text-xl font-semibold">Oops! Página não encontrada</h2>
      <p>Não fomos capazes de encontrar o que procura.</p>
      <Link
        href="/sheet"
        className="mt-4 rounded-md px-4 py-2 text-sm transition-colors hover:bg-green-400"
      >
        Voltar
      </Link>
    </main>
  );
}
