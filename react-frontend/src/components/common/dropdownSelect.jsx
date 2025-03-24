import { ChevronDown, Search } from "lucide-react";
import { useState, useEffect } from "react";
import InputIcon from "./InputIcon";

function DropdownSelect({ label, name, value, fetchData, handleChange }) {
  const [options, setOptions] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchData();
        
        if (!Array.isArray(data)) {
          throw new Error("fetchData no retornó un array válido");
        }
  
        setOptions(data);
        setFilteredOptions(data);
        const defaultOption = data.find(opt => opt.id === value) || null;
        setSelected(defaultOption);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
  }, [value]);

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
    setSearchTerm("");
    setFilteredOptions(options); 
    handleChange({ target: { name, value: option.id } });
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    const filtered = options.filter(option =>
      option.label.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredOptions(filtered);
  };

  return (
    <div className="relative w-full h-full px-(--spacing-xl) py-(--spacing-md)">
      <button
        type="button"
        className="w-full h-full border-gray-300 bg-[#F2F4F7] text-[#344054] rounded-md  focus:border-[#119395] flex justify-between items-center text-left hover:bg-[#F2F4F7] ocus:outline-none focus:ring-2 focus:ring-[#119395]"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="truncate">{selected ? selected.label : label}</span>
        <ChevronDown
          className={`w-5 h-5 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-100">
          <div className="p-2">
            <InputIcon 
              icon={Search}
              placeholder="Buscar..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div className="max-h-48 overflow-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map(option => (
                <div
                  key={option.id}
                  className="cursor-pointer select-none py-2 px-4 hover:bg-indigo-100 hover:text-indigo-900"
                  onClick={() => handleSelect(option)}
                >
                  {option.label}
                </div>
              ))
            ) : (
              <div className="py-2 px-4 text-gray-500 text-md text-center">No hay resultados</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default DropdownSelect;
