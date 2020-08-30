import React from "react";
import { Fab, Icon } from "@material-ui/core";

class Drawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { opened: props.opened };
  }

  handleToggleOpen = () => {
    this.setState((state) => {
      const opened = !state.opened;
      this.props.onToggle && this.props.onToggle(opened);
      return { opened };
    });
  };

  render() {
    let className = "drawer";
    if (this.state.opened) {
      className += " opened";
    }
    return (
      <div className={className}>
        <div className="bar">
          <Fab
            onClick={this.props.onCamera}
            style={{ position: "absolute", left: "0" }}
          >
            <Icon>camera_alt</Icon>
          </Fab>
          <Fab onClick={this.props.onRotateLeft}>
            <Icon>undo</Icon>
          </Fab>
          <Fab onClick={this.props.onRotateRight}>
            <Icon>redo</Icon>
          </Fab>
          <Fab
            onClick={this.handleToggleOpen}
            style={{ position: "absolute", right: "0" }}
          >
            <Icon>{this.state.opened ? "close" : "collections"}</Icon>
          </Fab>
        </div>
        <div className="content">{this.props.children}</div>
      </div>
    );
  }
}

export default Drawer;
