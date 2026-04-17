import * as Icons from "lucide-react";
import { Building2, type LucideIcon } from "lucide-react";

/** Resolve any Lucide icon name used on category landing pages */
export function getLandingIcon(name: string): LucideIcon {
  const Icon = (Icons as unknown as Record<string, LucideIcon>)[name];
  return Icon || Building2;
}
