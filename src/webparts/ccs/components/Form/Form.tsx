import * as React from 'react';
import { IFormProps, IFormState } from './IFormPropsState';

class Form extends React.Component<IFormProps,IFormState> {
	public state = {
		arrayToUse: this.props.arrayToUse
	};

	// Users userName, userEmail coming in as props

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
		console.log(this.props);
		return (
			<div>
				<p>{this.props.heading_dutyDirector}</p>
				<p>{this.props.heading_regionalLocation}</p>
				<p>{this.props.heading_officeManagedFrom}</p>
				<p>{this.props.heading_jaid}</p>
			</div>
		);
	}
}
export default Form;