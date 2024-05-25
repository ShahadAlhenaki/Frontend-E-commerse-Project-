import api from "@/api"
import { Stock } from "@/types"

export default {
  getAll: async () => {
    try {
      const res = await api.get("/stocks")
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  },
  createOne: async (stock: Stock) => {
    try {
      const res = await api.post("/stocks", stock)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  },
  deleteOne: async (id: string) => {
    try {
      const res = await api.delete(`/stocks/${id}`)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }
}
