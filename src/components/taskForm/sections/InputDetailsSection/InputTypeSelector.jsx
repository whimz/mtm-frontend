import './index.css'

export default function InputTypeSelector({ options, selected, onChange }) {
  return (
    <select
      name="inputTypeSelect"
      value={selected}
      onChange={(e) => onChange(e.target.value)}
      className='input-builder-select'
    >
      <option value="">Select type</option>
      {options.map(([value, { label }]) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
}