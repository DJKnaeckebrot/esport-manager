"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { customerPortalAction } from "@/lib/payments/actions";
import { useActionState, useState } from "react";
import { TeamDataWithMembers, User } from "@/lib/db/schema";
import { removeTeamMember } from "@/app/(login)/actions";
import { InviteTeamMember } from "./invite-team";
import { UploadButton } from "@/lib/upload/uploadthing";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Loader2, PlusCircle } from "lucide-react";
import { updateTeamData } from "../(marketing)/actions";

type ActionState = {
  error?: string;
  success?: string;
};

export function Settings({ teamData }: { teamData: TeamDataWithMembers }) {
  const [formData, setFormData] = useState({
    customBrandingString: teamData.customBranding ? "true" : "false",
    customBrandingLogo: teamData.customBrandingLogo ?? "",
    name: teamData.name ?? "",
  });

  const [removeState, removeAction, isRemovePending] = useActionState<
    ActionState,
    FormData
  >(removeTeamMember, { error: "", success: "" });

  const [updateState, updateAction, isUpdatePending] = useActionState<
    ActionState,
    FormData
  >(updateTeamData, { error: "", success: "" });

  const getUserDisplayName = (user: Pick<User, "id" | "name" | "email">) => {
    return user.name || user.email || "Unknown User";
  };

  const logo = (
    <svg
      version="1.2"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 700 700"
      width="50"
      height="50"
      className="dark:fill-white fill-black"
    >
      <title>e logo</title>
      <g id="Layer 1">
        <path
          id="Form 1"
          fillRule="evenodd"
          d="m138.6 208.3c0.2 3.4 0.4 98.7 0.4 98.7l305-196-76-50c0 0-229.2 147.5-229.4 147.3z"
        />
        <path id="Form 2" fillRule="evenodd" d="m102 461l76 49 183-116-1-99z" />
        <path id="Form 3" fillRule="evenodd" d="m280 575l75 51 222-145-1-98z" />
      </g>
    </svg>
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // Update the specific field being typed into
    }));
  };

  console.log("formData", formData);

  console.log("Update Status: ", updateState);

  return (
    <section className="flex-1 p-4 lg:p-8">
      <h1 className="text-lg lg:text-2xl font-medium mb-6">Team Settings</h1>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Team Subscription</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div className="mb-4 sm:mb-0">
                <p className="font-medium">
                  Current Plan: {teamData.planName || "Free"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {teamData.subscriptionStatus === "active"
                    ? "Billed monthly"
                    : teamData.subscriptionStatus === "trialing"
                    ? "Trial period"
                    : "No active subscription"}
                </p>
              </div>
              <form action={customerPortalAction}>
                <Button type="submit" variant="outline">
                  Manage Subscription
                </Button>
              </form>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Team Einstellungen</CardTitle>
        </CardHeader>
        <CardContent>
          <Avatar>
            <AvatarImage src={formData.customBrandingLogo} />
            <AvatarFallback>{logo}</AvatarFallback>
          </Avatar>
          {teamData.planName === "Pro" && (
            <UploadButton
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                // Do something with the response
                console.log("Files: ", res);
                alert("Upload Completed");
                setFormData((v) => ({ ...v, customBrandingLogo: res[0].url }));
                setFormData((v) => ({ ...v, customBrandingString: "true" }));
              }}
              onUploadError={(error: Error) => {
                // Do something with the error.
                alert(`ERROR! ${error.message}`);
              }}
            />
          )}
          <form action={updateAction} className="space-y-4">
            <div>
              <Label htmlFor="name">Team Name</Label>
              <Input
                name="name"
                id="name"
                type="text"
                placeholder="Team Name"
                value={formData.name}
                onChange={handleChange}
              />
              {/* <Label htmlFor="customBrandingString">Custom Branding</Label> */}
              <Input
                type="hidden"
                id="customBrandingString"
                name="customBrandingString"
                value={formData.customBrandingString}
              />
              {/* <Label htmlFor="customBrandingLogo">Custom Logo</Label> */}
              <Input
                type="hidden"
                id="customBrandingLogo"
                name="customBrandingLogo"
                value={formData.customBrandingLogo}
              />
            </div>
            {updateState?.error && (
              <p className="text-red-500">{updateState.error}</p>
            )}
            {updateState?.success && (
              <p className="text-green-500">{updateState.success}</p>
            )}
            <Button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white mt"
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
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {teamData.teamMembers.map((member, index) => (
              <li key={member.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage
                      src={`/placeholder.svg?height=32&width=32`}
                      alt={getUserDisplayName(member.user)}
                    />
                    <AvatarFallback>
                      {getUserDisplayName(member.user)
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">
                      {getUserDisplayName(member.user)}
                    </p>
                    <p className="text-sm text-muted-foreground capitalize">
                      {member.role}
                    </p>
                  </div>
                </div>
                {/* <form action={removeAction}>
                  <input type="hidden" name="memberId" value={member.id} />
                  <Button
                    type="submit"
                    variant="outline"
                    size="sm"
                    disabled={isRemovePending}
                  >
                    {isRemovePending ? "Removing..." : "Remove"}
                  </Button>
                </form> */}
                {index >= 1 ? (
                  <form action={removeAction}>
                    <input type="hidden" name="memberId" value={member.id} />
                    <Button
                      type="submit"
                      variant="outline"
                      size="sm"
                      disabled={isRemovePending}
                    >
                      {isRemovePending ? "Removing..." : "Remove"}
                    </Button>
                  </form>
                ) : null}
              </li>
            ))}
          </ul>
          {removeState?.error && (
            <p className="text-red-500 mt-4">{removeState.error}</p>
          )}
        </CardContent>
      </Card>
      <InviteTeamMember />
    </section>
  );
}
