export default function ErrorDisplaySection({ errors, className = '' }) {
  if (!errors) return null;

  return (
    <div className={`error-section ${className}`}>
      <ul>
        {Object.values(errors).map((err, index) => (
          <li key={index}>{err}</li>
        ))}
      </ul>
    </div>
  )
}