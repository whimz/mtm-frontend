import { useState, useMemo } from "react";
import { useFormContext } from 'react-hook-form';

export const INPUT_DEFINITIONS = {
  text: {
    name: 'text',
    label: 'Text',
    component: 'input',
    type: 'text',
  },
  name: {
    name: 'name',
    label: 'Name',
    component: 'input',
    type: 'text',
  },
  email: {
    name: 'email',
    label: 'Email',
    component: 'input',
    type: 'email',
  },
  tel: {
    name: 'tel',
    label: 'Phone',
    component: 'input',
    type: 'tel',
  },
  url: {
    name: 'url',
    label: 'URL',
    component: 'input',
    type: 'url',
  },
  socials: {
    name: 'text',
    label: 'Socials',
    component: 'input',
    type: 'text',
  },
  message: {
    name: 'message',
    label: 'Message',
    component: 'textarea',
    type: 'textarea',
  },
};

// Helper function to get type from key
function getTypeFromKey(key) {
  // Extract type from key like "email-123456" -> "email"
  const type = key.split('-')[0];
  return INPUT_DEFINITIONS[type] ? type : 'text';
}

export default function useInputGroupsSimplified() {
  const { watch, setValue, getValues } = useFormContext();
  
  // Pure UI state (no form data)
  const [selectedType, setSelectedType] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  
  // Get form data (single source of truth)
  const taskInputs = watch('taskInputs') || {};
  
  // Derive input groups from RHF data
  const inputGroups = useMemo(() => {
    return Object.entries(taskInputs).map(([key, data]) => {
      const typeKey = getTypeFromKey(key);
      const definition = INPUT_DEFINITIONS[typeKey];
      
      return {
        key,
        typeKey,
        label: definition?.label || typeKey.charAt(0).toUpperCase() + typeKey.slice(1),
        component: definition?.component || 'input',
        type: definition?.type || 'text',
      };
    });
  }, [taskInputs]);
  
  // Derive available types from current groups
  const availableTypes = useMemo(() => {
    const usedTypes = inputGroups.map(group => group.typeKey);
    return Object.entries(INPUT_DEFINITIONS).filter(
      ([typeKey]) => !usedTypes.includes(typeKey)
    );
  }, [inputGroups]);
  
  // Add input group (only touches RHF)
  const addInputGroup = () => {
    if (!selectedType) return;
    
    const newKey = `${selectedType}-${Date.now()}`;
    const currentInputs = getValues('taskInputs');
    
    setValue('taskInputs', {
      ...currentInputs,
      [newKey]: { value: '', selector: '' }
    });
    
    // Reset UI state
    setSelectedType('');
    setIsAdding(false);
  };
  
  // Delete input group (only touches RHF)
  const deleteInputGroup = (groupKey) => {
    const currentInputs = getValues('taskInputs');
    const { [groupKey]: removed, ...remaining } = currentInputs;
    setValue('taskInputs', remaining);
  };
  
  return {
    inputGroups,
    selectedType,
    setSelectedType,
    isAdding,
    setIsAdding,
    addInputGroup,
    deleteInputGroup,
    availableTypes,
  };
}

