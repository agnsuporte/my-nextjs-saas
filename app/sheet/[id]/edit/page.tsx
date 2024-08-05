import { notFound } from "next/navigation";
import { fetchSheetByID } from "@/actions/sheet/data";
import UpdateSheetForm from "../../ui/update-sheet-form";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const fetch = await fetchSheetByID(id);

  if (!fetch.sheet) {
    notFound();
    return null; // Adiciona um retorno explícito para garantir que nada mais será renderizado
  }

  return <UpdateSheetForm sheet={fetch.sheet} />;
}
