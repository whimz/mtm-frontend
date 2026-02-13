import InputDetailsGroup from '../../dynamicInput/InputDetailsGroup';

export default function InputGroupList({ inputGroups, deleteInputGroup }) {
  return (
    <>
      {inputGroups.map((group) => (
        <InputDetailsGroup 
          key={group.key} 
          group={group}
          deleteInputGroup={deleteInputGroup}
        />
      ))}
    </>
  );
}