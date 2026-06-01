import { MobileSidebar } from "./MobileSidebar";

export function Navbar() {
  return (
    <header className="h-20 border-b bg-background px-6 flex items-center">
      <MobileSidebar />
      <h1 className="text-4xl font-bold">HireFlow</h1>
    </header>
  );
}