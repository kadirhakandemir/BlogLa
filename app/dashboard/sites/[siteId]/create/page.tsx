"use client"
import { CreatePostAction } from "@/app/actions";
import TailwindEditor from "@/app/components/dashboard/EditorWrapper";
import { UploadDropzone } from "@/app/utils/UploadthingComponents";
import { PostSchema } from "@/app/utils/zodSchemas";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { Label } from "@radix-ui/react-label";
import { ArrowLeft, Atom } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { JSONContent } from "novel";
import { useActionState, useState } from "react";
import { toast } from "sonner"
import slugify from 'react-slugify';
import { SubmitButton } from "@/app/components/dashboard/SubmitButtons";



export default function ArticleCreationRoute({
    params,
}: {
    params: { siteId: string };
}) {
    const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
    const [value, setValue] = useState<JSONContent | undefined>(undefined);
    const [slug, setSlugValue] = useState<string | undefined>(undefined);
    const [title, setTitle] = useState<string | undefined>(undefined);
    const [lastResult, action] = useActionState(CreatePostAction, undefined);
    const [form, fields] = useForm({
        lastResult,

        onValidate({ formData }) {
            return parseWithZod(formData, {
                schema: PostSchema,
            });
        },
        shouldValidate: "onBlur",
        shouldRevalidate: "onInput",

    })
    function handleSlugGeneration() {
        const titleInput = title;

        if (titleInput?.length === 0 || titleInput === undefined) {
            return toast.error("Please enter a title");
        }

        setSlugValue(slugify(titleInput));
        return toast.success("Slug generated successfully");
    }
    return (
        <>
            <div className="flex items-center">
                <Button className="mr-3" size="icon" variant="outline" asChild>
                    <Link href={`/dashboard/sites/${params.siteId}`}>
                        <ArrowLeft className="size-4" />
                    </Link>
                </Button>
                <h1 className="text-2xl font-semibold">Create Article</h1>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Article Details</CardTitle>
                    <CardDescription>Create your new Article here. Click the button below to get started.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="flex flex-col gap-6" id={form.id} onSubmit={form.onSubmit} action={action}>
                        <input type="hidden" name="siteId" value={params.siteId} />
                        <div className="grid gap-2">
                            <Label>Article Title</Label>
                            <Input key={fields.title.key} name={fields.title.name} defaultValue={fields.title.initialValue} placeholder="Nextjs blogging application" onChange={(e) => { setTitle(e.target.value) }} value={title} />
                            <p className="text-red-500 text-sm">{fields.title.errors}</p>
                        </div>
                        <div className="grid gap-2">
                            <Label>Slug</Label>
                            <Input key={fields.slug.key} name={fields.slug.name} defaultValue={fields.slug.initialValue} placeholder="Article Slug" onChange={(e) => { setSlugValue(e.target.value) }} value={slug} />
                            <p className="text-red-500 text-sm">{fields.slug.errors}</p>
                            <Button onClick={handleSlugGeneration} className="w-fit" variant="secondary" type="button">
                                <Atom className="size-4 mr-2" /> Generate Slug
                            </Button>
                        </div>
                        <div className="grid gap-2">
                            <Label>Description</Label>
                            <Textarea key={fields.smallDescription.key} name={fields.smallDescription.name} defaultValue={fields.smallDescription.initialValue} className="h-32" placeholder="Small description about the article" />
                            <p className="text-red-500 text-sm">{fields.smallDescription.errors}</p>
                        </div>
                        <div className="grid gap-2">
                            <Label>Cover Image</Label>
                            <input type="hidden" key={fields.coverImage.key} name={fields.coverImage.name} defaultValue={fields.coverImage.initialValue}
                                value={imageUrl} />
                            {imageUrl ? (
                                <Image src={imageUrl} width={200} height={200} alt="image" className="object-cover w-[200px] h-[200px] rounded-lg" />
                            ) : (
                                <UploadDropzone onClientUploadComplete={(res) => {
                                    setImageUrl(res[0].url);
                                    toast.success("Image uploaded successfully")
                                }}
                                    endpoint="imageUploader"
                                    onUploadError={() => {
                                        setImageUrl(undefined)
                                        toast.error("Image upload failed")
                                    }}
                                />)}
                            <p className="text-red-500 text-sm">{fields.coverImage.errors}</p>
                        </div>
                        <div className="grid gap-2">
                            <Label>Article Content</Label>
                            <input type="hidden" key={fields.articleContent.key} name={fields.articleContent.name} defaultValue={fields.articleContent.initialValue}
                                value={JSON.stringify(value)} />
                            <TailwindEditor initialVaue={value} onChange={setValue} />
                            <p className="text-red-500 text-sm">{fields.articleContent.errors}</p>
                        </div>
                        <SubmitButton text="Create Article" variant="default" />
                    </form>
                </CardContent>
            </Card>
        </>
    )
}