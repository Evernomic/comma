"use client";
import { generateYearsInRange } from "@/lib/utils";
import { workExperienceFormSchema } from "@/lib/validations/work-experience";
import { zodResolver } from "@hookform/resolvers/zod";
import { WorkExperience } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { Icons } from "../shared/icons";
import Button from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import Input from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { toast } from "../ui/use-toast";

type FormData = z.infer<typeof workExperienceFormSchema>;

export default function AddEditExperienceModal({
  experience,
  edit,
  closeExperienceOperations,
}: {
  experience?: WorkExperience;
  edit?: boolean;
  closeExperienceOperations?: () => void;
}) {
  const [showAddEditExperienceModal, setShowAddEditExperienceModal] =
    useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [endYearOptions, setEndYearOptions] = useState<number[]>([]);

  const { title, endpoint, method, successMessage } = useMemo(() => {
    if (edit && experience) {
      return {
        title: "Edit experience",
        endpoint: `/api/user/work/${experience.id}`,
        method: "PATCH",
        successMessage: "Experience has been saved.",
      };
    } else {
      return {
        title: "Add experience",
        endpoint: "/api/user/work",
        method: "POST",
        successMessage: "Experience has been added.",
      };
    }
  }, [edit, experience]);

  const {
    handleSubmit,
    register,
    reset,
    watch,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(workExperienceFormSchema),
    defaultValues:
      edit && experience
        ? {
            from: experience?.from,
            to: experience?.to,
            title: experience?.title,
            company: experience?.company!,
            location: experience?.location!,
            url: experience?.url!,
            description: experience?.description!,
          }
        : { from: 2020 },
  });

  const startYear = watch("from");

  useEffect(() => {
    if (startYear) {
      setEndYearOptions(generateYearsInRange(startYear - 1));
    }
  }, [startYear]);

  useEffect(() => {
    if (!showAddEditExperienceModal) {
      reset();
    }
  }, [showAddEditExperienceModal]);

  const onSubmit = async (data: FormData) => {
    startTransition(async () => {
      const res = await fetch(endpoint, {
        method,
        body: JSON.stringify(data),
      });

      const body = await res.text();
      if (!res?.ok) {
        toast({
          title: "Something went wrong.",
          description: body,
        });
      } else {
        setShowAddEditExperienceModal(false);
        reset();
        closeExperienceOperations?.();
        router.refresh();
        toast({
          title: successMessage,
        });
      }
    });
  };

  return (
    <Dialog
      open={showAddEditExperienceModal}
      onOpenChange={setShowAddEditExperienceModal}
    >
      <DialogTrigger asChild>
        {edit ? (
          <Button variant="ghost" size="sm" className="justify-start gap-2">
            <Icons.edit size={15} /> Edit
          </Button>
        ) : (
          <Button
            size="sm"
            variant="secondary"
            aria-label={title}
            title={title}
          />
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <form
          id="add-edit-experience-form"
          className="flex flex-col gap-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex gap-2">
            <Controller
              control={control}
              {...register("from")}
              render={({ field: { onChange, value } }) => (
                <Select
                  onValueChange={(val) => onChange(Number(val))}
                  value={String(value)}
                  disabled={isPending}
                >
                  <SelectTrigger error={!!errors.from}>
                    <SelectValue placeholder="Select start year" />
                  </SelectTrigger>
                  <SelectContent>
                    {generateYearsInRange().map((year) => (
                      <SelectItem
                        value={year.toString()}
                        key={`start-year--${year}`}
                      >
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            <Controller
              control={control}
              {...register("to")}
              render={({ field: { onChange, value } }) => (
                <Select
                  disabled={isPending}
                  onValueChange={onChange}
                  value={value}
                >
                  <SelectTrigger error={!!errors.to}>
                    <SelectValue placeholder="Select end year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="present">Present</SelectItem>
                    {endYearOptions.map((year) => (
                      <SelectItem
                        value={year.toString()}
                        key={`end-year--${year}`}
                      >
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="Title"
              error={!!errors.title}
              disabled={isPending}
              {...register("title")}
            />
            <Input
              placeholder="Company"
              error={!!errors.company}
              {...register("company")}
              disabled={isPending}
            />
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="Location"
              error={!!errors.location}
              {...register("location")}
              disabled={isPending}
            />
            <Input
              type="url"
              placeholder="https://example.com"
              error={!!errors.url}
              disabled={isPending}
              {...register("url")}
            />
          </div>
          <Textarea
            placeholder="Add some details"
            disabled={isPending}
            error={!!errors.description}
            maxLength={250}
            {...register("description")}
            className="field-sizing-content"
          />
          <div className="text-xs text-gray-4 flex justify-between">
            <p>Markdown is supported</p>
            <p>{watch("description")?.length ?? "0"} of 250</p>
          </div>
        </form>
        <DialogFooter>
          <Button
            form="add-edit-experience-form"
            type="submit"
            isPending={isPending}
            size="sm"
          >
            {edit ? "Save" : "Add"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
