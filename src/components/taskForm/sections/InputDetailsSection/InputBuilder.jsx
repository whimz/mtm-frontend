import Button from '../../../../ui/buttons/Button';
import './index.css';

export default function InputBuilder({ isAdding, onToggleAdd, children }) {
  return (
    <div className="input-builder-nav">
      <Button variant="edit" onClick={onToggleAdd}>
        + Add Input
      </Button>
      {isAdding && <div className="input-builder-options">{children}</div>}
    </div>
  );
}