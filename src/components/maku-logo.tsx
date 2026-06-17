import { cn } from "@/lib/utils";

interface MakuLogoProps {
  className?: string;
  variant?: "light" | "dark";
  showWordmark?: boolean;
}

export function MakuLogo({ className, variant = "light", showWordmark = true }: MakuLogoProps) {
  const textColor = variant === "dark" ? "text-brand-navy" : "text-white";

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <svg viewBox="0 0 64 64" className="h-9 w-9 shrink-0" aria-hidden>
        <rect width="64" height="64" rx="14" className="fill-brand-red" />
        <text
          x="50%"
          y="55%"
          textAnchor="middle"
          dominantBaseline="middle"
          fontWeight="900"
          fontSize="34"
          fill="white"
          fontFamily="system-ui, sans-serif"
        >
          M
        </text>
        <path
          d="M32 48 q6 -10 16 -10 q-2 10 -10 14 q-4 2 -6 0 q-2 2 -6 0 q-8 -4 -10 -14 q10 0 16 10 z"
          className="fill-brand-leaf"
        />
      </svg>
      {showWordmark && (
        <div className="flex flex-col leading-none">
          <span className={cn("text-base font-black tracking-tight", textColor)}>MAKU</span>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-leaf">
            Foods
          </span>
        </div>
      )}
    </div>
  );
}
