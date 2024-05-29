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
  return (
    <div className="flex justify-between py-9 w-full h-16 mb-0 bg-gradient-to-l from-gray-50 to-white-50">
      <Link className="self-center" to="/">
        <img className="h-20 w-32 items-center ml-4" src="https://i.imgur.com/rPbngaq.png" alt="Logo" />
      </Link>
      <NavigationMenu className="center">
        <NavigationMenuList className="gap-4">
          <NavigationMenuItem>
            <Link to="/">
              <NavigationMenuLink className="hover:underline underline-offset-8 decoration-orange-400">
                {" "}
                Home{" "}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          {state.user?.role === ROLE.Admin && (
            <NavigationMenuItem>
              <Link to="/dashboard">
                <NavigationMenuLink className="hover:underline underline-offset-8 decoration-orange-400">
                  {" "}
                  Dashboard{" "}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          )}

          {!state.user && (
            <NavigationMenuItem>
              <Link to="/signup">
                <NavigationMenuLink className="hover:underline underline-offset-8 decoration-orange-400">
                  {" "}
                  Signup{" "}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          )}

          {!state.user && (
            <NavigationMenuItem>
              <Link to="/login">
                <NavigationMenuLink className="hover:underline underline-offset-8 decoration-orange-400">
                  {" "}
                  Login{" "}
                </NavigationMenuLink>
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
