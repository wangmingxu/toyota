import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { GetDivision, SetDivision } from '../Action';
import style from '../styles/App.less' // eslint-disable-line
import Logo from '../Component/Logo';
import ActivityDetail from '../Component/ActivityDetail';
import DivisionDialog from '../Component/DivisionDialog';
import ShareOverlay from '../Component/ShareOverlay';
import DownloadDialog from '../Component/DownloadDialog';

const scheduleList = [
  {
    stage: '初赛',
    time: '11.6-11.14',
  },
  {
    stage: '赛区复赛',
    time: '11.16-11.19',
  },
  {
    stage: '半决赛',
    time: '12.1-12.2',
  },
  {
    stage: '赛区决赛',
    time: '12.3',
  },
  {
    stage: '总决赛',
    time: '12.8',
  },
];

const groupList = [
  {
    name: '单身A组',
    url: 'lizhifm://www.lizhi.fm?clientparams=17,2636854700131801654,2585466928140083244',
  },
  {
    name: '单身B组',
    url: 'lizhifm://browser?live=2636854700131801654',
  },
  {
    name: '情侣A组',
    url: 'lizhifm://com.yibasan.lizhifm/?&action=live&liveId=2636854700131801654&radioId=2585466928140083244',
  },
  {
    name: '情侣B组',
    url: 'lizhifm://com.yibasan.lizhifm/?&action=live&liveId=2637146215184620086',
  },
];

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
      window.lz.shareUrl(window.shareData);
    } else if (window.isWX) {
      this.setState({ showShareOverlay: true });
    } else {
      this.setState({ showDownloadDialog: true });
    }
  }
  toLive = (link) => {
    try {
      location.href = link;
    }catch (e) { window.alert(e) ;}
  }
  render() {
    const { division, dispatch } = this.props;
    return (
      <div styleName="single-dog">
        <Logo />
        <ActivityDetail />
        <DivisionDialog
          showDialog={this.state.showDivisionDialog}
          onClose={() => {
            this.setState({ showDivisionDialog: false });
          }}
          division={division}
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
          {scheduleList.map((item, i) => (
            <div styleName="item" key={i}>
              <p styleName="stage">{item.stage}</p>
              <p styleName="time">{item.time}</p>
            </div>
          ))}
        </div>
        <div styleName="group">
          {groupList.map((item, i) => (
            <div styleName="item" key={i} onClick={() => { this.toLive(item.url); }}>
              <div styleName="division">{division}赛区</div>
              <div styleName="avatar" />
              <div styleName="name">{item.name}</div>
            </div>
          ))}
        </div>
        <div styleName="dogs">
          <div styleName="shareBtn" onClick={this.share} />
          <div
            styleName="changeCityBtn"
            onClick={() => {
              this.setState({
                showDivisionDialog: true,
              });
            }}
          />
        </div>
      </div>
    );
  }
}

export default Index;
