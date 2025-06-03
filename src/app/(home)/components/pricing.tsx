"use client";
import { Icons } from "@/components/shared/icons";
import Button from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { marketingConfig } from "@/config/marketing";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import type { Period } from "@/types";
import Link from "next/link";
import { useState } from "react";

export default function Pricing() {
  const [period, setPeriod] = useState<Period>("monthly");
  const id = "period-switch";
  return (
    <section
      id="pricing"
      className="section-container flex flex-col gap-15 justify-center items-center"
    >
      <div className="text-4xl text-center font-medium">Pricing</div>

      <div className="text-gray-4 text-base font-medium flex items-center gap-3 transition-colors">
        <label
          className={cn(period === "monthly" && "text-secondary")}
          htmlFor={id}
        >
          Monthly
        </label>
        <Switch
          id={id}
          onCheckedChange={(bool) => setPeriod(bool ? "yearly" : "monthly")}
        />
        <label
          className={cn(period === "yearly" && "text-secondary")}
          htmlFor={id}
        >
          Yearly
        </label>
      </div>

      <div className="grid grid-cols-2 max-md:grid-cols-1 gap-3 section-content">
        {marketingConfig.plans.map((plan) => {
          const isProPlan = plan.title === "Pro";

          return (
            <div
              className={cn(
                "border  rounded-md p-4.4 flex flex-col gap-5",
                isProPlan && "bg-gray-3",
              )}
              key={plan.title}
            >
              <b className="font-semibold text-xl ">{plan.title}</b>

              <div>
                <b className="font-semibold text-3xl ">${plan.price[period]}</b>
                <p className="text-sm text-gray-4 mt-1 font-medium">
                  Per {period.slice(0, -2)}
                </p>
              </div>

              <div>
                <div></div>
                <ul className="flex flex-col gap-3">
                  {plan.features.map((f) => {
                    const Icon = Icons[f.icon];
                    return (
                      <li
                        className="text-sm flex gap-2 text-gray-4 items-center"
                        key={f.name}
                      >
                        <Icon
                          size={20}
                          className={
                            f.icon === "x" ? "text-danger" : "text-grass"
                          }
                        />
                        {f.name}
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div>
                <Link href={siteConfig.links.signup} aria-label="Get Started">
                  <Button
                    className="w-full"
                    variant={isProPlan ? "primary" : "secondary"}
                  >
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
