import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import Dropzone from 'react-dropzone';
import PostImage from './PostImage';

class CreatePost extends React.Component {
  constructor() {
    super()
    this.state = {
        description: '',
        title: '',
        sources: '',
        materials: '',
        fibre: '',
        safety: '',
        images: []
    }
    this.updateCaption = this.updateCaption.bind(this);
  }

  componentWillMount() {
    if(localStorage.getItem("post")) {
      const postImages = JSON.parse(localStorage.getItem("post")).images;

      this.setState({
        images: postImages
      });
    }
  }

  async removeImage (e, fileId) {
    await this.props.deleteFileMutation({
      variables: {
        fileId
      }
    });

    const imageIndex = this.state.images.findIndex((image) => { return image.imageId === fileId });

    this.setState({
      images: [
        ...this.state.images.slice(0, imageIndex),
        ...this.state.images.slice(imageIndex + 1)
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
      postData.images = this.state.images

      localStorage.setItem("post", JSON.stringify(postData));
    } else {
      localStorage.setItem("post", JSON.stringify(this.state));
    }

    this.renderImages();
  }

  updateCaption(e, imageId){
    this.setState({
      // find the image with the same url property value
      images: this.state.images.map(image => image.imageId === imageId ?
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
    if(!this.state.images) {
      console.log('no images saved');
      return;
    }
    
    const images = this.state.images;

    const postImages = images.map((image, i) => {
      return <PostImage key={i} onChange={this.updateCaption} {...image}/>;
    });

    return postImages;
  }

  render () {
      const postImages = this.renderImages();

      return (
          <div>
            <div className='col-sm-12 col-sm-offset-0 col-md-8 col-md-offset-2'>
              <input
                  value={this.state.title}
                  onChange={(e) => this.setState({ title: e.target.value })}
                  type='text'
                  placeholder='Enter the Post Title' 
              />
              <textarea
                  value={this.state.description}
                  onChange={(e) => this.setState({ description: e.target.value })}
                  type='text'
                  placeholder='Enter post description here'
              ></textarea>
              <input
                value={this.state.sources}
                onChange={(e) => this.setState({ sources: e.target.value })}
                type='text'
                placeholder='Enter the dyesources, seperated by a comma, here' 
              />
              <hr/>
              <div><p>Image uploader here eventually</p></div>
              <textarea
                value={this.state.fibre}
                onChange={(e) => this.setState({ fibre: e.target.value })}
                type='text'
                placeholder='Enter a list of fibre used, seperate by commas'
              ></textarea>

              <textarea
                value={this.state.materials}
                onChange={(e) => this.setState({ materials: e.target.value })}
                type='text'
                placeholder='Enter a list of materials, seperate by a comma'
              ></textarea>
              <textarea
                value={this.state.safety}
                onChange={(e) => this.setState({ safety: e.target.value })}
                type='text'
                placeholder='Enter safety and disposal tips here'
              ></textarea>
              {postImages}
              <Dropzone
                onDrop={this.onDrop}
                accept='image/*'
                multiple={false}
              >
                Drag and drop an image here, or click to select a file!
              </Dropzone>
              <button>
              Submit
              </button>
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
        images: this.state.images.concat({
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
// const ADD_POST_MUTATION = `gql
//   mutation AddNewPostMutation () {
//     description: 
//     postTitle: 
//     postImages: 
//     safetyDisposal: 
//     postedBy: 
//     materials: 
//     fibresUsed: 
//     sources: 
//     dyeSources: 
//   }
// `

export default graphql(DELETE_FILE_MUTATION, { name: 'deleteFileMutation' })(CreatePost);

// upload the image
// set state imageId and Urk
// create PostImage
//c clear state      

// PREVIEW THE POST
// POST THE POST