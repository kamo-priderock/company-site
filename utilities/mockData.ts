import { Building2, Home, Factory, Store, Building, Briefcase, Leaf, Sun, Droplets, Recycle, Lightbulb, PenTool, HardHat, Key, MapPin, Phone, Mail, Clock } from "lucide-react";

export const mockStats = [
  { value: 30, label: "Years Experience", suffix: "+" },
  { value: 100, label: "Developments", suffix: "+" },
  { value: 15, label: "Cities Served", suffix: "" },
  { value: 5, label: "Billion Value", suffix: "B+" },
];

export const mockCarouselItems = [
  {
    id: 1,
    title: "Groot Phesantekraal View",
    status: "TRADING",
    location: "Durbanville",
    description: "This new mixed-use development comprises of a Convenience Shopping Centre of approximately 30,000m²",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "The Apex Tower",
    status: "DEVELOPMENT",
    location: "Sandton CBD",
    description: "A premium commercial office space designed for the modern workforce, featuring sustainable architecture.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Marina Bay Complex",
    status: "COMPLETED",
    location: "Cape Town",
    description: "Luxury residential apartments offering panoramic ocean views and world-class amenities.",
    image: "https://images.unsplash.com/photo-1515263487990-61b07816b324?q=80&w=2070&auto=format&fit=crop",
  }
];

export const mockCategories = [
  {
    title: "Office",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop",
    link: "/services"
  },
  {
    title: "Retail",
    image: "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?q=80&w=2126&auto=format&fit=crop",
    link: "/services"
  },
  {
    title: "Industrial",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop",
    link: "/services"
  },
  {
    title: "Residential",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2000&auto=format&fit=crop",
    link: "/services"
  },
  {
    title: "Motor & Other",
    image: "https://images.unsplash.com/photo-1555529771-835f59fc5efe?q=80&w=1974&auto=format&fit=crop",
    link: "/services"
  }
];

export const mockOffices = [
  {
    city: "Stellenbosch",
    type: "Head Office",
    address: ["1st Floor,", "16 Mill Street,", "Stellenbosch Central,", "7600."],
    phone: "021 141 2370"
  },
  {
    city: "Johannesburg",
    type: "Regional Office",
    address: ["1st Floor Block D,", "Hertford Office Park,", "90 Bekker Road,", "Midrand,", "1686."],
    phone: "010 142 9000"
  },
  {
    city: "Pretoria",
    type: "Regional Office",
    address: ["Irene Link Building B,", "Office Suites 11,", "7 Impala Avenue,", "Doringkloof, Centurion,", "0157."],
    phone: "012 072 0428"
  },
  {
    city: "International",
    type: "Global Office",
    address: ["Summerfield House,", "Rue des Eturs,", "Castel,", "Guernsey,", "GY5 7DT."],
    phone: ""
  }
];

export const mockTeam = [
  {
    name: "John Doe",
    role: "Chief Executive Officer",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop"
  },
  {
    name: "Jane Smith",
    role: "Chief Operations Officer",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop"
  },
  {
    name: "Michael Johnson",
    role: "Head of Development",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop"
  },
  {
    name: "Sarah Williams",
    role: "Lead Architect",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop"
  }
];

export const mockServices = [
  {
    title: "Commercial Development",
    description: "State-of-the-art office spaces and corporate headquarters designed for modern businesses.",
    icon: Building2,
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop",
  },
  {
    title: "Residential Communities",
    description: "Premium residential estates and luxury apartment complexes that redefine modern living.",
    icon: Home,
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2000&auto=format&fit=crop",
  },
  {
    title: "Industrial Parks",
    description: "Efficient, scalable, and strategically located industrial facilities and logistics hubs.",
    icon: Factory,
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "Retail Spaces",
    description: "Engaging shopping centers and retail environments that attract and retain customers.",
    icon: Store,
    image: "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?q=80&w=2126&auto=format&fit=crop",
  },
  {
    title: "Mixed-Use Precincts",
    description: "Integrated developments combining live, work, and play elements to create thriving urban ecosystems.",
    icon: Building,
    image: "https://images.unsplash.com/photo-1448630360428-65456885c650?q=80&w=2067&auto=format&fit=crop",
  },
  {
    title: "Commercial Property Leasing",
    description: "Strategic leasing solutions connecting businesses with premium commercial real estate opportunities.",
    icon: Briefcase,
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop",
  },
];

export const mockProjects = [
  {
    title: "The Apex Tower",
    type: "Commercial",
    location: "Sandton CBD",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "Lumina Retail Hub",
    type: "Retail",
    location: "Waterfall City",
    image: "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?q=80&w=2126&auto=format&fit=crop",
  },
  {
    title: "Nexus Logistics Park",
    type: "Industrial",
    location: "Midrand",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "Oasis Residences",
    type: "Residential",
    location: "Rosebank",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2000&auto=format&fit=crop",
  },
  {
    title: "Eco Park Estate",
    type: "Mixed-Use",
    location: "Pretoria",
    image: "https://images.unsplash.com/photo-1448630360428-65456885c650?q=80&w=2067&auto=format&fit=crop",
  },
  {
    title: "Marina Bay Complex",
    type: "Residential",
    location: "Cape Town",
    image: "https://images.unsplash.com/photo-1515263487990-61b07816b324?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "Innovation Hub",
    type: "Commercial",
    location: "Stellenbosch",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop",
  },
  {
    title: "Gateway Mall",
    type: "Retail",
    location: "Durban",
    image: "https://images.unsplash.com/photo-1555529771-835f59fc5efe?q=80&w=1974&auto=format&fit=crop",
  }
];

export const mockTestimonials = [
  {
    quote: "Their commitment to quality and sustainability is unmatched. The new office precinct has transformed our corporate culture.",
    author: "Sarah Jenkins",
    role: "CEO, Global Tech Solutions",
    company: "Tech Hub Precinct",
  },
  {
    quote: "From concept to completion, the team demonstrated exceptional professionalism and delivered our retail center ahead of schedule.",
    author: "David Chen",
    role: "Managing Director, Retail Group",
    company: "Lumina Shopping Centre",
  },
  {
    quote: "The industrial logistics park they developed for us has significantly optimized our supply chain operations. Highly recommended.",
    author: "Michael Ross",
    role: "Operations Head, Logistics Inc.",
    company: "Nexus Logistics Park",
  },
];

export const mockSustainabilityInitiatives = [
  {
    title: "Green Architecture",
    description: "Designing buildings that harmonize with their environment.",
    icon: Leaf,
    progress: 95,
  },
  {
    title: "Energy Efficiency",
    description: "Implementing smart systems to minimize carbon footprint.",
    icon: Sun,
    progress: 88,
  },
  {
    title: "Water Conservation",
    description: "Advanced harvesting and recycling water management.",
    icon: Droplets,
    progress: 92,
  },
  {
    title: "Sustainable Materials",
    description: "Sourcing eco-friendly and recycled construction materials.",
    icon: Recycle,
    progress: 85,
  },
];

export const mockProcessSteps = [
  {
    title: "Concept & Planning",
    description: "Feasibility studies, site acquisition, and initial conceptualization.",
    icon: Lightbulb,
  },
  {
    title: "Design & Architecture",
    description: "Detailed architectural design, engineering, and obtaining necessary approvals.",
    icon: PenTool,
  },
  {
    title: "Construction",
    description: "Execution with rigorous quality control, safety standards, and timeline management.",
    icon: HardHat,
  },
  {
    title: "Delivery & Management",
    description: "Handover, tenant coordination, and ongoing property management.",
    icon: Key,
  },
];

export const mockContactInfo = [
  {
    icon: MapPin,
    title: "Head Office",
    details: "123 Innovation Drive, Sandton, 2196",
  },
  {
    icon: Phone,
    title: "Phone",
    details: "+27 (0) 11 555 0123",
  },
  {
    icon: Mail,
    title: "Email",
    details: "info@modernspaces.co.za",
  },
  {
    icon: Clock,
    title: "Business Hours",
    details: "Mon - Fri: 08:00 - 17:00",
  },
];

export const mockAwards2025 = [
  {
    title: "Parkdene Boulevard",
    category: "Retail Developments (Large Regional)",
    image: "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?q=80&w=2126&auto=format&fit=crop"
  },
  {
    title: "Irene Link Building E",
    category: "Commercial Office Development",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop"
  }
];

export const mockAwards2024 = [
  {
    title: "AVBOB - Irene Link Building D",
    category: "Corporate Office Development",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Eyethu Shopping Centre",
    category: "Overall Heritage & Retail Development",
    image: "https://images.unsplash.com/photo-1555529771-835f59fc5efe?q=80&w=1974&auto=format&fit=crop"
  }
];

export const mockAccreditations = [
  {
    title: "Monte Circle Building H",
    rating: "4 Star Green Star Office Rating",
    image: "https://images.unsplash.com/photo-1448630360428-65456885c650?q=80&w=2067&auto=format&fit=crop"
  },
  {
    title: "35 Lower Long",
    rating: "4 Star Green Star Office Rating",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop"
  }
];

export const mockMemberships = [
  "GBSA", "SAPOA", "SACSC", "NHBRC", "WCPDF", "PPRA"
];

export const mockFeatures = [
  "Sustainable Building Practices",
  "Innovative Architectural Design",
  "End-to-End Project Management",
  "Premium Quality Materials",
];
