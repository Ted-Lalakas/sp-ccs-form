import * as React from 'react';
import { Dropdown, DropdownMenuItemType, IDropdownStyles, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';

const dropdownStyles: Partial<IDropdownStyles> = {
  // dropdown: { width: 300 }
};

const OptionDropDown = (props:any) => {
  let formatterArr: IDropdownOption[] = [];

  if(props.subjectValue) {
    let filteredArray = props.callSubjectArray.filter(val => val.subject == props.subjectValue);

    filteredArray.forEach( val => {
      formatterArr.push({
        key: val.option,
        text: val.option
      });
     });

    formatterArr.unshift( {
      key: filteredArray[0].subject,
      text: filteredArray[0].subject,
      itemType: DropdownMenuItemType.Header
    });
  }

  return (
    <Dropdown 
      required
      label={props.heading}
      placeholder={props.placeholderText}
      options={formatterArr} 
      styles={dropdownStyles}
      onChange={(ev, option) => props.changeHandler(option.text)}
      disabled={props.disabledValue}
    />
  );
};

export default OptionDropDown;