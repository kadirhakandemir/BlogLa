import { DeletePost } from "@/app/actions";
import { SubmitButton } from "@/app/components/dashboard/SubmitButtons";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function DeleteForm({ params }: { params: { articleId: string, siteId: string } }) {
    return (
        <div className="flex h-screen items-center justify-center">
            <Card className="max-w-xl">
                <CardHeader>
                    <CardTitle>
                        Are you absolutely sure you want to delete this article?
                    </CardTitle>
                    <CardDescription>
                        This action cannot be undone. This will permanently delete your article from our servers.
                    </CardDescription>
                </CardHeader>
                <CardFooter className="w-full flex justify-between">
                    <Button variant="secondary" asChild>
                        <Link href={`/dashboard/sites/${params.siteId}`}>Cancel</Link>
                    </Button>
                    <form action={DeletePost}>
                        <input type="hidden" name="articleId" value={params.articleId} />
                        <input type="hidden" name="siteId" value={params.siteId} />
                        <SubmitButton variant="destructive" text={"Delete Article"} />
                    </form>
                </CardFooter>
            </Card>
        </div>
    );
}