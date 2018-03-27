import React from 'react';

const Post = (props) => {
    const { postId } = props.match.params;
    const post = props.getPostQuery.Post;
    const formattedText = props.formatPostText(post.description);

    return (
        <div className='container-fluid'>
            <div className='col-xs-12 col-md-5'>
                {props.getPostImages(post.postImages)}
            </div>
            <div className='col-xs-12 col-md-5'>
                <h2>{post.postTitle}</h2>
                {formattedText}
            </div>
            <div className='col-xs-12 col-md-2'>
                {props.getDyeSources(post)}
                {props.getFibreAndMaterials(post)}
                {props.getSafety(post)}
            </div>
        </div>
    );
}

export default Post;