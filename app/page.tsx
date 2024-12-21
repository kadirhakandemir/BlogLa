
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { ClientComponent } from "./components/frontend/ClientComponent";

export default async function Home() {
  const { getUser } = getKindeServerSession();
  const session = await getUser();
  if (session?.id) {
    return redirect("/dashboard")
  }
  return (
    <ClientComponent />
  );
}
