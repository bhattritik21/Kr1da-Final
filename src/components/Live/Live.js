import React, { useState, useEffect } from 'react'
import Livechat from './Livechat'
import { BiFootball} from "react-icons/bi"
import('./live.css')



function Live() {
    const [live, setLive] = useState([])
    const Id = localStorage.getItem('Id');
    const liveMatches = async () => {
        try {
            let [data1, data2, data3] = await Promise.all([
                fetch("https://site.api.espn.com/apis/site/v2/sports/soccer/uefa.champions/scoreboard"),
                fetch("https://site.api.espn.com/apis/site/v2/sports/soccer/eng.1/scoreboard"),
                fetch("https://site.api.espn.com/apis/site/v2/sports/soccer/esp.1/scoreboard")
            ]);
            let parsedData1 = await data1.json()
            let parsedData2 = await data2.json()
            let parsedData3 = await data3.json()
            setLive(live.concat(parsedData1.events, parsedData2.events, parsedData3.events))
        }
        catch (err) {
            console.log(err);
        };
    }

    useEffect(() => {
        liveMatches();
    }, [])


    return (

        <>
            {live.map(element => {
                if (element.id === Id) {
                    return <div className="container" key={element.id}>
                        <div className="top-head">
                            <div className="match-title text-center" id="match-title">
                                <h3 style={{color:'black'}}>{element.competitions[0].competitors[0].team.displayName} Vs {element.competitions[0].competitors[1].team.displayName} </h3>
                            </div>
                            <div id="top-head">
                                <p style={{color:'black'}} className="full-time text-center">{element.status.type.description}</p>
                            </div>
                        </div>

                        <div className="teams d-flex" style={{ justifyContent: 'space-evenly' }} id="content">
                            <img src={element.competitions[0].competitors[0].team.logo} style={{width: '100px' ,height: '100px'}}  alt="" />
                            <h1 style={{color:'black'}} className="score">{element.competitions[0].competitors[0].score}</h1>
                            <span style={{fontSize:'2em',color:'black'}} >-</span>
                            <h1  style={{color:'black'}}className="score">{element.competitions[0].competitors[1].score}</h1>
                            <img src={element.competitions[0].competitors[1].team.logo} style={{width: '100px' ,height: '100px'}} alt="" />
                        </div>

                        <div className="goals d-flex" style={{ justifyContent: 'space-between' }}>
                            <div id="team1">
                                {element.competitions[0].details.forEach(elements => {
                                    if (elements.scoreValue === 1) {
                                        if (element.competitions[0].competitors[0].id === elements.team.id) {
                                            return <p style={{fontWeight:'600'}}>{elements.athletesInvolved[0].displayName} {elements.athletesInvolved[0].displayName}</p>
                                        }
                                    }
                                })}
                            </div>

                           <BiFootball style={{color:'black'}}/>

                            <div id="team2">
                                {element.competitions[0].details.forEach(elements => {
                                    if (elements.scoreValue === 1) {
                                        if (!element.competitions[0].competitors[0].id === elements.team.id) {
                                            return <p style={{fontWeight:'600'}}>{elements.athletesInvolved[0].displayName} {elements.athletesInvolved[0].displayName}</p>
                                        }
                                    }
                                })}
                            </div>
                        </div>
                        <Livechat topic={element.id}/>
               
                    </div>
                }
            })}
        </>

    )
}

export default Live
