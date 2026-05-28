import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-1 flex flex-col">
      <Navbar />
      <div className=" min-h-screen flex">
        <Sidebar />
        <main className="flex-1 p-6 bg-muted/40">{children}</main>
      </div>
    </div>
  );
}
