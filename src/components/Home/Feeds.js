import React from 'react'
import { Link } from 'react-router-dom';

function Feeds() {
    return (
        <div className="feeds">
        <h3>FEED</h3>
        <div className="card mx-2 my-2" style={{ width: "100%" }}>
            <Link to="/feed"><img className=" card-imgs"
                src="https://technosports.co.in/wp-content/uploads/2021/07/PSG-The-Indian-Express.jpg" alt="hello" />
            </Link>
        </div>
    </div>
    )
}

export default Feeds
