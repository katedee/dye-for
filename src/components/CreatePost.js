import React from 'react';

class CreatePost extends React.Component {
    render () {
        return (
            <div>
              <div className='flex flex-column mt3'>
                <input
                  className='mb2'
                  {/*
                    value={this.state.description}
                    onChange={(e) => this.setState({ description: e.target.value })}
                    type='text'
                    placeholder='A description for the link'
                  */}
                />
                <input
                  className='mb2'
                  { /* 
                    value={this.state.url}
                    onChange={(e) => this.setState({ url: e.target.value })}
                    type='text'
                    placeholder='The URL for the link' 
                    */ }
                />
              </div>
              <button>
                Submit
              </button>
            </div>
        )
    }
}

export default CreatePost;