import { Badge } from "@/components/ui/badge";
import Input, { InputProps } from "@/components/ui/input";
import { Dispatch, SetStateAction, forwardRef, useState } from "react";
import { Icons } from "../shared/icons";

type TagInputProps = InputProps & {
  value: string[];
  onValueChange: Dispatch<SetStateAction<string[]>>;
};

export const TagInput = forwardRef<HTMLInputElement, TagInputProps>(
  ({ value, onValueChange, ...props }, ref) => {
    const [pendingDataPoint, setPendingDataPoint] = useState("");

    const addPendingDataPoint = () => {
      if (pendingDataPoint) {
        const newDataPoints = new Set([...value, pendingDataPoint]);
        onValueChange(Array.from(newDataPoints));
        setPendingDataPoint("");
      }
    };

    return (
      <div className=" max-w-[400px] border border-gray-2 text-gray-4 rounded-md text-xs   p-2 flex  items-center flex-wrap gap-2">
        {value.length > 0
          ? value.map((item, idx) => (
              <Badge className="flex gap-1 items-center px-1 " key={idx}>
                {item}

                <Icons.x
                  size={15}
                  onClick={() => onValueChange(value.filter((i) => i !== item))}
                />
              </Badge>
            ))
          : "No tags here yet"}
        <Input
          value={pendingDataPoint}
          placeholder="Enter tag name"
          onChange={(e) => setPendingDataPoint(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addPendingDataPoint();
            } else if (e.key === "," || e.key === " ") {
              e.preventDefault();
              addPendingDataPoint();
            }
          }}
          className="max-w-[120px] h-4.5  border-0"
          {...props}
          ref={ref}
        />
      </div>
    );
  },
);
