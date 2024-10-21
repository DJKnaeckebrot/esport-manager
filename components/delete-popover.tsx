"use client";
import React, { useEffect, useState, useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { deleteOrgMember } from "@/app/(dashboard)/(marketing)/actions";
import { Trash } from "lucide-react";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
  userId: number;
}

type ActionState = {
  error?: string;
  success?: string;
};

export const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
  userId,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [deleteState, deleteAction, isdeletePending] = useActionState<
    ActionState,
    FormData
  >(deleteOrgMember, { error: "", success: "" });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      title="Bist du dir sicher?"
      description="Diese Aktion kann nicht rückgängig gemacht werden."
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button disabled={loading} variant="outline" onClick={onClose}>
          Abbrechen
        </Button>
        <form action={deleteAction}>
          <input type="hidden" name="id" value={userId} />
          <Button variant="destructive" type="submit">
            <Trash className="mr-2 h-4 w-4" /> Löschen
          </Button>
        </form>
        {deleteState?.error && (
          <p className="text-red-500 mt-4">{deleteState.error}</p>
        )}
        {deleteState?.success && (
          <p className="text-green-500 mt-4">{deleteState.success}</p>
        )}
        {/* <Button disabled={loading} variant="destructive" onClick={onConfirm}>
          Continue
        </Button> */}
      </div>
    </Modal>
  );
};
