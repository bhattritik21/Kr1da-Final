
import React, { useState ,useEffect} from 'react'
import {  MdModeComment } from "react-icons/md";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import('./Feed.css')
function Feed() {

    const Id = localStorage.getItem('Id');
    const [profile, setProfile] = useState([]);
    const [posts, setPost] = useState([]);

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


    useEffect(() => {

        const fetchPosts = async () => {
            try {
                const response = await fetch("http://localhost:5000//fetchallposts", {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        "auth-token": localStorage.getItem('token')
                    },
                });
                const json = await response.json();
                console.log(json);

                setPost(posts.concat(json))
                console.log(posts);
                // const id = posts[0].user;
                // localStorage.setItem('userId', id);

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
        <div className='feed' style={{marginTop:'100px',width:'60vw'}}>
                <div className="posts">
                        {posts.map((element, index) => {
                            return <div className="post" key={index}>
                                <div className="Profile_head" style={{display:'flex',justifyContent:'flex-start'}}>
                                <img src={`/uploads/${profile.profilePic}`} style={{  width: '25px',borderRadius: '50%',
                         height: '25px',border: 'solid 1px black'}} alt="Profile pic" />
                         <h5 className="text-align-center" style={{ color: 'black', fontWeight: '600' , marginLeft:'10px'}}>{profile.name}</h5>
                                </div>
                                <div className="p-cnt-v ">
                                    <img src={`/uploads/${element.photo}`} alt="uploded" />
                                    <div style={{ textAlign: 'start', paddingTop:'1%', fontSize: '1.2em', fontWeight: '600'}} className="captions">{element.title}</div>
                                </div>
                              
                                <div className="p-acts" style={{marginTop:'0px'}}>
                                    <div className="likez">
                                        {(element.likes.includes(userId)) ? <div className="like"><AiFillDislike style={{ color: 'black' ,width:'25px'}} onClick={() => { handleunlikeSubmit(element._id) }}></AiFillDislike>
                                        </div> : <div className="like"><AiFillLike style={{ color: 'black' ,width:'25px'}} onClick={() => { handlelikeSubmit(element._id) }}> </AiFillLike>
                                        </div>}

                                        <h5>{element.likes.length} likes</h5>
                                    </div>

                                    <div className="comment"><span>{element.comments.length}</span><MdModeComment style={{ color: 'black' ,width:'25px'}}></MdModeComment>
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
    )
}

export default Feed
