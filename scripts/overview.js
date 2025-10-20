document.addEventListener('DOMContentLoaded', () => {
    const heading = document.querySelector('.photo-heading');
    const grid = document.querySelector('.product-grid');
    const params = new URLSearchParams(window.location.search);
    const typeParam = params.get('type');

    // Map short type params to manifest keys and headings
    const typeMap = {
        barren: { key: 'barren', title: 'Barren - Bilderstrecke' },
        colonia: { key: 'colonia-kette', title: 'Colonia Kette - Bilderstrecke' },
        herz: { key: 'herz-armbändchen-köln', title: 'Herz Armbändchen Köln - Bilderstrecke' },
        "herz-mini": { key: 'herz-mini', title: 'Herz Mini - Bilderstrecke' },
        "muenze-mini": { key: 'muenze-mini', title: 'Münze Mini - Bilderstrecke' },
        "muenze-tau": { key: 'muenze-tau', title: 'Münze Tau - Bilderstrecke' },
        onyx: { key: 'onyx-herz', title: 'Onyx Herz - Bilderstrecke' },
        ring: { key: 'ring', title: 'Ring - Bilderstrecke' },
        stoff: { key: 'stoff', title: 'Stoffarmbänder - Bilderstrecke' }
    };

    const selection = typeMap[typeParam] || typeMap.stoff;

    heading && (heading.textContent = selection.title);

    (async () => {
        try {
            const res = await fetch('./images/new-photos/manifest.json');
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const manifest = await res.json();

            const files = manifest[selection.key] || [];
            if (!files.length) return;

            files.forEach((src) => {
                const item = document.createElement('div');
                item.className = 'p-show';
                item.innerHTML = `
                    <div class="p-image-wrapper"><img src="${src}" alt="${selection.key}"></div>
                `;
                grid && grid.appendChild(item);
            });
        } catch (err) {
            console.error('Fehler beim Laden der Bilder:', err);
        }
    })();
});