import React from "react";
import GalleryItem from "./GalleryItem";

const GalleryList = (props) => {
  let elems;
  if (props.items) {
    elems = props.items.map((item, index) => {
      return (
        <GalleryItem
          item={item}
          onClick={props.onItemClick}
          key={item.id ?? index}
        />
      );
    });
  }

  return <div className="gallerylist">{elems}</div>;
};

export default GalleryList;
