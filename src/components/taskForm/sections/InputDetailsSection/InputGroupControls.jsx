import Button from '../../../../ui/buttons/Button';

export default function InputGroupControls({ onCancel, onConfirm }) {
  return (
    <div className="input-builder-menu">
      <Button variant="cancel" icon="cancel" onClick={onCancel}>
        Cancel
      </Button>
      <Button variant="confirm" icon="confirm" onClick={onConfirm}>
        Confirm
      </Button>
    </div>
  );
}