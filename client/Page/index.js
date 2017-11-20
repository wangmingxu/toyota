import React from 'react';
import { connect } from 'react-redux';
import lz from '@lizhife/lz-jssdk';
import PropTypes from 'prop-types';
import { GetDivision, SetDivision } from '../Action';
import style from '../styles/App.less' // eslint-disable-line
import Logo from '../Component/Logo';
import ActivityDetail from '../Component/ActivityDetail';
import DivisionDialog from '../Component/DivisionDialog';
import ShareOverlay from '../Component/ShareOverlay';
import DownloadDialog from '../Component/DownloadDialog';

@connect(
  state => ({ division: state.Division }),
  dispatch => ({
    dispatch,
  }),
)
class Index extends React.PureComponent {
  static defaultProps = {
    dispatch: () => {},
    division: '',
  }
  static propTypes = {
    dispatch: PropTypes.func,
    division: PropTypes.string,
  }
  static loadData(dispatch) {
    return dispatch(GetDivision());
  }
  constructor(props) {
    super(props);
    this.state = {
      showDivisionDialog: false,
      showShareOverlay: false,
      showDownloadDialog: false,
    };
  }
  componentDidMount() {
    this.constructor.loadData(this.props.dispatch);
  }
  componentWillReceiveProps(newProps) {
    if (!newProps.division || newProps.division === '未知') {
      this.setState({
        showDivisionDialog: true,
      });
    }
  }
  share = () => {
    if (window.isApp) {
      lz.shareUrl(window.shareData);
    } else if (window.isWX) {
      this.setState({ showShareOverlay: true });
    } else {
      this.setState({ showDownloadDialog: true });
    }
  }
  render() {
    const { division, dispatch } = this.props;
    return (
      <div styleName="single-dog">
        <Logo />
        <ActivityDetail />
        <DivisionDialog
          showDialog={this.state.showDivisionDialog}
          otherDivision={division === '未知'}
          onClose={() => {
            this.setState({ showDivisionDialog: false });
          }}
          selectCity={(name) => {
            setTimeout(() => {
              dispatch(SetDivision(name));
            }, 200);
            this.setState({ showDivisionDialog: false });
          }}
        />
        <ShareOverlay
          show={this.state.showShareOverlay}
          onClose={() => {
            this.setState({ showShareOverlay: false });
          }}
        />
        <DownloadDialog
          showDialog={this.state.showDownloadDialog}
          onClose={() => {
            this.setState({ showDownloadDialog: false });
          }}
        />
        <div styleName="theme" />
        <div styleName="schedule">
          <div styleName="item">
            <p styleName="stage">初赛</p>
            <p styleName="time">11.6-11.14</p>
          </div>
          <div styleName="item">
            <p styleName="stage">赛区复赛</p>
            <p styleName="time">11.16-11.19</p>
          </div>
          <div styleName="item">
            <p styleName="stage">半决赛</p>
            <p styleName="time">11.24-11.25</p>
          </div>
          <div styleName="item">
            <p styleName="stage">赛区决赛</p>
            <p styleName="time">11.26</p>
          </div>
          <div styleName="item">
            <p styleName="stage">总决赛</p>
            <p styleName="time">12.8</p>
          </div>
        </div>
        <div styleName="group">
          <div styleName="item">
            <div styleName="division">{division}赛区</div>
            <div styleName="avatar single" />
            <div styleName="name">单身A组</div>
          </div>
          <div styleName="item">
            <div styleName="division">{division}赛区</div>
            <div styleName="avatar single" />
            <div styleName="name">单身B组</div>
          </div>
          <div styleName="item">
            <div styleName="division">{division}赛区</div>
            <div styleName="avatar cp" />
            <div styleName="name">情侣A组</div>
          </div>
          <div styleName="item">
            <div styleName="division">{division}赛区</div>
            <div styleName="avatar cp" />
            <div styleName="name">情侣B组</div>
          </div>
        </div>
        <div styleName="dogs">
          <div styleName="shareBtn" onClick={this.share} />
        </div>
      </div>
    );
  }
}

export default Index;
