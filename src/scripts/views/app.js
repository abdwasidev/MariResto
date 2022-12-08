import Drawer from '../utils/drawer';
import UrlParser from '../routes/url-parser';
import routes from '../routes/routes';

class App {
    constructor({ button, drawer, content }) {
      this._button = button;
      this._drawer = drawer;
      this._content = content;

      this._initialAppShell();
    }

    _initialAppShell() {
        Drawer.init({
          button: this._button,
          drawer: this._drawer,
          content: this._content,
        });
    }

    async renderPage() {
      const url = UrlParser.parseActiveUrlWithCombiner();
      let page = routes[url];
      if (page === undefined) {
        page = routes['/'];
      }
      this._content.innerHTML = await page.render();
      await page.afterRender();
      const skipLinkElem = document.querySelector('.skip-link');
      skipLinkElem.addEventListener('click', (event) => {
        event.preventDefault();
        document.querySelector('#maincontent').focus();
      });
    }
}

export default App;
