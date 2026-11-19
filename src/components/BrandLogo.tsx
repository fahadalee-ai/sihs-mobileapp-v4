import logo from "@/img/logo.png";

export function BrandLogo({
  size = "md",
  className = "",
  animate = false,
}: {
  size?: "sm" | "md" | "lg";
  className?: string;
  animate?: boolean;
}) {
  const width = size === "sm" ? 120 : size === "lg" ? 280 : 200;
  const image = (
    <img
      src={logo}
      alt="SIH&S logo. Susan's Intercessory Hooks and Services. Standing in the Gap."
      width={width}
      height={width}
      className={`mx-auto h-auto w-full object-contain ${className}`}
      style={{ maxWidth: width }}
    />
  );

  if (!animate) return image;

  return (
    <div className="logo-float relative mx-auto" style={{ maxWidth: width }}>
      <span
        aria-hidden
        className="logo-ring pointer-events-none absolute -inset-3 rounded-full border-2 border-[#5cba40]"
      />
      <span
        aria-hidden
        className="logo-ring pointer-events-none absolute -inset-3 rounded-full border-2 border-[#8ee56a] [animation-delay:900ms]"
      />
      <div className="logo-reveal relative">{image}</div>
    </div>
  );
}
