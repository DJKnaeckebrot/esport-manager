"use client";

import { Button } from "@/components/ui/button";
import { addOrgMember } from "@/app/(dashboard)/actions";
import { useActionState, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "../ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ActionState = {
  error?: string;
  success?: string;
};

export default function AddMemberModal() {
  const [addState, addAction, isAddPending] = useActionState<
    ActionState,
    FormData
  >(addOrgMember, { error: "", success: "" });
  const [showAddMenu, setShowAddMenu] = useState(false);

  return (
    <>
      <Button onClick={() => setShowAddMenu(!showAddMenu)}>
        Neuen Member hinzufügen
      </Button>
      {showAddMenu && (
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Neuen Member hinzufügen</CardTitle>
          </CardHeader>
          <CardContent>
            <form action={addAction} className="space-y-4">
              <Label htmlFor="userId">User ID</Label>
              <Input
                id="userId"
                name="userId"
                type="text"
                placeholder="Die Discord ID"
                required
                className="mb-4"
              />
              <Label htmlFor="userName">Benutzername</Label>
              <Input
                id="userName"
                name="userName"
                type="text"
                placeholder="Der Discord Benutzername"
                required
                className="mb-4"
              />
              <Label htmlFor="epicId">Epic ID</Label>
              <Input
                id="epicId"
                name="epicId"
                type="text"
                placeholder="Die Epic ID"
                required
                className="mb-4"
              />
              <Label htmlFor="activityStatus">Aktivitätsstatus</Label>
              <Input
                id="activityStatus"
                name="activityStatus"
                type="text"
                placeholder="Der Aktivitätsstatus"
                value="active"
                required
                className="mb-4"
              />
              {addState?.error && (
                <p className="text-red-500 mt-4">{addState.error}</p>
              )}
              {addState?.success && (
                <p className="text-green-500 mt-4">{addState.success}</p>
              )}
              <Button
                type="submit"
                variant="outline"
                size="lg"
                disabled={isAddPending}
              >
                {isAddPending ? "Hinzufügen..." : "Hinzufügen"}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
    </>
  );
}
