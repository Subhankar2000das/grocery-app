"use client";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar = ({ value, onChange }: Props) => {
  return (
    <div className="w-full">
      <label
        htmlFor="search"
        className="mb-2 block text-sm font-medium text-slate-700"
      >
        Search Grocery Items
      </label>

      <input
        id="search"
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search fruits, veggies, groceries..."
        className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-800 outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-100"
      />
    </div>
  );
};

export default SearchBar;