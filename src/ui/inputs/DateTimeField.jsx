import { forwardRef } from "react";
import FormGroup from "./FormGroup";
import { setMinDateTime } from "../../util/helpers";

const DateTimeField = forwardRef(({ id, name, label, ...props} , ref) => {
  return (
    <FormGroup>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type="datetime-local"
        name={name}
        min={setMinDateTime()}
        ref={ref}
        {...props}
      />
    </FormGroup>
  )
});

DateTimeField.displayName = 'DateTimeField';
export default DateTimeField;