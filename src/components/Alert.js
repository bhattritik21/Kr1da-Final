import React from 'react'

function Alert(props) {
    const capitaliaze=(word)=>{
        if(word==="danger"){
            word="error"
        }
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase()+ lower.slice(1);
    }
    return (
        <div style ={{height:"50px",position:'absolute' ,marginTop:'50px'}}>
            {props.alert && <div className={`alert alert-${props.alert.type}`} role="alert">
               <strong>{capitaliaze(props.alert.type)}</strong>: {props.alert.message}
            </div>}
            
        </div>
    )
}

export default Alert
