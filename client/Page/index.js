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
import sortBy from 'lodash/sortBy';
import classNames from 'classnames';

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
    division: '北京',
    judge: '表哥',
    fmNo: 335577,
    liveTime: '12-3 15:00',
    avatar: require('../assets/avatar_bj1.jpg'),
    liveId: '2638651600809614902',
    radioId: '2571494476067378688',
  },
  {
    division: '北京',
    judge: '莫小汐',
    fmNo: 3114675,
    liveTime: '12-3 15:00',
    avatar: require('../assets/avatar_bj2.jpg'),
    liveId: '2638651600809614902',
    radioId: '2571494476067378688',
  },
  {
    division: '广州',
    judge: '林墨汁',
    fmNo: 1500642,
    liveTime: '12-3 19:00',
    avatar: require('../assets/avatar_gz.jpg'),
    liveId: '2638651600809614902',
    radioId: '2571494476067378688',
  },
  {
    division: '重庆',
    judge: '季慕白',
    fmNo: 3472739,
    liveTime: '12-3 19:00',
    avatar: require('../assets/avatar_cq.jpg'),
    liveId: '2638651600809614902',
    radioId: '2571494476067378688',
  },
  {
    division: '成都',
    judge: '罗一四',
    fmNo: 912852,
    avatar: require('../assets/avatar_cd.jpg'),
    liveTime: '12-3 20:00',
    liveId: '2638651600809614902',
    radioId: '2571494476067378688',
  },
  {
    division: '武汉',
    judge: '大L',
    fmNo: 243123,
    liveTime: '12-3 20:00',
    avatar: require('../assets/avatar_wh.jpg'),
    liveId: '2638651600809614902',
    radioId: '2571494476067378688',
  },
  {
    division: '杭州',
    judge: '小丑',
    fmNo: 426544,
    liveTime: '12-3 20:00',
    avatar: require('../assets/avatar_hz.jpg'),
    liveId: '2638651600809614902',
    radioId: '2571494476067378688',
  },
  {
    division: '长沙',
    judge: '黑呢',
    fmNo: 1504962,
    liveTime: '12-3 20:00',
    avatar: require('../assets/avatar_cs.jpg'),
    liveId: '2636854700131801654',
    radioId: '2571494476067378688',
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
      groupList: sortBy(
        groupList,
        item => -item.division.indexOf(this.props.division),
      ),
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
    } else {
      this.setState({
        groupList: sortBy(
          this.state.groupList,
          item => -item.division.indexOf(newProps.division),
        ),
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
  toLive = ({ liveId, radioId }) => {
    const url = window.getAppLink(liveId, radioId);
    try {
      location.href = url;
    } catch (e) {
      window.alert(e);
    }
    setTimeout(() => {
      location.href = `https://appweb.lizhi.fm/live/share?liveId=${liveId}`;
    }, 1500);
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
          {this.state.groupList.map((item, i) => (
            <div
              styleName={classNames('item', {
                current: item.division === division,
              })}
              key={i}
              onClick={() => {
                this.toLive(item);
              }}
            >
              <div styleName="division">{item.division}赛区</div>
              <img styleName="avatar" src={item.avatar} alt="avatar" />
              <div styleName="info">
                <div styleName="judge">评委:{item.judge}</div>
                <div>FM{item.fmNo}</div>
                <div styleName="liveTime">
                  直播时间<br />
                  {item.liveTime}
                </div>
              </div>
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
