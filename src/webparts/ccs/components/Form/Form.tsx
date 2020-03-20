import * as React from 'react';
import { IFormProps, IFormState } from './IFormPropsState';

class Form extends React.Component<IFormProps,IFormState> {
	public state = {
		arrayToUse: this.props.arrayToUse
	};

	// // For testing purposes. Can be removed.
  // public componentDidMount() {
  //   console.log("-------------------------------------------------------------------------");
  //   console.log('[Form.tsx] componentDidMount',this.props);
	// 	console.log("-------------------------------------------------------------------------");
	// }

	// public componentDidUpdate() {
  //   console.log("----------------------------------------------------------------");
  //   console.log("[Form.tsx] componentDidUpdate",this.state);
  //   console.log("----------------------------------------------------------------");
	// }
	
	public render() {
		return (
			<div>
				<p>{this.props.Title1}</p>
			</div>
		);
	}
}
export default Form;