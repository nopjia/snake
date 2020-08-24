import React from "react";
import GalleryItem from "./GalleryItem";

const GalleryList = (props) => {
  let elems;
  if (props.items) {
    elems = props.items.map((item) => {
      return (
        <GalleryItem item={item} onClick={props.onItemClick} key={item.id} />
      );
    });
  }

  return <div className="gallerylist">{elems}</div>;
};

export default GalleryList;
