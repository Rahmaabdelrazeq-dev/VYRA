import { createContext, useContext } from "react";

// Using 'import type' for strict TypeScript
export type WishlistContextType = {
  wishlistCount: number;
  wishlistItems: string[];
  toggleWishlist: (productId: string) => void;
};

export const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined,
);

// Hook to use the wishlist
export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
