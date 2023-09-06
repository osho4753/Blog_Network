import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock.js';
import { CommentsBlock } from '../components/CommentsBlock';
import '../css/index.css';

export const Home = () => {
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
            {[...Array(5)].map((_, index) => (
              <Post
                key={index}
                id={index + 1}
                title="Roast the code #1 | Rock Paper Scissors"
                imageUrl="https://res.cloudinary.com/practicaldev/image/fetch/s--UnAfrEG8--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/icohm5g0axh9wjmu4oc3.png"
                user={{
                  avatarUrl:
                    'https://res.cloudinary.com/practicaldev/image/fetch/s--uigxYVRB--/c_fill,f_auto,fl_progressive,h_50,q_auto,w_50/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/187971/a5359a24-b652-46be-8898-2c5df32aa6e0.png',
                  fullName: 'Keff',
                }}
                createdAt={'12 june 2023'}
                viewsCount={150}
                commentsCount={3}
                tags={['react', 'fun', 'typescript']}
                isEditable
              />
            ))}
          </Grid>
          <Grid xs={4} item>
            <TagsBlock items={['react', 'typescript', 'заметки']} isLoading={false} />
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
