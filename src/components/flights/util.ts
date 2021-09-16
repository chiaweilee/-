export const getFlightNo = (children: string): string => {
  const matcher = /([A-Z]{2}|3U|D7)\d{3,4}/g.exec(children);
  return (matcher && matcher[0]) || '';
};

export const getAirport = (children: string) => {
  const matcher = children.match(/\(([A-Z]{3})\)/g);
  return Array.isArray(matcher) ? matcher.map((n) => n.replace(/[()]/g, '')) : [];
};

export const getFlightDateTime = (children: string) => {
  const matcher = children.match(/(0?\d|[12]\d|30|31) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (19|20)\d{2},? [012]\d:?[012345]\d (AM|PM|hrs)?/g);
  return Array.isArray(matcher) ? matcher.map((d) => d.replace(/([012]\d):?([012345]\d) (AM|PM|hrs)?//, '$1:$2:00')) : [];
};
