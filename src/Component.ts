import { LitElement, customElement, html, property } from "lit-element";

@customElement("google-analytics")
export class Component extends LitElement {
  @property({ attribute: "property-id", reflect: true }) propertyId: string;

  createRenderRoot() {
    return this;
  }

  firstUpdated() {
    this.install();
    this.observeLocation();
  }

  public install() {
    const scriptOne = document.createElement("script");
    scriptOne.src = `https://www.googletagmanager.com/gtag/js?id=${this.propertyId}`;
    this.appendChild(scriptOne);

    // const scriptTwo = document.createElement("script");
    // scriptTwo.innerText = `
    //   window.dataLayer = window.dataLayer || [];
    //   function gtag(){dataLayer.push(arguments);}
    //   gtag('js', new Date());
    //   gtag('config', '${this.propertyId}');
    // `;
    // this.appendChild(scriptTwo);

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
    }, 100);
  }

  render() {
    return html``;
  }
}
