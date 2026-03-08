import ButtonMessagesBadge from "@/components/shadcn-studio/button/button-21";
import ButtonTapAnimation from "@/components/shadcn-studio/button/button-42";
import { Clock8Icon } from "lucide-react";

export default function ReactionSpeedTest() {
  return (
    <div className="reaction-speed-test flex w-100 flex-col items-center justify-center gap-6 bg-amber-50 sm:w-2xl">
      <div className="flex w-full items-center justify-center gap-2">
        <ButtonMessagesBadge
          number={99}
          className="flex-1 cursor-pointer"
          onClick={() => alert("Messages")}
        >
          Messages
        </ButtonMessagesBadge>
        <ButtonTapAnimation className="flex-2">Refresh</ButtonTapAnimation>
      </div>
      <div className="timer flex items-center justify-center gap-1">
        <Clock8Icon className="size-4" />
        <span>00:00:00</span>
      </div>
      <div className="text-8xl font-bold">88</div>
      <div className="flex w-full gap-2">
        <ButtonTapAnimation className="flex-1">Stop</ButtonTapAnimation>
        <ButtonTapAnimation className="flex-1">Start</ButtonTapAnimation>
      </div>
    </div>
  );
}
