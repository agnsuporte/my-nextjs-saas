import {
  BanknotesIcon,
  ClockIcon,
  InboxIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

import {
  fetchSheetsAllMonths,
} from "@/actions/sheet/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const iconMap = {
  collected: BanknotesIcon,
  customers: UserGroupIcon,
  pending: ClockIcon,
  invoices: InboxIcon,
};

export default async function CardWrapper() {
  const months = await fetchSheetsAllMonths();
  // const month = await fetchSheetsMonth("2024","08")
  // console.log("[MONTHS]", months)

  return (
    <>
      {months.totals.map((m) => (
        <CardBox
          key={m.month}
          title={m.month}
          value={m.total}
          type="collected"
        />
      ))}
    </>
  );
}

export function CardBox({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: "invoices" | "customers" | "pending" | "collected";
}) {
  const Icon = iconMap[type];

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex p-4">
            {Icon ? <Icon className="h-5 w-5 " /> : null}
            <h3 className="ml-2 text-sm font-medium">{title}</h3>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="truncate rounded-xl text-center text-2xl">{value}</p>
      </CardContent>
    </Card>
  );
}
