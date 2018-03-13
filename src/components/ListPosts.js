import React from 'react';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';


class ListPosts extends React.Component {

    render() {
        if (this.props.data.loading) {
            return (<div>Loading</div>)
        }

        console.log(this.props.data);
        return (
            <div className='w-100 flex justify-center'>
                <div className='w-100' style={{ maxWidth: 400 }}>
                    {this.props.data.allPosts.map(post =>
                        <p key={post.id}>{post.postTitle}</p>
                    )}
                </div>
            </div>
        )
    }
}

const ALL_POSTS = gql`
    query AllPostsQuery {
        allPosts {
            id
            description
            postTitle
        }
    }
`

export default graphql(ALL_POSTS)(ListPosts);
// export default ListPosts;
