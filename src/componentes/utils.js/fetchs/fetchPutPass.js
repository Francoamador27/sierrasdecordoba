export const fetchPutPass = async (newPassword, session, url, submitButton) =>{
   const response = await fetch(`${url}/auth/update-password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          password: newPassword,
          email: session.email,
          id: session.id,
        }),
      });
        
      if (response.ok) {
        return response;
      } else {
        return null;
      }
} 