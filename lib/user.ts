import jwt_decode from "jwt-decode"
import { cookies } from "next/headers"

export const Roles = ["FARMER", "TECHNICIAN"] as const
export type Role = (typeof Roles)[number]

type User = {
  uid: string
  role: Role
}

const JWTUserRoles = ["authenticated", "ovo_farmer", "ovo_technician"] as const

type JWTPayLoad = {
  iat: number
  drupal: {
    uid: string
    role: (typeof JWTUserRoles)[number][]
  }
}

export const decodeToken = (token: string) => {
  const { iat, drupal } = jwt_decode<JWTPayLoad>(token)
  return {
    iat,
    user: {
      uid: drupal.uid,
      role: drupal.role.includes("ovo_technician") ? "TECHNICIAN" : "FARMER",
    } as User,
  }
}

export const getAuthRole = () => {
  const token = cookies().get("token")?.value;
  if (!token) return undefined;
  const decoded = decodeToken(token)
  return decoded.user.role
}