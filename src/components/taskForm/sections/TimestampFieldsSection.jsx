import { useFormContext } from "react-hook-form";
import { FormGroup } from "../../../ui/inputs";

export default function TimestampFieldsSection() {
  const { register } = useFormContext();

  return (
    <FormGroup>
      <input type="hidden" {...register('createdOn')} />
      <input type="hidden" {...register('changedOn')} />
    </FormGroup>
  )
}