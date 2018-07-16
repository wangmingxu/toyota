import React from 'react';

const ErrorDialog = (props) => {
  const { status, msg, onClose } = props;
  return (
    status ? (<div className="mask">
      <div className="common-dialog">
        <div className="btn-close" onClick={onClose} />
        <div className="content-box">
          <div className="msg">
            {msg}
          </div>
        </div>
      </div>
    </div>) : null
  );
};

export default ErrorDialog;

