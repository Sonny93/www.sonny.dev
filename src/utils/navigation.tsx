export function HandleUpdateAnchorURL(anchor?: string): void {
  const url = window.location.origin + (anchor ? `/#${anchor}` : "");
  window.history.pushState({}, "", url);
}
