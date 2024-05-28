
import { Label } from "@/components/ui/label"
import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group"
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { NavBar } from "@/components/navbar"
import { Product, StockWithpro, Stock } from "@/types"

import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import api from "@/api"
import stocks from "@/api/stocks"
import categories from "@/api/categories"

export default function ProductDet() {
  const params = useParams()

  const getProduct = async () => {
    try {
      const res = await api.get(`/products/${params.productId}`)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  const {
    data: product,
    error,
    isLoading
  } = useQuery<Product>({
    queryKey: ["product"],
    queryFn: getProduct
  })

  // const stockWithpro: StockWithpro[] | undefined = stocks?.map((stock) => {
  //   const category = categories?.find((cat) => cat.id === product.categoryId)
  //   if (product) {
  //     return {
  //       ...stock,
  //       productCategory: category.name
  //     }
  //   }
  //   return { ...stock, productName: "" }
  // })

  if (isLoading) {
    return <p>Loading...</p>
  }
  if (!product) {
    return <p>Product not found</p>
  }
  return (
    <>
    <NavBar />
    <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-6xl px-4 mx-auto py-6">
      <div className="grid gap-4">
        <div className="grid md:grid-cols-5 gap-3 items-start">
          <div className="hidden md:flex flex-col gap-3 items-start">
            <button className="border hover:border-gray-900 rounded-lg overflow-hidden transition-colors dark:hover:border-gray-50">
              <img
                alt="Preview thumbnail"
                className="aspect-square object-cover"
                height={100}
                width={100}
              />
              <span className="sr-only">View Image 1</span>
            </button>
            <button className="border hover:border-gray-900 rounded-lg overflow-hidden transition-colors dark:hover:border-gray-50">
              <img
                alt="Preview thumbnail"
                className="aspect-square object-cover"
                height={100}
                src="/placeholder.svg"
                width={100}
              />
              <span className="sr-only">View Image 2</span>
            </button>
            <button className="border hover:border-gray-900 rounded-lg overflow-hidden transition-colors dark:hover:border-gray-50">
              <img
                alt="Preview thumbnail"
                className="aspect-square object-cover"
                height={100}
                src="/placeholder.svg"
                width={100}
              />
              <span className="sr-only">View Image 3</span>
            </button>
            <button className="border hover:border-gray-900 rounded-lg overflow-hidden transition-colors dark:hover:border-gray-50">
              <img
                alt="Preview thumbnail"
                className="aspect-square object-cover"
                height={100}
                src="/placeholder.svg"
                width={100}
              />
              <span className="sr-only">View Image 4</span>
            </button>
          </div>
          <div className="md:col-span-4">
            <img
              alt="Product Image"
              className="aspect-square object-cover border border-gray-200 w-full rounded-lg overflow-hidden dark:border-gray-800"
              height={600}
              src={product.image} 
              width={600}
            />
          </div>
        </div>
      </div>
      <div className="grid gap-4 md:gap-10 items-start">
        <div className="grid gap-4">
          <h1 className="font-bold text-3xl lg:text-4xl">{product.name}</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-0.5">
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
              <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
            </div>
          </div>
          
          <div className="text-sm leading-loose text-gray-500 dark:text-gray-400">
            <p>{product.description}</p>
          </div>
        </div>
       
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label className="text-base" htmlFor="color">
              Color
            </Label>
            <RadioGroup className="flex items-center gap-2" defaultValue="black" id="color">
              <Label
                className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                htmlFor="color-black"
              >
                <RadioGroupItem id="color-black" value="black" />
                Black
              </Label>
              <Label
                className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                htmlFor="color-white"
              >
                <RadioGroupItem id="color-white" value="white" />
                White
              </Label>
              <Label
                className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                htmlFor="color-blue"
              >
                <RadioGroupItem id="color-blue" value="blue" />
                Blue
              </Label>
            </RadioGroup>
          </div>
          <div className="grid gap-2">
          {/* {stockWithpro?.map((stock) => ( */}
            {/* <Label className="text-base" htmlFor="size">
              Type : {stock.name}
            </Label> */}
            
          </div>
          <div className="grid gap-2">
            <Label className="text-base" htmlFor="quantity">
              Quantity
            </Label>
            <Select defaultValue="1">
              <SelectTrigger className="w-24">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4">4</SelectItem>
                <SelectItem value="5">5</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button size="lg">Add to cart</Button>
        </div>
      </div>
    </div>
    </>
  )
}

function StarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
   
  )
}