import { MenuIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Logo from "@/components/shadcn-studio/logo";

type NavigationItem = {
  title: string;
  href: string;
  icon: React.ReactNode;
}[];

const Navbar = ({ navigationData }: { navigationData: NavigationItem }) => {
  return (
    <header className="sticky top-2 z-50 w-[98%] rounded-sm bg-background/90 p-1 shadow-sm md:w-fit">
      <div className="flex w-full items-center justify-between gap-4">
        <div className="flex flex-1 items-center gap-8 font-medium text-muted-foreground md:justify-center lg:gap-2">
          <a href="#">
            <Logo className="gap-3 rounded text-foreground" />
          </a>

          {navigationData.map((item) => (
            <a
              key={item.title}
              href={item.href}
              className="rounded p-2 text-primary duration-200 hover:bg-muted hover:text-muted-foreground max-md:hidden"
            >
              {item.icon}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-6 md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <MenuIcon />
                <span className="sr-only">Menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-fit" align="end">
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
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
