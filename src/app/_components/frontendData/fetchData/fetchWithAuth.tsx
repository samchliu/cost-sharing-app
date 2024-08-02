const baseUrl = '';

interface FetchOptions extends RequestInit {
  headers?: HeadersInit;
}

async function fetchWithAuth<T>(url: string, options: FetchOptions = {}): Promise<T> {
  const token = localStorage.getItem('authToken');
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };
  if (token) {
    (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${baseUrl}${url}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export default fetchWithAuth;