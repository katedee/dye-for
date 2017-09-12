import React from 'react';
import { graphql, gql } from 'react-apollo';
import Linkify from 'react-linkify';
// import marked from 'marked'

class Post extends React.Component {
    formatPostText (postText) {
        const formattedText = postText.split('\n').map((line, i) => {
            line = line.trim();

            if (line.substr(0,2) === '##') {
                return <h2 key={i}>{line.substr(3)}</h2>
            }

            return <p key={i}><Linkify>{line}</Linkify></p>
        });

        return formattedText;
    }

    getPostImages(images) {
        if( images.length <=  0) { return }

        const allImages = images.map((image, i) => {
            console.log(image);
            return(
                <div key={i}>
                    <img src={ image.imageUrl } alt={ image.caption }/>
                    <span>{ image.caption }</span>
                </div>
            );
        });

        return allImages;
    }

    getDyeSources(post) {
        return <div>{ post.dyeSources }</div> ; 
    }

    getFibreAndMaterials(post) {
        const fibreAndMaterials = [post.fibresUsed, post.materials].map((text, i) => {
            const listItems = text.split(',').map((item, index)=> {
                return <li key={index}>{ item.trim() }</li>;
            });
            return (
                <div key={`sidebar-item-${i}`}>
                    <ul>{ listItems }</ul>
                </div>
            );
        });

        return fibreAndMaterials;
    }

    getSafety(post) {
       return <div>{ post.safetyDisposal }</div> ;
    }

    render () {
        if (this.props.getPostQuery && this.props.getPostQuery.loading) {
            return <div>Loading</div>
        }

        const { postId } = this.props.match.params;
        const post = this.props.getPostQuery.Post;
        const formattedText = this.formatPostText(post.description);
        
        return(
            <div className='container-fluid'>
                <div className='col-xs-12 col-md-5'>
                    { this.getPostImages(post.postImages)}
                </div>
                <div className='col-xs-12 col-md-5'>
                    <h2>{post.postTitle}</h2>
                    { formattedText }
                </div>
                <div className='col-xs-12 col-md-2'>
                    { this.getDyeSources(post) }
                    { this.getFibreAndMaterials(post) }
                    { this.getSafety(post) }
                </div>
            </div>
        );
    }
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
            postedBy {
                id
                username
            }
            materials
            fibresUsed
            sources {
                name
            }
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
})(Post);