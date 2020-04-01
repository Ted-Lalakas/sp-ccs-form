import * as React from 'react';
import { ChoiceGroup, IChoiceGroupOption } from 'office-ui-fabric-react/lib/ChoiceGroup';

const StaffRequired = (props:any) => {

  // props.staffValue

  const options: IChoiceGroupOption[] = [
    { key: 'Yes', text: 'Yes', iconProps: { iconName: 'Group' } },
    { key: 'No', text: 'No', iconProps: { iconName: 'BlockContact' } }
  ];

  return (
    <React.Fragment>
      <ChoiceGroup 
        selectedKey={props.value} 
        options={options} 
        onChange={(ev, option) => props.changeHandler(option.key)} 
        label={props.heading} 
        required
      />
    </React.Fragment>
    );
  };
  
  export default StaffRequired;