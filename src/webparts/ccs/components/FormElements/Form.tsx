import * as React from 'react';
import { IFormProps, IFormState } from './IForm';

class Form extends React.Component<IFormProps,IFormState> {
	public state = {
		arrayToUse: this.props.arrayToUse,
	};


	// For testing purposes. Can be removed.
  public componentDidMount() {
    console.log("-------------------------------------------------------------------------");
    console.log('[ProcurementNavigator.tsx] componentDidMount',this.props);
    console.log("-------------------------------------------------------------------------");
	}

	public componentDidUpdate() {
    console.log("----------------------------------------------------------------");
    console.log("componentDidUpdate",this.state);
    console.log("----------------------------------------------------------------");
  }
	
	public render() {
		return (
			<div></div>
		);
	}
}
export default Form;