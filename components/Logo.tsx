import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  variant?: "header" | "footer" | "large";
  className?: string;
}

export default function Logo({ variant = "header", className = "" }: LogoProps) {
  const sizes = {
    header: { width: 162, height: 54 },
    footer: { width: 480, height: 160 },
    large: { width: 1200, height: 400 },
  };

  const size = sizes[variant];

  return (
    <Link href="/" className={`inline-block ${className}`}>
      <div className="relative" style={{ width: size.width, height: size.height }}>
        <Image
          src="/logo.svg"
          alt="BEST Magazine"
          fill
          className="object-contain"
          priority={variant === "header"}
        />
      </div>
    </Link>
  );
}
