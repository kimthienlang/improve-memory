import { MailCheckIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const ButtonMessagesBadge = ({
  number,
  children,
  className,
  onClick,
}: {
  number?: number;
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <Button variant="outline" className={className} onClick={onClick}>
      <MailCheckIcon />
      {children}
      <Badge variant="destructive" className="px-1.5 py-px">
        +{number}
      </Badge>
    </Button>
  );
};

export default ButtonMessagesBadge;
