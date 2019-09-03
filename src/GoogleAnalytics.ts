import { LitElement, customElement, html, property } from "lit-element";

@customElement("google-analytics")
export class Component extends LitElement {
  @property({ attribute: "property-id", reflect: true }) propertyId: string;
  @property({ attribute: "single-page", reflect: true, type: Boolean })
  singlePage: boolean = false;
  @property({ attribute: "polling-interval", reflect: true })
  pollingInterval: number = 100;

  createRenderRoot() {
    return this;
  }

  firstUpdated() {
    this.install();
    if (this.singlePage) this.observeLocation();
  }

  public install() {
    const script = document.createElement("script");
    script.src = `https://www.googletagmanager.com/gtag/js?id=${this.propertyId}`;
    script.async = true;
    document.head.appendChild(script);

    // Register
    window.dataLayer = window.dataLayer || [];
    window.gtag = function() {
      window.dataLayer.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("config", this.propertyId);
  }

  public observeLocation() {
    var currentPath = window.location.pathname;
    setInterval(() => {
      if (window.location.pathname !== currentPath) {
        currentPath = window.location.pathname;
        window.gtag("config", this.propertyId, { page_path: currentPath });
      }
    }, this.pollingInterval);
  }

  render() {
    return html``;
  }
}
