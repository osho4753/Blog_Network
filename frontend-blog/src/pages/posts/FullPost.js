import React from "react";
import {useParams} from "react-router-dom";
import { Post } from "../../components/Post";
import { Index } from "../../components/AddComment";
import { CommentsBlock } from "../../components/CommentsBlock";

import config from '../../config';

export const FullPost = () => {
  const [data,setData] = React.useState();

  const [Loading,setLoading] = React.useState(true);

  const { id } = useParams();

  React.useEffect(()=>{
    config.get(`/posts/${id}`)
    .then((res)=>{
     setData(res.data)
     setLoading(false);
    })
    .catch(error => {
      console.error(error)
    })
  },[id])


  if (Loading) {
    return <div>Loading...</div>; 
  }
  console.log(data,'roma smari')
  return (
    <>
    <div className="full-post">
      <Post
        _id={data._id}
        title={data.title}
        postUrl={data.postUrl}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={data.comments.length}
        tags={data.tags}
        isFullPost
      >
        <p> {data.text} </p>
        
      </Post>
      <CommentsBlock
        items={ data.comments.map(comment => [
          {
            user: comment.user,
            text: comment.text ,
          },
        ])
      }
        isLoading={false}
      >
        <Index />
      </CommentsBlock>
      </div>
    </>
  );
      
};