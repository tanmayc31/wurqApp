import { types } from "mobx-state-tree"

export const UserModel = types.model("UserModel", {
  id: types.identifier,
  name: types.string,
  age: types.number,
  feesPaid: types.number,
})

export type User = typeof UserModel.Type
