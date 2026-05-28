import Link from "next/link";

export function Sidebar() {
  return (
    <aside className="w-64 border-r bg-background p-4 hidden md:block">
      <nav className="flex flex-col gap-2">
        <Link href="/">Dashboard</Link>
        <Link href="/jobs">Jobs</Link>
        <Link href="/resume">Resume Analyzer</Link>
        <Link href="/interview">Interview Coach</Link>
      </nav>
    </aside>
  );
}