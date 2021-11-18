import React, { useState } from 'react';
import { useHistory } from 'react-router';
import('./contact.css')

function Contact(props) {
    const [credentials, setCredentials] = useState({ name: "", email: "", number: "", comment: "" })
    let history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, number,comment } = credentials;
        const response = await fetch("http://localhost:5000/contact", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, number,comment })
        });
        const json = await response.json()
        console.log(json);
        if (json.success) {
            // Save the auth token and redirect
            history.push("/");
            props.showAlert("Saved succesfuly", "success");
        }
        else {
            props.showAlert("Invalid Credentials", "danger");
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div className="contact-content  center max-width3">

            <h2>Feel free to contact</h2>
            <div className="contact-form">
                <form onSubmit={handleSubmit}>

                    <div className="form-box">
                        <span>User Name:</span>
                        <input
                            style={{ backgroundColor: "#e4cce9" }}
                            type="text"
                            className="form-control"
                            value={credentials.name}
                            onChange={onChange}
                            id="name"
                            name="name"
                            aria-describedby="emailHelp" />
                    </div>
                    <div className="form-box">
                        <span>User Email:</span>
                        <input
                            style={{ backgroundColor: "#e4cce9" }}
                            type="email"
                            className="form-control"
                            value={credentials.email}
                            onChange={onChange}
                            id="email" 
                            name="email" 
                            aria-describedby="emailHelp" />

                    </div>
                    <div className="form-box">
                        <span>Mobile No.</span>
                        <input
                            style={{ backgroundColor: "#e4cce9" }}
                            type="number"
                            className="form-control"
                            value={credentials.number}
                            onChange={onChange}
                            id="number"
                            name="number"
                            aria-describedby="emailHelp" />

                    </div>
                    <div className="form-box">
                        <span>Any questions?</span>
                        <textarea 
                        style={{ backgroundColor: "#e4cce9" }}
                        className="form-input" 
                        id="comment"
                        name="comment" 
                        value={credentials.comment}
                        onChange={onChange}
                        cols="30" 
                        rows="5" >
                        </textarea>
                    </div>
                    <button style={{ backgroundColor: 'purple', display: 'flex', margin: 'auto',border:'solid 1px white' }} type="submit" className="btn btn-primary my-5">Submit</button>

                </form>
            </div>

        </div>
    )
}

export default Contact
