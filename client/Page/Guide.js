import React from 'react';
import Logo from '../Component/Logo';
import '../styles/tp.less';
import qrCode from '../assets/singledog/qr.png';

export default () => (
  <div styleName="tp-guide">
    <Logo />
    <div styleName="theme" />
    <div styleName="layout" />
    <div styleName="guide" />
    <img styleName="qrCode" src={qrCode} alt="直播间二维码" />
  </div>
);
