import React, { Component } from "react";
import ReactDOM from "react-dom";

class Test extends Component {
  constructor() {
    super();

    this.state = {
      value: ""
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { value } = event.target;
    console.log(value);
    
    this.setState(() => {
      return {
        value
      };
    });
  }

  render() {
    return (
      <form>
        <input
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
        />
        kur
      </form>
    );
  }
}

export default Test;

const wrapper = document.getElementById("container");
wrapper ? ReactDOM.render(<Test />, wrapper) : false;