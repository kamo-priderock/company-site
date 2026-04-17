import type { CategoryPageSlug } from "@/lib/categoryPageSlugs";

export type CategoryPagePublic = {
  slug: CategoryPageSlug;
  projectFilterType: string;
  heroImage: string;
  heroEyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  heroCta1Label: string;
  heroCta1Href: string;
  heroCta2Label: string;
  heroCta2Href: string;
  heroAlign: "left" | "center";
  stats: { value: string; label: string }[];
  highlightEyebrow: string;
  highlightTitle: string;
  highlightSubtitle: string;
  cards: {
    icon: string;
    title: string;
    description: string;
    subtitle: string;
  }[];
  featuresEyebrow: string;
  featuresTitle: string;
  featuresIntro: string;
  featureBullets: string[];
  featuresSideImage: string;
  featuresBadgeTitle: string;
  featuresBadgeSubtitle: string;
  specCategories: { category: string; items: string[] }[];
  amenityGroups: { title: string; icon: string; items: string[] }[];
  mixedUseComponents: { type: string; description: string; features: string[] }[];
  projectsEyebrow: string;
  projectsTitle: string;
  projectsIntro: string;
  projectsButtonText: string;
  projectsButtonLink: string;
  footerTitle: string;
  footerSubtitle: string;
  footerPrimaryText: string;
  footerPrimaryHref: string;
  footerSecondaryText: string;
  footerSecondaryHref: string;
  /** When false, public GET returns 404; admin can still edit with includeInactive */
  isActive: boolean;
};

function emptyPage(slug: CategoryPageSlug): CategoryPagePublic {
  return {
    slug,
    projectFilterType: "Commercial",
    heroImage: "",
    heroEyebrow: "",
    heroTitle: "",
    heroSubtitle: "",
    heroCta1Label: "Contact us",
    heroCta1Href: "/contact",
    heroCta2Label: "View projects",
    heroCta2Href: "#projects",
    heroAlign: "left",
    stats: [],
    highlightEyebrow: "",
    highlightTitle: "",
    highlightSubtitle: "",
    cards: [],
    featuresEyebrow: "",
    featuresTitle: "",
    featuresIntro: "",
    featureBullets: [],
    featuresSideImage: "",
    featuresBadgeTitle: "",
    featuresBadgeSubtitle: "",
    specCategories: [],
    amenityGroups: [],
    mixedUseComponents: [],
    projectsEyebrow: "",
    projectsTitle: "",
    projectsIntro: "",
    projectsButtonText: "View all projects",
    projectsButtonLink: "/projects",
    footerTitle: "",
    footerSubtitle: "",
    footerPrimaryText: "Get in touch",
    footerPrimaryHref: "/contact",
    footerSecondaryText: "",
    footerSecondaryHref: "",
    isActive: true,
  };
}

const commercial: CategoryPagePublic = {
  ...emptyPage("commercial"),
  projectFilterType: "Commercial",
  heroImage:
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
  heroEyebrow: "Commercial Development",
  heroTitle: "Building Tomorrow's Business Districts",
  heroSubtitle:
    "Creating iconic office spaces and commercial precincts that drive economic growth and redefine city skylines across South Africa.",
  heroCta1Label: "Schedule a Viewing",
  heroCta2Label: "View Projects",
  stats: [
    { value: "2.5M+", label: "Square Meters Developed" },
    { value: "50+", label: "Commercial Projects" },
    { value: "R15B+", label: "Portfolio Value" },
    { value: "98%", label: "Occupancy Rate" },
  ],
  highlightEyebrow: "Why Choose Our Commercial Spaces",
  highlightTitle: "Premium Office Solutions",
  highlightSubtitle:
    "Strategically located commercial properties designed to elevate your business presence and maximize operational efficiency.",
  cards: [
    {
      icon: "Building2",
      title: "Grade A Offices",
      description:
        "Premium office spaces designed for modern businesses with state-of-the-art facilities and technology integration.",
      subtitle: "",
    },
    {
      icon: "Users",
      title: "Flexible Layouts",
      description:
        "Adaptable floor plans that grow with your business, supporting agile work environments and collaboration.",
      subtitle: "",
    },
    {
      icon: "TrendingUp",
      title: "Investment Value",
      description:
        "Prime locations with proven capital appreciation and rental yields in South Africa's top commercial nodes.",
      subtitle: "",
    },
    {
      icon: "Award",
      title: "Green Certified",
      description:
        "LEED and Green Star certified buildings that reduce operating costs and enhance corporate sustainability goals.",
      subtitle: "",
    },
  ],
  featuresEyebrow: "Standard Features",
  featuresTitle: "World-Class Amenities",
  featuresIntro:
    "Every commercial development includes comprehensive features designed to support modern business operations and enhance workplace experience.",
  featureBullets: [
    "24/7 Security & Access Control",
    "High-Speed Fiber Connectivity",
    "Energy-Efficient Systems",
    "Ample Parking Facilities",
    "On-site Property Management",
    "Conference & Meeting Rooms",
    "Backup Power Systems",
    "Modern Elevator Systems",
  ],
  featuresSideImage:
    "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2070&auto=format&fit=crop",
  featuresBadgeTitle: "Green Star",
  featuresBadgeSubtitle: "6-Star Rated",
  projectsEyebrow: "Our Portfolio",
  projectsTitle: "Commercial Developments",
  projectsIntro:
    "Explore our landmark commercial projects across South Africa's major business districts.",
  projectsButtonText: "View All Commercial Projects",
  projectsButtonLink: "/projects?category=Commercial",
  footerTitle: "Ready to Elevate Your Business?",
  footerSubtitle:
    "Let's discuss how our commercial spaces can support your growth ambitions and business objectives.",
  footerPrimaryText: "Get in Touch",
  footerSecondaryText: "Call 021 141 2370",
  footerSecondaryHref: "tel:+27211412370",
};

const industrial: CategoryPagePublic = {
  ...emptyPage("industrial"),
  projectFilterType: "Industrial",
  heroImage:
    "https://images.unsplash.com/photo-1565514020179-026b92b84bb6?q=80&w=2070&auto=format&fit=crop",
  heroEyebrow: "Industrial Development",
  heroTitle: "Infrastructure for Industry 4.0",
  heroSubtitle:
    "Purpose-built industrial parks and logistics facilities engineered for maximum efficiency, security, and operational excellence.",
  heroCta1Label: "Inquire Now",
  heroCta2Label: "View Facilities",
  stats: [
    { value: "1.8M+", label: "Warehouse Space" },
    { value: "35+", label: "Logistics Parks" },
    { value: "R8B+", label: "Assets Under Management" },
    { value: "24/7", label: "Operations Support" },
  ],
  highlightEyebrow: "Core Capabilities",
  highlightTitle: "Built for Scale",
  highlightSubtitle:
    "From high-bay warehousing to cold chain, our industrial portfolio meets the demands of modern supply chains.",
  cards: [
    {
      icon: "Warehouse",
      title: "Warehousing",
      description:
        "High-bay facilities with advanced racking systems, temperature control, and automated material handling.",
      subtitle: "12m clear height",
    },
    {
      icon: "Truck",
      title: "Logistics",
      description:
        "Strategic locations near highways, ports, and rail with optimal last-mile distribution access.",
      subtitle: "Direct highway access",
    },
    {
      icon: "Zap",
      title: "Power & Infrastructure",
      description:
        "Heavy power supply, backup generators, fiber connectivity, and industrial-grade utilities.",
      subtitle: "3-phase 1000kVA+",
    },
    {
      icon: "Shield",
      title: "Security",
      description:
        "24/7 monitoring, perimeter fencing, biometric access, and comprehensive CCTV coverage.",
      subtitle: "Grade A security",
    },
  ],
  specCategories: [
    {
      category: "Building",
      items: [
        "12-15m clear height",
        "Reinforced concrete floors",
        "Roller shutter doors",
        "LED high-bay lighting",
        "Sprinkler systems",
        "Insulated roofing",
      ],
    },
    {
      category: "Loading & Access",
      items: [
        "Dock levelers",
        "Truck courts",
        "Container access",
        "Drive-through capability",
        "Ample maneuvering space",
        "Weighbridge facilities",
      ],
    },
    {
      category: "Services",
      items: [
        "3-phase power",
        "Backup generators",
        "Water storage",
        "Fire detection",
        "Staff amenities",
        "Offices & parking",
      ],
    },
    {
      category: "Technology",
      items: [
        "Fiber connectivity",
        "WMS integration ready",
        "IoT sensor networks",
        "Security systems",
        "Energy monitoring",
        "Access control",
      ],
    },
  ],
  featuresEyebrow: "",
  featuresTitle: "",
  featuresIntro: "",
  featureBullets: [],
  featuresSideImage: "",
  featuresBadgeTitle: "",
  featuresBadgeSubtitle: "",
  projectsEyebrow: "Our Portfolio",
  projectsTitle: "Industrial Developments",
  projectsIntro:
    "Explore logistics parks and industrial precincts across key corridors.",
  projectsButtonText: "View All Industrial Projects",
  projectsButtonLink: "/projects?category=Industrial",
  footerTitle: "Plan Your Next Facility",
  footerSubtitle:
    "Speak with our industrial team about leasing, development, or joint ventures.",
  footerPrimaryText: "Contact us",
  footerSecondaryText: "Call 021 141 2370",
  footerSecondaryHref: "tel:+27211412370",
};

const retail: CategoryPagePublic = {
  ...emptyPage("retail"),
  projectFilterType: "Retail",
  heroAlign: "center",
  heroImage:
    "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?q=80&w=2070&auto=format&fit=crop",
  heroEyebrow: "Retail Development",
  heroTitle: "Destinations That Define Communities",
  heroSubtitle:
    "Creating vibrant retail experiences that bring people together, from neighborhood centers to regional super malls.",
  heroCta1Label: "Partner With Us",
  heroCta2Label: "Explore Centers",
  stats: [
    { value: "500K+", label: "Daily Footfall" },
    { value: "200+", label: "Retail Tenants" },
    { value: "R12B+", label: "Retail GLA" },
    { value: "95%", label: "Lease Renewal" },
  ],
  highlightEyebrow: "Why Retail With Us",
  highlightTitle: "Prime Retail Ecosystems",
  highlightSubtitle:
    "From super-regional malls to convenience nodes, we curate retail environments that perform.",
  cards: [
    {
      icon: "ShoppingBag",
      title: "Prime Catchments",
      description:
        "Strategic locations in high-traffic areas with strong demographics and proven spending power.",
      subtitle: "500K+",
    },
    {
      icon: "Store",
      title: "Mixed Tenancy",
      description:
        "Curated retail mix combining anchors, fashion, dining, and entertainment for maximum draw.",
      subtitle: "200+",
    },
    {
      icon: "Car",
      title: "Accessibility",
      description:
        "Excellent access, visibility, and ample parking to maximize customer convenience and dwell time.",
      subtitle: "5,000+ bays",
    },
    {
      icon: "TrendingUp",
      title: "Strong Returns",
      description:
        "Consistent rental income and capital growth in South Africa's resilient retail property sector.",
      subtitle: "12%+ yields",
    },
  ],
  specCategories: [
    {
      category: "Customer Experience",
      items: [
        "Free Wi-Fi",
        "Digital Wayfinding",
        "Family Facilities",
        "VIP Lounges",
      ],
    },
    {
      category: "Operations",
      items: [
        "Central HVAC",
        "24/7 Security",
        "Waste Management",
        "Energy Management",
      ],
    },
    {
      category: "Parking & Access",
      items: [
        "Multi-level Parking",
        "EV Charging",
        "Valet Service",
        "Wheelchair Access",
      ],
    },
    {
      category: "Entertainment",
      items: [
        "Food Courts",
        "Cinema Complex",
        "Kids Play Areas",
        "Event Spaces",
      ],
    },
  ],
  projectsEyebrow: "Portfolio",
  projectsTitle: "Retail Developments",
  projectsIntro: "Landmark malls and retail nodes across South Africa.",
  projectsButtonText: "View All Retail Projects",
  projectsButtonLink: "/projects?category=Retail",
  footerTitle: "Grow With Us",
  footerSubtitle: "Let's discuss retail leasing, developments, or partnerships.",
  footerPrimaryText: "Contact us",
  footerSecondaryText: "Call 021 141 2370",
  footerSecondaryHref: "tel:+27211412370",
};

const residential: CategoryPagePublic = {
  ...emptyPage("residential"),
  projectFilterType: "Residential",
  heroAlign: "center",
  heroImage:
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop",
  heroEyebrow: "Residential Development",
  heroTitle: "Where Life Finds Balance",
  heroSubtitle:
    "Creating sustainable residential communities that blend modern living with natural beauty, security, and lifestyle convenience.",
  heroCta1Label: "Book a Viewing",
  heroCta2Label: "Explore Communities",
  stats: [
    { value: "15K+", label: "Homes Delivered" },
    { value: "40+", label: "Estates & Apartments" },
    { value: "R20B+", label: "Residential Sales" },
    { value: "4.8★", label: "Resident Satisfaction" },
  ],
  highlightEyebrow: "Lifestyle",
  highlightTitle: "Designed Around You",
  highlightSubtitle:
    "Premium finishes, green spaces, and secure living in South Africa's most desirable suburbs.",
  cards: [
    {
      icon: "Home",
      title: "Premium Living",
      description:
        "Thoughtfully designed homes with contemporary finishes, spacious layouts, and attention to every detail.",
      subtitle: "From R2.5M",
    },
    {
      icon: "Trees",
      title: "Green Spaces",
      description:
        "Landscaped gardens, parks, and outdoor amenities that connect residents with nature and community.",
      subtitle: "40% green cover",
    },
    {
      icon: "Shield",
      title: "Secure Estates",
      description:
        "Gated communities with 24/7 security, access control, and peace of mind for your family.",
      subtitle: "Grade A security",
    },
    {
      icon: "Heart",
      title: "Community Living",
      description:
        "Vibrant neighborhoods with recreational facilities, social spaces, and a strong sense of belonging.",
      subtitle: "200+ families",
    },
  ],
  amenityGroups: [
    {
      title: "Home Features",
      icon: "Home",
      items: [
        "Open-plan living areas",
        "Modern kitchens",
        "En-suite bathrooms",
        "Private balconies/patios",
        "Built-in wardrobes",
        "Fiber-ready connectivity",
      ],
    },
    {
      title: "Estate Amenities",
      icon: "Users",
      items: [
        "Swimming pools",
        "Gym & wellness center",
        "Kids play areas",
        "Clubhouse",
        "Walking/jogging trails",
        "Pet-friendly spaces",
      ],
    },
    {
      title: "Sustainability",
      icon: "Sun",
      items: [
        "Solar geyser systems",
        "Energy-efficient lighting",
        "Water-saving fixtures",
        "Grey water recycling",
        "Rainwater harvesting",
        "Indigenous landscaping",
      ],
    },
    {
      title: "Convenience",
      icon: "Trees",
      items: [
        "Covered parking",
        "Visitor parking",
        "Parcel lockers",
        "EV charging points",
        "Property management",
        "Maintenance services",
      ],
    },
  ],
  projectsEyebrow: "Communities",
  projectsTitle: "Residential Developments",
  projectsIntro: "Explore our estates and apartment collections.",
  projectsButtonText: "View All Residential Projects",
  projectsButtonLink: "/projects?category=Residential",
  footerTitle: "Find Your Home",
  footerSubtitle: "Speak with our residential sales team today.",
  footerPrimaryText: "Book a viewing",
  footerSecondaryText: "Call 021 141 2370",
  footerSecondaryHref: "tel:+27211412370",
};

const mixedUse: CategoryPagePublic = {
  ...emptyPage("mixed-use"),
  projectFilterType: "Mixed-Use",
  heroAlign: "center",
  heroImage:
    "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?q=80&w=2071&auto=format&fit=crop",
  heroEyebrow: "Mixed-Use Development",
  heroTitle: "The Future of Urban Living",
  heroSubtitle:
    "Creating complete live-work-play ecosystems that redefine modern urban life. Where residential, commercial, retail, and public spaces converge seamlessly.",
  heroCta1Label: "Discover More",
  heroCta2Label: "View Precincts",
  stats: [
    { value: "3M+", label: "Mixed-Use GLA" },
    { value: "25+", label: "Integrated Precincts" },
    { value: "R18B+", label: "Development Value" },
    { value: "24/7", label: "Activated Communities" },
  ],
  highlightEyebrow: "Integrated Living",
  highlightTitle: "One Address, Infinite Possibilities",
  highlightSubtitle:
    "Mixed-use precincts combine homes, offices, retail, and public realm in walkable, transit-oriented environments.",
  cards: [
    {
      icon: "Layers",
      title: "Integrated Living",
      description:
        "Live, work, shop, and play in one dynamic precinct. Mixed-use developments create vibrant 24/7 communities.",
      subtitle: "15-min neighborhoods",
    },
    {
      icon: "TrendingUp",
      title: "Investment Synergy",
      description:
        "Multiple revenue streams and diversified risk create superior investment performance and resilience.",
      subtitle: "20% higher returns",
    },
    {
      icon: "Building",
      title: "Urban Regeneration",
      description:
        "Transform underutilized areas into thriving urban hubs that drive economic activity and job creation.",
      subtitle: "3,000+ jobs created",
    },
    {
      icon: "Zap",
      title: "Sustainable Design",
      description:
        "Reduced car dependency, shared infrastructure, and efficient land use make mixed-use inherently sustainable.",
      subtitle: "40% less carbon",
    },
  ],
  mixedUseComponents: [
    {
      type: "Residential",
      description: "From studios to penthouses",
      features: [
        "500-800 units",
        "Variety of sizes",
        "Affordable to luxury",
        "Rooftop amenities",
      ],
    },
    {
      type: "Commercial",
      description: "Office & co-working spaces",
      features: [
        "Grade A offices",
        "Flexible layouts",
        "Retail ground floors",
        "Conference facilities",
      ],
    },
    {
      type: "Retail",
      description: "Shopping & dining",
      features: [
        "50-100 stores",
        "Supermarkets",
        "Restaurants & cafes",
        "Entertainment venues",
      ],
    },
    {
      type: "Hospitality",
      description: "Hotels & serviced apartments",
      features: [
        "150-250 keys",
        "Business hotels",
        "Aparthotels",
        "Conference centers",
      ],
    },
    {
      type: "Public Spaces",
      description: "Parks & community areas",
      features: [
        "Public squares",
        "Green corridors",
        "Event spaces",
        "Art installations",
      ],
    },
    {
      type: "Infrastructure",
      description: "Parking & services",
      features: [
        "Multi-level parking",
        "EV charging",
        "Utilities hub",
        "Waste management",
      ],
    },
  ],
  projectsEyebrow: "Precincts",
  projectsTitle: "Mixed-Use Developments",
  projectsIntro: "Explore our integrated urban destinations.",
  projectsButtonText: "View All Mixed-Use Projects",
  projectsButtonLink: "/projects?category=Mixed-Use",
  footerTitle: "Build the Complete City Block",
  footerSubtitle: "Partner with us on mixed-use master planning and delivery.",
  footerPrimaryText: "Start a conversation",
  footerSecondaryText: "Call 021 141 2370",
  footerSecondaryHref: "tel:+27211412370",
};

export const CATEGORY_PAGE_DEFAULTS: Record<CategoryPageSlug, CategoryPagePublic> =
  {
    commercial,
    industrial,
    retail,
    residential,
    "mixed-use": mixedUse,
  };

export function getDefaultCategoryPage(
  slug: CategoryPageSlug
): CategoryPagePublic {
  return structuredClone(CATEGORY_PAGE_DEFAULTS[slug]);
}

/** Merge Mongo lean doc (or null) with static defaults for a slug */
export function mergeCategoryPage(
  slug: CategoryPageSlug,
  doc: Record<string, unknown> | null
): CategoryPagePublic {
  const base = getDefaultCategoryPage(slug);
  if (!doc) return base;

  const pickArr = <T>(key: keyof CategoryPagePublic, fallback: T[]): T[] => {
    const v = doc[key as string];
    return Array.isArray(v) ? (v as T[]) : fallback;
  };

  return {
    ...base,
    slug,
    projectFilterType:
      (doc.projectFilterType as string) || base.projectFilterType,
    heroImage: (doc.heroImage as string) || base.heroImage,
    heroEyebrow: (doc.heroEyebrow as string) ?? base.heroEyebrow,
    heroTitle: (doc.heroTitle as string) ?? base.heroTitle,
    heroSubtitle: (doc.heroSubtitle as string) ?? base.heroSubtitle,
    heroCta1Label: (doc.heroCta1Label as string) ?? base.heroCta1Label,
    heroCta1Href: (doc.heroCta1Href as string) ?? base.heroCta1Href,
    heroCta2Label: (doc.heroCta2Label as string) ?? base.heroCta2Label,
    heroCta2Href: (doc.heroCta2Href as string) ?? base.heroCta2Href,
    heroAlign: (doc.heroAlign as "left" | "center") || base.heroAlign,
    stats: pickArr("stats", base.stats),
    highlightEyebrow:
      (doc.highlightEyebrow as string) ?? base.highlightEyebrow,
    highlightTitle: (doc.highlightTitle as string) ?? base.highlightTitle,
    highlightSubtitle:
      (doc.highlightSubtitle as string) ?? base.highlightSubtitle,
    cards: pickArr("cards", base.cards),
    featuresEyebrow: (doc.featuresEyebrow as string) ?? base.featuresEyebrow,
    featuresTitle: (doc.featuresTitle as string) ?? base.featuresTitle,
    featuresIntro: (doc.featuresIntro as string) ?? base.featuresIntro,
    featureBullets: pickArr("featureBullets", base.featureBullets),
    featuresSideImage:
      (doc.featuresSideImage as string) ?? base.featuresSideImage,
    featuresBadgeTitle:
      (doc.featuresBadgeTitle as string) ?? base.featuresBadgeTitle,
    featuresBadgeSubtitle:
      (doc.featuresBadgeSubtitle as string) ?? base.featuresBadgeSubtitle,
    specCategories: pickArr("specCategories", base.specCategories),
    amenityGroups: pickArr("amenityGroups", base.amenityGroups),
    mixedUseComponents: pickArr(
      "mixedUseComponents",
      base.mixedUseComponents
    ),
    projectsEyebrow: (doc.projectsEyebrow as string) ?? base.projectsEyebrow,
    projectsTitle: (doc.projectsTitle as string) ?? base.projectsTitle,
    projectsIntro: (doc.projectsIntro as string) ?? base.projectsIntro,
    projectsButtonText:
      (doc.projectsButtonText as string) ?? base.projectsButtonText,
    projectsButtonLink:
      (doc.projectsButtonLink as string) ?? base.projectsButtonLink,
    footerTitle: (doc.footerTitle as string) ?? base.footerTitle,
    footerSubtitle: (doc.footerSubtitle as string) ?? base.footerSubtitle,
    footerPrimaryText:
      (doc.footerPrimaryText as string) ?? base.footerPrimaryText,
    footerPrimaryHref:
      (doc.footerPrimaryHref as string) ?? base.footerPrimaryHref,
    footerSecondaryText:
      (doc.footerSecondaryText as string) ?? base.footerSecondaryText,
    footerSecondaryHref:
      (doc.footerSecondaryHref as string) ?? base.footerSecondaryHref,
    isActive: (doc as { isActive?: boolean }).isActive !== false,
  };
}
