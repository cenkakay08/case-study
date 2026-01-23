/**
 * Formats a date string according to the specified locale.
 *
 * @param dateString - The date string to format (e.g., ISO string).
 * @param locale - The locale to use for formatting (e.g., 'tr' or 'en').
 * @param options - Optional Intl.DateTimeFormatOptions.
 * @returns The formatted date string.
 */
export const formatDate = (
  dateString: string,
  locale: string = "tr",
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  },
) => {
  const languageTag = locale === "tr" ? "tr-TR" : "en-US";
  return new Date(dateString).toLocaleDateString(languageTag, options);
};

/**
 * Checks if a date is today
 */
export const isToday = (dateString: string): boolean => {
  const date = new Date(dateString);
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};
