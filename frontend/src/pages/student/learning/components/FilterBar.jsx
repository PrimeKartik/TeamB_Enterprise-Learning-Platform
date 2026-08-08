export default function FilterBar({

  search,

  setSearch,

}) {

  return (

    <input

      value={search}

      onChange={(e) =>

        setSearch(e.target.value)

      }

      placeholder="Search courses..."

      className="w-full rounded-xl border border-white/10 bg-[#201233] px-4 py-3 text-white placeholder-gray-500 outline-none transition focus:border-[#EC4899]"

    />

  );

}