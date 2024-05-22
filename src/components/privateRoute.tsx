import { ROLE } from "@/types"
import { ReactElement } from "react"
import { Navigate } from "react-router-dom"
import jwt from "jwt-decode"
import { reshapeUser } from "../lib/utils"

export function PrivateRoute({ children }: { children: ReactElement }) {
    const token = localStorage.getItem("token") || ""
    const decodedToken = jwt(token)
  
    const decodedUser = reshapeUser(decodedToken)
  
    return decodedUser.role === ROLE.Customer ? <Navigate to="/" /> : children
  }