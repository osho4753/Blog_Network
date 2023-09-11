import React from 'react';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import EyeIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import { UserInfo } from './UserInfo';
import {  useDispatch } from 'react-redux';
import '../css/Post.css'; 
import { fetchDelete } from '../redux/slices/posts';

export const Post = ({
  _id,
  title,
  createdAt,
  postUrl,
  user,
  viewsCount,
  commentsCount,
  tags,
  children,
  isFullPost,
  isLoading,
  isEditable,
}) => {
  const dispatch = useDispatch();
  const onClickRemove = () => {
    if(window.confirm('Are you sure you want to delete this post?')){
      dispatch(fetchDelete(_id));
    } 
  };
  return (
    <div className="post-container"> 
      {isEditable && (
        <div className="buttons">
          <Link to={`/posts/${_id}/edit`}>
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
          </Link>
          <IconButton onClick={onClickRemove} color="secondary">
            <DeleteIcon />
          </IconButton>
        </div>
      )}
      {postUrl && (
        <img
          className="post-image"
          src={postUrl}
          alt={title}
        />
      )}
      <div className="post-head">
        <UserInfo {...user}/>
        <div className="post-date">
        {createdAt.replace(/T.+/,'')}
        </div>
        <div className="post-head">
          <h2 className="link-post">
            {isFullPost ? title : <Link to={`/posts/${_id}`}>{title}</Link>}
          </h2>
          <ul className="tags">
            {tags.map((name) => (
              <li key={name}>
                <Link to={`/tags/${name}`}>#{name}</Link>
              </li>
            ))}
          </ul>
          {children && <div className="child">{children}</div>}
          <ul className="post-details">
            <li>
              <EyeIcon />
              <span>{viewsCount}</span>
            </li>
            <li>
              <CommentIcon />
              <span>{commentsCount}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};