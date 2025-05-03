import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import 'dayjs/locale/en';

dayjs.extend(relativeTime);

// Override locale
dayjs.locale('en', {
    relativeTime: {
      future: 'in %s',
      past: '%s ago',
      s: 'a few seconds',
      m: '1 minute',
      mm: '%d minutes',
      h: '1 hour',
      hh: '%d hours',
      d: '1 day',
      dd: '%d days',
      M: '1 month',
      MM: '%d months',
      y: '1 year',
      yy: '%d years',
    },
});
  
export const getCreatedDate = (date: string) => {
  const now = dayjs();
  const createdDate = dayjs(date);

  const diffInDays = now.diff(createdDate, "day");

  if (Math.abs(diffInDays) > 30) {
    return createdDate.format("D MMMM YYYY"); // e.g., "12 July 2024"
  }

  return createdDate.fromNow(); // e.g., "5 minutes ago", "in 2 hours"
};
