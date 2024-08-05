import { auth } from "@/auth";
import LoginBadge from "@/components/auth/login-badge";
import { ThemeToggle } from "@/components/theme-toggle";
import { CardHeader, CardTitle } from "@/components/ui/card";

const AuthHeader = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  return (
    <CardHeader>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <CardTitle>{children}</CardTitle>
        <div className="ml-auto flex-1 sm:flex-initial"></div>
        <LoginBadge user={session?.user} />
        <ThemeToggle />
      </div>
    </CardHeader>
  );
};

export default AuthHeader;
