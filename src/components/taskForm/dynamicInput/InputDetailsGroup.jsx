import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import DynamicInput from './DynamicInput';
import { TextAreaField } from '../../../ui/inputs';
import Button from '../../../ui/buttons/Button';
import buttonClasses from '../../../ui/buttons/Button.module.css';
import groupClasses from './InputDetailsGroup.module.css';
import classes from './InputDetailsGroup.module.css';

export default function InputDetailsGroup({ group, deleteInputGroup }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const { register } = useFormContext();

  const handleDeleteConfirm = () => {
    deleteInputGroup(group.key);
  }

  return (
    <fieldset className={classes.inner}>
      <legend>{group.label} input details</legend>

      <DynamicInput
        id={`${group.key}-value`}
        label={group.label}
        component={group.component}
        type={group.type}
        {...register(`taskInputs.${group.key}.value`, { required: true })}
      />

      <TextAreaField
        id={`${group.key}-selector`}
        label="HTML element"
        {...register(`taskInputs.${group.key}.selector`, { required: true })}
      />

      <div className={groupClasses['details-group-controls']}>
        <Button 
          variant="delete" 
          icon="delete" 
          className={buttonClasses['no-label']}
          onClick={() => setIsDeleting(!isDeleting)}
        />
        
        <div className={
          `${groupClasses['controls-confirm-dialog']} ${isDeleting ? groupClasses['is-deleting'] : ''}`
        }>
          <span>Delete input?</span>
          <div className={groupClasses['controls-confirm-options']}>
            <Button
              size="sm" 
              variant="confirm" 
              className={buttonClasses['no-icon']}
              onClick={handleDeleteConfirm}
            >
              Yes
            </Button>
            <Button
              size="sm"  
              variant="cancel" 
              className={buttonClasses['no-icon']} 
              onClick={() => setIsDeleting(false)}
            >
              No
            </Button>
          </div>
        </div>
      </div>
    </fieldset>
  );
}