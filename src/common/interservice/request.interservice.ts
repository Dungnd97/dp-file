import axios from 'axios';

function buildCurlCommand(
  method: 'GET' | 'POST',
  url: string,
  headers: Record<string, string>,
  body?: any,
): string {
  const headerStr = Object.entries(headers)
    .map(([key, value]) => `-H "${key}: ${value}"`)
    .join(' ');

  const dataStr = body ? `-d '${JSON.stringify(body)}'` : '';

  return `curl -X ${method} ${headerStr} ${dataStr} "${url}"`;
}

export async function post<T = any>(
  url: string,
  body: any,
  headers: Record<string, string> = {},
): Promise<T> {
  const mergedHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    ...headers,
  };

  console.log('[HTTP POST] Request:', buildCurlCommand('POST', url, mergedHeaders, body));

  const response = await axios.post<T>(url, body, {
    headers: mergedHeaders,
  });

  return response.data;
}

export async function get<T = any>(
  url: string,
  headers: Record<string, string> = {},
): Promise<T> {
  const mergedHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    ...headers,
  };

  console.log('[HTTP GET] Request:', buildCurlCommand('GET', url, mergedHeaders));

  const response = await axios.get<T>(url, {
    headers: mergedHeaders,
  });

  return response.data;
}
