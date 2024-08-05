import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import { Revenue } from '@/app/lib/definitions';
import { generateYAxis } from "@/lib/utils";
import type { MyTime } from "@/types/chart/chart";
import { CalendarIcon } from "@heroicons/react/24/outline";

// This component is representational only.
// For data visualization UI, check out:
// https://www.tremor.so/
// https://www.chartjs.org/
// https://airbnb.io/visx/

export default async function RevenueChart() {
  const mytime: MyTime[] = [
    { month: "Jan", hours: 1200 },
    { month: "Fev", hours: 1620 },
    { month: "Mar", hours: 200 },
    { month: "Abr", hours: 100 },
    { month: "Mai", hours: 400 },
    { month: "Jun", hours: 1500 },
  ];

  const chartHeight = 130;

  if (!mytime || mytime.length === 0) {
    return <p className="mt-4">No data available.</p>;
  }

  const { yAxisLabels, topLabel } = generateYAxis(mytime);

  return (
    <Card className="w-full md:col-span-4">
      <CardHeader>
        <h2 className="mb-4 text-xl md:text-2xl">Lançamentos Recentes</h2>
      </CardHeader>

      <CardContent>
        <div className="rounded-xl p-4">
          <div className="mt-0 grid grid-cols-6 items-end gap-2 rounded-md p-4 sm:grid-cols-7 md:gap-4">
            <div
              className="mb-6 hidden flex-col justify-between text-sm sm:flex"
              style={{ height: `${chartHeight}px` }}
            >
              {yAxisLabels.map((label) => (
                <p key={label}>{label}</p>
              ))}
            </div>

            {mytime.map((month) => (
              <div
                key={month.month}
                className="flex flex-col items-center gap-2"
              >
                <span className="-rotate-90 text-sm sm:rotate-0">
                  {month.hours}
                </span>
                <div
                  className="relative flex flex-col items-center w-full text-sm align-text-top rounded-md bg-blue-300"
                  style={{
                    height: `${(chartHeight / topLabel) * month.hours}px`,
                  }}
                ></div>
                <p className="-rotate-90 text-sm sm:rotate-0">{month.month}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center pb-2 pt-6">
            <CalendarIcon className="h-5 w-5 text-gray-500" />
            <h3 className="ml-2 text-sm text-gray-500 ">Últimos 6 meses</h3>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
