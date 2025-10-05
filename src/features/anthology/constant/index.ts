// Anthology-related constants

export const ANTHOLOGY_STATUS_COLORS = {
  ongoing: "bg-green-100 text-green-800",
  completed: "bg-blue-100 text-blue-800",
  published: "bg-purple-100 text-purple-800",
  cancelled: "bg-red-100 text-red-800",
} as const;

export const ANTHOLOGY_STATUS_LABELS = {
  ongoing: "Ongoing",
  completed: "Completed", 
  published: "Published",
  cancelled: "Cancelled",
} as const;