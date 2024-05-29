import api from "@/api"
import jwt from "jwt-decode"
import { GlobalContext } from "@/App"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { ChangeEvent, FormEvent, useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { reshapeUser } from "@/lib/utils"
import { NavBar } from "@/components/navbar"

export function Login() {
  const navigate = useNavigate()

  const context = useContext(GlobalContext)
  if (!context) throw Error("Context is missing")
  const { handleStoreUser } = context

  const [user, setUser] = useState({
    email: "",
    password: ""
  })

  const handleLogin = async () => {
    try {
      const res = await api.post(`/users/login`, user)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setUser({
      ...user,
      [name]: value
    })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const token = await handleLogin()
    if (token) {
      const decodedToken = jwt(token)
      const user = reshapeUser(decodedToken)
      localStorage.setItem("token", token)
      localStorage.setItem("user", JSON.stringify(user))

      handleStoreUser(user)
      navigate("/")
    }
  }

  return (
    <>
      <NavBar />
      <div className="p-80 mr-20 pt-52">
        <h3 className="text-orange-400 font-bold center">Login</h3>
        <form action="POST" className="w-full mx-auto" onSubmit={handleSubmit}>
          <Input
            name="email"
            className="mt-4"
            type="text"
            placeholder="Email"
            onChange={handleChange}
          />
          <Input
            name="password"
            className="mt-4"
            type="password"
            placeholder="Password"
            onChange={handleChange}
          />
          <div className="flex justify-between flex-col">
            <Button className="mt-4 bg-orange-400 hover:bg-[#a09f9f] text-slate-900">Login</Button>
            <Button variant="link" className="mt-4">
              <Link to="/signup" className="text-slate-50">
                {" "}
                Create an account
              </Link>
            </Button>
          </div>
        </form>
      </div>
    </>
  )
}
