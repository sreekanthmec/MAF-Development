import React from "react";

export const TextInput = ({ label, placeholder, value, onChange, type = "text" }) => {
  return (
    <div className="mb-6 w-full">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full h-14 border border-[#B1B1B1] px-4 bg-white text-base placeholder:text-[#b1b1b1] placeholder:text-lg focus:outline-none focus:border-[#FA403F]"
        style={{
          boxSizing: "border-box",
        }}
      />
    </div>
  );
};

export const SingleInput = ({ label, options, selected, onSelect }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="flex space-x-2">
        {options.map((option) => (
          <button
            key={option}
            className={`flex items-center justify-center h-[32px] w-[65px] border px-4 py-2 rounded-none ${
              selected === option
                ? "border-red-600 text-red-600"
                : "border-[#B1B1B1]"
            }`}
            style={{
              boxSizing: "border-box",
              flex: "none",
              order: 0,
              flexGrow: 0,
            }}
            onClick={() => onSelect(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export const Dropdown = ({
  label,
  placeholder,
  value,
  onClick,
  options,
  showDropdown,
  onSelect,
}) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onClick={onClick}
        readOnly
        className="block w-[320px] h-[48px] border border-[#B1B1B1] px-4 py-2 rounded-none cursor-pointer"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "16px",
          boxSizing: "border-box",
          flex: "none",
          order: 1,
          alignSelf: "stretch",
          flexGrow: 0,
        }}
      />
      {showDropdown && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end z-50">
          <div className="bg-white w-full rounded-t-lg p-4">
            <h3 className="text-lg font-bold text-gray-700 mb-2">
              Select Address Type
            </h3>
            {options.map((option) => (
              <div
                key={option}
                className={`py-3 px-4 border-t border-gray-200 cursor-pointer ${
                  value === option ? "border-red-500" : ""
                }`}
                onClick={() => onSelect(option)}
              >
                {option}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
