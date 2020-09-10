import React from "react";
import { Fab, Icon, Tooltip } from "@material-ui/core";

const Drawer = (props) => {
  const style = {};
  if (props.opened) {
    style.transform = "translateY(0%)";
  }
  return (
    <div className="drawer" style={style}>
      <div className="bar">
        <div className="left">
          <Tooltip title="Reset Snake">
            <Fab onClick={props.onReset}>
              <Icon>refresh</Icon>
            </Fab>
          </Tooltip>
          <Tooltip title="Center Camera">
            <Fab onClick={props.onFocus}>
              <Icon>center_focus_strong</Icon>
            </Fab>
          </Tooltip>
        </div>
        <div className="center">
          <Tooltip title="Previous Block">
            <Fab onClick={props.onMoveLeft}>
              <Icon>arrow_backward</Icon>
            </Fab>
          </Tooltip>
          <Tooltip title="Rotate">
            <Fab onClick={props.onRotateLeft}>
              <Icon>undo</Icon>
            </Fab>
          </Tooltip>
          <Tooltip title="Rotate">
            <Fab onClick={props.onRotateRight}>
              <Icon>redo</Icon>
            </Fab>
          </Tooltip>
          <Tooltip title="Next Block">
            <Fab onClick={props.onMoveRight}>
              <Icon>arrow_forward</Icon>
            </Fab>
          </Tooltip>
        </div>
        <div className="right">
          <Tooltip title="Submit Shape">
            <Fab onClick={props.onCamera}>
              <Icon>camera_alt</Icon>
            </Fab>
          </Tooltip>
          <Tooltip title={props.opened ? "Close" : "Open Gallery"}>
            <Fab onClick={props.onToggle}>
              <Icon>{props.opened ? "close" : "collections"}</Icon>
            </Fab>
          </Tooltip>
        </div>
      </div>
      <div className="content">{props.children}</div>
    </div>
  );
};

export default Drawer;
