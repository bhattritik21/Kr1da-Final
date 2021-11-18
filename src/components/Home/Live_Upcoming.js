import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom';

function Live_Upcoming() {
    const [live, setLive] = useState([])

    const liveMatches = async () => 
    {try {
        let [data1,data2,data3] = await Promise.all([
          fetch("https://site.api.espn.com/apis/site/v2/sports/soccer/uefa.champions/scoreboard"),
          fetch("https://site.api.espn.com/apis/site/v2/sports/soccer/eng.1/scoreboard"),
          fetch("https://site.api.espn.com/apis/site/v2/sports/soccer/esp.1/scoreboard")
        ]);
        let parsedData1 = await data1.json()
        let parsedData2 = await data2.json()
        let parsedData3 = await data3.json()
        setLive(live.concat(parsedData1.events,parsedData2.events,parsedData3.events))
        console.log(live);
      }
      catch(err) {
        console.log(err);
      };}
    
       useEffect(() => {
       liveMatches();
     }, [])

    const handleClick = (e)=>{
        localStorage.setItem('Id', e.target.id); 
    }

    return (
        <div className="live my-4">
            <h3>LIVE / UPCOMING</h3>
            <div className="live-container d-flex" id="live-match">
                {live.map(element => {
                    if (element.status.type.completed === false) {
                        return <div className="live-match" key={element.id}>
                            <div className="card mx-2 my-2" style={{ width: '100%' }}>
                                <Link to="/live"  onClick={handleClick} id={element.id}>
                                    <img className="card-imgs" id={element.id} style={{ height: '150px' }} src="https://assets.khelnow.com/news/uploads/2020/08/Lead-Pic_26-August.jpg"  alt="sdsd"/>
                                </Link>
                            </div>
                            <p className="mx-2 text-center" >{element.competitions[0].competitors[0].team.displayName} Vs {element.competitions[0].competitors[1].team.displayName}</p>
                        </div>
                    }
                })}
            </div>
        </div>
    )
}

export default Live_Upcoming
// 