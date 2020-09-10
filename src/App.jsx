import React from "react";
import "./App.css";
import { Container, Button, Icon } from "@material-ui/core";
import Snake from "snake";
import Drawer from "./components/Drawer";
import GalleryList from "./components/GalleryList";
import SubmitForm from "./components/SubmitForm";
import ColorMenu from "./components/ColorMenu";
import * as api from "./api";
import { isValidSequence } from "./utils";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      shapes: [],
      drawerOpened: false,
      colorOpened: false,
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

    // not awaited
    this.loadShapes();

    const sequenceStr = new URLSearchParams(window.location.search).get("s");
    if (isValidSequence(sequenceStr)) {
      await this.rc.snake.setSequenceSequential(sequenceStr);
      await this.rc.snakeMgr.focusCamera();
    }
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

  handleDrawerToggle = () => {
    this.setState((state) => {
      return {
        drawerOpened: !state.drawerOpened,
        colorOpened: false,
      };
    });
  };

  handleColorToggle = () => {
    this.setState((state) => {
      return { colorOpened: !state.colorOpened };
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

  loadShapes = async () => {
    const newShapes = await api.getShapes(this.state.shapes.length);
    this.setState((state) => {
      return { shapes: state.shapes.concat(newShapes) };
    });
  };

  render() {
    return (
      <div className="App">
        <div className="canvas bg_checker" ref={this.canvasContainerRef} />
        <ColorMenu
          opened={this.state.colorOpened}
          onChange1={(e) => this.rc.snake.mat1.color.set(e.target.value)}
          onChange2={(e) => this.rc.snake.mat2.color.set(e.target.value)}
          onToggle={this.handleColorToggle}
        />
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
          <div className="content_wrap">
            <Container>
              <GalleryList
                items={this.state.shapes}
                onItemClick={this.handleItemClick}
              />
              <Button
                className="loadmore"
                onClick={this.loadShapes}
                startIcon={<Icon>refresh</Icon>}
                size="large"
                style={{ marginBottom: "24px" }}
              >
                Load More
              </Button>
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
