import React, { useState } from 'react';
import './FloatingLabelDropdown.css';

interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  label: string;
  options: DropdownOption[];
  required?: boolean;
  onChange: (value: string) => void;
  readOnly?: boolean; // Add readOnly prop
}

const Dropdown: React.FC<FloatingLabelDropdownProps> = ({ label, options, onChange, required, readOnly }) => {
  const [selectedValue, setSelectedValue] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedValue(value);
    onChange(value);
  };

  return (
    <div className="dropdown">
      <label htmlFor="game-select" className={`label ${selectedValue && 'filled'}`}>{label}</label>
      <select
        id="game-select"
        value={selectedValue}
        onChange={handleChange}
        disabled={readOnly} // Apply readOnly as disabled
      >
        <option value=""> </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
