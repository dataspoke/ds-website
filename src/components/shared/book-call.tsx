import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BOOKING_URL } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface BookCallProps {
  children?: React.ReactNode;
  size?: "default" | "lg";
  className?: string;
}

/** Primary call to action. Opens the Google Calendar booking page in a new tab. */
export function BookCall({ children = "Book a call", size = "lg", className }: BookCallProps) {
  return (
    <Button asChild size={size} className={cn("group h-11 text-base font-semibold", className)}>
      <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
        {children}
        <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
      </a>
    </Button>
  );
}
