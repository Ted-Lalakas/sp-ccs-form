import * as React from 'react';
import { IFormProps, IFormState } from './IFormPropsState';
import GetUserData from '../GetUserData/GetUserData';

class Form extends React.Component<IFormProps,IFormState> {
	public state = {
		arrayToUse: this.props.arrayToUse,
		userName: null,
		userEmail: null
	};

	// For testing purposes. Can be removed.
  public componentDidMount() {
    console.log("-------------------------------------------------------------------------");
    console.log('[Form.tsx] componentDidMount',this.props);
		console.log("-------------------------------------------------------------------------");
	}

	public componentDidUpdate() {
    console.log("----------------------------------------------------------------");
    console.log("[Form.tsx] componentDidUpdate",this.state);
    console.log("----------------------------------------------------------------");
	}
	
	public getUserHandler = (user:string, email:string) => {
    this.setState({    
      userName: user,        
      userEmail: email            
    }); 
  }
	
	public render() {
		return (
			<div>
				<GetUserData context={this.props.context} dataHandler={this.getUserHandler} />
				<p>{this.props.Title1}</p>

				<p>{ this.state.userName }</p>
				<p>{ this.state.userEmail }</p>
			</div>
		);
	}
}
export default Form;