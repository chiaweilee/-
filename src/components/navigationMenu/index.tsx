import React from 'react';
import map from 'lodash/map';
import groupBy from 'lodash/groupBy';
import { Menu } from 'antd-mobile';

const computeRoutes = (routes: any): any[] => {
  return (
    (routes &&
      Array.isArray(routes) &&
      routes
        .filter((r) => !!r.path)
        .map((route: any) => route.path.split('/').slice(1))
        .filter((r) => r.length > 1 && !!r[0])) ||
    []
  );
};

function renderRoutes(routes, deepIndex = 1) {
  return map(groupBy(routes, deepIndex), (children, name) => {
    if (deepIndex === 1) {
      return {
        value: name,
        label: name,
        children: renderRoutes(children, deepIndex + 1),
      };
    }
    return {
      value: name,
      label: name,
    };
  });
}

export default class NavigationMenu extends React.PureComponent<any, any> {
  public constructor(props: any) {
    super(props);
    this.state = {
      navShow: false,
      value: undefined,
      routes: computeRoutes(props.route && props.route.routes),
    };
  }

  private get data() {
    return renderRoutes(this.state.routes);
  }

  public render() {
    return (
      this.state.navShow && (
        <Menu data={this.data} onChange={this.onChange} value={this.state.value} />
      )
    );
  }

  private switchClick = () => {
    this.setState((state) => ({ navShow: !state.navShow }));
  };

  private onChange = (item) => {
    this.setState({ value: item, navShow: false });
    this.props.history.push({
      pathname: `${this.props.route.path}/${item.join('/')}`,
    });
  };
}
