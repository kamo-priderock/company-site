import AboutContent from "@/models/AboutContent";
import HomeAboutSection from "@/models/HomeAboutSection";
import AboutPageContent from "@/models/AboutPageContent";

type LegacyLean = {
  title?: string;
  subtitle?: string;
  description?: string;
  image?: string;
  bannerImage?: string;
  features?: string[];
  isActive?: boolean;
};

/** One-time style copy from legacy AboutContent when new collections are empty */
export async function ensureHomeAboutFromLegacy() {
  const existing = await HomeAboutSection.findOne().sort({ createdAt: -1 });
  if (existing) return existing;

  const legacy = (await AboutContent.findOne()
    .sort({ createdAt: -1 })
    .lean()) as LegacyLean | null;
  if (!legacy) return null;

  return HomeAboutSection.create({
    title: legacy.title ?? "",
    subtitle: legacy.subtitle ?? "",
    description: legacy.description ?? "",
    image: legacy.image ?? "",
    features: legacy.features ?? [],
    isActive: legacy.isActive !== false,
  });
}

export async function ensureAboutPageFromLegacy() {
  const existing = await AboutPageContent.findOne().sort({ createdAt: -1 });
  if (existing) return existing;

  const legacy = (await AboutContent.findOne()
    .sort({ createdAt: -1 })
    .lean()) as LegacyLean | null;
  if (!legacy) return null;

  return AboutPageContent.create({
    bannerImage: legacy.bannerImage ?? "",
    bannerTitle: legacy.title ?? "About Us",
    bannerSubtitle: legacy.subtitle ?? "Company Profile",
    title: legacy.title ?? "",
    subtitle: legacy.subtitle ?? "",
    description: legacy.description ?? "",
    image: legacy.image ?? "",
    features: legacy.features ?? [],
    isActive: legacy.isActive !== false,
  });
}
