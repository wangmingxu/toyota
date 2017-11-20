import React from 'react';
import { Modal } from 'antd-mobile';

const DetailDialog = (props) => {
  const { showDialog, onClose } = props;
  return (
    <Modal
      visible={showDialog}
      transparent
      maskClosable={false}
      title="活动详情"
    >
      <div className="detail-dialog">
        <p className="content">一年一度光棍节已经接近尾声，单身狗表示狗粮吃撑了，恩爱党表示还没秀够！于是，在荔枝FM刮起了一阵全国单身汪挑战全国恩爱党的活动。两个阵营会搞出什么样的腥风血雨呢？小编已经带上了头盔，坐看年度大戏 ‘单身狗手撕恩爱党’ 友情提示，主播用方言唱歌，可能会听不懂！</p>
        <div className="iknowBtn" onClick={onClose} />
      </div>
    </Modal>
  );
};

export default DetailDialog;
