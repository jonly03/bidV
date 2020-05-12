import React, { Component } from "react";
import { TouchableHighlight, Text } from "react-native";

export default class Filter extends Component {
  state = {
    active: false,
  };

  static getDerivedStateFromProps(props, state) {
    if (props.type === props.activeFilter) {
      return {
        active: true,
      };
    } else if (props.type !== props.activeFilter) {
      return {
        active: false,
      };
    } else {
      return null;
    }
  }

  handleOnPress = () => {
    this.setState({
      active: !this.state.active,
    });

    this.props.handleApplyFilter(this.props.type);
  };

  render() {
    return (
      <TouchableHighlight onPress={this.handleOnPress}>
        <Text
          style={{
            color: "white",
            textDecorationLine: this.state.active ? "none" : "line-through",
          }}
        >
          {this.props.name}
        </Text>
      </TouchableHighlight>
    );
  }
}
