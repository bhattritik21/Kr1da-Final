import React, { useState, useEffect } from 'react'

function Stats() {
  const [tables, setTable] = useState([])
  const [loading, setLoading] = useState(false)
  const type = localStorage.getItem('table');

  const updateNews = async () => {
    const url = `https://site.api.espn.com/apis/site/v2/sports/soccer/${type}/teams`;
    let data = await fetch(url);
    let parsedData = await data.json()
    setTable(parsedData.sports[0].leagues[0])
    setLoading(true)
    // console.log(parsedData.sports[0].leagues[0]);

  }

  useEffect(() => {
    updateNews();
  }, [])

  var i = 1;

  return (
    <div className="container">
      <div id="title" className="text-center"><h1 style={{ color: 'purple' }}>{tables.name}</h1></div>
      <table className="table" >
        <thead className="thead-dark">
          <tr className="bg-info">
            <th scope="col">#</th>
            <th scope="col">Team</th>
            <th scope="col">Matches</th>
            <th scope="col">Wins</th>
            <th scope="col">Draws</th>
            <th scope="col">Loses</th>
            <th scope="col">Points</th>
          </tr>
        </thead>


        {loading && tables.teams.map((element1) => {
      return tables.teams.map((element) => {
            let stats = element.team.record.items[0].stats;
            if (stats[9].value === i) {
              i++;
           return <tbody id="table" key={i}>
                <tr>
                  <th scope="row">{stats[9].value}</th>
                  <td> <img src={element.team.logos[0].href} style={{ width: '20px' }} alt="imagw" /> {element.team.displayName}</td>
                  <td>{stats[3].value}</td>
                  <td>{stats[0].value}</td>
                  <td>{stats[2].value}</td>
                  <td>{stats[1].value}</td>
                  <td>{stats[6].value}</td>
                </tr>;
              </tbody>
             
            }
            else{
              return null;
            }
          })
        })}

      </table>

    </div>
  )
}

export default Stats
