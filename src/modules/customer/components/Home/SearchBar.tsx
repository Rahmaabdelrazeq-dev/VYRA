import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const value = query.trim();

    if (!value) {
      navigate("/collections");
      return;
    }

    navigate(`/collections?search=${value}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex w-full max-w-[720px] items-center gap-3 rounded-full border border-[#e6dfe7] bg-white px-6 py-3.5 text-sm text-[#4b2a53] shadow-[0_10px_22px_rgba(75,42,83,0.08)] lg:mx-auto"
    >
      <input
        type="search"
        value={query}
        onChange={(e) => {
          const value = e.target.value;
          setQuery(value);

          if (value.trim() === "") {
            navigate("/collections");
          }
        }}
        placeholder="Hey, what are you looking for?"
        className="w-full bg-transparent text-sm text-[#4b2a53] outline-none placeholder:text-[#4b2a53]/40"
      />

      <button type="submit" className="text-base">
        ⌕
      </button>
    </form>
  );
}