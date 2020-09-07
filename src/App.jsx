import React from "react";
import "./App.css";
import { Container, Tabs, Tab } from "@material-ui/core";
import Snake from "snake";
import Drawer from "./components/Drawer";
import GalleryList from "./components/GalleryList";
import SubmitForm from "./components/SubmitForm";
import * as api from "./api";
import { isValidSequence } from "./utils";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      standardShapes: [],
      shapes: [],
      tab: 0,
      drawerOpened: false,
    };

    this.canvasContainerRef = React.createRef();
    this.submitFormRef = React.createRef();
    this.rc = null;
  }

  async componentDidMount() {
    this.rc = new Snake(this.canvasContainerRef.current);
    this.rc.ul.running = true;
    await this.rc.initSnake(
      `${process.env.PUBLIC_URL}/block.gltf`,
      `${process.env.PUBLIC_URL}/matcap.jpg`
    );

    const sequenceStr = new URLSearchParams(window.location.search).get("s");
    if (isValidSequence(sequenceStr)) {
      await this.rc.snake.setSequenceSequential(sequenceStr);
      await this.rc.snakeMgr.focusCamera();
    }

    this.setState({ standardShapes: await api.getStandardShapes() });
    this.setState({ shapes: await api.getShapes() });
  }

  handleResetClick = async () => {
    await this.rc.snake.reset();
    await this.rc.snakeMgr.focusCamera();
  };

  handleItemClick = async (item) => {
    this.setState({ drawerOpened: false });

    // not awaited
    api.incrementViewCount(item.id);

    window.history.pushState(item.sequence, "snake", `?s=${item.sequence}`);

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

    const sequence = this.rc.snake.getSequence();
    const image = this.rc.getScreenshot(256, 256);

    let errorMsg = "";
    if (this.rc.snake.hasCollision) {
      errorMsg = "Your shape has errors!";
    } else if (await api.hasSequence(sequence)) {
      errorMsg = "This shape already exists! Sorry!";
    }

    window.history.pushState(sequence, "snake", `?s=${sequence}`);

    this.submitFormRef.current.open(sequence, image, errorMsg);
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
          onReset={this.handleResetClick}
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
                <GalleryList
                  items={this.state.standardShapes}
                  onItemClick={this.handleItemClick}
                />
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
        <SubmitForm
          onSubmit={(data) => api.postShape(data)}
          ref={this.submitFormRef}
        />
      </div>
    );
  }
}

export default App;
