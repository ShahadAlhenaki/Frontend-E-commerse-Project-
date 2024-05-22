export type Product = {
  id: string
  name: string
  // price:
  description: string
  image: string
  categoryId: string
}

export type Category = {
  id: string
  name: string
}

export type User = {
  id: string
  fullName: string
  email: string
  countryCode: string
  phone: string
  role: string
}

export const ROLE = {
  Admin: "Admin",
  Customer: "Customer"
} as const

export type DecodedUser = {
  aud: string
  emailaddress: string
  exp: number
  iss: string
  name: string
  nameidentifier: string
  role: keyof typeof ROLE
}
