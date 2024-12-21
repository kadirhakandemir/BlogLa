import { PricingTable } from "../shared/pricing";
import { Features } from "./Features";
import Hero from "./Hero";
import { Logos } from "./Logos";

export function ClientComponent() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
            <Hero />
            <Logos />
            <Features />
            <PricingTable />
        </div>
    );
}