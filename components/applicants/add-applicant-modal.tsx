"use client";

import { Button } from "@/components/ui/button";
import { addOrgApplicant } from "@/app/(dashboard)/actions";
import { useActionState, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "../ui/label";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "../ui/textarea";

type ActionState = {
  error?: string;
  success?: string;
};

export default function AddApplicantModal() {
  const [addState, addAction, isAddPending] = useActionState<
    ActionState,
    FormData
  >(addOrgApplicant, { error: "", success: "" });
  const [showAddMenu, setShowAddMenu] = useState(false);

  return (
    <>
      <Button
        className="bg-orange-500 hover:bg-orange-600 text-white"
        onClick={() => setShowAddMenu(!showAddMenu)}
      >
        Neuen Bewerber hinzufügen
      </Button>
      {showAddMenu && (
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Neuen Bewerber hinzufügen</CardTitle>
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
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Vorname des Bewerber"
                required
                className="mb-4"
              />
              <Label htmlFor="rank">Rank</Label>
              <Input
                id="rank"
                name="rank"
                type="text"
                placeholder="Rank des Bewerber"
                required
                className="mb-4"
              />
              <Label htmlFor="playStyle">Spielstil</Label>
              <Input
                id="playStyle"
                name="playStyle"
                type="text"
                placeholder="Spielstil des Bewerber (KBM/Controller)"
                required
                className="mb-4"
              />
              <Label htmlFor="origin">Herkunft</Label>
              <Input
                id="origin"
                name="origin"
                type="text"
                placeholder="Die Herkunft des Bewerber"
                required
                className="mb-4"
              />
              <Label htmlFor="about">Über</Label>
              <Textarea
                id="about"
                name="about"
                placeholder="Über den Bewerber"
                className="mb-4"
                required
              />
              <Label htmlFor="birthday">Geburtsdatum</Label>
              <Input
                id="birthday"
                name="birthday"
                type="date"
                placeholder="Geburtsdatum des Bewerber"
                required
                className="mb-4"
              />
              {/* <Label htmlFor="birthday">Geburtsdatum</Label>
              <br />
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[280px] justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {/* <Input
                id="birthday"
                name="birthday"
                type="text"
                placeholder="Geburtsdatum des Bewerber"
                required
                className="mb-4"
              /> */}
              <Label htmlFor="epicId">Epic ID</Label>
              <Input
                id="epicId"
                name="epicId"
                type="text"
                placeholder="Die Epic ID"
                required
                className="mb-4"
              />
              <Label htmlFor="status">Status</Label>
              <Input
                id="status"
                name="status"
                type="text"
                value={"pending"}
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
