import React, {useState} from 'react';
import { useHistory } from 'react-router';

const SignUp = (props) => {
    const [credentials, setCredentials] = useState({name: "",email: "", password: "",cpassword: ""}) 
    let history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
       const  {name,email,password}=credentials;
        const response = await fetch("http://localhost:5000/signup", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name,email,password})
        });
        const json = await response.json()
        console.log(json);
        if (json.success){
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken); 
            history.push("/");
            props.showAlert("Acoount created succesfuly", "success");
        }
        else{
            props.showAlert("Invalid Credentials", "danger");
        }
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    return (
        <div className="container" style={{marginTop:"100px", maxWidth: '600px', borderRadius: '5px' }}>
             <h3 className="text-center" style={{ color: 'black' }}>Sign Up</h3>
            <form  onSubmit={handleSubmit}>
               <div className="my-3">
                    
                    <input 
                    style={{ backgroundColor: "#e4cce9", textAlign: 'center' }}
                    type="text" 
                    className="form-control" 
                    value={credentials.name} 
                    onChange={onChange} 
                    id="name" 
                    name="name" 
                    placeholder="Username"
                    aria-describedby="emailHelp" />
                    
                </div>
                <div className="my-3">
                   
                    <input 
                    style={{ backgroundColor: "#e4cce9", textAlign: 'center' }}
                    type="email" 
                    className="form-control" 
                    value={credentials.email} 
                    onChange={onChange} 
                    id="email" 
                    name="email" 
                    placeholder="Email"
                    aria-describedby="emailHelp" />
                    
                </div>
                <div className="my-3">
                   
                    <input 
                    type="password" 
                    style={{ backgroundColor: "#e4cce9", textAlign: 'center' }}
                    className="form-control" 
                    value={credentials.password} 
                    onChange={onChange} 
                    minLength={5} required 
                    name="password" 
                    placeholder="password"
                    id="password" />

                </div>
                <div className="my-3">
                    
                    <input 
                     style={{ backgroundColor: "#e4cce9", textAlign: 'center' }}
                    type="password" 
                    className="form-control" 
                    value={credentials.cpassword} 
                    onChange={onChange} 
                    minLength={5} required  
                    name="cpassword" 
                    placeholder="confirm password"
                    id="cpassword" />
                </div>

                <button style={{ backgroundColor: 'purple', display: 'flex', margin: 'auto' ,border:'solid 1px white'}} type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default SignUp
