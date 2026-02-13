import { useFormContext } from "react-hook-form";
import { RadioField, FormGroup } from "../../../ui/inputs";
import classes from './RadioGroup.module.css';

export default function RadioGroup({ name = 'radioGroup' }) {
  const { register } = useFormContext();
  return (
    <FormGroup>
      <div className={classes.radioGroup}>
        <RadioField
          name={name}
          value="single"
          label="Single launch"
          {...register(name)}
        />
        <RadioField
          name={name}
          value="cron"
          label="Cron"
          {...register(name)}
        />
      </div>
    </FormGroup>
  )
}