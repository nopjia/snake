import React from "react";
import { Card } from "@material-ui/core";

const GalleryItem = (props) => {
  return (
    <Card
      className="galleryitem"
      onClick={() => props.onClick && props.onClick(props.item)}
    >
      <div
        className="image"
        style={{ backgroundImage: `url(${props.item.image})` }}
      />
      <div className="label">{props.item.name}</div>
    </Card>
  );
};

export default GalleryItem;
