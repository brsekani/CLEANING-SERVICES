import { CiSearch } from 'react-icons/ci';

const SearchBar = () => {
  return (
    <div className="flex justify-end items-center gap-5 mt-5 -mb-5 ">
      <div className="flex items-center gap-3 w-full bg-[#FBFADB] h-[56px] rounded-lg px-4">
        <CiSearch className="stroke-1 text-[#ADBC9F] text-xl" />
        <input
          type="text"
          placeholder="Search..."
          className="py-2 w-full outline-none bg-transparent placeholder:text-[#ADBC9F]"
        />
      </div>

      <button className="bg-[#12362A] text-white w-[103px] h-[56px] rounded-lg">
        Search
      </button>
    </div>
  );
};

export default SearchBar;
