import React from 'react';
import androidGuide from '../assets/guide-android.png';
import iosGuide from '../assets/guide-ios.png';
import { getDownloadUrl } from 'utils/openApp';

class GuideOverlay extends React.PureComponent {
  constructor(props) {
    super(props);
    this.timer = null;
  }
  componentWillReceiveProps(newProps) {
    if (newProps.status) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.props.onClose();
      }, 5000);
    }
  }
  componentWillUnmount() {
    clearTimeout(this.timer);
  }
  closeOverlay = () => {
    const { onClose } = this.props;
    clearTimeout(this.timer);
    onClose();
  }
  download = () => {
    location.href = getDownloadUrl();
  }
  render() {
    const { status, onClose } = this.props;
    return status ? (
      <div className="mask openbrowser" onClick={onClose}>
        <img
          src={androidGuide}
          alt="guide-android"
          className="guide-weixin-android"
        />
        <img src={iosGuide} alt="guide-ios" className="guide-weixin-ios" />
        <div className="guide-btn-download" onClick={this.download}>下载荔枝APP</div>
      </div>
    ) : null;
  }
}

export default GuideOverlay;
