import React from 'react';
import Table from './Table';
import { Link } from 'react-router-dom';

function Statistic() {
    const leaderBoard=(e)=>{
        localStorage.setItem('table', e.target.name); 
    }
    return (
        <div className="stats my-4">
        <h3>STATS</h3>
        <div className="stats-container d-flex">
            {Table.map((element, index) => {
                return <div className="stats-card" key={index}>
                    <div className="card mx-2 my-2" style={{ width: "100%" }}>
                        <Link to="/stats" onClick={leaderBoard} className="league">
                            <img className="card-imgs" name={element.name} 
                                src={element.url} alt="hello" />
                        </Link>
                    </div>
                    <h5 style = {{color:'white'}}className="mx-2 text-center">{element.title}</h5>
                </div>
            })}
        </div>
    </div>
    )
}

export default Statistic
