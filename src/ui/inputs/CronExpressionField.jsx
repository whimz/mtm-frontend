import { forwardRef, useState } from "react";
import { useFormContext, Controller } from 'react-hook-form';
import { Cron } from 'react-js-cron';
import FormGroup from "./FormGroup";
import Button from "../buttons/Button";
import './CronExpressionField.css';

const CronExpressionField = forwardRef(({ id, label, ...props }, ref) => {
  const { control, formState: { errors } } = useFormContext();
  const [showTextInput, setShowTextInput] = useState(false);   
  
  const fieldError = errors.cronExpression;

  return (
    <FormGroup>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
        <label htmlFor={id}>{label}</label>
        <Button
          type="button"
          variant="edit"
          icon="edit"
          onClick={() => setShowTextInput(!showTextInput)}
        >
          {showTextInput ? 'Visual Editor' : 'Text Editor'}
        </Button>
      </div>

      <Controller
        name="cronExpression"
        control={control}
        rules={{ 
          required: 'Cron expression is required',
          validate: (value) => {
            const cronParts = value?.trim().split(/\s+/);
            if (!cronParts || cronParts.length !== 5) {
              return 'Invalid cron expression format';
            }
            return true;
          }
        }}
        render={({ field }) => (
          <div>
            {showTextInput ? (
              <input
                id={id}
                type="text"
                value={field.value || ''}
                onChange={field.onChange}
                onBlur={field.onBlur}
                placeholder="0 9 * * 1 (minute hour day month weekday)"
                style={{
                  width: '100%',
                  padding: '8px',
                  border: fieldError ? '2px solid #ef4444' : '1px solid #ccc',
                  borderRadius: '4px',
                  fontFamily: 'monospace'
                }}
                ref={ref}
                {...props}
              />
            ) : (
              <div style={{ 
                border: fieldError ? '2px solid #ef4444' : '1px solid #ccc',
                borderRadius: '4px',
                padding: '12px',
                backgroundColor: '#fff'
              }}>
                <Cron
                  value={field.value || '0 9 * * 1'}
                  setValue={field.onChange}
                  clearButton={true}
                  displayError={true}
                  allowedDropdowns={['period', 'months', 'month-days', 'week-days', 'hours', 'minutes']}
                  allowedPeriods={['year', 'month', 'week', 'day', 'hour']}
                  clockFormat="24-hour-clock"
                  leadingZero={true}
                />
              </div>
            )}
            
            {fieldError && (
              <span style={{ color: '#ef4444', fontSize: '14px', marginTop: '4px', display: 'block' }}>
                {fieldError.message}
              </span>
            )}
            
            {!showTextInput && (
              <div style={{ fontSize: '12px', color: '#666', marginTop: '8px' }}>
                Current expression: <code>{field.value || '0 9 * * 1'}</code>
              </div>
            )}
          </div>
        )}
      />
    </FormGroup>
  );
});

CronExpressionField.displayName = 'CronExpressionField';

export default CronExpressionField;