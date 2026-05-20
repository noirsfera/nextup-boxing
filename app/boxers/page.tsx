import type { Metadata } from "next"
import { BoxersClient } from "./BoxersClient"

export const metadata: Metadata = {
  title: "NextUp Fighters | Elite Boxing Roster",
  description: "Explore the elite roster of NextUp Boxing League. Access detailed fighter profiles, professional records, physical statistics, and interactive career timelines for our champions.",
  keywords: ["nextup boxing", "boxers stable", "boxing champions", "boxing roster", "vergil ortiz", "ryan garcia"],
}

export default function BoxersPage() {
  return <BoxersClient />
}
