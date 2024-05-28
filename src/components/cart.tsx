import { Product } from "@/types"
import { Button } from "./ui/button"
import { GlobalContext } from "@/App"

import { useContext } from "react"
import { ShoppingCart } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import api from "@/api"

type OrderItem = {
  color: string
  quantity: number
  productId: string
}
type OrderCheckout = {
  addressId: string
  items: OrderItem[]
}

export function Cart() {
  const context = useContext(GlobalContext)
  if (!context) throw Error("Context is missing")

  const { state, handleDeleteFromCart, handleAddToCart, handleRemoveCart } = context

  const groups = state.cart.reduce((acc, obj) => {
    const key = obj.id
    const curGroup = acc[key] ?? []
    return { ...acc, [key]: [...curGroup, obj] }
  }, {} as { [productId: string]: Product[] })

  const total = state.cart.reduce((acc, curr) => {
    return acc + curr.price
  }, 0)

  const checkoutOrder = []
  console.log(groups)
  Object.keys(groups).forEach((key) => {
    const products = groups[key]
    const product = products[0]

    checkoutOrder.push({
      color: product.color,
      quantity: product.stockQuantity,
      productId: key
    })
  })

  console.log(checkoutOrder)
  const handleCheckout = async () => {
    try {
      const token = localStorage.getItem("token")
      const res = await api.post("/orders/checkout", checkoutOrder, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (res.status === 201) {
        handleRemoveCart()
      }
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex gap-1">
          <ShoppingCart className="cursor-pointer self-center" />
          <span className="self-center mr-4">({Object.keys(groups).length})</span>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-300">
        <div>
          {state.cart.length === 0 && <p>No Items</p>}
          {Object.keys(groups).map((key) => {
            const products = groups[key]
            const product = products[0]
            const total = products.reduce((acc, curr) => {
              return acc + curr.price
            }, 0)
            return (
              <div className="ab-4 flex items-center gap-4" key={product.id}>
                <img src={product.image} alt={product.name} className="w-10 h-10 object-contain" />
                <h4>{product.name}</h4>
                <span className="font-bold">{total}</span>
                <Button variant="outline" onClick={() => handleDeleteFromCart(product.id)}>
                  -
                </Button>
                <span className="font-bold">{products.length}</span>
                <Button variant="outline" onClick={() => handleAddToCart(product)}>
                  +
                </Button>
              </div>
            )
          })}
        </div>
        <p>Total: {total}</p>
        <Button onClick={handleCheckout}>Checkout</Button>
      </PopoverContent>
    </Popover>
  )
}
