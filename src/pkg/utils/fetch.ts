export interface FetchError {
  message: string
  status: number
  data: object
}

export async function api<T>(url: string, init?: RequestInit): Promise<T> {
  const resp = await fetch(url, init)
  const text = await resp.text()
  const json = await JSON.parse(text)
  if (resp.ok) {
    return json as T
  }

  throw {
    message: resp.statusText,
    status: resp.status,
    data: json,
  } as FetchError
}
