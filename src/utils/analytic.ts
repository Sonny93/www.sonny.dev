export function initializeAnalytic() {
  const umami_id = import.meta.env.VITE_UMAMI_ID;
  if (umami_id) {
    console.log("Setting up Umami", umami_id);
    initUmami(umami_id);
  }
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
