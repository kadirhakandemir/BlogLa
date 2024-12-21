import { conformZodMessage } from "@conform-to/zod";
import { z } from "zod";

export const siteSchema = z.object({
    name: z.string().min(1, "Title is required").max(35, "Title must be less than 35 characters"),
    description: z.string().min(1, "Description is required").max(100, "Description must be less than 100 characters"),
    subdirectory: z.string().min(1, "Subdirectory is required").max(40, "Subdirectory must be less than 20 characters")
});

export const PostSchema = z.object({
    title: z.string().min(1, "Title is required").max(100, "Title must be less than 100 characters"),
    slug: z.string().min(1, "Slug is required").max(100, "Slug must be less than 100 characters"),
    smallDescription: z.string().min(1, "Description is required").max(400, "Description must be less than 400 characters"),
    articleContent: z.string().min(1, "Content is required"),
    coverImage: z.string().min(1, "Cover Image is required"),
});

export function SiteCreationSchema(options?: {
    isSubdirectoryUnique: () => Promise<boolean>
}) {
    return z.object({
        subdirectory: z.string().min(1, "Subdirectory is required").max(40, "Subdirectory must be less than 20 characters").regex(/^[a-z]+$/, "Subdirectory must be only use lowercase letters").transform((value) => value.toLocaleLowerCase())
            .pipe(
                z.string().superRefine((email, ctx) => {
                    if (typeof options?.isSubdirectoryUnique !== "function") {
                        ctx.addIssue({
                            code: 'custom',
                            message: conformZodMessage.VALIDATION_UNDEFINED,
                            fatal: true
                        });
                        return;
                    }
                    return options.isSubdirectoryUnique().then((isUnique) => {
                        if (!isUnique) {
                            ctx.addIssue({
                                code: 'custom',
                                message: "Subdirectory is already in use",
                                fatal: true
                            });
                        }
                    })
                })
            ),
        name: z.string().min(1, "Title is required").max(35, "Title must be less than 35 characters"),
        description: z.string().min(1, "Description is required").max(100, "Description must be less than 100 characters"),

    });
}