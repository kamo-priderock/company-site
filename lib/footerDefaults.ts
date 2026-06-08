export type FooterLinkPublic = {
  label: string;
  href: string;
  order: number;
};

export type FooterPublic = {
  brandName: string;
  logoUrl: string;
  tagline: string;
  facebookUrl: string;
  twitterUrl: string;
  linkedinUrl: string;
  instagramUrl: string;
  quickLinksHeading: string;
  quickLinks: FooterLinkPublic[];
  servicesHeading: string;
  serviceLinks: FooterLinkPublic[];
  copyrightText: string;
  legalLinks: FooterLinkPublic[];
  isActive: boolean;
};

const DEFAULT_QUICK_LINKS: FooterLinkPublic[] = [
  { label: "About Us", href: "/about", order: 0 },
  { label: "Our Projects", href: "/projects", order: 1 },
  { label: "Services", href: "/services", order: 2 },
  { label: "Contact Us", href: "/contact", order: 3 },
];

const DEFAULT_SERVICE_LINKS: FooterLinkPublic[] = [
  {
    label: "Property Development & Facilitation",
    href: "/services",
    order: 0,
  },
  { label: "Mixed-use precincts", href: "/services", order: 1 },
  { label: "Finance", href: "/services", order: 2 },
  { label: "Conceptual designs", href: "/services", order: 3 },
];

export function getDefaultFooter(): FooterPublic {
  return {
    brandName: "Pride Rock Property Group",
    logoUrl: "/PrideRock.png",
    tagline:
      "Pioneering the future of property development with innovative, sustainable, and premium spaces.",
    facebookUrl: "",
    twitterUrl: "",
    linkedinUrl: "",
    instagramUrl: "",
    quickLinksHeading: "Quick Links",
    quickLinks: [...DEFAULT_QUICK_LINKS],
    servicesHeading: "Services",
    serviceLinks: [...DEFAULT_SERVICE_LINKS],
    copyrightText: "© {year} Pride Rock Property Group. All rights reserved.",
    legalLinks: [],
    isActive: true,
  };
}

function sortLinks(links: FooterLinkPublic[]): FooterLinkPublic[] {
  return [...links].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export function mergeFooter(
  doc: Record<string, unknown> | null
): FooterPublic {
  const base = getDefaultFooter();
  if (!doc) return base;

  const pickLinks = (key: "quickLinks" | "serviceLinks" | "legalLinks") => {
    const v = doc[key];
    return Array.isArray(v)
      ? sortLinks(v as FooterLinkPublic[])
      : base[key];
  };

  return {
    brandName: (doc.brandName as string) || base.brandName,
    logoUrl: (doc.logoUrl as string) || base.logoUrl,
    tagline: (doc.tagline as string) ?? base.tagline,
    facebookUrl: (doc.facebookUrl as string) ?? base.facebookUrl,
    twitterUrl: (doc.twitterUrl as string) ?? base.twitterUrl,
    linkedinUrl: (doc.linkedinUrl as string) ?? base.linkedinUrl,
    instagramUrl: (doc.instagramUrl as string) ?? base.instagramUrl,
    quickLinksHeading:
      (doc.quickLinksHeading as string) ?? base.quickLinksHeading,
    quickLinks: pickLinks("quickLinks"),
    servicesHeading:
      (doc.servicesHeading as string) ?? base.servicesHeading,
    serviceLinks: pickLinks("serviceLinks"),
    copyrightText: (doc.copyrightText as string) ?? base.copyrightText,
    legalLinks: pickLinks("legalLinks"),
    isActive: (doc as { isActive?: boolean }).isActive !== false,
  };
}

export function formatCopyright(text: string, year: number): string {
  return text.replace(/\{year\}/g, String(year));
}
