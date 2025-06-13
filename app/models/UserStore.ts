import { flow, types } from "mobx-state-tree"
import axios from "axios"
import { UserModel } from "./User"

// Define the UserStore model with proper MST structure
export const UserStore = types
  .model("UserStore", {
    users: types.array(UserModel),
    isLoading: types.optional(types.boolean, false),
    error: types.optional(types.string, ""),
  })
  .actions((self) => ({
    setLoading(loading: boolean) {
      self.isLoading = loading
    },
    setError(error: string) {
      self.error = error
    },
  }))
  .actions((self) => ({
    fetchUsers: flow(function* () {
      self.setLoading(true)
      self.setError("")
      
      try {
        const response = yield axios.get("http://192.168.1.41:3000/")

        // Transform the API response to match the UserModel
        const formattedUsers = response.data.map((entry: any) => ({
          id: String(entry.id),
          name: `${entry.user.name} ${entry.user.lastname}`,
          age: entry.user.age,
          feesPaid: entry.user.fee,
        }))

        self.users.replace(formattedUsers)
        console.log("Fetched users:", formattedUsers)
      } catch (err) {
        console.error("Failed to fetch users:", err)
        self.setError("Failed to fetch users")
      } finally {
        self.setLoading(false)
      }
    }),
  }))
  .views((self) => ({
    // Get valid users (age >= 0)
    get validUsers() {
      return self.users.filter((user) => user.age >= 0)
    },
  }))
  .views((self) => ({
    get totalFees(): number {
      return self.validUsers.reduce((sum: number, user) => sum + user.feesPaid, 0)
    },
    
    // Get users categorized by age for color coding
    get usersByAgeCategory() {
      return self.validUsers.map((user) => ({
        ...user,
        ageCategory: user.age < 30 ? 'gray' : user.age <= 50 ? 'red' : 'blue'
      }))
    },
  }))
