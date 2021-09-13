export let Microsoft: any;
declare let window: any;
let loader: Promise<any>;

export function loadBingApi(key: string): Promise<void> {
  if (window.Microsoft) {
    return Promise.resolve();
  }

  if (!loader) {
    loader = new Promise((resolve, reject) => {
      const callbackName = 'bingAPIReady';
      let url = `https://www.bing.com/api/maps/mapcontrol?callback=${callbackName}&setLang=en`;
      if (key) {
        url += `&key=${key}`;
      }
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.defer = true;
      script.src = url;
      window.bingAPIReady = () => {
        Microsoft = window.Microsoft;
        resolve();
      };
      script.onerror = (error: any) => {
        reject(error);
      };
      document.body.appendChild(script);
    });
  }

  return loader;
}
