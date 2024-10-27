import React, { useState } from 'react';
import './FloatingLabelDropdown.css';

interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  label: string;
  options: DropdownOption[];
  field:any;
  form:any;
  readOnly?: boolean; // Add readOnly prop
}

const Dropdown: React.FC<FloatingLabelDropdownProps> = ({ label, options, firld,form, readOnly }) => {

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    form.setFieldValue(field.name,e.targ3t.value)
  };

  return (
    <div className="dropdown">
      <label htmlFor={field.name} className={`label ${field.value && 'filled'}`}>{label}</label>
      <select
        id={field.name}
        {...field}
        onChange={handleChange}
        disabled={readOnly} // Apply readOnly as disabled
      >
        <option value="" disabled hidden> </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
