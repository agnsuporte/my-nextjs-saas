import { auth } from "@/auth";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import CreateSheetForm from "../ui/create-sheet-form";

export default async function AddSheetPage() {
  const session = await auth();

  return (
    <Card className="border-0">
      <CardContent className="border-0">
        <CreateSheetForm user={session?.user} />
      </CardContent>
    </Card>
  );
}
