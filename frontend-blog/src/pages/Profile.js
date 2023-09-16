import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserData } from '../redux/slices/auth';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Post } from '../components/Post';
import '../css/index.css';
import { fetchPosts } from '../redux/slices/posts';

export const Profile = () => {
    const dispatch = useDispatch();

    const userData = useSelector(selectUserData);

    const { posts } = useSelector((state) => state.posts);

    const postLoading = posts.status === 'loading';
    
    React.useEffect(() => {
      dispatch(fetchPosts());
    }, [dispatch]);
    
    const myPost = posts.items.filter(e => e.user._id === userData._id);
    
    if(!userData)

    return (<div>
        loading...
    </div>)

    return (
        <Paper>
            <Grid>
                <div className="centered-text">
                    <Typography  variant="h3">
                        {userData.fullName}
                    </Typography>
                    
                </div>
                <div className="centered-avatar">
                    <Avatar
                        alt="User Avatar"
                        src={userData.imageUrl}
                        sx={{ width: 200, height: 200 }}
                    />
                </div>  
            <Grid xs={8} item className="posts-container">
                {postLoading ? (
                     'Loading posts...'
                    ) : myPost.length === 0 ? (
                        <Typography>
                                No posts yet, 
                            <Link to="/add-post">
                                <Button>Start Now</Button>
                            </Link>
                        </Typography>
                    ) : (myPost.map((e) => (
                        <Post
                            key={e._id}
                            _id={e._id}
                            title={e.title}
                            postUrl={e.postUrl}
                            user={e.user}
                            createdAt={e.createdAt}
                            viewsCount={e.viewsCount}
                            commentsCount={e.comments.length}
                            tags={e.tags}
                            isEditable={userData?._id === e.user?._id}
                        />
                    ))
                )}
                </Grid>
            </Grid>
        </Paper>
    );
}