import api from "@/api"

import ProductService from "@/api/products"
import CategoryService from "@/api/categories"

import { EditDialog } from "@/components/editDialog"
import { NavBar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { Category, Product, ProductCreate, ProductWithCat, User } from "@/types"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { StockDash } from "./StockDash"

export function Dashboard() {
  const queryClient = useQueryClient()

  const [product, setProduct] = useState<ProductCreate>({
    name: "",
    categoryId: "",
    description: "",
    image: ""
  })

  const handleChange = (e) => {
    const { name, value, valueAsNumber } = e.target
    setProduct({
      ...product,
      [name]: name == "price" ? valueAsNumber : value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await ProductService.createOne(product)
    queryClient.invalidateQueries({ queryKey: ["products"] })
  }
  console.log("Product ", product)

  const getUsers = async () => {
    try {
      const token = localStorage.getItem("token")
      const res = await api.get("/users", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  const handleDeleteProduct = async (id: string) => {
    const hasConfirmed = confirm("Do you really want to delete?")
    hasConfirmed && (await ProductService.deleteOne(id))

    queryClient.invalidateQueries({ queryKey: ["products"] })
  }

  // Queries
  const { data: products, error } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: ProductService.getAll
  })

  const { data: categories, error: catError } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: CategoryService.getAll
  })

  const { data: users, error: userError } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: getUsers
  })

  const productWithCat: ProductWithCat[] | undefined = products?.map((product) => {
    const category = categories?.find((cat) => cat.id === product.categoryId)
    if (category) {
      return {
        ...product,
        categoryName: category.name
      }
    }
    return { ...product, categoryName: "" }
  })

  const handleSelect = (e) => {
    setProduct({
      ...product,
      categoryId: e.target.value
    })
  }
  const uniqeMap: { [key: string]: boolean } = {}

  const uniqueProducts = productWithCat?.filter((product) => {
    if (!uniqeMap[product.id]) {
      uniqeMap[product.id] = true
      return true
    }
    return false
  })

  return (
    <>
      <NavBar />
      <form className="mt-20 w-1/3 mx-auto" onSubmit={handleSubmit}>
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight text-[#e99042]">
          Add new product
        </h3>
        <Input
          name="name"
          className="mt-4"
          type="text"
          placeholder="Name"
          onChange={handleChange}
        />
        <Input
          name="description"
          className="mt-4"
          type="text"
          placeholder="Description"
          onChange={handleChange}
        />

        <Input
          name="image"
          className="mt-4"
          type="text"
          placeholder="Img"
          onChange={handleChange}
        />

        <select name="cats" onChange={handleSelect} className="mt-4 bg-gray-200">
          <option selected>Select Category</option>
          {categories?.map((cat) => {
            return (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            )
          })}
        </select>

        <div className="flex justify-between">
          <Button className="mt-4 bg-red-400" type="submit">
            Submit
          </Button>
          <Button variant="outline" className="mt-4" type="reset">
            Reset
          </Button>
        </div>
      </form>

      <div>
        <h3 className="scroll-m-20 text-4xl my-10 font-semibold tracking-tight text-[#e99042]">
          Products
        </h3>
        <Table className="w-2/3 mx-auto border-1 border-[#d8d6d6] border-collapse bg-[#eeeeeee9] ">
          <TableHeader className="bg-[#eeeeeee9]">
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>CategoryId</TableHead>
              <TableHead>Img</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {uniqueProducts?.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="text-left">{product.name}</TableCell>
                <TableCell className="text-left">{product.price}</TableCell>
                <TableCell className="text-left">{product.categoryName}</TableCell>
                <TableCell className="text-left">
                  <img className="w-16" src={product.image} />
                </TableCell>
                <TableCell className="text-left">
                  <Button variant="destructive" onClick={() => handleDeleteProduct(product.id)}>
                    X
                  </Button>
                  <EditDialog product={product} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <StockDash />
    </>
  )
}
