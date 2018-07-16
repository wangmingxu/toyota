import React from 'react';
import { openWithAction, getDownloadUrl } from 'utils/openApp';
import OpenBrowserGuide from 'Component/OpenBrowserGuide';
import downloadIcon from 'assets/download_icon.png';

const download = () => {
  _hmt.push(['_trackEvent', '按钮', '点击', '去下载荔枝']);
  window.location.href = getDownloadUrl();
};

class DownloadDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showBrowserGuide: false,
    };
  }
  openApp = (action) => {
    _hmt.push(['_trackEvent', '按钮', '点击', '打开荔枝']);
    const result = openWithAction(action);
    if (!result) {
      this.setState({
        showBrowserGuide: true,
      });
    }
  }
  closeGuide = () => {
    this.setState({ showBrowserGuide: false });
  }
  render() {
    const { status, action, onClose } = this.props;
    const { showBrowserGuide } = this.state;
    return status ? [showBrowserGuide ? null : (
      <div className="mask" key="download-dialog">
        <div className="common-dialog download-dialog">
          <div className="btn-close" onClick={onClose} />
          <div className="content-box">
            <div className="msg">
              <img src={downloadIcon} className="download-icon" alt="下载荔枝" />
            </div>
            <div className="ft">
              <div className="btn download" onClick={download}>下载荔枝APP</div>
              <div
                className="btn open"
                onClick={() => {
                  this.openApp(action);
                }}
              >打开荔枝APP</div>
            </div>
          </div>
        </div>
      </div>
    ), <OpenBrowserGuide status={showBrowserGuide} onClose={this.closeGuide} key="guide" />] : null;
  }
}

export default DownloadDialog;
