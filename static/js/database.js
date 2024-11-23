// Use window object to ensure single instance
window.PokemonDB = (() => {
    // Cache DOM elements
    const elements = {
        grid: document.querySelector('#pokemon-grid'),
        searchInput: document.getElementById('pokemon-search'),
        searchBtn: document.querySelector('.search-btn'),
        loadingSpinner: document.getElementById('loading-spinner'),
        filterPanel: document.getElementById('filter-panel'),
        filtersToggle: document.getElementById('filters-toggle')
    };

    // State management
    const state = {
        cache: new Map(),
        isLoading: false,
        currentPage: 1,
        itemsPerPage: 20
    };

    // Pokemon type colors
    const typeColors = {
        normal: '#A8A878',
        fire: '#F08030',
        water: '#6890F0',
        electric: '#F8D030',
        grass: '#78C850',
        ice: '#98D8D8',
        fighting: '#C03028',
        poison: '#A040A0',
        ground: '#E0C068',
        flying: '#A890F0',
        psychic: '#F85888',
        bug: '#A8B820',
        rock: '#B8A038',
        ghost: '#705898',
        dragon: '#7038F8',
        dark: '#705848',
        steel: '#B8B8D0',
        fairy: '#EE99AC'
    };

    // Helper Functions
    const formatStatName = (statName) => {
        return statName
            .replace('special-attack', 'Sp. Atk')
            .replace('special-defense', 'Sp. Def')
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    const toggleLoading = (show) => {
        if (elements.loadingSpinner) {
            elements.loadingSpinner.style.display = show ? 'flex' : 'none';
        }
    };

    // Create Pokemon Card with proper image sizing and 3D effect
    const createPokemonCard = (pokemon) => {
        const mainType = pokemon.types[0].toLowerCase();
        const card = document.createElement('div');
        card.className = 'pc-container';
        
        card.innerHTML = `
            <div class="pokemon-card">
                <div class="card_front type-${mainType}">
                    <span class="pokemon-number">#${pokemon.id}</span>
                    <img src="${pokemon.image}" alt="${pokemon.name}" class="pokemon-image" loading="lazy">
                    <h3 class="pokemon-name">${pokemon.name}</h3>
                    <div class="type-badges">
                        ${pokemon.types.map(type => `
                            <span class="type-badge ${type.toLowerCase()}">${type}</span>
                        `).join('')}
                    </div>
                </div>
                <div class="card_back">
                    <h4 class="stats-title">Base Stats</h4>
                    <div class="stats-container">
                        ${pokemon.stats.map(stat => {
                            const percentage = (stat.value/255)*100;
                            return `
                                <div class="stat-row">
                                    <div class="stat-info">
                                        <span class="stat-label">${formatStatName(stat.name)}</span>
                                        <span class="stat-value">${stat.value}</span>
                                    </div>
                                    <div class="stat-bar-container">
                                        <div class="stat-bar ${stat.name.toLowerCase()}-bar" 
                                             style="width: ${percentage}%"></div>
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            </div>
        `;

        return card;
    };

    // Fetch Pokemon Data
    const fetchPokemon = async (id) => {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
            const data = await response.json();
            
            return {
                id: String(data.id).padStart(3, '0'),
                name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
                image: data.sprites.other['official-artwork'].front_default,
                types: data.types.map(type => type.type.name),
                stats: data.stats.map(stat => ({
                    name: stat.stat.name,
                    value: stat.base_stat
                }))
            };
        } catch (error) {
            console.error(`Error fetching Pokemon ${id}:`, error);
            throw error;
        }
    };

    // Load Pokemon Batch
    const loadPokemonBatch = async (startId, count) => {
        if (state.isLoading) return;
        
        try {
            state.isLoading = true;
            toggleLoading(true);

            const promises = [];
            for (let i = startId; i < startId + count && i <= 898; i++) {
                promises.push(fetchPokemon(i));
            }

            const pokemons = await Promise.all(promises);
            pokemons.forEach(pokemon => {
                if (pokemon) {
                    const card = createPokemonCard(pokemon);
                    elements.grid?.appendChild(card);
                }
            });

        } catch (error) {
            console.error('Error loading Pokemon:', error);
        } finally {
            state.isLoading = false;
            toggleLoading(false);
        }
    };

    // Initialize
    const init = () => {
        if (elements.grid) {
            elements.grid.innerHTML = '';
            loadPokemonBatch(1, state.itemsPerPage);
        }

        // Setup scroll handler for infinite loading
        window.addEventListener('scroll', () => {
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 1000) {
                if (!state.isLoading) {
                    state.currentPage++;
                    loadPokemonBatch(
                        state.currentPage * state.itemsPerPage + 1,
                        state.itemsPerPage
                    );
                }
            }
        });
    };

    // Return public methods
    return { init };
})();

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', window.PokemonDB.init); 