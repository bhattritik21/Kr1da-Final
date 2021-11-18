import React, { useState,useEffect } from 'react'
import Spinner from '../Spinner';
import { Link } from 'react-router-dom'

function News2() {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
   const updateNews = async () => {
    try {
        let [data1,data2] = await Promise.all([
          fetch("https://site.api.espn.com/apis/site/v2/sports/soccer/uefa.champions/news"),
          fetch("https://site.api.espn.com/apis/site/v2/sports/soccer/eng.1/news")
        ]);
        let parsedData1 = await data1.json()
        let parsedData2 = await data2.json()
        setArticles(articles.concat(parsedData1.articles,parsedData2.articles))
        setLoading(false)
      }
      catch(err) {
        console.log(err);
      };
    }


    useEffect(() => {
        updateNews();
    }, [])

    return (
        <div className="card1" >
            {loading && <Spinner />}
            <h2 >Trending News</h2>
            <div className="details" id="newzAccordion">          
                    {articles.map((element,index) => {
        if(element.images.length!==0){
            return <div className="newz" id="news" key={index} >
            <div className="news_head" >
                <h3 style={{color:'black'}}>{element.headline}</h3>
            </div>
          
               <img src={element.images[0].url} className="news_img"  alt=""/>
          
            <div className="news_tail" >
                <li>{element.description}<Link className="readmore" to={element.links.web.href} target="_blank" >  ...Read more here</Link></li>
                <li style={{fontSize:'0.9em'}}>{element.published}</li>
                <li className="desc" >{element.type}</li>
            </div>
        </div>
        }
                       
                    })}
            </div>
        </div>

    )
}

export default News2
