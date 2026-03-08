// Util Imports
import { cn } from "@/lib/utils";

const Logo = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <img
        src="img/logo.png"
        alt="Logo"
        className="size-10 duration-300 hover:scale-110"
      />
    </div>
  );
};

export default Logo;
