import api from "@/api"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Product } from "@/types"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { ChangeEvent, FormEvent, useContext, useState } from "react"
import { GlobalContext } from "@/App"
import { NavBar } from "@/components/navbar"
import { Input } from "@/components/ui/input"
import { Link, useSearchParams } from "react-router-dom"

export function Home() {
  const [searchParams, setSearchParams] = useSearchParams()
  const defultSearch = searchParams.get("searchBy") || ""

  const [searchBy, setSearchBy] = useState(defultSearch)
  const queryClient = useQueryClient()

  const context = useContext(GlobalContext)
  if (!context) throw Error("Context is missing")
  const { handleAddToCart } = context

  const getProducts = async () => {
    try {
      const res = await api.get(`/products?searchBy=${searchBy}`)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  const { data, error } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getProducts
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setSearchBy(value)
  }
  const handleSearch = (e: FormEvent) => {
    e.preventDefault()


   queryClient.invalidateQueries({ queryKey: ["products"] })
   setSearchParams({
      ...searchParams,
      searchBy: searchBy
    })
  }

  return (
    <>
      <NavBar />

      <div>
        <form onSubmit={handleSearch} className="flex gap-4 w-full md:w-1/2 mx-auto mb-10">
          <Input
            type="search"
            placeholder="Search for a product"
            onChange={handleChange}
            value={searchBy}
          />
          <Button type="submit">Search</Button>
        </form>
      </div>
      <section className="flex flex-col md:flex-row gap-4 max-w-6xl mx-auto justify-between  flex-wrap">
        {data?.length === 0 && <p>No products found, try searching with other name </p>}
        {data?.map((product) => (
          <Card key={product.id} className="w-[300px]">
            <CardHeader>
              <img src={product.image} />
              <CardTitle>{product.name}</CardTitle>
              <CardDescription>{product.description}</CardDescription>
            </CardHeader>
            {/* <CardContent>
                <p>Card Content Here</p>
              </CardContent> */}
            <CardFooter className="flex justify-between">
              <Button variant="outline">
                <Link to={`/products/${product.id}`}> Details </Link>
              </Button>
              <Button className="w-full" onClick={() => handleAddToCart(product)}>Add to cart</Button>
            </CardFooter>
          </Card>
        ))}
      </section>
      {error && <p className="text-red-500">{error.message}</p>}
    </>
  )
}
