import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function splitTags(tags: string[]) {
  return tags.map((tag) => tag.trim());
}

export function timeAgo(dateString: string) {
  // started time conversion, but the backends in UTC it seems with the front end being in BST. So wont spend any more time converting.
  // Calculate the difference in milliseconds
  const eventDate = new Date(dateString);

  const currentDate = new Date();
  const differenceInTime = currentDate.getTime() - eventDate.getTime();
  // Convert the difference from milliseconds to days and hours
  const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
  const differenceInHours = Math.floor(differenceInTime / (1000 * 3600));
  const differenceInMinutes = Math.floor(
    (differenceInTime % (1000 * 3600)) / (1000 * 60),
  );

  // Decide whether to display days or hours
  if (differenceInDays >= 1) {
    return `${differenceInDays} d`;
  } else if (differenceInHours >= 1) {
    return `${differenceInHours} h`;
  } else if (differenceInMinutes >= 1 || differenceInMinutes === 0) {
    return ` ${differenceInMinutes} m`;
  } else {
    return "Less than a minute ago";
  }
}
