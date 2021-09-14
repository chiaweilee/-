export const getFlightNo = (children: string): string => {
  // not support No. '3U' yet
  const matcher = /[A-Z]{2}\d{3,4}/g.exec(children);
  return (matcher && matcher[0]) || '';
};

export const getAirport = (children: string) => {
  const matcher = children.match(/\(([A-Z]{3})\)/g);
  return Array.isArray(matcher) ? matcher.map((n) => n.replace(/[()]/g, '')) : [];
};

export const getFlightDateTime = (children: string) => {
  const matcher = children.match(/[A-Z][a-z]{2} \d{2} [A-Z][a-z]{2} \d{4}, \d{4} hrs/g);
  return Array.isArray(matcher) ? matcher.map((d) => d.replace(/(\d{2})(\d{2}) hrs/, '$1:$2:00')) : [];
};
