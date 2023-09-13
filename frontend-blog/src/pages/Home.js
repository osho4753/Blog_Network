import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock.js';
import '../css/index.css';
import { fetchPosts, fetchTags } from '../redux/slices/posts';
import { selectUserData } from '../redux/slices/auth';
import { Typography } from '@mui/material';

export const Home = () => {
  const dispatch = useDispatch();

  const userData = useSelector(selectUserData);

  const { posts, tags } = useSelector((state) => state.posts);

  const postLoading = posts.status === 'loading';
  const tagsLoading = tags.status === 'loading';

  const [selectedTab, setSelectedTab] = useState(0);

  React.useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
  }, [dispatch]);

  const sortPostsByViews = (a, b) => {
    return b.viewsCount - a.viewsCount;
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  let sortedPosts = postLoading ? [] : [...posts.items];

  if (selectedTab === 0) {
    sortedPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } else {
    sortedPosts.sort(sortPostsByViews);
  }

  return (
    <div className="home-container">
      <Tabs value={selectedTab} onChange={handleTabChange}>
        <Tab label="New" />
        <Tab label="Popular" />
      </Tabs>
      <div className="content-container">
        <Grid xs={8} item className="posts-container">
          {postLoading
            ? 'Loading posts...' 
            : sortedPosts.map((obj) => (
                <Post
                  key={obj._id}
                  _id={obj._id}
                  title={obj.title}
                  postUrl={obj.postUrl}
                  user={obj.user}
                  createdAt={obj.createdAt}
                  viewsCount={obj.viewsCount}
                  commentsCount={obj.comments.length}
                  tags={obj.tags}
                  isEditable={userData?._id === obj.user?._id}
                  />
              ))}
        </Grid>
        <Grid xs={4} item>
          <Typography variant="h6">Find posts by tag</Typography>
          <TagsBlock items={tags.items} isLoading={tagsLoading} />
        </Grid>
      </div>
    </div>
  );
};
