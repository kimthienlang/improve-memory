import * as motion from "motion/react-client";

import { Button } from "@/components/ui/button";

const ButtonTapAnimation = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <Button className={`transition-none ${className}`} asChild>
      <motion.button whileTap={{ scale: 0.85 }}>{children}</motion.button>
    </Button>
  );
};

export default ButtonTapAnimation;
