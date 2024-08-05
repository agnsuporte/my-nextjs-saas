import { auth } from "@/auth";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import CastOnSheetForm from "../ui/cast-on-sheet-form";

export default async function AddSheetPage() {
  const session = await auth();

  return (
    <Card className="border-0">
      <CardContent className="border-0">
        <CastOnSheetForm user={session?.user} />
      </CardContent>
    </Card>
  );
}
