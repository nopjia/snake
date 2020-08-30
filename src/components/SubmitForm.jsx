import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";

class SubmitForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      opened: false,
      image: "",
      alertError: "",
      inputNameValue: "",
      inputNameError: "",
    };
    this.rc = undefined;
  }

  handleCancel() {
    this.setState({ opened: false });
  }

  handleSubmit() {
    if (this.state.alertError) {
      return;
    }
    if (!this.state.inputNameValue) {
      this.setState({ inputNameError: "Required" });
      return;
    }
    const formData = {
      name: this.state.inputNameValue,
      sequence: this.rc.snake.getConfig(),
      image: this.state.image,
    };
    this.props.onSubmit(formData);
    this.setState({ opened: false });
  }

  open(rc) {
    this.rc = rc;
    this.setState({
      opened: true,
      image: this.rc.getScreenshot(256, 256),
      alertError: this.rc.snake.hasCollision ? "Your shape has errors!" : "",
    });
  }

  render() {
    const alertElem = this.state.alertError ? (
      <Alert severity="error">{this.state.alertError}</Alert>
    ) : undefined;
    return (
      <Dialog
        className="submitform"
        open={this.state.opened}
        onClose={() => this.handleCancel()}
      >
        <DialogTitle id="form-dialog-title">Submit Your Shape!</DialogTitle>
        <DialogContent>
          {alertElem}
          <div
            className="image"
            style={{ backgroundImage: `url(${this.state.image})` }}
          />
          <TextField
            label="Give it a name"
            helperText={this.state.inputNameError}
            error={!!this.state.inputNameError}
            value={this.state.inputNameValue}
            onChange={(e) => this.setState({ inputNameValue: e.target.value })}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => this.handleCancel()}>Cancel</Button>
          <Button onClick={() => this.handleSubmit()} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default SubmitForm;
