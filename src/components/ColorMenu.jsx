import React from "react";
import { Fab, Tooltip, Icon } from "@material-ui/core";

const ColorMenu = (props) => {
  let panelClassName = "colorpanel";
  if (props.opened) {
    panelClassName += " open";
  }
  return (
    <div className="colormenu">
      <Fab className={panelClassName} variant="extended">
        <input type="color" defaultValue="#ffffff" onChange={props.onChange1} />
        <input type="color" defaultValue="#8888ff" onChange={props.onChange2} />
      </Fab>
      <Tooltip title="Change Colors">
        <Fab onClick={props.onToggle}>
          <Icon>palette</Icon>
        </Fab>
      </Tooltip>
    </div>
  );
};

export default ColorMenu;
