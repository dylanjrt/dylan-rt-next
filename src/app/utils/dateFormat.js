/**
 * Format a date string into various human-readable formats
 *
 * Args:
 *   dateString: ISO date string to format
 *   format: Format type - 'default' for time of day, 'season' for seasonal output
 *
 * Returns:
 *   Formatted date string based on requested format
 */
export function formatDateTime(dateString, format = "default") {
  try {
    const date = new Date(dateString);

    // Check for invalid date
    if (isNaN(date.getTime())) {
      console.error(`Invalid date string provided: ${dateString}`);
      return "";
    }

    if (format === "season") {
      const month = date.getMonth();
      const year = date.getFullYear();
      const fullDate = date.toISOString();
      console.log(fullDate);

      let season;
      console.log(month);
      // Northern hemisphere seasons by meteorological definition
      if (month >= 2 && month <= 4) {
        season = "Spring";
      } else if (month >= 5 && month <= 7) {
        season = "Summer";
      } else if (month >= 8 && month < 10) {
        season = "Fall";
      } else {
        season = "Winter";
      }

      return `${season} ${year}`;
    }

    // Default format with time of day
    const hour = date.getHours();

    // Determine time of day
    let timeOfDay;
    if (hour < 12) timeOfDay = "morning";
    else if (hour < 17) timeOfDay = "afternoon";
    else timeOfDay = "evening";

    // Format the date and convert to lowercase
    const formattedDate = date
      .toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
      .toLowerCase();

    return `${timeOfDay} of ${formattedDate}`;
  } catch (error) {
    console.error(`Error formatting date (${dateString}): ${error.message}`);
    return "";
  }
}
