export interface IStripePrice {
  id: string;
  object: string;
  active: boolean;
  billing_scheme: string;
  created: number;
  currency: string;
  custom_unit_amount: null | any;
  livemode: boolean;
  lookup_key: null | string;
  metadata: Record<string, any>;
  nickname: null | string;
  product: string;
  recurring: {
    aggregate_usage: null | string;
    interval: 'month' | 'year' | 'day' | 'week';
    interval_count: number;
    meter: null | string;
    trial_period_days: null | number;
    usage_type: string;
  };
  tax_behavior: string;
  tiers_mode: null | string;
  transform_quantity: null | any;
  type: string;
  unit_amount: number;
  unit_amount_decimal: string;
}

export interface IProduct {
  id: string;
  object: string;
  active: boolean;
  attributes: any[];
  created: number;
  default_price: string;
  description: null | string;
  images: string[];
  livemode: boolean;
  marketing_features: any[];
  metadata: Record<string, any>;
  name: string;
  package_dimensions: null | any;
  shippable: null | boolean;
  statement_descriptor: null | string;
  tax_code: null | string;
  type: string;
  unit_label: null | string;
  updated: number;
  url: null | string;
  prices: IStripePrice[];
}

export interface IProductsResponse {
  data?: IProduct[];
  currentPage?: number;
  totalPages?: number;
  total?: number;
}

export interface ICreateSubscriptionRequest {
  productId: string;
  priceId: string;
  paymentMethodId?: string;
}

export interface ICreateSubscriptionResponse {
  url?: string;
}

export interface IPaymentMethod {
  id: string;
  object: string;
  billing_details: {
    address: {
      city: string | null;
      country: string | null;
      line1: string | null;
      line2: string | null;
      postal_code: string | null;
      state: string | null;
    };
    email: string | null;
    name: string | null;
    phone: string | null;
  };
  card: {
    brand: string;
    country: string;
    exp_month: number;
    exp_year: number;
    last4: string;
    funding: string;
  };
  type: string;
}

export interface IInvoice {
  id: string;
  object: string;
  amount_due: number;
  amount_paid: number;
  amount_remaining: number;
  created: number;
  currency: string;
  customer_email: string;
  hosted_invoice_url: string;
  invoice_pdf: string;
  number: string;
  paid: boolean;
  status: string;
  subscription: string;
  period_start: number;
  period_end: number;
}

export interface IStripePauseCollection {
  behavior: "mark_uncollectible" | "keep_as_draft" | "void";
  resumes_at?: number | null;
}

export interface IStripeDetails {
  status: string;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
  cancelAt: string | null;
  trialEnd: string | null;
  paymentMethod: IPaymentMethod;
  latestInvoice: IInvoice;
  pause_collection?: IStripePauseCollection | null;
}

export interface ISubscription {
  id: string;
  plan: string;
  amount: number;
  isActive: boolean;
  paymentStatus: string;
  isPaused?: boolean;
  startDate: string;
  nextBillingDate: string;
  stripeSubscriptionId: string;
  stripeDetails: IStripeDetails;
  createdAt: string;
  updatedAt: string;
}

export interface ISubscriptionResponse {
  data: ISubscription;
}

// Legacy type for compatibility
export interface ILegacySubscription {
  _id: string;
  userId: string;
  productId: string;
  stripeSubscriptionId: string;
  status: "active" | "inactive" | "canceled" | "past_due" | "unpaid";
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
  createdAt: string;
  updatedAt: string;
  product: IProduct;
}

// Billing History Types
export interface IPaymentHistoryLine {
  id: string;
  amount: number;
  description: string;
  quantity: number;
  priceId: string;
}

export interface IPaymentHistoryCharge {
  id: string;
  amount: number;
  status: string;
  paid: boolean;
  created: number;
  receipt_url: string;
  payment_method_details: {
    card: {
      brand: string;
      last4: string;
      exp_month: number;
      exp_year: number;
    };
    type: string;
  };
}

export interface IPaymentHistorySubscription {
  id: string;
  status: string;
  current_period_end: number;
  current_period_start: number;
  plan: {
    id: string;
    amount: number;
    currency: string;
    interval: string;
    product: string;
  };
}

export interface IPaymentHistory {
  id: string;
  amount: number;
  currency: string;
  status: string;
  paid: boolean;
  subscriptionId: IPaymentHistorySubscription;
  invoiceNumber: string;
  invoicePdf: string;
  hostedInvoiceUrl: string;
  created: string;
  dueDate: string | null;
  paidAt: string;
  periodStart: string;
  periodEnd: string;
  description: string | null;
  charge: IPaymentHistoryCharge;
  lines: IPaymentHistoryLine[];
}

export interface IPaymentHistoryResponse {
  payments: IPaymentHistory[];
  totalCount: number;
  hasMore: boolean;
}
