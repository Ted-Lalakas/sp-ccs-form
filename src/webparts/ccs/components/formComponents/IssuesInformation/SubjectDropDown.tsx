import * as React from 'react';
import { Dropdown, IDropdownStyles, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';

const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { maxWidth: 350 }
};

const SubjectDropDown = (props) => {
  const formatterArr: IDropdownOption[] = [];
  props.subjectArray.forEach( val => {
    formatterArr.push({
      key: val,
      text: val
    });
   });

  // Extra feature not sure if I want this yet 
  // formatterArr.unshift({
  //   key: "",
  //   text: ""
  // });

  return (
    <Dropdown 
      required
      defaultSelectedKey={props.value}
      label={props.heading}
      placeholder={props.placeholderText}  
      options={formatterArr} 
      styles={dropdownStyles}
      onChange={(ev, option) => props.changeHandler(option.text)}
    />
  );
};

export default SubjectDropDown;