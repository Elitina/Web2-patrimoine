import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function CustomDatePicker({ selectedDate, onDateChange }) {
  return (
    <DatePicker
      selected={selectedDate}
      onChange={onDateChange}
      dateFormat="yyyy-MM-dd"
      className="CustomDatePicker"
    />
  );
}

export default CustomDatePicker;
