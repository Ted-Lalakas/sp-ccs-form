import * as React from 'react';
import * as pnp from "sp-pnp-js";

export interface IGetUserDataProps {
	context: any;
	dataHandler: (user:string, email:string) => void;
}

// Default values if there is no connection (or something went wrong)
const titleDefault = "Local Host Info";
const emailDefault = "localmail@justice.vic.gov.au";

const spLoggedInUserDetails = async(ctx:any): Promise<any> => {  
	try {  
		const web = new pnp.Web(ctx.pageContext.site.absoluteUrl);  
		return await web.currentUser.get();          
	} catch (error) {  
		console.log("Error in spLoggedInUserDetails : " + error);  
	}      
};

const loadUserDetails = async(context:any, getUser:(user:string, email:string) => void, title:string, email:string):Promise<void> => {  
	try{  
		const userDetails = await spLoggedInUserDetails(context);  
		getUser(userDetails.Title, userDetails.Email);
	} catch(error) {  
		getUser(title, email);			
		// console.log("Error in loadUserDetails : ", error);  
		console.log("Error in loadUserDetails, Using default values this time");  
	}  
};  

const GetUserData = (props:IGetUserDataProps) => {
	loadUserDetails(props.context, props.dataHandler, titleDefault, emailDefault);	
	return (
	  <React.Fragment/>
	);
};

export default GetUserData;