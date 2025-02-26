"use client";

import { validDomainRegex } from "@/lib/constants";
import { cn, getSubdomain } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Icons } from "../shared/icons";
import Button from "../ui/button";
import Input from "../ui/input";
import { toast } from "../ui/use-toast";
import { Config } from "./config";
import useDomainStatus from "./use-domain-status";

const domainFormSchema = z.object({
  domain: z.string().optional().nullable(),
});

type FormData = z.infer<typeof domainFormSchema>;
export default function CustomDomain({
  currentDomain,
}: {
  currentDomain: string | null;
}) {
  const [isLoading, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const { handleSubmit, register, watch } = useForm<FormData>({
    resolver: zodResolver(domainFormSchema),
    defaultValues: {
      domain: currentDomain,
    },
  });

  const {
    status,
    isLoading: pending,
    domainRes,
    mutate,
  } = useDomainStatus(currentDomain);

  const watchDomain = watch("domain");
  const disabledButton = useMemo(() => {
    return (
      currentDomain === watchDomain ||
      (!currentDomain && !watchDomain) ||
      pending ||
      isLoading ||
      (watchDomain ? !validDomainRegex.test(watchDomain as string) : false)
    );
  }, [currentDomain, watchDomain, pending, isLoading]);

  const onSubmit = async (data: FormData) => {
    setError(null);
    startTransition(async () => {
      const res = await fetch("/api/user/domain", {
        method: "POST",
        body: JSON.stringify({
          domain: data.domain?.length ? data.domain : null,
        }),
      });

      router.refresh();
      mutate();
      if (!res.ok) {
        const error = await res.text();
        if (res.status === 422 || res.status === 401) {
          setError(error);
        } else {
          toast({
            title: "Something went wrong.",
            description: error,
            variant: "destructive",
          });
        }
      }
    });
  };
  const unconfigured =
    (status === "Invalid Configuration" || status === "Pending Verification") &&
    !error &&
    currentDomain;
  const subdomain = getSubdomain(domainRes?.name, domainRes?.apexName);
  const txtVerification =
    status === "Pending Verification" &&
    domainRes.verification.find((x: any) => x.type === "TXT");

  return (
    <form
      className="overflow-hidden rounded-md relative border border-gray-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-1 p-4">
        <div className="flex flex-col gap-1">
          <h1>Custom domain</h1>
          <p className="text-sm text-gray-4">
            The custom domain for your page.
          </p>
        </div>

        <div className="flex items-center gap-2 mt-2">
          <Input
            type="text"
            className={cn("w-[250px] max-[250px]:w-full")}
            autoComplete="off"
            placeholder="yourdomain.com"
            {...register("domain")}
          />
          {(status === "Valid Configuration" || pending || isLoading) && (
            <span className="w-max block bg-gray-3 p-1 rounded-full">
              {pending || isLoading ? (
                <Icons.spinner size={18} className="animate-spin text-gray-1" />
              ) : (
                <Icons.check size={18} className="text-gray-1" />
              )}
            </span>
          )}
          {unconfigured && (
            <span
              className="block bg-gray-3  text-gray-1 p-1 rounded-full cursor-pointer"
              onClick={mutate}
            >
              {pending ? (
                <Icons.spinner size={18} className="animate-spin" />
              ) : (
                <Icons.refreshCw
                  size={18}
                  className={pending ? "animate-spin" : ""}
                />
              )}
            </span>
          )}
        </div>
      </div>

      {unconfigured && (
        <div className="p-4 pt-0">
          <p className="font-bold text-sm flex items-center gap-1 text-danger">
            {pending && <Icons.spinner size={18} className="animate-spin" />}{" "}
            {status}
          </p>
          <p className="text-xs text-gray-4">
            Your domain requires configuration. Please update your DNS records
            with the information below and wait up to 24 hours for the changes
            to propagate.
          </p>
          {txtVerification ? (
            <Config
              type={txtVerification.type}
              name={txtVerification.domain.slice(
                0,
                txtVerification.domain.length - domainRes.apexName.length - 1,
              )}
              value={txtVerification.value}
            />
          ) : (
            <Config
              type={subdomain ? "CNAME" : "A"}
              name={subdomain ? subdomain : "@"}
              value={subdomain ? "cname.comma.to." : "76.76.21.21"}
            />
          )}
        </div>
      )}

      <footer className="flex h-auto flex-row items-center justify-between border-t border-gray-2 bg-gray-3 px-4 py-2">
        <div className={cn("text-sm text-gray-4", error ? "text-danger" : "")}>
          {status === "Valid Configuration" && "Your domain is approved."}
          {error && error}
        </div>
        <Button type="submit" size="sm" disabled={disabledButton}>
          {isLoading ? (
            <>
              <Icons.spinner size={18} className="animate-spin" /> Saving
            </>
          ) : (
            <>Save</>
          )}
        </Button>
      </footer>
    </form>
  );
}
