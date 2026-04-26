import { useState } from "react";
import type { ReactNode } from "react";
import { WishlistContext } from "./wishlist-context";

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlistItems, setWishlistItems] = useState<string[]>([]);

  const toggleWishlist = (productId: string) => {
    setWishlistItems((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId],
    );
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistCount: wishlistItems.length,
        wishlistItems,
        toggleWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
