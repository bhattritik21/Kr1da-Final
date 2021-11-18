import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

function Settings() {
    const [bio, setBio] = useState("");
    const [photo, setPhoto] = useState("");
    let history = useHistory();
    const handleSubmit = async (e) => {
        const userId = localStorage.getItem('userId');
        const fdata = new FormData();
        fdata.append("bio", bio);
        fdata.append("photo", photo);
        fdata.append("postId",userId);
        try {
            const response = await axios.post('http://localhost:5000//updateUser', fdata, {
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": localStorage.getItem('token')
                }
            });
            const json = await response.json();
            console.log(json);
            history.push("/profile");
        } catch (e) {
            console.log(e);
        }

    }
    const fileSubmitHandler = (e) => {
        setPhoto(e.target.files[0]);
    }
    const onChange = (e) => {
        setBio(e.target.value);
    }


    return (
        <div className="container" style={{ marginTop: '50px' }}>
            <form onSubmit={handleSubmit} className="create" encType="multipart/form-data" >

                <input className="form-control"
                    value={bio}
                    onChange={onChange}
                    style={{
                        width: '40vw',
                        fontSize: '15px',
                        border: '1px solid rgb(189, 188, 188)',
                        borderRadius: '5px',
                        paddingLeft: '20px',
                        padding: '10px'
                    }}
                    id="bio"
                    name="bio"
                    type="text"
                    placeholder="What's on your mind?" />

                <div className="btn">
                    <input
                        className="form-control"
                        style={{ width: '20vw', padding: '2px', marginTop: '5px' }}
                        onChange={fileSubmitHandler}
                        type="file"
                        name="photo" />

                </div>
                <button className="btn btn-primary" style={{ backgroundColor: 'purple', border: 'solid 1px white', maxHeight: '40px', alignItems: 'center' }} type="submit" >Update</button>
            </form>
        </div>
    )
}

export default Settings
