import { forwardRef } from 'react';
import { InputField, TextAreaField } from '../../../ui/inputs';

const DynamicInput = forwardRef(({ id, label, type = 'text', component = 'input', ...props }, ref) => {
  if (component === 'textarea') {
    return (
      <TextAreaField
        id={id}
        label={label}
        ref={ref}
        {...props}
      />
    );
  }

  return (
    <InputField
      id={id}
      label={label}
      type={type}
      ref={ref}
      {...props}
    />
  );
});

DynamicInput.displayName = 'DynamicInput';

export default DynamicInput;