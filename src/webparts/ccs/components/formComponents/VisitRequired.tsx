import * as React from 'react';
import { ChoiceGroup, IChoiceGroupOption } from 'office-ui-fabric-react/lib/ChoiceGroup';

const VisitRequired = (props:any) => {

  // props.visitValue
  // props.visitHandler

  const options: IChoiceGroupOption[] = [
    { key: 'Yes', text: 'Yes', iconProps: { iconName: 'Car' } },
    { key: 'No', text: 'No', iconProps: { iconName: 'Telemarketer' } }
  ];

  return (
    <React.Fragment>
      <ChoiceGroup 
        defaultSelectedKey={props.visitValue} 
        options={options} 
        onChange={(ev, option) => props.visitHandler(option.key)} 
        label={props.heading} 
        required
      />
    </React.Fragment>
    );
  };
  
  export default VisitRequired;