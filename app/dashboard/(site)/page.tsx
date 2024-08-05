import { fetchSheetsAllMonths } from "@/actions/sheet/data";
import AuthHeader from "@/components/site/auth-header";
import { Card, CardContent } from "@/components/ui/card";
import { Suspense } from "react";
import { BarChartComponent } from "../ui/bar-chart-label";
import CardWrapper from "../ui/cards";
import RevenueChart from "../ui/revenue-chart";
import {
  CardsSkeleton,
  LatestInvoicesSkeleton,
  RevenueChartSkeleton,
} from "../ui/skeletons";

export default async function DashboardPage() {
  const months = await fetchSheetsAllMonths();
  return (
    <Card className="w-full border-0">
      <AuthHeader>Dashboard</AuthHeader>
      <CardContent>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Suspense fallback={<CardsSkeleton />}>
            <CardWrapper />
          </Suspense>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
          <Suspense fallback={<RevenueChartSkeleton />}>
            <RevenueChart />
          </Suspense>
          <Suspense fallback={<LatestInvoicesSkeleton />}>
            <BarChartComponent data={months.totals} />
          </Suspense>
        </div>
      </CardContent>
    </Card>
  );
}
