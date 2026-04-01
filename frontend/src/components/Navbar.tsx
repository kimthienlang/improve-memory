import { MenuIcon, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "@/lib/api";
import { useUserStore } from "@/store/userStore";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Logo from "@/components/shadcn-studio/logo";

type NavigationItem = {
  title: string;
  href: string;
  icon: React.ReactNode;
}[];

const Navbar = ({ navigationData }: { navigationData: NavigationItem }) => {
  const navigate = useNavigate();
  const { user, logout } = useUserStore();

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      logout(); // Clear Zustand store
      toast.success("Đăng xuất thành công");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
      toast.error("Lỗi khi đăng xuất");
    }
  };

  return (
    <header className="sticky top-2 z-50 w-[98%] rounded-sm bg-background/90 p-1 shadow-sm md:w-fit mx-auto border border-border/40 backdrop-blur-sm">
      <div className="flex w-full items-center justify-between gap-4 px-2">
        <div className="flex flex-1 items-center gap-4 font-medium text-muted-foreground md:justify-center lg:gap-2">
          {navigationData.map((item) => (
            <a
              key={item.title}
              href={item.href}
              className="rounded p-2 text-primary duration-200 hover:bg-muted hover:text-muted-foreground max-md:hidden"
              title={item.title}
            >
              {item.icon}
            </a>
          ))}

          {/* Desktop Logout Button */}
          {user && (
            <div className="flex items-center gap-2 border-l pl-4 ml-2 max-md:hidden">
              <span className="text-sm font-medium text-foreground truncate max-w-[100px]" title={user.name}>
                {user.name}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                className="text-destructive hover:bg-destructive/10 hover:text-destructive"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-6 md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <MenuIcon />
                <span className="sr-only">Menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuGroup>
                {navigationData.map((item, index) => (
                  <DropdownMenuItem
                    key={index}
                    asChild
                    onClick={() => (location.href = item.href)}
                  >
                    <span className="flex w-full justify-start gap-2">
                      <div className="icon">{item.icon}</div>
                      <div className="title">{item.title}</div>
                    </span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>

              {user && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="flex flex-col items-start gap-1 focus:bg-transparent">
                    <span className="text-xs text-muted-foreground">Logged in as</span>
                    <span className="font-semibold">{user.name}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-destructive focus:bg-destructive focus:text-destructive-foreground"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Đăng xuất</span>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
