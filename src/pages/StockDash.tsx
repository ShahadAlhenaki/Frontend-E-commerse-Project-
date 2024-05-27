import api from "@/api"

import ProductService from "@/api/products"
import CategoryService from "@/api/categories"
import StockService from "@/api/stocks"

import { EditDialog } from "@/components/editDialog"
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
import { Category, Product, Stock, StockWithpro, User, stockCreate } from "@/types"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"

export function StockDash() {
  const queryClient = useQueryClient()

  const [stock, setStock] = useState<stockCreate>({
    productId: "",
    quantity: 0,
    price: 0,
    color: "",
    size: ""
  })

  const handleChange = (e) => {
    const { name, value, valueAsNumber } = e.target
    setStock({
      ...stock,
      [name]: name == "price" ? valueAsNumber : value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await StockService.createOne(stock)
    queryClient.invalidateQueries({ queryKey: ["stocks"] })
  }
  console.log("Stock ", stock)

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

  const handleDeleteStock = async (id: string) => {
    const hasConfirmed = confirm("Do you really want to delete?")
    hasConfirmed && (await StockService.deleteOne(id))

    queryClient.invalidateQueries({ queryKey: ["stocks"] })
  }

  // Queries
  const { data: stocks, error } = useQuery<Stock[]>({
    queryKey: ["stocks"],
    queryFn: StockService.getAll
  })

  const { data: products, error: proerror } = useQuery<Product[]>({
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

  const stockWithpro: StockWithpro[] | undefined = stocks?.map((stock) => {
    const product = products?.find((pro) => pro.id === stock.productId)
    if (product) {
      return {
        ...stock,
        productName: product.name
      }
    }
    return { ...stock, productName: "" }
  })

  const handleSelect = (e) => {
    setStock({
      ...stock,
      productId: e.target.value
    })
  }

  return (
    <>
      <form className="mt-20 w-1/3 mx-auto" onSubmit={handleSubmit}>
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Add new Stock</h3>
        {/* <Input
          name="name"
          className="mt-4"
          type="text"
          placeholder="name"
          onChange={handleChange}
        /> */}
        <Input
          name="quantity"
          className="mt-4"
          type="number"
          placeholder="quantity"
          onChange={handleChange}
        />
        <Input
          name="price"
          className="mt-4"
          type="number"
          placeholder="price"
          onChange={handleChange}
        />
        <Input
          name="color"
          className="mt-4"
          type="text"
          placeholder="color"
          onChange={handleChange}
        />
        <Input
          name="size"
          className="mt-4"
          type="text"
          placeholder="size"
          onChange={handleChange}
        />

        <select name="pros" onChange={handleSelect} className="mt-4 bg-gray-200">
          {products?.map((pro) => {
            return (
              <option key={pro.id} value={pro.id}>
                {pro.name}
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
        <h3 className="scroll-m-20 text-4xl my-10 font-semibold tracking-tight">Stocks</h3>
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>quantity</TableHead>
              <TableHead>price</TableHead>
              <TableHead>color</TableHead>
              <TableHead>size</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stockWithpro?.map((stock) => (
              <TableRow key={stock.id}>
                <TableCell className="text-left">{stock.productName}</TableCell>
                <TableCell className="text-left">{stock.stockQuantity}</TableCell>
                <TableCell className="text-left">{stock.price}</TableCell>
                <TableCell className="text-left">{stock.color}</TableCell>
                <TableCell className="text-left">{stock.size}</TableCell>

                <TableCell className="text-left">
                  <Button onClick={() => handleDeleteStock(stock.id)}>X</Button>
                  {/* <EditDialog stock={stock} /> */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
}
