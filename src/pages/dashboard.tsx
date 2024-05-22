import api from "@/api"
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
import { Category, Product, User } from "@/types"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"

export function Dashboard() {
  const queryClient = useQueryClient()
  

  const [product, setProduct] = useState({
    name: "",
    categoryId: ""
  })

  const postProduct = async () => {
    try {
      const res = await api.post("/products", product)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }
  const handleChange = (e) => {
    const { name, value } = e.target
    setProduct({
      ...product,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await postProduct()
    queryClient.invalidateQueries({ queryKey: ["products"] })
  }

  const getCategories = async () => {
    try {
      const res = await api.get("/categorys")
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  const getProducts = async () => {
    try {
      const res = await api.get("/products")
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  const getUsers = async () => {
    try {
      const token = localStorage.getItem("token")
      const res = await api.get("/users", {
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  const deleteProduct = async (id: string) => {
    try {
      const res = await api.delete(`/products/${id}`)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  const handleDeleteProduct = async (id: string) => {
    await deleteProduct(id)
    queryClient.invalidateQueries({ queryKey: ["products"] })
  }

  // Queries
  const { data: products, error } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getProducts
  })

  const { data: categories, error: catError } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: getCategories
  })

  const { data: users, error: userError } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: getUsers
  })

  const productWithCat = products?.map((product) => {
    const category = categories?.find((cat) => cat.id === product.categoryId)
    if (category) {
      return {
        ...product,
        categoryId: category.name
      }
    }
    return product
  })

  const handleSelect = (e) => {
    setProduct({
      ...product,
      categoryId: e.target.value
    })
  }

  return (
    <>
      <NavBar />
      <form className="mt-20 w-1/3 mx-auto" onChange={handleSubmit}>
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Add new product</h3>
        <Input
          name="name"
          className="mt-4"
          type="text"
          placeholder="Name"
          onChange={handleChange}
        />

        <select name="cats" onChange={handleSelect}>
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
        <h3 className="scroll-m-20 text-4xl my-10 font-semibold tracking-tight">Products</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              {/* <TableHead>Price</TableHead> */}
              <TableHead>CategoryId</TableHead>
              <TableHead>Img</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productWithCat?.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="text-left">{product.name}</TableCell>
                <TableCell className="text-left">{product.categoryId}</TableCell>
                <TableCell className="text-left">{product.image}</TableCell>
                <TableCell className="text-left">
                  <Button onClick={() => handleDeleteProduct(product.id)}>X</Button>
                  <EditDialog product={product} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
}
