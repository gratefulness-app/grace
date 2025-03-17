// lib/utils/cookie.ts

/**
 * Set a cookie with the given name, value, and options
 */
export function setCookie(name: string, value: string, days: number = 30) {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + days);

  const cookie = [
    `${name}=${encodeURIComponent(value)}`,
    `expires=${expirationDate.toUTCString()}`,
    'path=/'
  ].join('; ');

  document.cookie = cookie;
}

/**
 * Get a cookie value by name
 */
export function getCookie(name: string): string | null {
  const cookies = document.cookie.split('; ');
  const cookie = cookies.find(c => c.startsWith(`${name}=`));

  return cookie ? decodeURIComponent(cookie.split('=')[1]) : null;
}

/**
 * Delete a cookie by name
 */
export function deleteCookie(name: string) {
  setCookie(name, '', -1);
}

/**
 * Maximum size for cookies in bytes (4KB is a safe limit)
 */
export const MAX_COOKIE_SIZE = 4 * 1024;

/**
 * Check if a string is too large for a cookie
 */
export function isTooBigForCookie(str: string): boolean {
  return new Blob([str]).size > MAX_COOKIE_SIZE;
}