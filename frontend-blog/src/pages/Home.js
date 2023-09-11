import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import {useDispatch,useSelector} from 'react-redux';
import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock.js';
import { CommentsBlock } from '../components/CommentsBlock';
import '../css/index.css';
import { fetchPosts, fetchTags } from '../redux/slices/posts';
import { selectUserData } from '../redux/slices/auth';
export const Home = () => {
  const dispatch = useDispatch();

  const userData = useSelector(selectUserData);
  const {posts,tags} = useSelector((state)=>state.posts);

  const postLoading = posts.status === "loading"
  const tagsLoading = tags.status === "loading"

  React.useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
  },[])
  
  return (
    <div className="home-container">
      <div className="tabs-container">
        <Tabs value={0}>
          <Tab label="New" />
          <Tab label="Popular" />
        </Tabs>
      </div>
      <div className="content-container">
        <Grid container spacing={4}>
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
            <TagsBlock items={tags.items} isLoading={tagsLoading}/>
            <CommentsBlock
              items={[
                {
                  user: {
                    fullName: 'Roma Mamanov',
                    avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                  },
                  text: 'test komment',
                },
                {
                  user: {
                    fullName: 'ivan ivanov',
                    avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                  },
                  text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
                },
              ]}
              isLoading={false}
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
