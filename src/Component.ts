import { LitElement, customElement, html, property } from "lit-element";

@customElement("google-analytics")
export class GoogleAnalyticsComponent extends LitElement {
  @property() account: string;

  createRenderRoot() {
    return this;
  }

  firstUpdated() {
    this.install();
    this.observeLocation();
  }

  public install() {
    const scriptOne = document.createElement("script");
    scriptOne.src = "https://www.googletagmanager.com/gtag/js?id=UA-63899225-2";
    this.appendChild(scriptOne);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function() {
      window.dataLayer.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("config", "${this.account}");

    // const scriptTwo = document.createElement("script");
    // scriptTwo.innerText = `
    //   window.dataLayer = window.dataLayer || [];
    //   function gtag(){dataLayer.push(arguments);}
    //   gtag('js', new Date());
    //   gtag('config', '${this.account}');
    // `;
    // this.appendChild(scriptTwo);
  }

  public observeLocation() {
    var currentPath = window.location.pathname;
    setInterval(() => {
      if (window.location.pathname !== currentPath) {
        currentPath = window.location.pathname;
        window.gtag("config", this.account, { page_path: currentPath });
      }
    }, 100);
  }

  render() {
    return html``;
  }
}
