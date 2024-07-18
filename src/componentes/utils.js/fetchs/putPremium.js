import { url } from "../endpoint/endpoint";

  
  export const putPremium = async (id) => {
      try {
              const response = await fetch(`${url}/api/users/premium/${id}` , {
          method: 'PUT',
          credentials: 'include'
        });
        if (response.ok) {
          const responseData = await response.json(); 
         let data = responseData;
          return data;
      } else {
            return ;
          }
      } catch (error) {
          return {status: "error",data: null};
         
      }
    };