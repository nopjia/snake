import React from "react";
import { Fab, Icon } from "@material-ui/core";

const Drawer = (props) => {
  let className = "drawer";
  if (props.opened) {
    className += " opened";
  }
  return (
    <div className={className}>
      <div className="bar">
        <Fab
          onClick={props.onCamera}
          style={{ position: "absolute", left: "0" }}
        >
          <Icon>camera_alt</Icon>
        </Fab>
        <Fab onClick={props.onRotateLeft}>
          <Icon>undo</Icon>
        </Fab>
        <Fab onClick={props.onRotateRight}>
          <Icon>redo</Icon>
        </Fab>
        <Fab
          onClick={props.onToggle}
          style={{ position: "absolute", right: "0" }}
        >
          <Icon>{props.opened ? "close" : "collections"}</Icon>
        </Fab>
      </div>
      <div className="content">{props.children}</div>
    </div>
  );
};

export default Drawer;
