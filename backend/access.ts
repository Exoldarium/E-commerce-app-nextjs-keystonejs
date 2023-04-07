import { ListAccessArgs } from "./types";


export function isSignedIn({ session }: ListAccessArgs) {
  return !!session;
}

// permissions require the value to be set to true or false, here we convert our value to boolean, they are set to false by default
export const permissions = {
  canManageProducts: ({ session }: ListAccessArgs) => !!session?.data?.role?.canManageProducts,
  canSeeOtherUsers: ({ session }: ListAccessArgs) => !!session?.data?.role?.canSeeOtherUsers,
  canManageUsers: ({ session }: ListAccessArgs) => !!session?.data?.role?.canManageUsers,
  canManageRoles: ({ session }: ListAccessArgs) => !!session?.data?.role?.canManageRoles,
  canManageCart: ({ session }: ListAccessArgs) => !!session?.data?.role?.canManageCart,
  canManageOrders: ({ session }: ListAccessArgs) => !!session?.data?.role?.canManageOrders,
};

export const rules = {
  canManageProducts: ({ session }: ListAccessArgs) => {
    // the user has to be signed in
    if (!isSignedIn({ session })) {
      return false;
    }
    // only allow product updates if the user has canManageProducts permission
    if (permissions.canManageProducts({ session })) {
      return true;
    }
    // the user can only update products they created
    return { user: { id: { equals: session?.itemId } } }
  },
  canOrder: ({ session }: ListAccessArgs) => {
    if (!isSignedIn({ session })) {
      return false;
    }
    // they can manage all orders and cart items if they are an admin
    if (permissions.canManageCart({ session })) {
      return true;
    }
    // else they can only manage their own items
    return { user: { id: { equals: session?.itemId } } }
  },
  canManageOrderItems: ({ session }: ListAccessArgs) => {
    if (!isSignedIn({ session })) {
      return false;
    }
    if (permissions.canManageCart({ session })) {
      return true;
    }
    return { order: { user: { id: { equals: session?.itemId } } } }
  },
  canQueryProducts: ({ session }: ListAccessArgs) => {
    // everyone can see available products
    if (!isSignedIn({ session })) {
      return { status: { equals: 'AVAILABLE' } };
    }
    // only admin can see eveything
    if (permissions.canManageProducts({ session })) {
      return true;
    }
    // users that are signed in can see the products they own regardless of it's status
    if (isSignedIn({ session })) {
      return { user: { id: { equals: session?.itemId } } } || { status: { equals: 'AVAILABLE' } };
    }
  },
  canManageUsers: ({ session }: ListAccessArgs) => {
    if (!isSignedIn({ session })) {
      return false;
    }
    // only admin can update all users
    if (permissions.canManageUsers({ session })) {
      return true;
    }
    // everyone else can only update themselves
    return { id: { equals: session?.itemId } };
  },
  canSeeOtherUsers: ({ session }: ListAccessArgs) => {
    if (!isSignedIn({ session })) {
      return false;
    }
    if (permissions.canSeeOtherUsers({ session })) {
      return true;
    }
    return { id: { equals: session?.itemId } };
  },
}