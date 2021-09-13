import React from 'react';
import { NoticeBar, NavBar, WingBlank, WhiteSpace } from 'antd-mobile';
import Icon from '@/components/icon';
import utils from '@/utils';

interface State {
  drawer: boolean;
}

export default class extends React.PureComponent<any, State> {
  private get refer(): string | void {
    const {
      location: { state },
    } = this.props;
    if (state && typeof state.refer === 'string') {
      return state.refer;
    }
  }

  private get githubPage(): string | void {
    if (this.refer) {
      const baseUrl = 'https://github.com/chiaweilee/-/tree/master/src/pages';
      const ext = '.md';
      return `${baseUrl}${this.refer}${ext}`;
    }
  }
  render() {
    return (
      <>
        <NavBar
          mode="light"
          icon={<Icon type="iconback" />}
          onLeftClick={() => {
            if (this.refer) {
              this.props.history.push(this.refer);
            } else {
              utils.historyGoBack();
            }
          }}
          rightContent={
            this.githubPage && (
              <a href={this.githubPage} target="_blank" rel="noreferrer">
                <Icon type="icongithub" />
              </a>
            )
          }
        />
        {this.refer && <NoticeBar mode="closable">{this.refer}</NoticeBar>}
        <WhiteSpace />
        <WingBlank>{this.props.children}</WingBlank>
      </>
    );
  }
}
