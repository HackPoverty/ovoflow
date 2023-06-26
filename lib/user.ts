import jwt_decode from "jwt-decode"

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