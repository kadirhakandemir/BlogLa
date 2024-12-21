"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { UploadDropzone } from "@/app/utils/UploadthingComponents";
import TailwindEditor from "./EditorWrapper";
import { SubmitButton } from "./SubmitButtons";
import { Atom } from "lucide-react";
import { toast } from "sonner";
import { useActionState, useState } from "react";
import { JSONContent } from "novel";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { PostSchema } from "@/app/utils/zodSchemas";
import { EditPostAction } from "@/app/actions";
import slugify from "react-slugify";

interface Props {
    data: {
        title: string;
        slug: string;
        smallDescription: string;
        articleContent: any;
        id: string;
        image: string;
    };
    siteId: string;
}

export function EditArticleForm({ data, siteId }: Props) {
    const [imageUrl, setImageUrl] = useState<string | undefined>(data.image);
    const [value, setValue] = useState<JSONContent | undefined>(data.articleContent);
    const [slug, setSlugValue] = useState<string | undefined>(data.slug);
    const [title, setTitle] = useState<string | undefined>(data.title);
    const [lastResult, action] = useActionState(EditPostAction, undefined);
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
        <Card className="mt-5">
            <CardHeader>
                <CardTitle>Article Details</CardTitle>
                <CardDescription>Create your new Article here. Click the button below to get started.</CardDescription>
            </CardHeader>
            <CardContent>
                <form className="flex flex-col gap-6" id={form.id} onSubmit={form.onSubmit} action={action}>
                    <input type="hidden" name="articleId" value={data.id} />
                    <input type="hidden" name="siteId" value={siteId} />
                    <div className="grid gap-2">
                        <Label>Article Title</Label>
                        <Input
                            key={fields.title.key}
                            name={fields.title.name}
                            defaultValue={fields.title.initialValue}
                            placeholder="Nextjs blogging application"
                            onChange={(e) => { setTitle(e.target.value) }} value={title} />
                        <p className="text-red-500 text-sm">{fields.title.errors}</p>
                    </div>
                    <div className="grid gap-2">
                        <Label>Slug</Label>
                        <Input
                            key={fields.slug.key}
                            name={fields.slug.name}
                            defaultValue={fields.slug.initialValue}
                            placeholder="Article Slug"
                            onChange={(e) => { setSlugValue(e.target.value) }} value={slug} />
                        <p className="text-red-500 text-sm">{fields.slug.errors}</p>
                        <Button
                            onClick={handleSlugGeneration}
                            className="w-fit" variant="secondary" type="button">
                            <Atom className="size-4 mr-2" /> Generate Slug
                        </Button>
                    </div>
                    <div className="grid gap-2">
                        <Label>Description</Label>
                        <Textarea
                            key={fields.smallDescription.key}
                            name={fields.smallDescription.name}
                            defaultValue={data.smallDescription}
                            className="h-32"
                            placeholder="Small description about the article" />
                        <p className="text-red-500 text-sm">{fields.smallDescription.errors}</p>
                    </div>
                    <div className="grid gap-2">
                        <Label>Cover Image</Label>
                        <input
                            type="hidden"
                            key={fields.coverImage.key}
                            name={fields.coverImage.name}
                            defaultValue={fields.coverImage.initialValue}
                            value={imageUrl} />
                        {imageUrl ? (
                            <Image
                                src={imageUrl}
                                width={200}
                                height={200}
                                alt="image"
                                className="object-cover w-[200px] h-[200px] rounded-lg" />
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
                        <input
                            type="hidden"
                            key={fields.articleContent.key}
                            name={fields.articleContent.name}
                            defaultValue={fields.articleContent.initialValue}
                            value={JSON.stringify(value)} />
                        <TailwindEditor
                            initialVaue={value}
                            onChange={setValue} />
                        <p className="text-red-500 text-sm">{fields.articleContent.errors}</p>
                    </div>
                    <SubmitButton text="Save" variant="default" />
                </form>
            </CardContent>
        </Card>
    )
}