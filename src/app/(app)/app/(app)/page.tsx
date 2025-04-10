import { getUser } from "@/lib/fetchers/users";
import { notFound, redirect } from "next/navigation";

export default async function Page() {
  const user = await getUser();

  if (!user) {
    return notFound();
  }

  return redirect("/pages");
}
