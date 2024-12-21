"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

interface SubmitButtonProps {
    text: string;
    className?: string;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined;

}

export function SubmitButton({ text, className, variant }: SubmitButtonProps) {
    const { pending } = useFormStatus();
    return (
        <>
            {pending ? (
                <Button disabled className={cn("w-fit", className)} variant={variant} type="submit">
                    <Loader2 className="mr-2 size-4 animate-spin" />
                    Pending
                </Button>

            ) : (
                <Button className={cn("w-fit", className)} variant={variant} type="submit">
                    {text}
                </Button>

            )}
        </>

    )
}