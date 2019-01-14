import { PureComponent } from 'react';

class AsyncPipe extends PureComponent {
  state = {
    value: this.props.initialValue,
  };

  componentDidMount() {
    this.subscription = this.props.stream.subscribe(value => {
      this.setState({ value });
    });
  }

  componentWillUnmount() {
    this.subscription.unsubscribe();
  }

  render() {
    return this.props.children(this.state.value);
  }
}

export default AsyncPipe;
