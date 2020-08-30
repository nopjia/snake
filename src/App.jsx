import React from "react";
import "./App.css";
import { Container, Tabs, Tab } from "@material-ui/core";
import axios from "axios";
import Snake from "snake";
import Drawer from "./components/Drawer";
import GalleryList from "./components/GalleryList";
import SubmitForm from "./components/SubmitForm";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      shapes: [],
      tab: 1,
      drawerOpened: false,
    };

    this.canvasContainerRef = React.createRef();
    this.submitFormRef = React.createRef();
    this.rc = null;
  }

  async componentDidMount() {
    this.rc = new Snake(this.canvasContainerRef.current);
    this.rc.initSnake(`${process.env.PUBLIC_URL}/block.gltf`);
    this.rc.ul.running = true;

    const res = await axios.get("https://snake-loopback.herokuapp.com/shapes");
    this.setState({ shapes: res.data });
  }

  handleItemClick = (item) => {
    this.rc.snake.setConfigSequential(item.sequence);
    this.setState({ drawerOpened: false });
  };

  handleTabChange = (e, value) => {
    this.setState({ tab: value });
  };

  handleDrawerToggle = async () => {
    this.setState((state) => {
      return { drawerOpened: !state.drawerOpened };
    });
  };

  handleCameraClick = () => {
    this.submitFormRef.current.open(this.rc);
  };

  handleSubmit = async (data) => {
    console.log("SUBMIT", data);
    const res = await axios.post(
      "https://snake-loopback.herokuapp.com/shapes",
      data
    );
    console.log("SUBMIT", res);
  };

  render() {
    return (
      <div className="App">
        <div className="canvas bg_checker" ref={this.canvasContainerRef} />
        <Drawer
          opened={this.state.drawerOpened}
          onToggle={this.handleDrawerToggle}
          onCamera={this.handleCameraClick}
          onRotateLeft={() => this.rc.snakeMgr.rotateSelected(1)}
          onRotateRight={() => this.rc.snakeMgr.rotateSelected(-1)}
        >
          <Tabs
            className="content_tabs"
            value={this.state.tab}
            onChange={this.handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Standard" />
            <Tab label="Browse" />
          </Tabs>
          <div className="content_wrap">
            <Container>
              <div hidden={this.state.tab !== 0}>
                <p>Learn from these standard shapes!</p>
              </div>
              <div hidden={this.state.tab !== 1}>
                <GalleryList
                  items={this.state.shapes}
                  onItemClick={this.handleItemClick}
                />
              </div>
            </Container>
          </div>
        </Drawer>
        <SubmitForm onSubmit={this.handleSubmit} ref={this.submitFormRef} />
      </div>
    );
  }
}

export default App;
