import * as React from 'react';
import * as pnp from "sp-pnp-js";

export interface IGetUserDataProps {
	context: any;
	getUser: any;
}

class GetUserData extends React.Component<IGetUserDataProps, {}> {
	public componentDidMount() {
		// When this components mounts then grab the user details and pass it up to the handler
		this.loadUserDetails(this.props.context);
  }

	// Get Current Logged In User
	public async spLoggedInUserDetails(ctx: any): Promise<any>{  
		try {  
			const web = new pnp.Web(ctx.pageContext.site.absoluteUrl);  
			return await web.currentUser.get();          
		} catch (error) {  
			// console.log("Error in spLoggedInUserDetails : " + error);  
		}      
	} 
	
	private async loadUserDetails(context:any):Promise<void>{  
    try{  
			const userDetails = await this.spLoggedInUserDetails(context);  
			this.props.getUser(userDetails.Title, userDetails.Email);
			
    } catch(error) {  
			const Title = "Local Host Info";
			const Email = "localmail@justice.vic.gov.au";

			this.props.getUser(Title, Email);			
      // console.log("Error in loadUserDetails : ", error);  
    }  
	}  

	public render() {
		return (
			<React.Fragment></React.Fragment>	
		) 
	}
};

export default GetUserData;