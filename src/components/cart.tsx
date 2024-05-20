import { GlobalContext } from "@/App"
import { Button } from "./ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { useContext } from "react"
import { ShoppingCart } from "lucide-react"

export function Cart() {
  const context = useContext(GlobalContext)
  if (!context) throw Error("Context is missing")

  const { state, handleDeleteFromCart } = context

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex gap-1">
          <ShoppingCart className="cursor-pointer" />
          <span>({state.cart.length})</span>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div>
          {state.cart.length === 0 && <p>No Items</p>}
          {state.cart.map((product) => {
            return (
              <div className="ab-4 flex items-center gap-4" key={product.id}>
                <img src={product.image} alt={product.name} className="w-10 h-10 object-contain" />
                <h4>{product.name}</h4>
                {/* <span>{product.name}</span> */}
                <Button variant="destructive" onClick={() => handleDeleteFromCart(product.id)}>
                  X
                </Button>
              </div>
            )
          })}
        </div>
      </PopoverContent>
    </Popover>
  )
}
