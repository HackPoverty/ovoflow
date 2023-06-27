import axios from "axios"
import { CaseType, deserialize } from "jsonapi-fractal"


export const baseApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_DRUPAL_BASE_URL,
})


export const jsonApi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/jsonapi_data`,
})

export function jsonDeserialize<Type>(data: any) {
  return deserialize<Type>(data, { changeCase: CaseType.camelCase }) as Type
}