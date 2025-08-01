"use client";

import { marketingConfig } from "@/config/marketing";
import { cn, formatDate } from "@/lib/utils";
import type { Period, UserSubscriptionPlan } from "@/types";
import { type FormEvent, useState, useTransition } from "react";
import { Icons } from "../shared/icons";
import { Badge } from "../ui/badge";
import Button from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { toast } from "../ui/use-toast";

interface Props {
  subscriptionPlan: UserSubscriptionPlan;
}

export default function BillingForm({ subscriptionPlan }: Props) {
  const [isLoading, startTransition] = useTransition();
  const isPro = subscriptionPlan.isPro ? "Pro" : "Free";
  const [period, setPeriod] = useState<Period>(
    subscriptionPlan.period ?? "monthly",
  );

  async function billing(e: FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      const res = await fetch("/api/user/billing", {
        method: "POST",
        body: JSON.stringify({
          plan: "pro",
          period,
        }),
      });
      if (!res?.ok) {
        toast({
          title: "Something went wrong.",
          description: "Please refresh the page and try again.",
        });
      } else {
        const data = await res.json();
        if (data) {
          window.location.href = data.url;
        }
      }
    });
  }

  return (
    <div className="flex flex-col gap-2  rounded-md">
      <div className="grid grid-cols-2 gap-2 relative max-md:grid-cols-1 ">
        <div className="absolute z-20 right-3 top-3 text-xs font-medium text-gray-4 flex items-center gap-1">
          <Checkbox
            id="plan-switch"
            className="size-[18px]"
            aria-label="Plan period toggle"
            checked={period === "yearly"}
            onCheckedChange={(checked) =>
              setPeriod(checked ? "yearly" : "monthly")
            }
          />{" "}
          <label htmlFor="plan-switch" className="select-none">
            Yearly
          </label>
        </div>
        {marketingConfig.plans.map((plan) => (
          <div className="flex flex-col border rounded-md" key={plan.title}>
            <div
              className={cn(
                "py-4  z-10 pl-4 border-b",
                plan.title === isPro ? "bg-gray-3" : "",
              )}
            >
              <div className="flex gap-2 items-center">
                <p className="font-medium ">{plan.title}</p>
                {plan.title === subscriptionPlan.title && (
                  <Badge className="text-gray-4 border-none p-0">
                    Current plan
                  </Badge>
                )}
              </div>
              <div className="flex items-center mt-2">
                <p className="text-xl  text-secondary font-medium tracking-wider  flex items-baseline gap-1">
                  $
                  {subscriptionPlan.title === plan.title
                    ? subscriptionPlan.price[period]
                    : plan.price[period]}
                  <span className="text-xs text-gray-4">
                    / {period === "monthly" ? "month" : "year"}
                  </span>
                </p>
              </div>
            </div>
            <div className="grid grid-rows-6 p-2">
              {plan.features.map((feature) => {
                const Icon = Icons[feature.icon];
                return (
                  <div
                    className="p-2 text-sm  flex items-center gap-2"
                    key={feature.name}
                  >
                    <Icon
                      size={15}
                      className={
                        feature.icon === "x" ? "text-danger" : "text-grass"
                      }
                    />
                    {feature.name}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <div className="flex max-md:flex-col max-md:items-stretch gap-3 border font-medium rounded-md bg-gray-3    justify-between items-center p-3 text-xs text-gray-4">
        {subscriptionPlan.isPro ? (
          <p className="max-md:text-center">
            {subscriptionPlan.status === "cancelled" &&
              "Your plan will expire on "}
            {subscriptionPlan.status === "active" && "Your plan renews on "}
            {subscriptionPlan.status !== "expired" &&
              subscriptionPlan.lsCurrentPeriodEnd && (
                <span className="text-secondary">
                  {formatDate(new Date(subscriptionPlan.lsCurrentPeriodEnd))}.
                </span>
              )}
          </p>
        ) : (
          <p className="max-md:text-center">
            {subscriptionPlan.status === "past_due" && "Past due"}
            {subscriptionPlan.status === "expired" && "Expired"}
            {!subscriptionPlan.status &&
              "Upgrade plan to Pro to use all features."}
          </p>
        )}

        <form onSubmit={billing} className="flex flex-col gap-2 ">
          <Button
            type="submit"
            variant="primary"
            isPending={isLoading}
            size="sm"
          >
            {subscriptionPlan.isPro ? "Manage" : "Upgrade"}
          </Button>
        </form>
      </div>
    </div>
  );
}
