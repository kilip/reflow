const BASE_URL = process.env.NEXTAUTH_ORIGIN || 'http://localhost:3000'

export interface FetchError {
  message: string
  status: number
  data: object
}

export async function api<T>(url: string, init?: RequestInit): Promise<T|undefined>{
  const fullUrl = new URL(`${BASE_URL}${url}`)
  const resp = await fetch(fullUrl, init)
  const text = await resp.text()
  const json = await JSON.parse(text)

  if(resp.ok){
    return json as T
  }

  throw {
    message: resp.statusText,
    status: resp.status,
    data: json
  } as FetchError
}
