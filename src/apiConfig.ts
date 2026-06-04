export const API_BASE_URL = 'https://ais-pre-rj7rjygthdhtahowuv7khw-629118764655.asia-southeast1.run.app';

export function getApiUrl(path: string): string {
  const hostname = typeof window !== 'undefined' ? window.location.hostname : '';
  if (
    hostname === 'nightvolt.ru' ||
    hostname.endsWith('.nightvolt.ru') ||
    (hostname && !hostname.includes('run.app') && !hostname.includes('localhost') && !hostname.includes('127.0.0.1'))
  ) {
    return `${API_BASE_URL}${path}`;
  }
  return path;
}
