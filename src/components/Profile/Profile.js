import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { UserContext } from '../../App'
import { MdDeleteForever, MdModeEdit, MdModeComment } from "react-icons/md";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { Link } from 'react-router-dom'
import axios from 'axios'
import('./Profile.css')

function Profile() {
    const Id = localStorage.getItem('Id');
    const [title, setTitle] = useState("");
    const [photo, setPhoto] = useState("");
    const [profile, setProfile] = useState([]);
    const [posts, setPost] = useState([]);
    // const [state, dispatch] = useContext(UserContext);
    let history = useHistory();

    const handleSubmit = async (e) => {

        const fdata = new FormData();
        fdata.append("title", title);
        fdata.append("photo", photo);
        try {
            const response = await axios.post('http://localhost:5000/post', fdata, {
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": localStorage.getItem('token')
                }
            });
            console.log(response.data.photo);
            history.push("/profile");
        } catch (e) {
            console.log(e);
        }

    }
    const fileSubmitHandler = (e) => {
        setPhoto(e.target.files[0]);
    }
    const onChange = (e) => {
        setTitle(e.target.value);
    }

    const handlelikeSubmit = async (id) => {
        try {
            const response = await fetch("http://localhost:5000/like", {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": localStorage.getItem('token')
                },
                body: JSON.stringify({ postId: id })
            });
            const json = await response.json();

            const newData = posts.map(item => {
                if (item._id === json._id) {
                    return json;
                }
                else {
                    return item;
                }
            })
            setPost(newData)
        } catch (e) {
            console.log(e);
        }

    }
    const handleunlikeSubmit = async (id) => {
        try {
            const response = await fetch("http://localhost:5000/unlike", {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": localStorage.getItem('token')
                },
                body: JSON.stringify({ postId: id })
            });
            const json = await response.json();


            const newData = posts.map(item => {
                if (item._id === json._id) {
                    return json;
                }
                else {
                    return item;
                }
            })
            setPost(newData)
        } catch (e) {
            console.log(e);
        }

    }
    const handlecommenteSubmit = async (text, id) => {
        try {
            const response = await fetch("http://localhost:5000/comments", {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": localStorage.getItem('token')
                },
                body: JSON.stringify({ postId: id, text: text })
            });
            const json = await response.json();
            const newData = posts.map(item => {
                if (item._id === json._id) {
                    return json;
                }
                else {
                    return item;
                }
            })
            setPost(newData)
        } catch (e) {
            console.log(e);
        }
    }
    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/deletepost/${id}`, {
                method: 'delete',
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": localStorage.getItem('token')
                },
                body: JSON.stringify({ postId: id })
            });
            const json = await response.json();
            console.log(json);
            const newData = posts.filter(item => {
                return item._id !== json.post._id
            })
            setPost(newData)
        } catch (e) {
            console.log(e);
        }

    }


    useEffect(() => {

        const fetchPosts = async () => {
            try {
                const response = await fetch("http://localhost:5000//fetchposts", {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        "auth-token": localStorage.getItem('token')
                    },
                });
                const json = await response.json();
                // console.log(json);

                setPost(posts.concat(json))
                console.log(posts);
                const id = posts[0].user;
                localStorage.setItem('userId', id);

                // console.log(userId);
            } catch (e) {
                console.log(e);
            }
        }
        const getUser = async () => {
            try {
                const response = await fetch("http://localhost:5000//profile", {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        "auth-token": localStorage.getItem('token')
                    },

                });
                const json = await response.json();
                console.log(json);
                setProfile(json);
                console.log(profile);
            }
            catch (e) {
                console.log(e);
            }
        }
        fetchPosts();
        getUser();
    }, [])


    const userId = localStorage.getItem('userId');
    return (
        <div className="profile-container" style={{ marginTop: '50px', backgroundColor: 'transparent', padding: '2%' }}>
           
                <div className="profile-head" style={{ backgroundColor: 'transparent', paddingBottom: "10px", sdisplay: 'flex', flexDirection: 'column', textAlign: 'center', position: 'relative' }}>
                    <div className="profile-pic text-align-center" style={{ width: "200px", height: "200px", margin: 'auto' }}>
                        <img style={{ border: 'solid 3px white', borderRadius: '50%', height: 'inherit', width: '100%', backgroundSize: 'cover' }} src={`/uploads/${profile.profilePic}`} alt="hry ya" />
                    </div>
                    <h3 className="text-align-center" style={{ color: 'white', fontWeight: '800', marginTop: '10px' }}>{profile.name}</h3>
                    <h5 className="text-align-center" style={{ color: 'white', fontWeight: '700', marginTop: '10px' }}>{profile.email}</h5>
                    <h6 className="text-align-center" style={{ color: 'white', fontWeight: '400', marginTop: '10px' }}>{profile.bio}</h6>
                    <Link to="/settings"> <button style={{ marginRight: "0", backgroundColor: 'white', color: 'purple', width: 'fit-content', fontWeight: '700', position: 'absolute', right: '0', bottom: '20px' }} className="btn btn-primary">Settings</button></Link>
                </div>
           
                     {/* <div className="profile-head" style={{ backgroundColor: 'transparent', paddingBottom: "10px", sdisplay: 'flex', flexDirection: 'column', textAlign: 'center', position: 'relative' }}>
                <div className="profile-pic text-align-center" style={{ width: "200px", height: "200px", margin: 'auto' }}>
                    <img style={{  border: 'solid 3px white', borderRadius: '50%',height:'inherit',width:'100%', backgroundSize: 'cover' }} src="" alt="" />   
                </div>
                <h3 className="text-align-center" style={{ color: 'white', fontWeight: '800', marginTop: '10px' }}>NAME</h3>
                <h5 className="text-align-center" style={{ color: 'white', fontWeight: '700', marginTop: '10px' }}>email</h5>
                <Link to="/settings"> <button style={{ marginRight: "0", backgroundColor: 'white', color: 'purple', width: 'fit-content', fontWeight: '700', position: 'absolute', right: '0', bottom: '20px' }} className="btn btn-primary">Settings</button></Link>
            </div> */}


            <div className="profile-body" style={{ backgroundColor: 'white', padding: '2%', display: 'flex', flexDirection: 'column', textAlign: 'center' }}>

                <div className="feed" style={{ margin: 'auto' }} id="m-col">
                    {/* <div className="head" id="p-tabs">
                        <div className=" top active" id="tog"><span>TIMELINE</span></div>
                        <div className=" top" id="tog"><span>FRIENDS</span></div>
                        <div className="top " id="tog"><span>COMMUNITY</span></div>
                        <div className=" top" id="tog"><span>ABOUT</span></div>
                    </div> */}
                    <div className="m-mrg" id="composer">
                        <div className="top2 active "><span style={{ color: 'purple' }}>Craete Thread</span></div>
                    </div>

                    <form onSubmit={handleSubmit} className="create" encType="multipart/form-data" >
                        <img src="" alt="Profile pic" />
                        <div className="y" >
                            <input className="form-control"
                                value={title}
                                onChange={onChange}
                                style={{
                                    width: '40vw',
                                    fontSize: '15px',
                                    border: '1px solid rgb(189, 188, 188)',
                                    borderRadius: '5px',
                                    paddingLeft: '20px',
                                    padding: '10px'
                                }}
                                id="title"
                                name="title"
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

                        </div>
                        <button className="btn btn-primary" style={{ backgroundColor: 'purple', border: 'solid 1px white', maxHeight: '40px', alignItems: 'center' }} type="submit" >POST</button>
                    </form>

                    <div className="posts">
                        {posts.map((element, index) => {
                            return <div className="post" key={index}>
                                <div className="p-cnt-v">
                                    <img src={`/uploads/${element.photo}`} alt="uploded" />
                                </div>
                                <div style={{ textAlign: 'center', padding: "1% 8% 2% 8%", fontSize: '1.2em', fontWeight: '600' }} className="captions">{element.title}</div>
                                <div className="p-acts">
                                    <div className="likez">
                                        {(element.likes.includes(userId)) ? <div className="like"><AiFillDislike style={{ color: 'black' }} onClick={() => { handleunlikeSubmit(element._id) }}></AiFillDislike>
                                        </div> : <div className="like"><AiFillLike style={{ color: 'black' }} onClick={() => { handlelikeSubmit(element._id) }}> </AiFillLike>
                                        </div>}

                                        <h5>{element.likes.length} likes</h5>
                                    </div>

                                    <div className="comment"><span>{element.comments.length}</span><MdModeComment style={{ color: 'black' }}></MdModeComment>
                                    </div>
                                    <div className="edits"><MdModeEdit style={{ color: 'black' }} ></MdModeEdit>
                                        <MdDeleteForever style={{ color: 'black' }} onClick={() => { handleDelete(element._id) }}></MdDeleteForever>
                                    </div>

                                </div>
                                {
                                    element.comments.map((record, index) => {
                                        return (<h6 style={{ marginLeft: '0' }} key={index}><span  style={{ fontWeight: '700' ,color:'black'}}>{record.postedBy.name}</span > {record.text}</h6>)
                                    })
                                }
                                <form onSubmit={(e) => {

                                    handlecommenteSubmit(e.target[0].value, element._id)
                                }}>
                                    <input
                                        type="text"
                                        style={{
                                            width: '20vw',
                                            fontSize: '12px',
                                            border: '1px solid rgb(189, 188, 188)',
                                            borderRadius: '5px',
                                            paddingLeft: '20px',
                                            padding: '10px',
                                            marginRight: '10px'
                                        }}
                                        placeholder="add a comment" />
                                    <button className="btn btn-primary" style={{ backgroundColor: 'purple', fontSize: '0.6em', border: 'solid 1px white', maxHeight: '32px', alignItems: 'center' }} type="submit" >POST</button>
                                </form>
                            </div>
                        })}

                    </div>
                </div>
                <div id="loading">LOADING</div>
            </div>
        </div>
    )
}

export default Profile
