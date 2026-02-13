import { forwardRef } from "react";

const RadioField = forwardRef(({ 
  type = 'radio', 
  name = 'radioField',
  value = '',
  label = 'Radio Button',
  ...props
}, ref) => {
  const id = `${name}-${value}`;

  return (
    <label htmlFor={id}>
      <input
        id={id}
        type={type}
        name={name}
        value={value}
        ref={ref}
        {...props}
      />
      <span>{label}</span>
    </label>
  )
});

RadioField.displayName = 'RadioField';

export default RadioField;