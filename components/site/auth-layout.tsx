import { SideNav } from "@/components/site/sidenav";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="flex-grow md:overflow-y-auto px-3 py-4 md:px-2">
        {children}
      </div>
    </div>
  );
}
