import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays, isThursday } from "date-fns";

const BookingDatePicker = (props) => {
  const today = new Date();
  const minDate = addDays(today, 14); // Minimum date is 2 weeks in advance
  const maxDate = addDays(minDate, 6); // Maximum date is 1 week from minDate

  // Filter function to show only Thursdays
  const filterThursday = (date) => isThursday(date);

  return (
    <DatePicker
      selected={props.selectedDate}
      onChange={props.handleDateChange}
      minDate={minDate}
      maxDate={maxDate}
      filterDate={filterThursday}
      dateFormat="yyyy/MM/dd"
      placeholderText="Select a Thursday within 2 weeks"
    />
  );
}

export default BookingDatePicker;