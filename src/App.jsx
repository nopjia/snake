import React from "react";
import "./App.css";
import { Container, Typography, Box } from "@material-ui/core";
import Drawer from "./components/Drawer";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="App">
        <div className="canvas bg_checker" />
        <Drawer>
          <Container>
            <Typography variant="h4" component="h1">
              Official Patterns
            </Typography>
            <Typography variant="h4" component="h1">
              Submitted Patterns
            </Typography>
          </Container>
        </Drawer>
      </div>
    );
  }
}

export default App;
