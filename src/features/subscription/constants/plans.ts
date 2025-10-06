export interface IPlanFeature {
  id: string;
  name: string;
  description?: string;
}

export interface IPlanDetails {
  id: string;
  name: string;
  displayName: string;
  features: IPlanFeature[];
  price: number;
  currency: string;
  interval: string;
}

export const PLAN_FEATURES = {
  BASIC: [
    {
      id: "basic-playlists",
      name: "Create & Sell Playlists",
      description: "Create your own playlists and monetize them",
    },
    {
      id: "basic-anthologies",
      name: "Participate in Anthologies",
      description: "Submit your work to curated anthologies",
    },
  ],
  STANDARD: [
    {
      id: "standard-playlists",
      name: "Create & Sell Playlists",
      description: "Create your own playlists and monetize them",
    },
    {
      id: "standard-anthologies",
      name: "Participate in Anthologies",
      description: "Submit your work to curated anthologies",
    },
  ],
  PREMIUM: [
    {
      id: "premium-poems",
      name: "Unlimited poem submissions",
      description: "Submit unlimited poems without restrictions",
    },
    {
      id: "premium-playlists",
      name: "Create & Sell Playlists",
      description: "Unlimited playlist creation and monetization",
    },
    {
      id: "premium-anthologies",
      name: "Participate in Anthologies",
      description: "Submit to all anthologies with priority review",
    },
    {
      id: "premium-analytics",
      name: "Advanced Analytics",
      description: "Detailed insights on engagement and earnings",
    },
    {
      id: "premium-support",
      name: "Priority Support",
      description: "Get help faster with priority customer support",
    },
    {
      id: "premium-badge",
      name: "Premium Badge",
      description: "Display a premium badge on your profile",
    },
    {
      id: "premium-ad-free",
      name: "Ad-free Experience",
      description: "Enjoy Poetree without any advertisements",
    },
    {
      id: "premium-early",
      name: "Early Access",
      description: "Get early access to new features",
    },
  ],
};

export const PLAN_DETAILS: Record<string, IPlanDetails> = {
  basic: {
    id: "basic",
    name: "basic",
    displayName: "Basic Plan",
    features: PLAN_FEATURES.BASIC,
    price: 5,
    currency: "CAD",
    interval: "month",
  },
  standard: {
    id: "standard",
    name: "standard",
    displayName: "Standard Plan",
    features: PLAN_FEATURES.STANDARD,
    price: 10,
    currency: "CAD",
    interval: "month",
  },
  premium: {
    id: "premium",
    name: "premium",
    displayName: "Premium Plan",
    features: PLAN_FEATURES.PREMIUM,
    price: 20,
    currency: "CAD",
    interval: "month",
  },
};

export const getPlanFeatures = (planName: string): IPlanFeature[] => {
  const normalizedPlanName = planName.toLowerCase();
  const plan = PLAN_DETAILS[normalizedPlanName];
  return plan?.features || [];
};

export const getPlanDetails = (planName: string): IPlanDetails | null => {
  const normalizedPlanName = planName.toLowerCase();
  return PLAN_DETAILS[normalizedPlanName] || null;
};
