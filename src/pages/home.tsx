import api from "@/api"

import { GlobalContext } from "@/App"
import { Product } from "@/types"

import { NavBar } from "@/components/navbar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"

import { useQuery, useQueryClient } from "@tanstack/react-query"
import { ChangeEvent, FormEvent, useContext, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { Footer } from "@/components/footer"
import { Hero } from "@/components/hero"
import { Search, SearchIcon } from "lucide-react"

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


const uniqeMap: {[key: string]: boolean} = {}

const uniqueProducts = data?.filter(product=> {
  if(!uniqeMap[product.id]){
    uniqeMap[product.id] = true
    return true
  }
  return false
})

  return (
    <>
      <NavBar />
      <Hero />

      <div>
        <form onSubmit={handleSearch} className="flex gap-4 w-full md:w-1/2 mx-auto mb-10">
          <Input
            type="search"
            placeholder="Search for a car . . ."
            onChange={handleChange}
            value={searchBy}
          />
          <Button className="bg-0 hover:bg-0" type="submit"><Search size={28} color="#ffffff" strokeWidth={1.75} /></Button>
        </form>
      </div>
      <section className="flex flex-col md:flex-row gap-11 max-w-6xl justify-center mx-auto flex-wrap mb-11">
        {uniqueProducts?.length === 0 && <p>No products found, try searching with other name </p>}
        {uniqueProducts?.map((product) => (
          <Card key={product.id} className="w-[300px] hover:bg-[#f8f8f8a5] group-hover:opacity-95 justify-evenly border-0 bg-[#f8f8f854]">
            <CardHeader>
              <img className=" w-64 h-28  mb-6" src={product.image} />
              <CardTitle>{product.name}</CardTitle>
              <CardDescription className="h-14 text-slate-50 mr">{product.description.slice(0, 55)}...</CardDescription>
            </CardHeader>
            <CardContent>
            {product.price}<span className=" ml-2">| SAR</span>
              </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" className="rounded-full">
                <Link to={`/products/${product.id}`}> Details </Link>
              </Button>
              {
                 product.quantity ? (
              <Button className="w-full ml-3 shadow-lg rounded-full bg-orange-400" onClick={() => handleAddToCart(product)}>
                Add to cart
              </Button>)
               : <p className=" text-s text-red-600">Out of stock</p>
            }
            </CardFooter>
          </Card>
        ))}
      </section>
      {error && <p className="text-red-500">{error.message}</p>}

      <Footer />
    </>
  )
}
