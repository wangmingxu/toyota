import React from 'react';
import { findDOMNode } from 'react-dom';

const threshold = 150;

export default class OnePage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      offsetHeight: 0,
      scale: 1,
    };
    this.pageRef = React.createRef();
  }
  componentDidMount() {
    const docHeight = document.documentElement.clientHeight;
    const pageEle = findDOMNode(this); //eslint-disable-line
    const pageHeight = pageEle.clientHeight;
    const offsetHeight = Math.abs(pageHeight - docHeight);
    if (offsetHeight <= threshold) {
      const scale = docHeight / pageHeight;
      this.setState({ scale, offsetHeight });
    }
  }
  render() {
    return this.props.render(this.state);
  }
}
