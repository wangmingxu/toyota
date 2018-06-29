import React from 'react';
import shareOverlayIcon from 'assets/share_overlay_icon.png';

class ShareOverlay extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillReceiveProps(newProps) {
    const { onClose } = this.props;
    if (newProps.show) {
      setTimeout(() => {
        this.props.onClose();
      }, 2000);
    }
  }
  render() {
    const { show } = this.props;
    return show ? (
      <div className="mask">
        <img src={shareOverlayIcon} className="share-guide" alt="请点击右上角分享" />
      </div>
    ) : null;
  }
}

export default ShareOverlay;
