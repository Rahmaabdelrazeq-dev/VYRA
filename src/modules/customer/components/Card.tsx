import { Heart, ShoppingCart } from "lucide-react";
import { useCart } from "../../../store/cart";
import { useWishlist } from "../../../store/wishlist-context";
import { toast } from "sonner";
import type { Product } from "../types/Product";
import { useNavigate } from "react-router-dom";

type Props = {
  product: Product;
};

export default function Card({ product }: Props) {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const { wishlistItems, toggleWishlist } = useWishlist();

  const isFav = wishlistItems.includes(product.id);
  const isOutOfStock = (product.stock ?? 0) <= 0;

  const formattedPrice = Number(product.price || 0).toFixed(2);

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className={`group relative rounded-2xl overflow-hidden
        border border-[#e7dfe9] shadow-sm
        bg-white hover:bg-[#f0e8f4]
        hover:shadow-xl hover:border-[#c9afd4]
        transition-all duration-500
        hover:-translate-y-1 cursor-pointer
        ${isOutOfStock ? "opacity-70" : ""}`}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden h-[300px] bg-[#f9f5fb] group-hover:bg-[#ecdff2] flex items-center justify-center p-4 transition-colors duration-500">
        <img
          src={product.image}
          alt={product.title}
          className="max-h-full max-w-full object-contain
          group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
            if (!isFav) {
              toast.success("Added to Wishlist", {
                description: `${product.title} saved to your collection.`,
              });
            }
          }}
          className={`absolute top-3 right-3 z-20
            w-9 h-9 rounded-full flex items-center justify-center
            backdrop-blur-sm transition-all duration-300 shadow-md
            ${isFav ? "bg-[#4b2a53] text-white scale-110" : "bg-white/80 text-[#4b2a53] hover:bg-white"}`}
        >
          <Heart size={16} fill={isFav ? "currentColor" : "none"} />
        </button>

        {isOutOfStock && (
          <div className="absolute top-3 left-3 z-20 bg-white/90 backdrop-blur-sm px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-red-500 rounded-full">
            Out of Stock
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] uppercase tracking-widest text-[#4b2a53]/50 font-medium">
            {product.category ?? "Fragrance"}
          </span>
          <span
            className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
              isOutOfStock
                ? "bg-red-50 text-red-400"
                : "bg-emerald-50 text-emerald-600"
            }`}
          >
            {isOutOfStock ? "Sold out" : `${product.stock} in stock`}
          </span>
        </div>

        <h3 className="text-sm font-semibold text-[#2f1d17] group-hover:text-[#4b2a53] transition-colors duration-300 line-clamp-1">
          {product.title}
        </h3>

        <div className="flex items-center justify-between mt-4 gap-3">
          <span className="text-lg font-bold text-[#4b2a53]">
            ${formattedPrice}
          </span>

          <button
            disabled={isOutOfStock}
            onClick={(e) => {
              e.stopPropagation();
              addToCart({
                id: product.id,
                name: product.title, // Mapping title to name if your store expects 'name'
                price: Number(product.price),
                image: product.image,
                stock: product.stock,
              });
              toast.success("Added to Cart", {
                description: `${product.title} added to your bag.`,
              });
            }}
            className={`flex items-center gap-1.5 px-4 py-2 text-[11px] font-semibold uppercase tracking-widest rounded-full transition-all duration-300
              ${
                isOutOfStock
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-[#4b2a53] text-white hover:bg-[#3a2040] shadow-sm"
              }`}
          >
            <ShoppingCart size={13} />
            {isOutOfStock ? "Sold Out" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
