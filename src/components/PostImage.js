import React from 'react';

class PostImage extends React.Component {
    render () {
        return (
            <div className="image-caption">
                <img src={this.props.url} alt='hey'/>
                <input
                type='text'
                placeholder='Enter an image caption' 
                />
            </div>
        );
    }
}

export default PostImage;