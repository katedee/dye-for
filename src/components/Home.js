import React from 'react';

class Home extends React.Component {
    render () {
       return ( 
            <div className='container-fluid'>
                <div className='col-xs-12 col-md-4'>
                    <img src='http://lorempixel.com/480/600/abstract/'/>
                </div>
                <div className='col-xs-12 col-md-8'>
                    <h1>WHAT UPPPPP</h1>
                </div>
            </div>
       );
    }
}

export default Home;