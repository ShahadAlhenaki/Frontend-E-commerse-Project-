export type Product = {
  id: string
  name: string
  description: string
  image: string
  categoryId: string
  stockId: string
  quantity : number
  price : number
  color : string
  size : string
}
export type ProductCreate = Pick<Product, 'name' | 'description' | 'image' | 'categoryId'>
export type ProductWithCat = Product & { categoryName: string}

export type stockCreate = Pick<Stock, 'quantity'| 'price' | 'color' | 'size' | 'productId'>
export type StockWithpro = Stock & { productName: string}




export type Stock = {
id: string
productId : string 
quantity : number
price : number
color : string
 size : string
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
