import { deleteSheet } from "@/actions/sheet";
import { useToast } from "@/components/ui/use-toast";
import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
// import { deleteInvoice } from '@/app/lib/actions';

export function CreateSheet() {
  return (
    <Link
      href="/sheet/add"
      className="flex h-10 items-center rounded-lg bg-green-500 px-4 text-sm font-medium  transition-colors hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Lançar</span>{" "}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateSheet({ id }: { id: string }) {
  return (
    <Link
      href={`/sheet/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteSheet({ id }: { id: string }) {
  const deleteSheetWithId = deleteSheet.bind(null, id);

  return (
    <form action={deleteSheetWithId}>
      <button className="rounded-md border p-2 hover:bg-green-400">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-4" />
      </button>
    </form>
  );
}
