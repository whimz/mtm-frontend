import InputGroupList from './InputGroupList';
import InputBuilder from './InputBuilder';
import InputTypeSelector from './InputTypeSelector';
import InputGroupControls from './InputGroupControls';
import { FormGroup } from '../../../../ui/inputs';
import useInputGroups from '../../../../hooks/useInputGroups';

export default function InputDetailsSection() {
  const {
    inputGroups,
    selectedType,
    setSelectedType,
    isAdding,
    setIsAdding,
    addInputGroup,
    deleteInputGroup,
    availableTypes,
  } = useInputGroups();

  return (
    <FormGroup>
      <fieldset className="inputDetails">
        <legend>Form data</legend>
        <div className="input-builder">
          <InputGroupList 
            inputGroups={inputGroups} 
            deleteInputGroup={deleteInputGroup}
          />
          <InputBuilder isAdding={isAdding} onToggleAdd={() => setIsAdding(!isAdding)}>
            <InputTypeSelector
              options={availableTypes}
              selected={selectedType}
              onChange={setSelectedType}
            />
            <InputGroupControls 
              onCancel={() => setIsAdding(false)} 
              onConfirm={addInputGroup} 
            />
          </InputBuilder>
        </div>
      </fieldset>
    </FormGroup>
  );
}

