import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { XIcon } from "lucide-react";
import Link from "next/link";

export default function CancelledRoute() {
    return (
        <div className="w-full flex flex-1 items-center justify-center">
            <Card className="w-[350px]">
                <div className="p-6">
                    <div className="w-full flex justify-center">
                        <XIcon className=" p-2 size-12 rounded-full bg-red-500/30 text-red-500" />
                    </div>
                    <div className="mt-3 text-center sm:mt-5 w-full">
                        <h2 className="text-xl font-semibold">
                            Payment Cancelled
                        </h2>
                        <p className="tracking-tight mt-2 text-sm text-muted-foreground">No worry, you can always try again</p>
                        <Button asChild className="w-full mt-5">
                            <Link href="/dashboard">Go back to Dashboard</Link>
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    )
}