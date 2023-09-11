import { useParams } from "react-router-dom";
import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Post } from '../components/Post';
import { useDispatch,useSelector } from 'react-redux';
import {fetchPostsByTag} from '../redux/slices/posts'
import { selectUserData } from '../redux/slices/auth';
import '../css/index.css';

export const Tags = () => {
    const {name} = useParams();

    const userData = useSelector(selectUserData);

    const {posts} = useSelector((state)=>state.posts);

    const postLoading = posts.status === "loading"

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchPostsByTag(name));
      }, [name]);

   return (
    <div className="home-container">
          <Typography className="custom-h1" variant="h3">Posts by tagName: #{name}</Typography>
          <Grid xs={8} item className="posts-container">
            {(postLoading ? [] : posts.items).map ((obj,index) => postLoading ? (
              <Post/>
            ):(
              <Post
                _id={obj._id}
                title={obj.title}
                postUrl={obj.postUrl}
                user={obj.user}
                createdAt={obj.createdAt}
                viewsCount={obj.viewsCount}
                commentsCount={3}
                tags={obj.tags}
                isEditable = {userData?._id === obj.user._id}
              />
            ))}
          </Grid>
          <Grid xs={4} item>
          </Grid>
    </div>
  );
};