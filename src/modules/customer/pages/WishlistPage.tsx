import { useEffect, useState } from "react";
import { useWishlist } from "../../../store/wishlist-context";
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";
import type { Product } from "../types/Product";

export default function WishlistPage() {
  const { wishlistItems, wishlistCount } = useWishlist();
  const navigate = useNavigate();

  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const API_URL = "https://690e4923bd0fefc30a040b18.mockapi.io/Perfume";

    fetch(API_URL)
      .then((res) => res.json())
      // 3. Replace 'any[]' with 'Product[]' or a specific shape to fix "Unexpected any"
      .then((data: Array<Partial<Product> & { id: string }>) => {
        const filtered = data
          .map((item) => ({
            id: item.id,
            title: item.title ?? "Unknown Perfume",
            // Ensure types match the master Product definition
            price: Number(item.price ?? 0),
            image: item.image ?? "",
            category: item.category ?? "Fragrance",
            stock: Number(item.stock ?? 0),
            // 4. ADD the missing description field to satisfy the Type requirement
            description: item.description ?? "",
          }))
          .filter((product) => wishlistItems.includes(product.id));

        // Now TypeScript is happy because the shapes match exactly
        setFavoriteProducts(filtered as Product[]);
      })
      .catch((err) => console.error("Wishlist Error:", err))
      .finally(() => setLoading(false));
  }, [wishlistItems]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-[10px] tracking-[0.4em] text-[#4b2a53] uppercase animate-pulse">
          Retrieving your collection...
        </p>
      </div>
    );
  }

  if (wishlistCount === 0) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
        <h1 className="text-4xl font-extralight tracking-[0.3em] text-[#4b2a53] uppercase mb-4">
          Empty Gallery
        </h1>
        <p className="max-w-xs text-[11px] leading-relaxed tracking-widest text-[#2f1d17]/50 uppercase mb-10">
          Your curated selection of fragrances is currently empty.
        </p>
        <button
          onClick={() => navigate("/")}
          className="border border-[#4b2a53] px-10 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-[#4b2a53] transition-all hover:bg-[#4b2a53] hover:text-white"
        >
          Return to Boutique
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1400px] px-6 py-16 lg:px-12">
      <header className="mb-20 text-center">
        <h1 className="text-4xl font-light tracking-[0.15em] text-[#2f1d17] uppercase">
          Your Wishlist
        </h1>
        <p className="mt-4 text-[10px] font-medium uppercase tracking-[0.2em] text-[#4b2a53]/60">
          {wishlistCount} {wishlistCount === 1 ? "Item" : "Items"} Saved
        </p>
      </header>

      <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {favoriteProducts.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
