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
        commentsCount={3}
        tags={data.tags}
        isFullPost
      >
        <p> {data.text} </p>
        
      </Post>
      <CommentsBlock
        items={[
          {
            user: {
              fullName: "Вася Пупкин",
              avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
            },
            text: "Это тестовый комментарий 555555",
          },
          {
            user: {
              fullName: "Иван Иванов",
              avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
            },
            text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
          },
        ]}
        isLoading={false}
      >
        <Index />
      </CommentsBlock>
      </div>
    </>
  );
      
};