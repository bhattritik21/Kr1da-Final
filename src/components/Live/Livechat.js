import React, { useState, useEffect} from 'react'

function Livechat(props) {
    const topic = props.topic;
    const [comment, setComment] = useState("");
    const [chats, setChats] = useState([]);
    const Id = localStorage.getItem('userId')
    const handleSubmit = async (e) => {
        try {
            const response = await fetch("http://localhost:5000/livechat", {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": localStorage.getItem('token')
                },
                body: JSON.stringify({ text: comment, topic: topic })
            });
            const json = await response.json();
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        const fetchChats = async () => {
            try {
                const response = await fetch(`http://localhost:5000/fetchlivechats/${topic}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        "auth-token": localStorage.getItem('token')
                    },
                });
                const json = await response.json();
                console.log(json[0].comments);
                setChats(json[0].comments);

            } catch (e) {
                console.log(e);
            }
        }
        fetchChats();
    }, [])

    return (
        <div>
            <div id="live_chat">
                <div id="title_container">
                    <div id="title_inner_container">
                        <h1 id="title">LIVE CHAT</h1>
                    </div>
                </div>
                {/* <button  id="join_button">Join <i class="fas fa-sign-in-alt" aria-hidden="true"></i>
                </button> */}
                <div className="chat_box" >
              
                    {chats.map((element, index) => {
                        return <>
                            {element.postedBy["_id"] === Id ? <div className="chat2" key={index}>
                                <h5 style={{ color: 'white', fontSize: '0.6em' }}>You</h5>
                                <p style={{ fontSize: '0.5em' }}>{element.text}</p>
                            </div> : <div className="chat1" key={index}>
                                <h5 style={{ color: 'white', fontSize: '0.6em' }}>{element.postedBy["name"]}</h5>
                                <p style={{ fontSize: '0.5em' }}>{element.text}</p>
                            </div>}

                        </>

                    })}
                        
                    <div id="chat_input_container">
                        <form onSubmit={handleSubmit} className="create"  >
                            <div className="y" >
                                <input className="form-control"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    style={{
                                        width: '160%',
                                        fontSize: '10px',
                                        color: 'black',
                                        border: '1px solid rgb(189, 188, 188)',
                                        borderRadius: '5px',
                                        paddingLeft: '20px',
                                        padding: '5px'
                                    }}
                                    id="comment"
                                    name="comment"
                                    type="text"
                                />
                            </div>
                            <button className="btn btn-primary" style={{ backgroundColor: 'purple', border: 'solid 1px white', maxHeight: '30px', alignItems: 'center', fontSize: ' smaller' }} type="submit" >POST</button>
                        </form>

                    </div>

                

                </div>
                
            </div>
        </div>
    )
}

export default Livechat
