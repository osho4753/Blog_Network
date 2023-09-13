import React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import TagIcon from "@mui/icons-material/Tag";
import ListItemText from "@mui/material/ListItemText";
import Skeleton from "@mui/material/Skeleton";
import { SideBlock } from "./SideBlock/SideBlock";
import '../css/Tags.css';

export const TagsBlock = ({ items, isLoading = true }) => {

  return (
    <SideBlock>
      <div className="tags-block-container"> 
        <List className="tag-list"> 
          {(isLoading ? [...Array(5)] : items).map((name, i) => (
            <a
              className="tag-item" 
              href={`/tags/${name}`}
              key={i}
              disablePadding
            >
              <ListItemButton>
                <ListItemIcon>
                  <TagIcon />
                </ListItemIcon>
                  {isLoading ? <Skeleton width={100} /> : <ListItemText primary={name} />}
              </ListItemButton>
            </a>
          ))}
        </List>
      </div>
    </SideBlock>
  );
};