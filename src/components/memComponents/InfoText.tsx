import { Info } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card";

interface Props {
    title: string;
    description: string;
}

export const InfoTextHover = ({ title, description}: Props) => {
  return (
    <div className="flex gap-2 items-start">
        <div>
            <p className="text-xl">{title}</p>
        </div>
        <div className="h-full cursor-pointer">
            <HoverCard>
            <HoverCardTrigger asChild>
                <Info className="text-gray-400 h-[16px]" />
            </HoverCardTrigger>
            <HoverCardContent className="w-80 bg-white">
                {description}
            </HoverCardContent>
            </HoverCard>
        </div>
    </div>
  );
};