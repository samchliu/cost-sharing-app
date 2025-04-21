export async function authFetch(
  input: RequestInfo,
  init: RequestInit = {}
): Promise<Response | undefined> {
  // 從 localStorage 取出 accessToken
  const token = localStorage.getItem('accessToken');

  // 合併 headers
  const headers = new Headers(init.headers || {});
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  // 執行 fetch
  const res = await fetch(input, {
    ...init,
    headers,
  });

  // 若 401，導回首頁 + 清除登入資訊
  if (res.status === 401 || res.status === 404) {
    localStorage.removeItem('loginUserId');
    localStorage.removeItem('accessToken');

    const currentPath = window.location.pathname + window.location.search;
    window.location.href = `/?redirectTo=${encodeURIComponent(currentPath)}`;
    return;
  }

  return res;
}
