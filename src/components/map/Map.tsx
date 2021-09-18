import * as React from 'react';
import { loadBingApi, Microsoft } from './loader';

export interface LatLng {
  address?: string;
  latitude: number;
  longitude: number;
}

interface IMapProps {
  apiKey: string;
  className?: string;
  style?: object;
  aerial?: boolean;
  zoom?: number;
  center?: LatLng;
  points?: LatLng[];
  walking?: LatLng[];
  driving?: LatLng[];
}

const defaultProps = {
  zoom: 14,
};

export default class extends React.PureComponent<IMapProps & typeof defaultProps, any> {
  static defaultProps = defaultProps;
  private mapRef = React.createRef<HTMLDivElement>();
  private map: any;

  render() {
    return <div ref={this.mapRef} className={this.props.className} style={this.props.style} />;
  }

  componentDidMount() {
    loadBingApi(this.props.apiKey).then(() => {
      this.initMap();
      this.walking();
      this.driving();
      this.addPoint();
      this.setCenter();
    });
  }

  componentWillUnmount() {
    if (this.map) {
      this.map.dispose();
    }
  }

  private initMap() {
    const { aerial } = this.props;
    this.map = new Microsoft.Maps.Map(this.mapRef.current, {
      ...(!aerial
        ? {}
        : {
            mapTypeId: Microsoft.Maps.MapTypeId.aerial,
          }),
      customMapStyle: {
        elements: {
          area: { fillColor: '#b6e591' },
          water: { fillColor: '#75cff0' },
          tollRoad: { fillColor: '#a964f4', strokeColor: '#a964f4' },
          arterialRoad: { fillColor: '#ffffff', strokeColor: '#d7dae7' },
          road: { fillColor: '#ffa35a', strokeColor: '#ff9c4f' },
          street: { fillColor: '#ffffff', strokeColor: '#ffffff' },
          transit: { fillColor: '#000000' },
        },
        settings: {
          landColor: '#efe9e1',
        },
      },
    });
  }

  private setCenter() {
    // @ts-ignore
    const { center: { latitude, longitude } = {}, zoom } = this.props;
    if (latitude && longitude) {
      this.map.setView({
        center: new Microsoft.Maps.Location(latitude, longitude),
        zoom,
      });
    }
  }

  private addPoint() {
    const { points = [] } = this.props;
    if (Array.isArray(points) && points.length) {
      points.forEach(({ latitude, longitude }) => {
        const pushpin = new Microsoft.Maps.Pushpin(
          new Microsoft.Maps.Location(latitude, longitude),
          null,
        );
        const layer = new Microsoft.Maps.Layer();
        layer.add(pushpin);
        this.map.layers.insert(layer);
      });
    }
  }

  private walking() {
    const { walking = [] } = this.props;
    if (Array.isArray(walking) && walking.length) {
      this.route(walking, 'walking');
    }
  }

  private driving() {
    const { driving = [] } = this.props;
    if (Array.isArray(driving) && driving.length) {
      this.route(driving, 'driving');
    }
  }

  private route(route: any, type = 'walking' as 'walking' | 'driving') {
    if (Array.isArray(route) && route.length) {
      Microsoft.Maps.loadModule('Microsoft.Maps.Directions', () => {
        const directionsManager = new Microsoft.Maps.Directions.DirectionsManager(this.map);
        directionsManager.setRequestOptions({
          routeMode: Microsoft.Maps.Directions.RouteMode[type],
        });
        route.forEach(({ address, latitude, longitude }) => {
          directionsManager.addWaypoint(
            new Microsoft.Maps.Directions.Waypoint({
              address,
              location: new Microsoft.Maps.Location(latitude, longitude),
            }),
          );
        });
        directionsManager.setRenderOptions({
          displayManeuverIcons: false,
          displayRouteSelector: false,
          itineraryContainer: document.getElementById('printoutPanel'),
        });
        directionsManager.calculateDirections();
      });
    }
  }
}
