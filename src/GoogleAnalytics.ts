import { UpdatingElement, customElement, property } from "lit-element";

@customElement("google-analytics")
export class Component extends UpdatingElement {
  @property({ attribute: "property-id", reflect: true, type: String })
  propertyId: string;
  @property({ attribute: "single-page", reflect: true, type: Boolean })
  singlePage: boolean = false;
  @property({ attribute: "polling-interval", reflect: true, type: String })
  pollingInterval: number = 100;

  connectedCallback() {
    super.connectedCallback();
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
}
