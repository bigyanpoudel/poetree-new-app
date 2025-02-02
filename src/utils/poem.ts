import { POEMTYPE } from "../types";

const dayjs = require("dayjs");

export const getPoemType = ({
  audio,
  thumbnail,
  video,
}: {
  audio?: string;
  thumbnail?: string;
  video?: string;
}) => {
  let type: POEMTYPE = POEMTYPE.text;
  if (video) {
    type = POEMTYPE.video;
  }
  if (audio) {
    type = POEMTYPE.audio;
  }
  if (thumbnail) {
    type = POEMTYPE.image;
  }
  return type;
};

export const getCreatedDate = (date: string) => {
  // Your target date

  const relative = new Intl.RelativeTimeFormat("en", {
    style: "short",
  });

  const now: any = new Date();
  const createdDate: any = new Date(date);
  const diffInMs = createdDate - now;

  const diffInSeconds = Math.floor(diffInMs / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  if (Math.abs(diffInDays) > 30) {
    // Format the date to "12 July 2024"
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    return createdDate.toLocaleDateString("en-GB", options);
  }
  // Return the appropriate relative time format based on the difference
  if (Math.abs(diffInSeconds) < 60) {
    return relative.format(diffInSeconds, "second");
  } else if (Math.abs(diffInMinutes) < 60) {
    return relative.format(diffInMinutes, "minute");
  } else if (Math.abs(diffInHours) < 24) {
    return relative.format(diffInHours, "hour");
  } else {
    return relative.format(diffInDays, "day");
  }
};

export const formatPoemNumber = (count = 0) => {
  if (count < 1000) {
    return count.toString(); // Return the number as is for counts less than 1000
  } else if (count < 1000000) {
    return (count / 1000).toFixed(1) + "K"; // Format for thousands
  } else if (count < 1000000000) {
    return (count / 1000000).toFixed(1) + "M"; // Format for millions
  } else {
    return (count / 1000000000).toFixed(1) + "B"; // Format for billions
  }
};
