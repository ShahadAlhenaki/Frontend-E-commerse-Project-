import api from "@/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChangeEvent, FormEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

export function Signup() {
  const navigate = useNavigate()

  const [user, setUser] = useState({
    fullName:"",
    email:"",
    password:"",
    countryCode:"",
    phone:""
  })

  const handleSignup = async () => {
    try {
      const res = await api.post(`/users/signup`, user)
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
        [name]:value
    })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
   const response = await handleSignup()
   if(response){
    navigate('/login')
   }
  }

  return (
    <div>
      <h3>Signup</h3>
      <form action="POST" onSubmit={handleSubmit} className="w-full md:w-1/3 mx-auto">
      <Input
          name="fullName"
          className="mt-4"
          type="text"
          placeholder="FullName"
          onChange={handleChange}
        />
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
        <Input
          name="countryCode"
          className="mt-4"
          type="text"
          placeholder="CountryCode"
          onChange={handleChange}
        />
        <Input
          name="phone"
          className="mt-4"
          type="text"
          placeholder="Phone"
          onChange={handleChange}
        />
        <div className="flex justify-between flex-col">
          <Button className="mt-4">Signup</Button>
          <Button variant="link" className="mt-4">
            <Link to="/login"> Have an account already?</Link>
          </Button>
        </div>
      </form>
    </div>
  )
}
