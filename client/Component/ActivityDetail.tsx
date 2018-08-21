import React from 'react';
import DetailDialog from './DetailDialog';

interface ActivityDetailType {
  showDialog: boolean;
}

class ActivityDetail extends React.Component<{}, ActivityDetailType> {
  constructor(props) {
    super(props);
    this.state = {
      showDialog: false,
    };
  }
  componentDidMount() {}
  render() {
    return (
      <React.Fragment>
        <span
          className='activity-detail'
          onClick={() => {
            this.setState({ showDialog: true });
          }}
        >
          活动详情
        </span>
        <DetailDialog
          showDialog={this.state.showDialog}
          onClose={() => {
            this.setState({ showDialog: false });
          }}
        />
      </React.Fragment>
    );
  }
}

export default ActivityDetail;
