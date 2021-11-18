import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'


const Login = (props) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    let history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json()
        console.log(json);
        if (json.success) {
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken);
            history.push("/");
            props.showAlert("Acoount created succesfuly", "success");

        }
        else {
            props.showAlert("Invalid Credentials", "danger");
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div className="container" style={{ marginTop: "20vh", maxWidth: '500px', borderRadius: '5px' }}>
            <h3 className="text-center" style={{ color: 'black' }}>Login</h3>
            <form onSubmit={handleSubmit}>
                <div className="my-3">

                    <input style={{ backgroundColor: "#e4cce9", textAlign: 'center' }}
                        type="email"
                        className="form-control"
                        value={credentials.email}
                        onChange={onChange}
                        id="email"
                        name="email"
                        aria-describedby="emailHelp"
                        placeholder="Email" />

                </div>
                <div className="my-3">

                    <input style={{ backgroundColor: "#e4cce9", textAlign: 'center' }}
                        type="password"
                        className="form-control"
                        value={credentials.password}
                        onChange={onChange}
                        name="password"
                        id="password"
                        placeholder="Password" />
                </div>

                <button style={{ backgroundColor: 'purple', display: 'flex', margin: 'auto',border:'solid 1px white' }} type="submit" className="btn btn-primary">Submit</button>

                <div className="my-3" style={{ textAlign:'center'}}>
                   <p style={{ color:"black" }}>Not Registered? <Link to="/signup"><span style={{ color:"purple" }}>Create an account</span></Link></p>
                </div>

            </form>
        </div>
    )
}

export default Login
