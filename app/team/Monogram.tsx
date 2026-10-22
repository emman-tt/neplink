// Portrait monogram — the honest stand-in for a crew photo: initials inside a
// quiet navy ring, since no member photos exist on the public record. Used by
// page.tsx for the director's card and CrewGrid for each crew card.
export default function Monogram({
  initials,
  big = false,
}: {
  initials: string;
  big?: boolean;
}) {
  const size = big ? "h-[92px] w-[92px]" : "h-[76px] w-[76px]";
  return (
    <span className={`relative flex-none ${size}`} aria-hidden="true">
      <span className="absolute inset-0 rounded-full border border-navy/25" />
      <span className="absolute inset-[5px] rounded-full border border-navy/10" />
      <span
        className={`absolute inset-0 flex items-center justify-center font-display font-extrabold text-navy ${
          big ? "text-xl" : "text-lg"
        }`}
      >
        {initials}
      </span>
    </span>
  );
}
