"use client";

import { updateOrgMember } from "@/app/(dashboard)/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { OrgMember } from "@/lib/db/schema";
import { useActionState, useState } from "react";
import { Loader2, PlusCircle } from "lucide-react";
import { toast } from "sonner";

type ActionState = {
  error?: string;
  success?: string;
};

interface InviteTeamMemberProps {
  user: OrgMember;
}

export function EditMemberForm({ user }: InviteTeamMemberProps) {
  const [formData, setFormData] = useState({
    id: user.id, // Hidden ID field
    userId: user.userId || "", // User's Discord ID
    userName: user.userName || "", // Username
    epicId: user.epicId || "", // Epic ID
    activityStatus: user.activityStatus || "", // Activity status
  });

  const [updateState, updateAction, isUpdatePending] = useActionState<
    ActionState,
    FormData
  >(updateOrgMember, { error: "", success: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // Update the specific field being typed into
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Member bearbeiten</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={updateAction} className="space-y-4">
          <div>
            <Input id="id" type="hidden" name="id" value={user.id} />
            <Label htmlFor="userId">User ID</Label>
            <Input
              id="text"
              name="userId"
              type="userId"
              placeholder="Users Discord ID"
              value={formData.userId}
              onChange={handleChange}
              required
            />
            <Label htmlFor="userName">Benutzername</Label>
            <Input
              id="text"
              name="userName"
              type="userName"
              placeholder="Benutzername"
              value={formData.userName}
              onChange={handleChange}
              required
            />
            <Label htmlFor="epicId">Epic ID</Label>
            <Input
              id="text"
              name="epicId"
              type="epicId"
              placeholder="Epic ID"
              value={formData.epicId}
              onChange={handleChange}
              required
            />
            <Label htmlFor="activityStatus">Aktivitätsstatus</Label>
            <Input
              id="text"
              name="activityStatus"
              type="activityStatus"
              placeholder="Aktivitätsstatus"
              value={formData.activityStatus}
              onChange={handleChange}
              required
            />
          </div>
          {/* {updateState?.error &&
            toast(`Gespeichert!`, {
              description: `${updateState.error}`,
            })}
          {updateState?.success && toast(`${updateState.success}`)} */}
          <Button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white"
            disabled={isUpdatePending}
          >
            {isUpdatePending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Speichern...
              </>
            ) : (
              <>
                <PlusCircle className="mr-2 h-4 w-4" />
                Speichern
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
