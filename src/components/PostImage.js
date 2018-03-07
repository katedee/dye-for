import React from 'react';

class PostImage extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.removeImage = this.removeImage.bind(this);
    }

    handleChange(e) {
        this.props.onChange(e, this.props.imageId);
    }

    removeImage(e) {
        this.props.removeImage(e, this.props.imageId);
    }

    render () {
        return (
            <div className="image-caption">
                <img src={this.props.imageUrl} alt='hey'/>
                <input
                type='text'
                placeholder='Enter an image caption' 
                onChange={this.handleChange}
                value={this.props.imageCaption}
                />
                <button onClick={this.removeImage}>remove</button>
            </div>
        );
    }
}

export default PostImage;