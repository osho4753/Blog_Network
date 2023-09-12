import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import '../css/Tags.css';

export const CommentsBlock = ({ items, children}) => {
  return (
      <List className="comments-list">
        {items.map(e=>e.map(e=>(
          <>
              <ListItem alignItems="flex-start" className="comment-item">
              <ListItemAvatar>
                  <Avatar alt={e.user.fullName} src={e.user.imageUrl} className="comment-avatar" />
              </ListItemAvatar>
                <ListItemText
                  primary={e.user.fullName}
                  secondary={e.text}
                  className="comment-text" 
                />
            </ListItem>
            <Divider variant="inset" component="li" className="comment-divider" />
            </>
       )))
        }
        {children}
      </List>
      
  );
};