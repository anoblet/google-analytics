import { LitElement, customElement, html, property } from "lit-element";

@customElement("google-analytics")
export class GoogleAnalyticsComponent extends LitElement {
  @property() property: string;

  createRenderRoot() {
    return this;
  }

  firstUpdated() {
    const gtag = document.createElement("script");
    gtag.src = "https://www.googletagmanager.com/gtag/js?id=UA-63899225-2";
    this.appendChild(gtag);
    const script = document.createElement("script");
    script.innerText = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${this.property}');
    `;
    this.appendChild(script);

    var currentPath = window.location.pathname;
    setInterval(() => {
      if (window.location.pathname !== currentPath) {
        currentPath = window.location.pathname;
        window.gtag("config", this.property, { page_path: currentPath });
      }
    }, 100);
  }

  render() {
    return html``;
  }
}
