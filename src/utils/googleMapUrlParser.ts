export default function (uri: string) {
  const [, place, lnglat] = /\/([^/]+)\/@(\d+\.\d+,\d+\.\d+)/.exec(uri) || [];
  return [place?.replace(/(\w)\+(\w)/gi, '$1 $2'), lnglat];
}
