import api from "@/api"
import { Footer } from "@/components/footer"
import { NavBar } from "@/components/navbar"
import { Product } from "@/types"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"

export function ProductDetails() {
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

  if (isLoading) {
    return <p>Loading...</p>
  }
  if (!product) {
    return <p>Product not found</p>
  }
  return (
    <>
      <NavBar />
 
      <div className="flex flex-col mx-auto items-center self-center mt-40 mb-20">
        <h3 className="mb-8 text-3xl font-bold">{product.name}</h3>
        <img className="w-80 mb-8" src={product.image}/>
        <p className="mb-6 w-1/2 text-left ">{product.description}</p>
        <p className="mb-20 font-bold">{product.price} | SAR</p>
      </div>
      

      <Footer />
    </>
  )
}
