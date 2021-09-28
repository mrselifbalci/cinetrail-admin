import React from 'react'

export default function Signout({token,isLoggedIn}) {
    return (
        <div style={{margin:"200px auto"}}>
            {
                !token || !isLoggedIn 
                ? <h1 style={{color:"white"}}>You have signed out. Go back to <a href="/">signin page</a></h1>
                : null
            }
            
        </div>
    )
}
