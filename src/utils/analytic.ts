export function initializeAnalytic() {
  const hotjar_hjid = import.meta.env.VITE_HOTJAR_HJID;
  const hotjar_hjsv = import.meta.env.VITE_HOTJAR_HJSV;
  if (hotjar_hjid && hotjar_hjsv) {
    console.log("Setting up Hotjar", hotjar_hjid, hotjar_hjsv);
    initHotjar(hotjar_hjid, hotjar_hjsv);
  }

  const umami_id = import.meta.env.VITE_UMAMI_ID;
  if (umami_id) {
    console.log("Setting up Umami", umami_id);
    initUmami(umami_id);
  }
}

export function initHotjar(hjid: string, hjsv: string): void {
  const hotjarScriptUrl = `https://static.hotjar.com/c/hotjar-${hjid}.js?sv=${hjsv}`;
  const script = createScriptTag(hotjarScriptUrl);
  document.head.appendChild(script);
}

export function initUmami(umamiId: string): void {
  const script = createScriptTag("https://umami.sonnydata.fr/umami.js");
  script.setAttribute("data-website-id", umamiId);
  document.head.appendChild(script);
}

export function createScriptTag(src: string) {
  const script = document.createElement("script");
  script.setAttribute("src", src);
  script.setAttribute("async", "");
  script.setAttribute("defer", "");
  return script;
}
