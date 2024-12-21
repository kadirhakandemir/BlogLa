import { CloudRain } from "lucide-react";

const features = [
    {
        name: "Sign up for free",
        description: "Sign up for free and start creating your blog in minutes.",
        icon: CloudRain,
    },
    {
        name: "Balzing fast",
        description: "Balzing fast and easy to create your blog.",
        icon: CloudRain,
    },
    {
        name: "Super secure with Kinde",
        description: "Super secure with Kinde and no need to worry about your data.",
        icon: CloudRain,
    },
    {
        name: "Easy to use",
        description: "Easy to use and easy to create your blog. Just follow the steps.",
        icon: CloudRain,
    },
]

export function Features() {
    return (
        <div className="py-24 sm:py-32">
            <div className="max-w-2xl mx-auto lg:text-center">
                <p className="font-semibold leading-7 text-primary">Blog Paster</p>
                <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Get your blog up and running in minutes</h1>
                <p className="mt-6 text-base leading-snug text-muted-foreground">
                    Right here you can create a blog in minutes. We make it easy for you to create your blog and get started. The blog is very fast and easy to create.
                </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                    {features.map((feature) => (
                        <div key={feature.name} className="relative pl-16">
                            <div className="text-base font-semibold leading-7">
                                <div className="absolute left-0 top-0 flex size-10 items-center justify-center rounded-lg bg-primary">
                                    <feature.icon className="size-6 text-white" />
                                </div>
                                {feature.name}
                            </div>
                            <div className="mt-2 text-sm leading-snug text-muted-foreground">{feature.description}</div>
                        </div>
                    ))}

                </div>

            </div>

        </div>
    );
}