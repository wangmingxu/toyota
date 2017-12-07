import React from 'react';
import Logo from '../Component/Logo';
import '../styles/tp.less';
import QueueAnim from 'rc-queue-anim';
import Api from '../utils/api';
import { matchRoutes } from 'react-router-config';
import routes from '../Route';

class Result extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      show: true,
    };
  }
  componentDidMount() {
    const { location } = this.props;
    const { match } = matchRoutes(routes, location.pathname)[0];
    this.activityId = match.params.id;
    this.loadData();
    setInterval(() => {
      this.loadData();
    }, 5000);
  }
  onRefresh = ({ type }) => {
    if (type === 'leave') {
      setTimeout(() => {
        this.setState({ show: true });
      }, 500);
    }
  }
  loadData() {
    Api.listLuckyDoy({ id: this.activityId }).then(({ data }) => {
      const { items } = this.state;
      if (items.length === 0) {
        this.setState({
          show: true,
          items: data.slice(0, 5),
        });
      } else if (data.length < 5) {
        this.setState({
          show: false,
          items: data,
        });
      } else {
        const latestData = data.filter(item =>
          new Date(item.lucky_time) >
            new Date(items[items.length - 1].lucky_time));
        const nextData = latestData.length < 5 ? latestData.concat(data) : latestData;
        this.setState({
          show: false,
          items: nextData.slice(0, 5),
        });
      }
    });
  }
  render() {
    return (
      <div styleName="tp-result">
        <Logo />
        <div styleName="theme" />
        <div styleName="layout">
          <QueueAnim type={['right', 'left']} onEnd={this.onRefresh}>
            {this.state.show
              ? this.state.items.map((item, i) => (
                <div styleName="item" key={i}>
                  {/* <img src={item.headImage} alt="头像" /> */}
                  <div styleName="msg">
                    <p>
                        波段号 FM{item.band} 恭喜 <span styleName="keyPoint">{item.nick_name}</span> 获得<span styleName="keyPoint">{item.prize}</span>
                    </p>
                  </div>
                </div>
              ))
              : null}
          </QueueAnim>
        </div>
      </div>
    );
  }
}

export default Result;
