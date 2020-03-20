import * as pnp from "sp-pnp-js";

const loadUserDetails = async(context:any):Promise<void> => { 
	// Default values if there is no connection (or something went wrong)
	const titleDefault = "Local Host Info";
	const emailDefault = "localmail@justice.vic.gov.au";
	const list = { Title: titleDefault, Email: emailDefault };

	const spLoggedInUserDetails = async(ctx:any): Promise<any> => {  
		try {  
			const web = new pnp.Web(ctx.pageContext.site.absoluteUrl);  
			return await web.currentUser.get();          
		} catch (error) {  
			console.log("Error in spLoggedInUserDetails : " + error);  
		} 
	} 
  
	try{  
		const userDetails = await spLoggedInUserDetails(context);  
		// console.log(userDetails.Title);
		const [Title, Email] = userDetails;
		return Title;
	} catch(error) {  		
		// console.log("Error in loadUserDetails : ", error);  
		console.log("Error in loadUserDetails, Using default values this time"); 
	} 
}
export default loadUserDetails;





// const spLoggedInUserDetails = async(ctx:any): Promise<any> => {  
// 	try {  
// 		const web = new pnp.Web(ctx.pageContext.site.absoluteUrl);  
// 		return await web.currentUser.get();          
// 	} catch (error) {  
// 		console.log("Error in spLoggedInUserDetails : " + error);  
// 	}      
// } 

// const loadUserDetails = async(context:any, getUser:(user:string, email:string) => void, title:string, email:string):Promise<void> => {  
// 	try{  
// 		const userDetails = await spLoggedInUserDetails(context);  
// 		getUser(userDetails.Title, userDetails.Email);
// 	} catch(error) {  
// 		getUser(title, email);			
// 		// console.log("Error in loadUserDetails : ", error);  
// 		console.log("Error in loadUserDetails, Using default values this time");  
// 	}  
