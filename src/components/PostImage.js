import React from 'react';

class PostImage extends React.Component {
    render () {
        return <img src={this.props.url} alt='hey'/>;
    }
}

export default PostImage;