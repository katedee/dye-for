import React from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import { withRouter } from 'react-router'

import Dropzone from 'react-dropzone';
import PostImage from './PostImage';

// import GET_POST_QUERY from './../graphql/GetPost.graphql';

class EditPost extends React.Component {
  constructor() {
    super()
    this.state = {
        description: '',
        postTitle: '',
        dyeSources: '',
        materials: '',
        fibresUsed: '',
        safetyDisposal: '',
        postImages: []
    }
    this.updateCaption = this.updateCaption.bind(this);
  }

  async removeImage (e, fileId) {
    await this.props.deleteFileMutation({
      variables: {
        fileId
      }
    });

    const imageIndex = this.state.postImages.findIndex((image) => { return image.imageId === fileId });

    this.setState({
      postImages: [
        ...this.state.postImages.slice(0, imageIndex),
        ...this.state.postImages.slice(imageIndex + 1)
      ]
    });
  }

  saveImages () {
    /*
    ** Check to see if we already have a post-in-progress saved in storage.
    ** If yes, get that, parse it, add the new images to it, and save
    **
    ** Otherwise, just send the entire state to be saved if it's a brand new post.
    */
    if(localStorage.getItem("post")) {
      const postData = JSON.parse(localStorage.getItem("post"));
      postData.postImages = this.state.postImages

      localStorage.setItem("post", JSON.stringify(postData));
    } else {
      localStorage.setItem("post", JSON.stringify(this.state));
    }

    this.renderImages();
  }

  updateCaption(e, imageId){
    this.setState({
      // find the image with the same url property value
      postImages: this.state.postImages.map(image => image.imageId === imageId ?
        // update the caption of the matched item
        {...image, imageCaption: e.target.value} :
        // or just return the image
        image
      )
    });
  }

  renderImages () {
    //check localStorage on init load
    //then use state
    // if(!this.state.postImages) {
    //   console.log('no images saved');
    //   return;
    // }
    
      const images = this.props.getPostQuery.Post.postImages;

    const postImages = images.map((image, i) => {
      return <PostImage key={i} onChange={this.updateCaption} {...image}/>;
    });

    return postImages;
  }

  handlePost = async () => {
    const loggedInUser = this.props.data.loggedInUser

    // redirect if no user is logged in
    if(!loggedInUser) {
      console.warn('Only logged in users can create new posts')
      return
    }

    const { 
      description,
      dyeSources,
      fibresUsed,
      materials,
      postImages,
      postTitle,
      safetyDisposal,
    } = this.state

    const postImagesData = postImages.map((image, i) => {
      return {
        'caption': image.imageCaption,
        'imageUrl': image.imageUrl,
        'fileId': image.imageId
      }
    });

    const authorId = loggedInUser.id

    console.log(postImagesData)

    
    console.log('posted post')
    //this.props.history.push('/')
  }

  render () {
      
      if (this.props.getPostQuery && this.props.getPostQuery.loading) {
            return <div>Loading</div>
        }

      // PARSE GET QUERY INSTEAD
      const {
          description,
          postTitle,
          dyeSources,
          materials,
          fibresUsed,
          safetyDisposal,
          postImages
      } = this.props.getPostQuery.Post;

    console.log(this.props.getPostQuery.Post.postImages);

        
    const postImagess = this.renderImages();

      const { postId } = this.props.match.params;
      const post = this.props.getPostQuery.Post;

      return (
          <div>
            <div className='col-sm-12 col-sm-offset-0 col-md-8 col-md-offset-2'>
              <input
                  defaultValue={postTitle}
                  onChange={(e) => this.setState({ postTitle: e.target.value })}
                  type='text'
                  placeholder='Enter the Post Title' 
              />
              <textarea
                  defaultValue={description}
                  onChange={(e) => this.setState({ description: e.target.value })}
                  type='text'
                  placeholder='Enter post description here'
              ></textarea>
              <input
                defaultValue={dyeSources}
                onChange={(e) => this.setState({ dyeSources: e.target.value })}
                type='text'
                placeholder='Enter the dyesources, seperated by a comma, here' 
              />
              <hr/>
              <div><p>Image uploader here eventually</p></div>
              <textarea
                defaultValue={fibresUsed}
                onChange={(e) => this.setState({ fibresUsed: e.target.value })}
                type='text'
                placeholder='Enter a list of fibre used, seperate by commas'
              ></textarea>

              <textarea
                defaultValue={materials}
                onChange={(e) => this.setState({ materials: e.target.value })}
                type='text'
                placeholder='Enter a list of materials, seperate by a comma'
              ></textarea>
              <textarea
                defaultValue={safetyDisposal}
                onChange={(e) => this.setState({ safetyDisposal: e.target.value })}
                type='text'
                placeholder='Enter safety and disposal tips here'
              ></textarea>
              {postImagess}
              <Dropzone
                onDrop={this.onDrop}
                accept='image/*'
                multiple={false}
              >
                Drag and drop an image here, or click to select a file!
              </Dropzone>
              <button className='pa3 bg-black-10 bn dim ttu pointer' onClick={this.handlePost}>Post</button>
            </div>
          </div>
      )
  }//close render

  onDrop = (files) => {
    // prepare form data, use data key!
    let data = new FormData()
    data.append('data', files[0])

    // use the file endpoint
    fetch('https://api.graph.cool/file/v1/cj70tva881t4c0197qhlept5q', {
      method: 'POST',
      body: data
    }).then(response => {
      return response.json()
    }).then(image => {
      this.setState({
        postImages: this.state.postImages.concat({
          imageUrl: image.url,
          imageId: image.id,
          imageCaption: ''
        })
      });
      //save this to localStorage (and clear this storage once posted)
      //render images
      this.saveImages();
    })
  }
}

const DELETE_FILE_MUTATION = gql`
  mutation DeleteFileMutation ($fileId: ID!) {
    deleteFile(id: $fileId) {
      file {
        id
      }
    }
  }
`

// const CREATE_POST = gql`
//   mutation CreatePost(
//     $authorId: ID!
//     $description: String!
//     $dyeSources: String!
//     $fibresUsed: String!
//     $materials: String!
//     $postImagesData: [PostpostImagesPostImage!]! 
//     $postTitle: String!
//     $safetyDisposal: String!
//   ){
//     createPost(
//       authorId: $authorId
//       description: $description
//       dyeSources: $dyeSources
//       fibresUsed: $fibresUsed
//       materials: $materials
//       postImages: $postImagesData
//       postTitle: $postTitle
//       safetyDisposal: $safetyDisposal
//     ){
//       id
//     }
//   }
// `

const LOGGED_IN_USER = gql`
  query LoggedInUser {
    loggedInUser {
      id
    }
  }
`

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

export default compose(
    graphql(DELETE_FILE_MUTATION, { name: 'deleteFileMutation' }),
    graphql(LOGGED_IN_USER, { fetchPolicy: 'network-only' }),
    graphql(GET_POST_QUERY, {
        name: 'getPostQuery',
        options: (ownProps) => {
            const postId = ownProps.match.params.postId;
            return {
                variables: { postId }
            }
        }
    }),
)(withRouter(EditPost))

// MAY ALSO RETRIEVE FROM LOCAL STORAGE
// SAVE TO EDITPOST
// CHECK EDIT POST

// ALSO, THIS IS V SIMILAR TO CREATPOST
// CREATE A HOC

// REPLACE POST WITH UPDATE

