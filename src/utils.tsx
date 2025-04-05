export function slugToString(slug: string): string {
    return slug
        .replace(/[-_]+/g, ' ') // Replace dashes/underscores with spaces
        .replace(/\s+/g, ' ')   // Remove extra spaces
        .trim()                 // Trim spaces at the ends
        .replace(/\b\w/g, c => c.toUpperCase()); // Capitalize first letter of each word
}