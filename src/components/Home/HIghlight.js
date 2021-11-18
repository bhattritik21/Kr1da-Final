import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

function HIghlight() {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(false)

    const updateNews = async () => {
        const url = "https://site.api.espn.com/apis/site/v2/sports/soccer/uefa.champions/news";
        let data = await fetch(url);
        let parsedData = await data.json()
        setArticles(parsedData.articles[0])
        if (parsedData.articles.length !==0) { setLoading(true) }

    }

    useEffect(() => {
        updateNews();
    }, [])
    return (
        <div id="news">
            {loading && <div className="news " style={{
                backgroundImage: `url(${articles.images[0].url})`, backgroundSize: 'cover',
                height: '400px', width: '100%', margin: 'auto', borderRadius: '10px'
            }}>
                <div className="shade">
                    <div className="contents">
                        <div className="new-head">
                            <h3>{articles.headline}
                            </h3>
                            <span style={{color:'white'}}> {articles.description}
                            </span>
                        </div>
                        <Link to="/news"><button type="button" className="btn btn-outline-warning news-btn">Latest
                            News</button></Link>
                        <p>See latest news here</p>
                    </div>
                </div>
            </div>
            }
        </div>
    )
}

export default HIghlight
