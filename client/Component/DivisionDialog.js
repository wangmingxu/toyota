import React from 'react';
import { Modal } from 'antd-mobile';
import { cityList } from '../constant';

const DivisionDialog = (props) => {
  const {
 showDialog, onClose, selectCity, division 
} = props;
  const DivisionList = cityList.map((item, i) => (
    <div
      className="item"
      key={i}
      onClick={() => {
        selectCity(item);
      }}
    >
      {item}
    </div>
  ));
  // const tips = otherDivision ? (
  //   <span>当前城市不在范围内<br />请选择感兴趣的赛区查看活动</span>
  // ) : '定位失败，请手动选择赛区';
  return (
    <Modal visible={showDialog} transparent maskClosable={false}>
      <div className="division-dialog">
        <p className="tips">
          {
            do {
              if (division === '未知') {
                <span>
                  当前城市不在范围内<br />请选择感兴趣的赛区查看活动
                </span>;
              }
              if (division === '') {
                <span>定位失败，请手动选择赛区</span>;
              } else {
                <span>请选择感兴趣的赛区查看活动</span>;
              }
            }
          }
        </p>
        <div className="list">{DivisionList}</div>
      </div>
    </Modal>
  );
};

export default DivisionDialog;
