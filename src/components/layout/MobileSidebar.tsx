"use client";

import Link from "next/link";
import { Menu } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { navigation } from "./navigation";

export function MobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="md:hidden">
          <Menu className="h-6 w-6 m-2" />
        </button>
      </SheetTrigger>

      <SheetContent side="left" className="w-72">
        <div className="flex items-center gap-2 border-b">
          <h2 className="m-4 text-3xl font-bold">HireFlow</h2>
        </div>

        <nav className="flex flex-col gap-2">
          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-muted"
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
