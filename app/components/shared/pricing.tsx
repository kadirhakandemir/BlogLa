import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import Link from "next/link";
import { SubmitButton } from "../dashboard/SubmitButtons";
import { CreateSubscription } from "@/app/actions";

interface PricingProps {
    id: number;
    cartTitle: string;
    cartDescription: string;
    cartPrice: string;
    cartFeatures: string[];
}

export const PricingPlans: PricingProps[] = [{
    id: 0,
    cartTitle: "Freelancer",
    cartDescription: "The essentials to get started",
    cartPrice: "Free",
    cartFeatures: [
        "1 Site",
        "Up to 1000 Visitors",
        "Limited community access"
    ]

},
{
    id: 1,
    cartTitle: "Startup",
    cartDescription: "The best pricing plan for professionals",
    cartPrice: "$29",
    cartFeatures: [
        "Unlimited Sites",
        "Unlimited Visitors",
        "Community access"
    ]
}]

export function PricingTable() {
    return (
        <>
            <div className="max-w-3xl mx-auto text-center">
                <p className="text-primary font-semibold">Pricing</p>
                <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">Pricing Plans for everyone and every budget!</h1>
            </div>
            <p className="mx-auto mt-8 max-w-2xl text-center leading-tight text-muted-foreground">
                No matter your needs or budget, we have the perfect plan for you! From essential features for beginners to comprehensive solutions for professionals and customizable options for enterprises, our plans are designed to deliver value at every level.
            </p>
            <div className="grid grid-cols-1 gap-8 mt-16 lg:grid-cols-2 ">
                {PricingPlans.map((item) => (
                    <Card key={item.id} className={item.id === 1 ? "border-primary" : ""}>
                        <CardHeader>
                            <CardTitle>
                                {item.id === 1 ?
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-primary">{item.cartTitle}</h3>
                                        <p className="rounded-full bg-primary/20 px-3 py-1 text-xs font-semibold leading-5 text-primary">Most Popular</p>
                                    </div>
                                    : (
                                        <>
                                            {item.cartTitle}</>
                                    )}
                            </CardTitle>
                            <CardDescription>{item.cartDescription}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="mt-6 text-4xl font-bold tracking-tight">{item.cartPrice}</p>
                            <ul role="list" className="mt-6 space-y-3 text-sm leading-6 text-muted-foreground">
                                {item.cartFeatures.map((feature, index) => (
                                    <li key={index} className="flex gap-x-3">
                                        <Check className="size-5 text-primary" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                        <CardFooter>
                            {item.id === 1 ? (
                                <form className="w-full" action={CreateSubscription} >
                                    <SubmitButton text="Get Started" className="mt-5  w-full" />
                                </form>
                            ) : (
                                <Button variant={"outline"} asChild className="mt-5  w-full">
                                    <Link href="/dashboard/">Try For Free</Link>
                                </Button>
                            )}
                        </CardFooter>
                    </Card>
                ))}

            </div>
        </>
    )
}