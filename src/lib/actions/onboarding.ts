"use server";

import { cookies } from "next/headers";

export async function hideOnboardingCheclistForever() {
  (await cookies()).set("hide-onboarding", "forever");
}
