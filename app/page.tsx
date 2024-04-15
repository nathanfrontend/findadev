import { db } from "@/db";
import Image from "next/image";

export default async function Home() {
  const items = await db.query.test.findMany();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex"></div>
    </main>
  );
}
