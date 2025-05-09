

import MatchesPage from '@/components/MatchPages';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function ViewAllMatches() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/signin"); 
  }
  return <MatchesPage type="all" />;
}
