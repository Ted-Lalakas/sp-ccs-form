import * as React from 'react';
import { Dropdown, DropdownMenuItemType, IDropdownStyles, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';

const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { maxWidth: 350 }
};

const OptionDropDown = (props:any) => {
  let formatterArr: IDropdownOption[] = [];

  if(props.subjectValue) {
    let filteredArray = props.callSubjectArray.filter(val => val.Title == props.subjectValue);

    filteredArray.forEach( val => {
      formatterArr.push({
        key: val.subject,
        text: val.subject
      });
     });

    formatterArr.unshift( {
      key: props.subjectValue,
      text: props.subjectValue,
      itemType: DropdownMenuItemType.Header
    });
  }

  return (
    <Dropdown 
      required
      defaultSelectedKey={props.value}
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