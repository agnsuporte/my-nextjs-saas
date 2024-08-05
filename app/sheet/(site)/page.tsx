import { fetchSheetsPages } from "@/actions/sheet/data";
import { InvoicesTableSkeleton } from "@/app/dashboard/ui/skeletons";
import AuthHeader from "@/components/site/auth-header";
import { Card, CardContent } from "@/components/ui/card";
import Pagination from "@/components/ui/pagination";
import Search from "@/components/ui/search";
import { Suspense } from "react";
import { CreateSheet } from "../ui/buttons";
import Table from "../ui/table";

const SheetPage = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) => {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  const pages = await fetchSheetsPages(query);

  return (
    <Card className="w-full border-0">
      <AuthHeader>Lançamentos</AuthHeader>
      <CardContent>
        <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
          <Search placeholder="Buscar local..." />
          <CreateSheet />
        </div>
        <Suspense
          key={query + currentPage}
          fallback={<InvoicesTableSkeleton />}
        >
          <Table query={query} currentPage={currentPage} />
        </Suspense>
        <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={pages.total} />
        </div>
      </CardContent>
    </Card>
  );
};

export default SheetPage;
