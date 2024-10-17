import { checkoutAction } from "@/lib/payments/actions";
import { Check } from "lucide-react";
import { getStripePrices, getStripeProducts } from "@/lib/payments/stripe";
import { SubmitButton } from "./submit-button";

// Prices are fresh for one hour max
export const revalidate = 3600;

export default async function PricingPage() {
  const [prices, products] = await Promise.all([
    getStripePrices(),
    getStripeProducts(),
  ]);

  const basePlan = products.find((product) => product.name === "Basis");
  const standartPlan = products.find((product) => product.name === "Standart");
  const plusPlan = products.find((product) => product.name === "Plus");
  const proPlan = products.find((product) => product.name === "Pro");

  const basePrice = prices.find((price) => price.productId === basePlan?.id);
  const standartPrice = prices.find(
    (price) => price.productId === standartPlan?.id
  );
  const plusPrice = prices.find((price) => price.productId === plusPlan?.id);
  const proPrice = prices.find((price) => price.productId === proPlan?.id);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
        <PricingCard
          name={basePlan?.name || "Base"}
          price={basePrice?.unitAmount || 800}
          interval={basePrice?.interval === "month" ? "Monat" : "month"}
          trialDays={basePrice?.trialPeriodDays || 7}
          features={[
            "Member Management",
            "Unbegrenzte User",
            "Unbegrenzte Mitarbeiter",
            "Email Support",
          ]}
          priceId={basePrice?.id}
        />
        <PricingCard
          name={standartPlan?.name || "Standart"}
          price={standartPrice?.unitAmount || 500}
          interval={standartPrice?.interval === "month" ? "Monat" : "month"}
          trialDays={standartPrice?.trialPeriodDays || 7}
          features={[
            "Alle Features von Standart, und:",
            "Team Managment",
            "Email Support",
          ]}
          priceId={standartPrice?.id}
        />
        <PricingCard
          name={plusPlan?.name || "Plus"}
          price={plusPrice?.unitAmount || 1200}
          interval={plusPrice?.interval === "month" ? "Monat" : "month"}
          trialDays={plusPrice?.trialPeriodDays || 7}
          features={[
            "Alle Features von Standart, und:",
            "Bewerber Management",
            "Priority Support",
          ]}
          priceId={plusPrice?.id}
        />
        <PricingCard
          name={proPlan?.name || "Pro"}
          price={proPrice?.unitAmount || 2000}
          interval={proPrice?.interval === "month" ? "Monat" : "month"}
          trialDays={proPrice?.trialPeriodDays || 7}
          features={[
            "Alle Features von Plus, und:",
            "Eigenes Online Bewerbungsformular",
            "Custom Branding",
            "Discord Bot Integration",
            "Priority Support",
          ]}
          priceId={standartPrice?.id}
        />
      </div>
    </main>
  );
}

function PricingCard({
  name,
  price,
  interval,
  trialDays,
  features,
  priceId,
}: {
  name: string;
  price: number;
  interval: string;
  trialDays: number;
  features: string[];
  priceId?: string;
}) {
  return (
    <div className="pt-6">
      <h2 className="text-2xl font-medium text-gray-900 dark:text-gray-100 mb-2">
        {name}
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
        {trialDays} Tage kostenlos testen
      </p>
      <p className="text-4xl font-medium text-gray-900 dark:text-gray-100 mb-6">
        €{price / 100}{" "}
        <span className="text-xl font-normal text-gray-600 dark:text-gray-300">
          pro Team / {interval}
        </span>
      </p>
      <ul className="space-y-4 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <Check className="h-5 w-5 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
            <span className="text-gray-700 dark:text-gray-400">{feature}</span>
          </li>
        ))}
      </ul>
      <div className="flex-grow">
        <form action={checkoutAction}>
          <input type="hidden" name="priceId" value={priceId} />
          <SubmitButton />
        </form>
      </div>
    </div>
  );
}
