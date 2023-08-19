import { authenticatedUser } from "@/lib/actions/actions.user";
import Image from "next/image";

export default async function Home() {
  const session = await authenticatedUser();

  return <main className=""></main>;
}
