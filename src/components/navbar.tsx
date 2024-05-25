import { Link } from "react-router-dom"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList
} from "./ui/navigation-menu"
import { Cart } from "./cart"
import { useContext } from "react"
import { GlobalContext } from "@/App"
import { ROLE } from "@/types"
import { Button } from "./ui/button"

export function NavBar() {
  const context = useContext(GlobalContext)
  if (!context) throw Error("Context is missing")
  const { state, handleRemoveUser } = context

  console.log(state)

  const handleLogout = () => {
    if (typeof window !== undefined) {
      window.location.reload()
    }

    localStorage.removeItem("token")
    localStorage.removeItem("user")

    handleRemoveUser()
  }
  // bg-gray-100
  return (
    <div className="flex justify-between mb-10 py-9 bg-yellow-50 w-full h-16">
      <img className="h-16 w-19 self-center " src="public/carDeals.png" />

      <NavigationMenu>
        <NavigationMenuList className="gap-4">
          <NavigationMenuItem>
            <Link to="/">
              <NavigationMenuLink> Home </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          {state.user?.role === ROLE.Admin && (
            <NavigationMenuItem>
              <Link to="/dashboard">
                <NavigationMenuLink> Dashboard </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          )}

          {!state.user && (
            <NavigationMenuItem>
              <Link to="/signup">
                <NavigationMenuLink> Signup </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          )}

          {!state.user && (
            <NavigationMenuItem>
              <Link to="/login">
                <NavigationMenuLink> Login </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          )}
          {state.user && (
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </NavigationMenuList>
      </NavigationMenu>

      <Cart />
    </div>
  )
}
