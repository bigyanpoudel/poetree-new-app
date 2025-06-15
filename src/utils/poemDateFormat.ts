import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export const getCreatedDate = (date: string) => {
  if (!date) {
    return "";
  }

  const now = dayjs();
  const createdDate = dayjs(date);

  if (!createdDate.isValid()) {
    return "Invalid date";
  }

  const diffInDays = now.diff(createdDate, "day");

  if (Math.abs(diffInDays) > 30) {
    return createdDate.format("D MMMM YYYY"); // e.g., "12 July 2024"
  }

  return createdDate.fromNow(); // e.g., "5 minutes ago", "in 2 hours"
};
