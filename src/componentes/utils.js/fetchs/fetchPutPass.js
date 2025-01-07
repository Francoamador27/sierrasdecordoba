export const fetchPutPass = async (newPassword, id,email , url) =>{
  console.log(email, 'en el put')
   const response = await fetch(`${url}/auth/update-password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          password: newPassword,
          email: email,
          id: id,
        }),
      });
        
      if (response.ok) {
        return response;
      } else {
        return null;
      }
} 