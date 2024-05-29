import { GlobalContext } from "@/App"
import api from "@/api"
import { Footer } from "@/components/footer"
import { NavBar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Product } from "@/types"

import { useQuery } from "@tanstack/react-query"
import { useContext } from "react"
import { useParams } from "react-router-dom"

export function ProductDetails() {
  const params = useParams()

  const getProduct = async () => {
    try {
      const res = await api.get(`/products`)
      if (res.data) {
        const products = res.data as Product
        return products.find((product) => product.id === params.productId)
      }
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

  if (isLoading) {
    return <p>Loading...</p>
  }
  if (!product) {
    return <p>Product not found</p>
  }

  const context = useContext(GlobalContext)
  if (!context) throw Error("Context is missing")
  const { handleAddToCart } = context

  return (
    <>
      <NavBar />

      <div className="flex flex-col mx-auto items-center self-center mt-20 mb-20 border-t-orange-400 border border-solid border-b-orange-400 p-14 border-r-0 border-l-0">
        <h3 className="mb-8 text-3xl font-bold">{product.name}</h3>
        <img className="w-80 mb-8" src={product.image} />
        <p className="mb-6 w-1/2 text-left text-[#fff]">{product.description}</p>
        <p className="mb-9 font-bold text-[#ebebeb]">{product.price} | SAR</p>
        <div className="grid gap-2 mb-12">
          <Label className="text-base font-bold text-[#fff]" htmlFor="color">
            Color
          </Label>
          <RadioGroup className="flex items-center gap-2" id="color">
            <Label
              className=" bg-[#eb2525] text-white border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
              htmlFor="color-black"
            >
              <RadioGroupItem id="color-black" value="black" className="bg-[#fff] text-black" />
            </Label>
            <Label
              className="bg-[#fff] text-blackborder cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
              htmlFor="color-white"
            >
              <RadioGroupItem id="color-white" value="white" className="bg-[#fff] text-gray" />
            </Label>
            <Label
              className="bg-[#b4b4b4] text-[#ffffff] border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
              htmlFor="color-blue"
            >
              <RadioGroupItem id="color-blue" value="blue" className="bg-[#fff] text-black" />
            </Label>
          </RadioGroup>
        </div>
        <Button
          className="w-80 mb-12 ml-3 shadow-lg rounded-full  bg-orange-400 hover:bg-[#fcc4629e]"
          onClick={() => handleAddToCart(product)}
        >
          Add to cart
        </Button>{" "}
        <span></span>
      </div>

      <Footer />
    </>
  )
}
