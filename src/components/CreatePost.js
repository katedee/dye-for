import React from 'react';
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
        imageUrl: [],
        imageId: []
    }
  }

  componentWillMount() {
    if(localStorage.getItem("post")) {
      const postImages = JSON.parse(localStorage.getItem("post")).imageUrl;
      const postImagesId = JSON.parse(localStorage.getItem("post")).imageId;

      this.setState({
        imageUrl: postImages,
        imageId: postImagesId
      });
    }
  }

  saveImages () {
    console.log(this.state);
    if(localStorage.getItem("post")) {
      const postData = JSON.parse(localStorage.getItem("post"));
      postData.imageUrl = this.state.imageUrl;
      postData.imageId = this.state.imageId;

      localStorage.setItem("post", JSON.stringify(postData));
    } else {
      localStorage.setItem("post", JSON.stringify(this.state));
    }

    this.renderImages();
  }

  renderImages () {
    //check localStorage on init load
    //then use state
    if(!this.state.imageUrl.length) {
      console.log('no images saved');
      return;
    }
    
    const images = this.state.imageUrl;
    console.log(this.state.imageUrl);

    const postImages = images.map((image, i) => {
      console.log(image);
      return <PostImage url={image} key={i}/>;
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
        imageId: this.state.imageId.concat(image.id),
        imageUrl: this.state.imageUrl.concat(image.url),
      });
      //save this to localStorage (and clear this storage once posted)
      //render images
      this.saveImages();
    })
  }
}

export default CreatePost;

// upload the image
// set state imageId and Urk
// create PostImage
//c clear state      