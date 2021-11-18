import React, { useState, useEffect } from 'react'


function News1() {

    const [articles, setArticles] = useState([])

    useEffect(() => {
        fetch("https://free-news.p.rapidapi.com/v1/search?q=sport&lang=en",
            {
                "method": "GET",
                "headers": {
                    "x-rapidapi-key": "db6740596fmshc2204c20bad0c30p1c647djsn90fdbe55146c",
                    "x-rapidapi-host": "free-news.p.rapidapi.com"
                }
            })
            .then(response => {
                return response.json();
            }).then(data => {
                setArticles(data.articles);
            })
            .catch(err => {
                console.error(err);
            });
    }, [])
    return (
        <div className="card2">
            <h3>Popular Articles</h3>
            <div className="highlits" id="newsAccordion" >
                {articles.map((element, index) => {
                    return <div class="card-header" key={index}>
                        <h4><a href={element['link']} target="_blank" rel="noreferrer">{index + 1}:   {element["title"]}</a></h4>
                    </div>
                })}
            </div>
        </div>
    )
}

export default News1
