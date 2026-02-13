import { useFormContext } from 'react-hook-form';
import classes from './ActionsSection.module.css';
import Button from '../../../ui/buttons/Button';

export default function ActionsSection({ onCancel }) {
  const { formState: { isSubmitting } } = useFormContext();

  return (
    <div className={classes.actions}>
      <Button 
        variant="cancel" 
        icon="cancel" 
        onClick={onCancel}
      >
        Cancel
      </Button>
      <Button 
        variant="confirm" 
        icon="confirm" 
        type="submit" 
        disabled={isSubmitting} 
        className={classes['save-button']}
      >
        {isSubmitting ? 'Submitting' : 'Save'}
      </Button>
    </div>
  );
}