import React from 'react';
import Logo from '../Component/Logo';
import '../styles/tp.less';
import avatar from '../assets/singledog/tp_avatar.png';
import QueueAnim from 'rc-queue-anim';

const items = [
  {
    id: 1,
    avatar,
    msg: '波段号 FM1111 恭喜 “FDP”价值1588元的Beats Pill+便携式蓝牙无线音箱',
  },
  {
    id: 2,
    avatar,
    msg: '波段号 FM2222 恭喜 “FDP”价值1588元的Beats Pill+便携式蓝牙无线音箱',
  },
  {
    id: 3,
    avatar,
    msg: '波段号 FM333 恭喜 “FDP”价值1588元的Beats Pill+便携式蓝牙无线音箱',
  },
  {
    id: 4,
    avatar,
    msg: '波段号 FM444 恭喜 “FDP”价值1588元的Beats Pill+便携式蓝牙无线音箱',
  },
  {
    id: 5,
    avatar,
    msg: '波段号 FM555 恭喜 “FDP”价值1588元的Beats Pill+便携式蓝牙无线音箱',
  },
  {
    id: 6,
    avatar,
    msg: '波段号 FM666 恭喜 “FDP”价值1588元的Beats Pill+便携式蓝牙无线音箱',
  },
  {
    id: 7,
    avatar,
    msg: '波段号 FM777 恭喜 “FDP”价值1588元的Beats Pill+便携式蓝牙无线音箱',
  },
  {
    id: 8,
    avatar,
    msg: '波段号 FM888 恭喜 “FDP”价值1588元的Beats Pill+便携式蓝牙无线音箱',
  },
  {
    id: 9,
    avatar,
    msg: '波段号 FM999 恭喜 “FDP”价值1588元的Beats Pill+便携式蓝牙无线音箱',
  },
];

class Result extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: items.slice(0, 5),
      show: true,
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        show: false,
        items: items.slice(5, 9),
      });
    }, 2000);
  }
  onRefresh=({ type }) => {
    if (type === 'leave') {
      this.setState({ show: true });
    }
  }
  render() {
    return (<div styleName="tp-result">
      <Logo />
      <div styleName="theme" />
      <div styleName="layout">
        <QueueAnim type={['right', 'left']} onEnd={this.onRefresh}>
          {this.state.show ? this.state.items.map(item => (<div styleName="item" key={item.id}><img src={item.avatar} alt="头像" /><div styleName="msg"><p>{item.msg}</p></div></div>)) : null}
        </QueueAnim>
      </div>
    </div>);
  }
}

export default Result;
