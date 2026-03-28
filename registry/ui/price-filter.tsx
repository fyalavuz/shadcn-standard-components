import { useState, useRef, useCallback, useEffect, useMemo } from "react";

interface PriceFilterProps {
  min?: number;
  max?: number;
  step?: number;
  defaultMin?: number;
  defaultMax?: number;
  currency?: string;
  title?: string;
  distribution?: number[];
  onChange?: (range: { min: number; max: number }) => void;
}

function generateDistribution(count: number): number[] {
  const data: number[] = [];
  for (let i = 0; i < count; i++) {
    const x = i / count;
    const value =
      Math.exp(-((x - 0.25) ** 2) / 0.03) * 0.9 +
      Math.exp(-((x - 0.5) ** 2) / 0.08) * 0.5 +
      Math.random() * 0.15;
    data.push(Math.max(0.05, Math.min(1, value)));
  }
  return data;
}

export default function PriceFilter({
  min = 0,
  max = 1000,
  step = 1,
  defaultMin = 100,
  defaultMax = 500,
  currency = "$",
  title = "Price Range",
  distribution,
  onChange,
}: PriceFilterProps) {
  const [minVal, setMinVal] = useState(defaultMin);
  const [maxVal, setMaxVal] = useState(defaultMax);
  const [minInput, setMinInput] = useState(String(defaultMin));
  const [maxInput, setMaxInput] = useState(String(defaultMax));
  const [dragging, setDragging] = useState<"min" | "max" | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const bars = useMemo(
    () => distribution ?? generateDistribution(30),
    [distribution],
  );

  const toPercent = useCallback(
    (value: number) => ((value - min) / (max - min)) * 100,
    [min, max],
  );

  const fromPosition = useCallback(
    (clientX: number) => {
      if (!trackRef.current) return min;
      const rect = trackRef.current.getBoundingClientRect();
      const percent = Math.max(
        0,
        Math.min(1, (clientX - rect.left) / rect.width),
      );
      const rawValue = min + percent * (max - min);
      return Math.round(rawValue / step) * step;
    },
    [min, max, step],
  );

  const handlePointerDown = useCallback(
    (thumb: "min" | "max") => (e: React.PointerEvent) => {
      e.preventDefault();
      setDragging(thumb);
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    [],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragging) return;
      const value = fromPosition(e.clientX);
      if (dragging === "min") {
        const clamped = Math.min(value, maxVal - step);
        setMinVal(Math.max(min, clamped));
      } else {
        const clamped = Math.max(value, minVal + step);
        setMaxVal(Math.min(max, clamped));
      }
    },
    [dragging, fromPosition, minVal, maxVal, min, max, step],
  );

  const handlePointerUp = useCallback(() => {
    setDragging(null);
  }, []);

  useEffect(() => {
    onChange?.({ min: minVal, max: maxVal });
  }, [minVal, maxVal, onChange]);

  useEffect(() => {
    setMinInput(String(minVal));
  }, [minVal]);

  useEffect(() => {
    setMaxInput(String(maxVal));
  }, [maxVal]);

  const handleMinBlur = () => {
    const v = Number(minInput);
    if (isNaN(v) || v < min) {
      setMinVal(min);
    } else if (v >= maxVal) {
      setMinVal(maxVal - step);
    } else {
      setMinVal(v);
    }
  };

  const handleMaxBlur = () => {
    const v = Number(maxInput);
    if (isNaN(v) || v > max) {
      setMaxVal(max);
    } else if (v <= minVal) {
      setMaxVal(minVal + step);
    } else {
      setMaxVal(v);
    }
  };

  const minPercent = toPercent(minVal);
  const maxPercent = toPercent(maxVal);

  return (
    <div className="w-full max-w-md mx-auto">
      <h3 className="text-sm font-semibold text-foreground mb-4">{title}</h3>

      <div className="flex items-end gap-[2px] h-16 mb-1 px-0.5">
        {bars.map((height, i) => {
          const barPercent = (i / bars.length) * 100;
          const isActive = barPercent >= minPercent && barPercent <= maxPercent;
          return (
            <div
              key={i}
              className={`flex-1 rounded-t-sm transition-colors duration-150 ${
                isActive ? "bg-primary" : "bg-muted-foreground/20"
              }`}
              style={{ height: `${height * 100}%` }}
            />
          );
        })}
      </div>

      <div
        ref={trackRef}
        className="relative h-5 flex items-center cursor-pointer touch-none"
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        <div className="absolute w-full h-[2px] bg-border rounded-full" />
        <div
          className="absolute h-[2px] bg-primary rounded-full"
          style={{
            left: `${minPercent}%`,
            width: `${maxPercent - minPercent}%`,
          }}
        />
        <div
          className={`absolute w-5 h-5 rounded-full border-2 border-primary bg-background shadow-sm cursor-grab -translate-x-1/2 transition-shadow ${
            dragging === "min"
              ? "ring-2 ring-primary/30 cursor-grabbing scale-110"
              : "hover:ring-2 hover:ring-primary/20"
          }`}
          style={{ left: `${minPercent}%` }}
          onPointerDown={handlePointerDown("min")}
          role="slider"
          aria-label="Minimum price"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={minVal}
          tabIndex={0}
        />
        <div
          className={`absolute w-5 h-5 rounded-full border-2 border-primary bg-background shadow-sm cursor-grab -translate-x-1/2 transition-shadow ${
            dragging === "max"
              ? "ring-2 ring-primary/30 cursor-grabbing scale-110"
              : "hover:ring-2 hover:ring-primary/20"
          }`}
          style={{ left: `${maxPercent}%` }}
          onPointerDown={handlePointerDown("max")}
          role="slider"
          aria-label="Maximum price"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={maxVal}
          tabIndex={0}
        />
      </div>

      <div className="flex items-center gap-3 mt-4">
        <div className="flex-1 flex items-center rounded-lg border border-border bg-muted/50 px-3 py-2 focus-within:ring-2 focus-within:ring-primary/30 focus-within:border-primary transition-all">
          <span className="text-muted-foreground text-sm mr-1.5">
            {currency}
          </span>
          <input
            type="text"
            inputMode="numeric"
            value={minInput}
            onChange={(e) => setMinInput(e.target.value)}
            onBlur={handleMinBlur}
            aria-label="Min price"
            className="w-full bg-transparent text-sm text-foreground outline-none"
          />
        </div>
        <div className="w-4 h-[1.5px] bg-border rounded-full shrink-0" />
        <div className="flex-1 flex items-center rounded-lg border border-border bg-muted/50 px-3 py-2 focus-within:ring-2 focus-within:ring-primary/30 focus-within:border-primary transition-all">
          <span className="text-muted-foreground text-sm mr-1.5">
            {currency}
          </span>
          <input
            type="text"
            inputMode="numeric"
            value={maxInput}
            onChange={(e) => setMaxInput(e.target.value)}
            onBlur={handleMaxBlur}
            aria-label="Max price"
            className="w-full bg-transparent text-sm text-foreground outline-none"
          />
        </div>
      </div>
    </div>
  );
}
