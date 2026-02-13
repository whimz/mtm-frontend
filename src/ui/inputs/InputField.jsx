import { forwardRef } from "react";
import { useFormContext } from "react-hook-form";
import FormGroup from "./FormGroup";

const InputField = forwardRef(({ id, name, label, type = 'text', ...props }, ref) => {
  const { formState: {errors} } = useFormContext();
  const hasError = errors[name];
  return (
    <FormGroup>
      <label htmlFor={id}>{label}</label>
      <input 
        id={id}
        type={type}
        name={name}
        ref={ref}
        className={hasError ? 'error-highlight' : ''}
        {...props}
      />
      {hasError && <span className="error-message">{hasError.message || 'This field is required'}</span>}
    </FormGroup>
  )
});

InputField.displayName = 'InputField';
export default InputField;