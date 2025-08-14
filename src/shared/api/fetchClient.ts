export async function fetchClient(url: string, options: RequestInit = {}) {
  let response = await fetch(`${process.env.NEXT_PUBLIC_AI_BASE_URL}${url}`, {
    ...options,
  });

  return response;
}
