import { icons } from './Icons';
import classes from './Button.module.css';
import { Link } from 'react-router-dom';

export default function Button({ 
  variant = 'default', 
  icon, 
  type = 'button', 
  onClick, 
  children,
  as, 
  to,
  disabled = false,
  size, // 'sm', 'lg'
  className: customClassName = '',
  ...rest
}) {
  const Element = as || 'button';
  
  const classNames = [
    classes.btn,
    classes[`btn-${variant}`],
    size && classes[`btn-${size}`],
    customClassName
  ].filter(Boolean).join(' ');

  const props = {
    className: classNames,
    onClick,
    disabled,
    ...rest
  };

  // Only add type for actual button elements
  if (Element === 'button') {
    props.type = type;
  }

  // Only add 'to' for Link components
  if (to) {
    props.to = to;
  }

  return (
    <Element {...props}>
      {icon && icons[icon]}
      {children && <span>{children}</span>}
    </Element>
  );
}