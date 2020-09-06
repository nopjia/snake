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

  handleItemClick = async (item) => {
    this.setState({ drawerOpened: false });

    await this.rc.snake.reset();
    await this.rc.snakeMgr.focusCamera();
    await this.rc.snake.setSequenceSequential(item.sequence);
    await this.rc.snakeMgr.focusCamera();
  };

  handleTabChange = (e, value) => {
    this.setState({ tab: value });
  };

  handleDrawerToggle = async () => {
    this.setState((state) => {
      return { drawerOpened: !state.drawerOpened };
    });
  };

  handleCameraClick = async () => {
    this.rc.snakeMgr.selected = undefined;
    await this.rc.snakeMgr.focusCamera();
    this.submitFormRef.current.open(
      this.rc.snake.getSequence(),
      this.rc.getScreenshot(256, 256),
      this.rc.snake.hasCollision
    );
  };

  handleSubmit = async (data) => {
    await axios.post("https://snake-loopback.herokuapp.com/shapes", data);
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
          onMoveLeft={() => this.rc.snakeMgr.decrementSelected()}
          onMoveRight={() => this.rc.snakeMgr.incrementSelected()}
          onReset={() => this.rc.snake.reset()}
          onFocus={() => this.rc.snakeMgr.focusCamera()}
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
