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
