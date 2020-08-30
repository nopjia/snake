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
        <div className="left">
          <Fab onClick={props.onReset}>
            <Icon>refresh</Icon>
          </Fab>
          <Fab onClick={props.onFocus}>
            <Icon>center_focus_strong</Icon>
          </Fab>
        </div>
        <div className="center">
          <Fab onClick={props.onMoveLeft}>
            <Icon>arrow_backward</Icon>
          </Fab>
          <Fab onClick={props.onRotateLeft}>
            <Icon>undo</Icon>
          </Fab>
          <Fab onClick={props.onRotateRight}>
            <Icon>redo</Icon>
          </Fab>
          <Fab onClick={props.onMoveRight}>
            <Icon>arrow_forward</Icon>
          </Fab>
        </div>
        <div className="right">
          <Fab onClick={props.onCamera}>
            <Icon>camera_alt</Icon>
          </Fab>
          <Fab onClick={props.onToggle}>
            <Icon>{props.opened ? "close" : "collections"}</Icon>
          </Fab>
        </div>
      </div>
      <div className="content">{props.children}</div>
    </div>
  );
};

export default Drawer;
