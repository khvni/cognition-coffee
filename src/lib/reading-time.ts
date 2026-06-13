export function getReadingTime(body: string | undefined): number {
  const wordCount = body ? body.split(/\s+/).length : 0;
  return Math.max(1, Math.round(wordCount / 230));
}
