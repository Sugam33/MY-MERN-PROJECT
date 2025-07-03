import React from 'react'
import SmallBanner from './SmallBanner'
import BlogCards from './BlogCards';

const Blogs = () => {
  let blogsTitle = "Blogs";
  return ( 
    <div>
        <SmallBanner /> 
        <h3 className='title'>{blogsTitle}</h3>

        <BlogCards />
    </div>
  )
}

export default Blogs
