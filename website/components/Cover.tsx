import {
  Buildings,
  Drop,
  MapTrifold,
  Mountains,
  Ruler,
  RoadHorizon,
  Stack,
} from "@phosphor-icons/react/dist/ssr";
import { asset } from "@/lib/assets";

const STYLE: Record<string, { hatch: string; Icon: typeof Ruler }> = {
  Structural: { hatch: "hatch-steel", Icon: Buildings },
  Transportation: { hatch: "hatch-road", Icon: RoadHorizon },
  Materials: { hatch: "hatch-concrete", Icon: Stack },
  Geotech: { hatch: "hatch-earth", Icon: Mountains },
  Water: { hatch: "hatch-water", Icon: Drop },
  Survey: { hatch: "hatch-survey", Icon: MapTrifold },
  Other: { hatch: "hatch-concrete", Icon: Ruler },
};

/** Project photo, or engineering-drawing hatching for the category when no photo exists yet. */
export default function Cover({
  src,
  category,
  className = "aspect-[16/10]",
}: {
  src: string;
  category: string;
  className?: string;
}) {
  if (src) {
    return <img src={asset(src)} alt="" loading="lazy" className={`w-full object-cover ${className}`} />;
  }
  const { hatch, Icon } = STYLE[category] ?? STYLE.Other;
  return (
    <div className={`hatch ${hatch} relative flex items-center justify-center ${className}`} aria-hidden>
      <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-surface text-accent ring-1 ring-line/15">
        <Icon size={30} weight="light" />
      </span>
    </div>
  );
}
