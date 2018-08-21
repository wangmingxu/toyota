import React from 'react';
import { Modal } from 'antd-mobile';
import downloadIcon from '../assets/download_icon.png';

const download = () => {
  window._hmt.push(['_trackEvent', '按钮', '点击', '去下载荔枝']);
  window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.yibasan.lizhifm&g_f=991784#opened';
};

const DownloadDialog = (props) => {
  const { showDialog, onClose } = props;
  return (
    <Modal
      visible={showDialog}
      transparent
      maskClosable={false}
    >
      <div className='download-dialog'>
        <img src={downloadIcon} className='download-icon' alt='下载荔枝' />
        <div className='ft'>
          <div className='btn download' onClick={download}>下载荔枝</div>
          <div className='btn cancel' onClick={onClose}>取消</div>
        </div>
      </div>
    </Modal>
  );
};

export default DownloadDialog;
