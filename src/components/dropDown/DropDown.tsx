import { Option, OptionItem } from "@/types/api";
import React, { useEffect, useState } from "react";

type DropDownProps = {
  title?: string;
  isLoading?: boolean;
  option?: Array<Option | OptionItem>;
  onChange?: (option: Option) => void;
};
const DropDown: React.FC<DropDownProps> = ({ option, title, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | OptionItem>({
    id: 0,
    value: "",
    title: "",
    diskon: 0,
    harga: 0,
  });

  useEffect(() => {
    if (option && option.length > 0) {
      setSelectedOption(option[0]);
    }
  }, [option]);

  return (
    <div>
      <label
        id="listbox-label"
        className="font-semibold text-sm text-gray-600 pb-1 block"
      >
        {title}
      </label>

      <div className="relative mt-2">
        <button
          type="button"
          className="grid w-full cursor-default grid-cols-1 rounded-md bg-white py-1.5 pr-2 pl-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          aria-haspopup="listbox"
          aria-expanded="true"
          aria-labelledby="listbox-label"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
            <span className="block truncate">{selectedOption.title ?? ""}</span>
          </span>
          <svg
            className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
            viewBox="0 0 16 16"
            fill="currentColor"
            aria-hidden="true"
            data-slot="icon"
          >
            <path
              fillRule="evenodd"
              d="M5.22 10.22a.75.75 0 0 1 1.06 0L8 11.94l1.72-1.72a.75.75 0 1 1 1.06 1.06l-2.25 2.25a.75.75 0 0 1-1.06 0l-2.25-2.25a.75.75 0 0 1 0-1.06ZM10.78 5.78a.75.75 0 0 1-1.06 0L8 4.06 6.28 5.78a.75.75 0 0 1-1.06-1.06l2.25-2.25a.75.75 0 0 1 1.06 0l2.25 2.25a.75.75 0 0 1 0 1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {isOpen && (
          <ul
            className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-hidden sm:text-sm"
            tabIndex={-1}
            role="listbox"
            aria-labelledby="listbox-label"
            aria-activedescendant="listbox-option-3"
          >
            {option?.map((item, index) => (
              <li
                key={index}
                className="relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none hover:bg-indigo-600 hover:text-white focus:bg-indigo-600 focus:text-white"
                id="listbox-option-0"
                role="option"
                onClick={() => {
                  setSelectedOption(item);
                  onChange?.(item);
                  setIsOpen(false);
                }}
              >
                <div className="flex items-center">
                  <span className="ml-3 block truncate font-normal">
                    {item.title}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DropDown;
