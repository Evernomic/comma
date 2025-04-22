"use server";

import { cookies } from "next/headers";

export async function hideOnboardingCheclistForever() {
  (await cookies()).set("hide-onboarding", "forever", {
    httpOnly: true,
    secure: true,
    expires: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
  });
}
