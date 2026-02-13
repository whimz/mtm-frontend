import FormGroup from "./FormGroup";
import { forwardRef } from "react";
import { useFormContext } from "react-hook-form";

const TextAreaField = forwardRef(({ id, name, label, rows = 3, ...props }, ref) => {
  const { formState: { errors } } = useFormContext();
  const hasError = errors[name];
  return (
    <FormGroup>
      <label htmlFor={id}>{label}</label>
      <textarea
        id={id}
        name={name}
        rows={rows}
        label={label}
        ref={ref}
        className={hasError ? 'error' : ''}
        {...props}
      />
      {hasError && <span className="error-message">{hasError.message || 'This field is required'}</span>}
    </FormGroup>
  )
});

TextAreaField.displayName = 'TextAreaField';
export default TextAreaField;

