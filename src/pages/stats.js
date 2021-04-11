import '../styles/stats.css'

import { Helmet } from 'react-helmet'

function Stats() {


    return(
        <div id='stats-body' className='body'>

            <Helmet>
                <title>The Hierarchy • Stats</title>
            </Helmet>
            
            <div id='stats-sections'>

                <div className='section-1'>
                    <a href='/stats/members/catalog'>Members</a>
                </div>

                <div className='section-2'>
                    <a href='/stats'>Gangs</a>
                </div>

                <div className='section-3'>
                    <a href='/stats'>Awards</a>
                </div>

                <div className='section-4'>
                    <a href='/stats'>Shop</a>
                </div>

            </div>

        </div>
    )
}

export default Stats