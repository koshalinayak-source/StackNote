// utils.js or wherever formatDate is defined
export function formatDate(date) {
  const d = new Date(date); // convert to Date object
  if (isNaN(d)) return "Invalid Date"; // handle invalid dates
  return d.toLocaleDateString();
}
