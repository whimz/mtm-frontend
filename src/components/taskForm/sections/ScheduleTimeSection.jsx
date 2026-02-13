import { useFormContext } from "react-hook-form";
import { DateTimeField, CronExpressionField, FormGroup } from "../../../ui/inputs";
import RadioGroup from "../dynamicInput/RadioGroup";

export default function ScheduleTimeSection() {
  const{ watch, register } = useFormContext();
  const scheduleType = watch('scheduleType');
  
  return (
    <FormGroup>
      <fieldset>
        <legend>Schedule Type</legend>
        <RadioGroup name="scheduleType" />

        {scheduleType === 'single' && (
          <DateTimeField 
            id="scheduleTime" 
            label="Form sumbission date and time"
            {...register('scheduleTime', { required: scheduleType === 'single' })}
          />
        )}
        
        {scheduleType === 'cron' && (
          <CronExpressionField 
            id="cronExpression"
            label="Cron Expression"
            {...register('cronExpression', { required: scheduleType === 'cron' })}
          />
          
        )}
        
      </fieldset>
    </FormGroup>
  )
}