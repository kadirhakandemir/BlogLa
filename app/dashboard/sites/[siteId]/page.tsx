import prisma from "@/app/utils/db";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Book, MoreHorizontal, PlusCircle, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { EmptyState } from "@/app/components/dashboard/EmptyState";


async function getData(userId: string, siteId: string) {
    const data = await prisma.site.findUnique({
        where: {
            userId: userId,
            id: siteId
        },
        select: {
            subdirectory: true,
            posts: {
                select: {
                    image: true,
                    id: true,
                    title: true,
                    createdAt: true,
                },
                orderBy: {
                    createdAt: "desc",
                },
            },
        },
    });
    return data;

}

export default async function SiteIdRoute({ params }: { params: { siteId: string } }) {
    const { getUser } = getKindeServerSession()
    const user = await getUser()
    if (!user) {
        return redirect("/api/auth/login")
    }

    const data = await getData(user.id, params.siteId)

    return (
        <>
            <div className="flex w-full justify-end gap-x-4">
                <Button asChild variant={"secondary"}>
                    <Link href={`/blog/${data?.subdirectory}`}>
                        <Book className="mr-2 size-4" />
                        View Blog
                    </Link>
                </Button>
                <Button asChild variant={"secondary"}>
                    <Link href={`/dashboard/sites/${params.siteId}/settings`}>
                        <Settings className="mr-2 size-4" />
                        Settings
                    </Link>
                </Button>
                <Button asChild>
                    <Link href={`/dashboard/sites/${params.siteId}/create`}>
                        <PlusCircle className="mr-2 size-4" />
                        Create Article
                    </Link>
                </Button>
            </div >
            {data?.posts === undefined || data.posts.length === 0 ? (
                <EmptyState
                    title="You dont have any Articles created"
                    description="You currently dont have any Articles. Please create one to get started."
                    href={`/dashboard/sites/${params.siteId}/create`}
                    buttonText="Create Article" />
            ) : (
                <div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Articles</CardTitle>
                            <CardDescription>Manage your articles in a simple and intuitive interface way</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Image</TableHead>
                                        <TableHead>Title</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Created At</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {data.posts.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell>
                                                <Image src={item.image} alt="Article Cover Image" width={64} height={64} className="rounded-md size-16 object-cover" />
                                            </TableCell>
                                            <TableCell className="font-medium">
                                                <Link href={`/dashboard/sites/${params.siteId}/create`}>{item.title}</Link>
                                            </TableCell>
                                            <TableCell><Badge className="bg-green-500/10 text-green-500" variant="outline">Published</Badge>
                                            </TableCell>
                                            <TableCell>{new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(item.createdAt)}</TableCell>
                                            <TableCell className="text-end">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button size="icon" variant={"ghost"} >
                                                            <MoreHorizontal className="size-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem asChild>
                                                            <Link href={`/dashboard/sites/${params.siteId}/${item.id}`}>
                                                                Edit
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem asChild>
                                                            <Link href={`/dashboard/sites/${params.siteId}/${item.id}/delete`}>Delete</Link>
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>

                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            )
            }
        </>
    );
}