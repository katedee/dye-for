import React from 'react'
import { Link } from 'react-router-dom'


export default class CreateNewPostLink extends React.Component {
  render() {
    return (
      <Link to='/create/post' className='fixed bg-white top-0 right-0 pa4 ttu dim black no-underline'>
        + New Post
      </Link>
    )
  }
}