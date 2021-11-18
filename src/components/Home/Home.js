import React from 'react';
import Feeds from './Feeds';
import HIghlight from './HIghlight';
import './Home.css'
import Live_Upcoming from './Live_Upcoming';
import Statistic from './Statistic';


function Home() {

    return (
        <div className="maincont">
            <HIghlight />
            <Live_Upcoming/>
            <Statistic/>
             <Feeds/>
        </div>
    )
}

export default Home
