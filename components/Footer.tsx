"use client";

import { useState, useEffect } from "react";
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {
  formatCopyright,
  getDefaultFooter,
  mergeFooter,
  type FooterPublic,
} from "@/lib/footerDefaults";

function FooterLinkItem({
  href,
  label,
  className,
}: {
  href: string;
  label: string;
  className?: string;
}) {
  const trimmed = href?.trim() || "#";
  const isExternal =
    trimmed.startsWith("http://") || trimmed.startsWith("https://");

  if (isExternal) {
    return (
      <a
        href={trimmed}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {label}
      </a>
    );
  }

  return (
    <Link href={trimmed} className={className}>
      {label}
    </Link>
  );
}

const SOCIAL_CONFIG = [
  { key: "facebookUrl" as const, Icon: Facebook, label: "Facebook" },
  { key: "twitterUrl" as const, Icon: Twitter, label: "Twitter" },
  { key: "linkedinUrl" as const, Icon: Linkedin, label: "LinkedIn" },
  { key: "instagramUrl" as const, Icon: Instagram, label: "Instagram" },
];

export function Footer() {
  const [footer, setFooter] = useState<FooterPublic | null>(null);
  const [loading, setLoading] = useState(true);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/footer");
        if (res.status === 404) {
          setFooter(getDefaultFooter());
          return;
        }
        const data = await res.json();
        setFooter(
          data.footer
            ? mergeFooter(data.footer as Record<string, unknown>)
            : getDefaultFooter()
        );
      } catch {
        setFooter(getDefaultFooter());
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return (
      <footer className="flex min-h-[12rem] items-center justify-center border-t border-slate-900 bg-slate-950 py-16">
        <Loader2 className="h-8 w-8 animate-spin text-amber-500" aria-label="Loading footer" />
      </footer>
    );
  }

  const data = footer ?? getDefaultFooter();
  const socials = SOCIAL_CONFIG.filter(({ key }) => Boolean(data[key]?.trim()));
  const quickLinks = data.quickLinks.filter((l) => l.label.trim());
  const serviceLinks = data.serviceLinks.filter((l) => l.label.trim());
  const legalLinks = data.legalLinks.filter((l) => l.label.trim());
  const copyright = formatCopyright(data.copyrightText, currentYear);
  const linkClass = "hover:text-amber-400 transition-colors";

  return (
    <footer className="border-t border-slate-900 bg-slate-950 py-16 text-slate-400">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-12 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col gap-6">
            <Link
              href="/"
              className="flex items-center gap-2 text-2xl font-bold tracking-tight text-white"
            >
              {data.logoUrl ? (
                <Image
                  src={data.logoUrl}
                  alt={`${data.brandName} logo`}
                  width={48}
                  height={48}
                  className="h-12 w-12 object-contain"
                  unoptimized
                />
              ) : null}
              {data.brandName}
            </Link>
            {data.tagline ? (
              <p className="max-w-xs text-sm leading-relaxed">{data.tagline}</p>
            ) : null}
            {socials.length > 0 ? (
              <div className="mt-2 flex gap-4">
                {socials.map(({ key, Icon, label }) => (
                  <a
                    key={key}
                    href={data[key].trim()}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 transition-colors duration-300 hover:bg-amber-600 hover:text-white"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            ) : null}
          </div>

          {quickLinks.length > 0 ? (
            <div>
              <h4 className="mb-6 text-sm font-semibold uppercase tracking-wider text-white">
                {data.quickLinksHeading || "Quick Links"}
              </h4>
              <ul className="space-y-4">
                {quickLinks.map((item, index) => (
                  <li key={`quick-${index}-${item.label}`}>
                    <FooterLinkItem
                      href={item.href}
                      label={item.label}
                      className={linkClass}
                    />
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {serviceLinks.length > 0 ? (
            <div>
              <h4 className="mb-6 text-sm font-semibold uppercase tracking-wider text-white">
                {data.servicesHeading || "Services"}
              </h4>
              <ul className="space-y-4">
                {serviceLinks.map((item, index) => (
                  <li key={`service-${index}-${item.label}`}>
                    <FooterLinkItem
                      href={item.href}
                      label={item.label}
                      className={linkClass}
                    />
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-900 pt-8 text-sm md:flex-row">
          <p>{copyright}</p>
          {legalLinks.length > 0 ? (
            <div className="flex flex-wrap justify-center gap-6">
              {legalLinks.map((item, index) => (
                <FooterLinkItem
                  key={`legal-${index}-${item.label}`}
                  href={item.href}
                  label={item.label}
                  className="transition-colors hover:text-white"
                />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
