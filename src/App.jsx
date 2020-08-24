import React from "react";
import "./App.css";
import { Container } from "@material-ui/core";
import axios from "axios";
import Drawer from "./components/Drawer";
import GalleryList from "./components/GalleryList";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      shapes: [],
    };

    this.firstOpened = false;
  }

  handleItemClick = (item) => {
    console.log("clicked", item.name);
  };

  handleDrawerToggle = async (opened) => {
    if (!opened || this.firstOpened) {
      return;
    }
    this.firstOpened = true;

    const res = await axios.get("https://snake-loopback.herokuapp.com/shapes");
    this.setState({ shapes: res.data });
  };

  render() {
    return (
      <div className="App">
        <div className="canvas bg_checker" />
        <Drawer onToggle={this.handleDrawerToggle}>
          <Container>
            <h1>Official Patterns</h1>
            <GalleryList
              items={this.state.shapes}
              onItemClick={this.handleItemClick}
            />
            <h1>Submitted Patterns</h1>
          </Container>
        </Drawer>
      </div>
    );
  }
}

export default App;
