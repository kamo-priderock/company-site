/** Shape expected by the public project detail UI */
export type ProjectDetailUI = {
  id: string;
  title: string;
  /** Listing / card thumbnail */
  image: string;
  /** Optional brand/project logo */
  logo?: string;
  category: string;
  location: string;
  status: string;
  description: string;
  details: {
    area: string;
    units: string;
    completion: string;
    architect: string;
  };
  features: string[];
  amenities: string[];
  gallery: string[];
  gallerySections: {
    title: string;
    description?: string;
    images: string[];
    order: number;
  }[];
  contactPhone: string;
  contactEmail: string;
  brochureUrl: string;
};

const DEFAULT_PHONE = "021 141 2370";
const DEFAULT_EMAIL = "info@priderockpropertygroup.co.za";

export type ProjectPlain = {
  _id: unknown;
  title: string;
  type: string;
  location: string;
  status: string;
  image: string;
  logo?: string;
  description?: string;
  area?: string;
  units?: string;
  completion?: string;
  architect?: string;
  features?: string[];
  amenities?: string[];
  gallery?: string[];
  gallerySections?: {
    title: string;
    description?: string;
    images?: string[];
    order?: number;
  }[];
  contactPhone?: string;
  contactEmail?: string;
  brochureUrl?: string;
};

export function projectDocToUI(doc: ProjectPlain): ProjectDetailUI {
  const id = String(doc._id);
  const gallery =
    doc.gallery && doc.gallery.length > 0
      ? [...doc.gallery]
      : doc.image
        ? [doc.image]
        : [];

  const sections = (doc.gallerySections || [])
    .map((s) => ({
      title: s.title,
      description: s.description || "",
      images: [...(s.images || [])],
      order: s.order ?? 0,
    }))
    .sort((a, b) => a.order - b.order);

  return {
    id,
    title: doc.title,
    image: doc.image,
  logo: doc.logo?.trim() || "",
    category: doc.type,
    location: doc.location,
    status: doc.status,
    description: doc.description || "",
    details: {
      area: doc.area || "—",
      units: doc.units || "—",
      completion: doc.completion || "—",
      architect: doc.architect || "—",
    },
    features: doc.features?.length ? [...doc.features] : [],
    amenities: doc.amenities?.length ? [...doc.amenities] : [],
    gallery,
    gallerySections: sections,
    contactPhone: doc.contactPhone?.trim() || DEFAULT_PHONE,
    contactEmail: doc.contactEmail?.trim() || DEFAULT_EMAIL,
    brochureUrl: doc.brochureUrl?.trim() || "",
  };
}
