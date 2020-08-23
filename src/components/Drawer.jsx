import React from "react";
import { Fab, Icon, Tooltip } from "@material-ui/core";

class Drawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { opened: true };
  }

  handleToggleOpen = () => {
    this.setState((state) => ({ opened: !state.opened }));
  };

  render() {
    let className = "drawer";
    if (this.state.opened) {
      className += " opened";
    }
    return (
      <div className={className}>
        <div className="bar">
          <Tooltip title={this.state.opened ? "Close" : "Discover More!"}>
            <Fab onClick={this.handleToggleOpen}>
              <Icon>{this.state.opened ? "close" : "more_vert"}</Icon>
            </Fab>
          </Tooltip>
          <Tooltip title="Upload Your Pattern!">
            <Fab>
              <Icon>add</Icon>
            </Fab>
          </Tooltip>
        </div>
        <div className="content">{this.props.children}</div>
      </div>
    );
  }
}

export default Drawer;
