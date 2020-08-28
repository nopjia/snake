import React from "react";
import "./App.css";
import { Container } from "@material-ui/core";
import axios from "axios";
import Snake from "snake";
import Drawer from "./components/Drawer";
import GalleryList from "./components/GalleryList";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      shapes: [],
    };

    this.firstOpened = false;
    this.canvasContainerRef = React.createRef();
    this.rc = null;
  }

  componentDidMount() {
    this.rc = new Snake(this.canvasContainerRef.current);
    this.rc.initSnake(`${process.env.PUBLIC_URL}/block.gltf`);
    this.rc.ul.running = true;
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
        <div className="canvas bg_checker" ref={this.canvasContainerRef} />
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
