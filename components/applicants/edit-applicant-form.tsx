"use client";

import { updateOrgApplicant } from "@/app/(dashboard)/actions";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { OrgApplicant } from "@/lib/db/schema";
import { useActionState, useState } from "react";
import { Loader2, PlusCircle } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";

type ActionState = {
  error?: string;
  success?: string;
};

interface InviteTeamMemberProps {
  user: OrgApplicant;
}

export function EditApplicantForm({ user }: InviteTeamMemberProps) {
  const [formData, setFormData] = useState({
    id: user.id, // Hidden ID field
    userId: user.userId || "", // User's Discord ID
    userName: user.userName || "", // Username
    orgId: user.orgId || "", // Organization ID
    epicId: user.epicId || "", // Epic ID
    name: user.name || "", // Name
    playStyle: user.playStyle || "", // Play Style
    birthday: user.birthday || "", // Birthday
    origin: user.origin || "", // Origin
    about: user.about || "", // About
    comment: user.comment || "", // Comment
    rank: user.rank || "", // Rank
    status: user.status || "", // Status
  });

  const [updateState, updateAction, isUpdatePending] = useActionState<
    ActionState,
    FormData
  >(updateOrgApplicant, { error: "", success: "" });

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
        <CardTitle>Bewerber bearbeiten</CardTitle>
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
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Vorname des Bewerber"
              value={formData.name}
              required
              className="mb-4"
            />
            <Label htmlFor="rank">Rank</Label>
            <Input
              id="rank"
              name="rank"
              type="text"
              placeholder="Rank des Bewerber"
              value={formData.rank}
              required
              className="mb-4"
            />
            <Label htmlFor="playStyle">Spielstil</Label>
            <Select name="playStyle" defaultValue={formData.playStyle}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Spielstil des Bewerber" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="controller">Controller</SelectItem>
                <SelectItem value="KBM">KBM</SelectItem>
              </SelectContent>
            </Select>
            <Label htmlFor="origin">Herkunft</Label>
            <Select name="origin" defaultValue={formData.origin}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Die Herkunft des Bewerber" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="deutschland">Deutschland</SelectItem>
                <SelectItem value="östereich">Östereich</SelectItem>
                <SelectItem value="schweiz">Schweiz</SelectItem>
              </SelectContent>
            </Select>
            <Label htmlFor="about">Über</Label>
            <Textarea
              id="about"
              name="about"
              placeholder="Über den Bewerber"
              className="mb-4"
              value={formData.about}
              required
            />
            <Label htmlFor="birthday">Geburtsdatum</Label>
            {/* <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[280px] justify-start text-left font-normal",
                    !formData.birthday && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.birthday ? (
                    format(formData.birthday, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  hideHead
                  mode="single"
                  captionLayout="dropdown"
                  id="birthday"
                  selected={formData.birthday}
                  onSelect={(date) =>
                    setFormData({ ...formData, birthday: date })
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover> */}
            <Input
              id="birthday"
              name="birthday"
              type="date"
              placeholder="Geburtsdatum des Bewerber"
              value={
                formData.birthday
                  ? new Date(formData.birthday).toISOString().split("T")[0]
                  : ""
              }
              required
              className="mb-4"
            />
            <Label htmlFor="epicId">Epic ID</Label>
            <Input
              id="epicId"
              name="epicId"
              type="text"
              placeholder="Die Epic ID"
              value={formData.epicId}
              required
              className="mb-4"
            />
            <Label htmlFor="status">Status</Label>
            <Select
              name="status"
              defaultValue={formData.status}
              onValueChange={(v) => setFormData({ ...formData, status: v })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Status des Bewerber" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Ausstehend</SelectItem>
                <SelectItem value="invited">Eingeladen</SelectItem>
                <SelectItem value="accepted">Angenommen</SelectItem>
                <SelectItem value="denied">Abgelehnt</SelectItem>
              </SelectContent>
            </Select>
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
