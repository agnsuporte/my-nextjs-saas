import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { NavLinks } from "./nav-links";

export const SideNav = async () => {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Card className="h-full">
        <CardHeader>
          <Link
            // className="mb-2 flex h-2 items-end justify-start p-4 md:h-40"
            className="mb-2 flex h-2 items-end justify-start p-4"
            href="/"
          >
            <CardTitle title="Faz Horas">Logo</CardTitle>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
            <NavLinks />
            <div className="hidden h-auto w-full grow rounded-md md:block"></div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
