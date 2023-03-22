import { checkbox } from "@keystone-6/core/fields";

export const permissionFields = {
  canManageProducts: checkbox({
    defaultValue: false,
    label: "User can update, delete and manage products",
  }),
  canSeeOtherUsers: checkbox({
    defaultValue: false,
    label: "User can see and query other users",
  }),
  canManageUsers: checkbox({
    defaultValue: false,
    label: "User can update, delete and manage other users",
  }),
  canManageRoles: checkbox({
    defaultValue: false,
    label: "User can create, update, delete roles",
  }),
  canManageCart: checkbox({
    defaultValue: false,
    label: "User can see and manage cart",
  }),
  canManageOrders: checkbox({
    defaultValue: false,
    label: "User can see and manage orders",
  }),
}

export type Permissions = keyof typeof permissionFields;

export const permissionList: Permissions[] = Object.keys(
  permissionFields
) as Permissions[];