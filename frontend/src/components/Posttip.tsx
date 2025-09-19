import { useState } from "react";

type Post = {
  title: string,
  body: string,
}

type PosttipProps = {
  posts: Post[]
}

export const Posttip = ({posts}: PosttipProps) => {
  const [currentPost, setCurrentPost] = useState(0);

  const handleNext = () => {
    setCurrentPost((currPost) => currPost === posts.length-1 ? 0 : currPost + 1)
  }

  const handlePrevious = () => {
    setCurrentPost((currPost) => currPost === 0 ? posts.length-1 : currPost - 1)
  }

  return (
    <div className='text-black text-center'>
      {
        posts.map((post: Post, i) => {
          return (
            <div key={i} className={currentPost === i ? "block" : "hidden"}>
              <h3 className='font-bold'>{post.title}</h3>
              <p>{post.body}</p>
            </div>
          )
        })
      }
      <div className='flex justify-center text-2xl m-1'>
        <div className='font-bold cursor-pointer p-1' onClick={handleNext}>&lt;</div>
        <div className='font-bold cursor-pointer p-1' onClick={handlePrevious}>&gt;</div>
      </div>
    </div>
  )
}
