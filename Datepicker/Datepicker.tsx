import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Datepicker.css';

interface DatepickerProps {
  label: string;
  selectedDate: Date | null;
  onDateChange: (date: Date | null) => void;
  required?: boolean;
  showTimeSelect?: boolean;
}

const Datepicker: React.FC<DatepickerProps> = ({ label, selectedDate, onDateChange, required, showTimeSelect }) => {
  const handleDateChange = (date: Date | null) => {
    onDateChange(date);
  };

  return (
    <div className="datepicker-container">
      <DatePicker
        id="datepicker"
        selected={selectedDate}
        onChange={handleDateChange}
        className="datepicker-input"
        required={required}
        showTimeSelect={showTimeSelect}
        timeFormat="HH:mm"
        dateFormat={showTimeSelect ? "yyyy-MM-dd HH:mm" : "yyyy-MM-dd"}
      />
      <label htmlFor="datepicker" className={`floating-label ${selectedDate ? 'filled' : ''}`}>
        {label}
      </label>
    </div>
  );
};

export default Datepicker;
