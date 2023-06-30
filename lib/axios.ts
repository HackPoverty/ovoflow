import axios from "axios"
import { CaseType, deserialize } from "jsonapi-fractal"
import { cookies } from "next/headers"
import { redirect } from "next-intl/server"

const jsonApi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/jsonapi_data`,
})

function jsonDeserialize<Type>(data: any) {
  return deserialize<Type>(data, { changeCase: CaseType.camelCase }) as Type
}

export async function jsonApiFetch<Type>(resource: string, params?: Record<string, any>) {
  const token = cookies().get("token")?.value;
  const headers = token ? { Authorization: `Bearer ${token}` } : {}

  try {
    const response = await jsonApi.get(resource, { params, headers })
    return jsonDeserialize<Type>(response.data)
  } catch (error) {
    let status = 500;
    if (axios.isAxiosError(error))
      status = error.response?.status || 500;
    if (status === 401 || status === 403) {
      redirect("/logout")
    } else throw error;
  }
}

export async function jsonApiFetchPaginated<Type>(resource: string, params?: Record<string, any>, limit = 10, offset = 0) {
  const token = cookies().get("token")?.value;
  const headers = token ? { Authorization: `Bearer ${token}` } : {}

  try {
    const response = await jsonApi.get(resource, {
      params: {
        ...params,
        "page[limit]": limit,
        "page[offset]": offset,
      }, headers
    })
    const data = response.data
    const isFirst = offset === 0 || data.links?.prev === undefined;
    const isLast = data.links?.next === undefined;
    return {
      data: jsonDeserialize<Type[]>(data),
      isFirst,
      isLast,
    }
  } catch (error) {
    let status = 500;
    if (axios.isAxiosError(error)) {
      status = error.response?.status || 500;
    }
    if (status === 401 || status === 403) {
      redirect("/logout")
    } else throw error;
  }
}

export const withCustomError = async <T>(promise: Promise<T>, errorMessage: string) => {
  try {
    return await promise;
  } catch (e) {
    console.log(e)
    throw new Error(errorMessage);
  }
}