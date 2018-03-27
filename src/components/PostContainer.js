import React from 'react';
import Linkify from 'react-linkify';
import { withRouter } from 'react-router'
// import marked from 'marked'
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import Post from './Post';



const PostContainer = (props) => {
    if (props.getPostQuery && props.getPostQuery.loading) {
        return <div>Loading</div>
    }

    const postMethods = {
        formatPostText: formatPostText,
        getPostImages: getPostImages,
        getDyeSources: getDyeSources,
        getFibreAndMaterials: getFibreAndMaterials,
        getSafety: getSafety
    }
    return <Post {...props} {...postMethods} />
}

const formatPostText = (postText) => {
    const formattedText = postText.split('\n').map((line, i) => {
        line = line.trim();

        if (line.substr(0, 2) === '##') {
            return <h2 key={i}>{line.substr(3)}</h2>
        }

        return <p key={i}><Linkify>{line}</Linkify></p>
    });

    return formattedText;
}

const getPostImages = (images) => {
    if (images.length <= 0) { return }

    const allImages = images.map((image, i) => {
        return (
            <div key={i}>
                <img src={image.imageUrl} alt={image.caption} />
                <span>{image.caption}</span>
            </div>
        );
    });

    return allImages;
}


const getDyeSources = (post) => {
    return <div>{post.dyeSources}</div>;
}

const getFibreAndMaterials = (post) => {
    const fibreAndMaterials = [post.fibresUsed, post.materials].map((text, i) => {
        const listItems = text.split(',').map((item, index) => {
            return <li key={index}>{item.trim()}</li>;
        });
        return (
            <div key={`sidebar-item-${i}`}>
                <ul>{listItems}</ul>
            </div>
        );
    });

    return fibreAndMaterials;
}

const getSafety = (post) => {
    return <div>{post.safetyDisposal}</div>;
}

const GET_POST_QUERY = gql`
    query GetPostQuery($postId: ID) {
        Post(id: $postId) {
            id
            createdAt
            description
            postTitle
            postImages {
                id
                imageUrl
                caption
            }
            safetyDisposal
            author {
                id
            }
            materials
            fibresUsed
            dyeSources
        }
    }
`

export default graphql(GET_POST_QUERY, { 
    name: 'getPostQuery',
    options: (ownProps) => {
        const postId = ownProps.match.params.postId;
        return {
            variables: { postId }
        }
    } 
})(withRouter(PostContainer));