class JumboTron extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <article id="hero">
                <h1>Welcome to MariRestaurant</h1>
                <p>Rasakan enaknya berbagai masakan di tempat yang berbeda setiap hari!</p>
                <button class="btn" onclick="location.href='#restaurant'">Explore</button>
            </article>
        `;
    }
}

customElements.define('jumbo-tron', JumboTron);
