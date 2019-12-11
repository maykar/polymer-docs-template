import { LitElement, customElement, html, TemplateResult, CSSResultArray, css, property } from 'lit-element';
import '@polymer/paper-card/paper-card';

import { MainStyle } from './styles/MainStyle';
import { markdown } from './markdown/markdown';

@customElement('docs-search')
export class Search extends LitElement {
  @property() public docs?: any;
  @property() private search?: boolean = false;
  @property() private searchterm?: string = '';

  protected render(): TemplateResult | void {
    return html`
      <div class="search ${this.search ? '' : 'collapse fade'}">
        ${this.search
          ? html`
              <input @input=${this.Search} type="text" class="searchbox" autofocus />
            `
          : ''}
      </div>
      <iron-icon @click=${this.toggleSearch} class="icon" icon="icons:search"></iron-icon>
      ${this.searchterm!.length
        ? html`
            <paper-card class="result-container">
              <div class="result">
                <p>${markdown.html('## Search results:')}</p>
                ${Object.entries(this.docs).map(category => {
                  return (category as any)[1].map(element => {
                    if (element.content_html.toLowerCase().includes(this.searchterm!.toLowerCase())) {
                      return html`
                        <a class="result-item" href="${element.url}" @click=${this.searchClick}>${element.title}</a></br>
                      `;
                    } else return;
                  });
                })}
              </div>
            </paper-card>
          `
        : ''}
    `;
  }

  firstUpdated() {
    const searchCheck = e => {
      if (!this.search) return;
      const path = e.path || (e.composedPath && e.composedPath());
      const stops = ['APP-HEADER-LAYOUT', 'APP-TOOLBAR', 'DOCS-CARD', 'APP-HEADER'];
      for (const elem of path) {
        if (elem.nodeName === 'DOCS-SEARCH') return;
        else if (stops.indexOf(elem.nodeName) > -1) break;
      }
      this.search = false;
    };
    document.addEventListener('click', searchCheck.bind(this));
  }

  updated() {
    if (this.search) {
      document
        .querySelector('docs-main')!
        .shadowRoot!.querySelector('docs-search')!
        .shadowRoot!.querySelector('input')!
        .focus();
    } else {
      this.searchterm = '';
    }
  }

  toggleSearch(): void {
    this.search = !this.search;
  }

  searchClick(e: any): void {
    window.open(e.composedPath()[0].href, '_self');
    window.location.reload();
  }

  Search(e: any): void {
    this.searchterm = e.composedPath()[0].value;
  }

  static get styles(): CSSResultArray {
    return [
      MainStyle,
      css`
        .result-item {
          cursor: pointer;
          text-decoration: none;
          color: var(--primary-color);
        }

        .result-container {
          position: absolute;
          top: 43px;
          right: 27px;
          width: 278px;
          background: var(--search-results-background);
          color: var(--text-color);
          z-index: 1337;
          border-radius: 20px;
          border: 1px solid var(--divider-color);
        }

        .result {
          padding-right: 16px;
          padding-left: 16px;
          padding-bottom: 16px;
          height: fit-content;
        }

        .search {
          width: 200px;
          background: var(--search-input-background);
          z-index: 2;
          border-radius: 20px;
          margin-right: 8px;
          height: 25px;
          opacity: 1;
          overflow: hidden;
          padding-bottom: 6px;
        }

        .collapse {
          width: 0px;
        }

        .fade {
          opacity: 0;
        }

        .searchbox {
          width: 90%;
          margin: -2px 5px 5px 10px;
          border-width: 0;
          outline: none;
          opacity: 1;
        }

        .icon {
          min-width: 24px;
        }

        paper-card,
        .search {
          transition: all 0.4s ease-in-out;
        }

        .search input {
          background: var(--search-input-background);
          color: var(--search-input-text-color);
        }

        .result-item {
          color: var(--search-result-item-color);
        }
      `,
    ];
  }
}
