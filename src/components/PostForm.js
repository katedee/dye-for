import React from 'react';
import Dropzone from 'react-dropzone';

const PostForm = (props) => 
    <div className='col-sm-12 col-sm-offset-0 col-md-8 col-md-offset-2'>
        <input
            defaultValue={props.postTitle}
            onChange={(e) => props.handleChange('postTitle', e.target.value)}
            type='text'
            placeholder='Enter the Post Title'
        />
        <textarea
            defaultValue={props.description}
            onChange={(e) => props.handleChange('description', e.target.value)}
            type='text'
            placeholder='Enter post description here'
        ></textarea>
        <input
            defaultValue={props.dyeSources}
            onChange={(e) => props.handleChange('dyeSources', e.target.value)}
            type='text'
            placeholder='Enter the dyesources, seperated by a comma, here'
        />
        <hr />
        <textarea
            defaultValue={props.fibresUsed}
            onChange={(e) => props.handleChange('fibresUsed', e.target.value)}
            type='text'
            placeholder='Enter a list of fibre used, seperate by commas'
        ></textarea>

        <textarea
            defaultValue={props.materials}
            onChange={(e) => props.handleChange('materials', e.target.value)}
            type='text'
            placeholder='Enter a list of materials, seperate by a comma'
        ></textarea>
        <textarea
            defaultValue={props.safetyDisposal}
            onChange={(e) => props.handleChange('safetyDisposal', e.target.value)}
            type='text'
            placeholder='Enter safety and disposal tips here'
        ></textarea>
        {props.postImages}
        <Dropzone
            onDrop={props.onDrop}
            accept='image/*'
            multiple={false}
        >
            Drag and drop an image here, or click to select a file!
            </Dropzone>
        <button className='pa3 bg-black-10 bn dim ttu pointer' onClick={props.handlePost}>Post</button>
    </div>



export default PostForm;