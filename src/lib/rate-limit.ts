const rateLimitMap = new Map<string, number[]>();

export function isRateLimited(identifier: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const windowStart = now - windowMs;
  
  if (!rateLimitMap.has(identifier)) {
    rateLimitMap.set(identifier, [now]);
    return false;
  }
  
  const timestamps = rateLimitMap.get(identifier)!.filter((t: number) => t > windowStart);
  timestamps.push(now);
  rateLimitMap.set(identifier, timestamps);
  
  return timestamps.length > limit;
}
