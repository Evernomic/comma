import { cn } from "@/lib/utils";

export const Gauge = ({
  value,
  size = "small",
  showValue = true,
  color = "text-grass",
  bgcolor = "text-gray-1",
}: {
  value: number;
  size?: "small" | "medium" | "large";
  showValue?: boolean;
  color?: String;
  bgcolor?: String;
}) => {
  const circumference = 332;
  const valueInCircumference = (value / 100) * circumference;
  const strokeDasharray = `${circumference} ${circumference}`;
  const initialOffset = circumference;
  const strokeDashoffset = initialOffset - valueInCircumference;

  const sizes = {
    small: {
      width: "27",
      height: "27",
      textSize: "text-[11px]",
    },
    medium: {
      width: "60",
      height: "60",
      textSize: "text-lg",
    },
    large: {
      width: "120",
      height: "120",
      textSize: "text-3xl",
    },
  };

  return (
    <div className="flex flex-col items-center justify-center relative">
      <svg
        fill="none"
        shapeRendering="crispEdges"
        height={sizes[size].height}
        width={sizes[size].width}
        viewBox="0 0 120 120"
        strokeWidth="2"
        className="transform -rotate-90"
      >
        <circle
          className={`${bgcolor}`}
          strokeWidth="12"
          stroke="currentColor"
          fill="transparent"
          shapeRendering="geometricPrecision"
          r="53"
          cx="60"
          cy="60"
        />
        <circle
          className={`animate-gauge_fill ${color}`}
          strokeWidth="12"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={initialOffset}
          shapeRendering="geometricPrecision"
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r="53"
          cx="60"
          cy="60"
          style={{
            strokeDashoffset: strokeDashoffset,
            transition: "stroke-dasharray 1s ease 0s,stroke 1s ease 0s",
          }}
        />
      </svg>
      {showValue ? (
        <div className="absolute flex">
          <p className={cn("text-secondary", sizes[size].textSize)}>{value}</p>
        </div>
      ) : null}
    </div>
  );
};
