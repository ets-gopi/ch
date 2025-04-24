import React, { ReactNode } from "react";

import Link from "next/link";

import { Button } from "@/components/ui/button";
type ButtonAsChildProps = {
  href: string;
  children: ReactNode;
};
export function ButtonAsChild({ href, children }: ButtonAsChildProps) {
  return (
    <Button
      asChild
      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
    >
      <Link href={href}>{children}</Link>
    </Button>
  );
}
