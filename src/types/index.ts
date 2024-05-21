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
