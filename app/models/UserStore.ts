import { flow, types } from "mobx-state-tree"
import axios from "axios"
import { UserModel } from "./User"



// 2. Define the UserStore model
export const UserStore = types
  .model("UserStore", {
    users: types.array(UserModel),
  })
  .actions((self) => ({
    fetchUsers: flow(function* () {
      try {
        const response = yield axios.get("http://192.168.24.26:3000/")

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
      }
    }),
  }))
  .views((self) => ({
    get totalFees() {
      return self.users.reduce((sum, user) => sum + user.feesPaid, 0)
    },
  }))
