import React from 'react';
const shareOverlayIcon:any = require('../assets/share_overlay_icon.png');

interface ShareOverlayPropType{
  show: boolean;
  onClose: ()=>void;
}

class ShareOverlay extends React.PureComponent<ShareOverlayPropType> {
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
      <div className="share-overlay">
        <img src={shareOverlayIcon} className="share-icon" alt="请点击右上角分享" />
      </div>
    ) : null;
  }
}

export default ShareOverlay;
