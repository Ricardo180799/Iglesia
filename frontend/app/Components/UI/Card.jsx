
"use client";

import clsx from "clsx";

export function Card({ children, className, variant }) {
  const baseStyles = "bg-white rounded-2xl shadow-md overflow-hidden transition-transform hover:scale-[1.02]";
  const variants = {
    default: "border border-neutral-200",
    outlined: "border-2 border-blue-500",
    elevated: "shadow-lg",
  };

  return (
    <div className={clsx(baseStyles, variants[variant] || variants.default, className)}>
      {children}
    </div>
  );
}