import React from 'react';

class PostImage extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.onChange(e, this.props.url);
    }

    render () {
        return (
            <div className="image-caption">
                <img src={this.props.url} alt='hey'/>
                <input
                type='text'
                placeholder='Enter an image caption' 
                onChange={this.handleChange}
                value={this.props.imageCaption}
                />
            </div>
        );
    }
}

export default PostImage;