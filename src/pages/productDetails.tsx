import api from "@/api"
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
      <div className="flex flex-col mx-auto ">
        <img className="w-15 h-15" src={product.image}/>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
      </div>
    </>
  )
}
