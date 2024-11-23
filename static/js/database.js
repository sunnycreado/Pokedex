// Pokemon Database Module
window.PokemonDB = (() => {
    // Cache DOM elements
    const elements = {
        grid: document.querySelector('#pokemon-grid'),
        searchInput: document.getElementById('pokemon-search'),
        searchBtn: document.querySelector('.search-btn'),
        loadingSpinner: document.getElementById('loading-spinner')
    };

    // State management
    const state = {
        pokemonCache: new Map(),
        displayedPokemon: new Set(),
        allPokemonList: [], // Store all Pokemon data
        isLoading: false,
        currentPage: 1,
        itemsPerPage: 20
    };

    // Initialize Pokemon list
    const initializePokemonList = async () => {
        try {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=898');
            const data = await response.json();
            state.allPokemonList = data.results;
        } catch (error) {
            console.error('Error initializing Pokemon list:', error);
        }
    };

    // Enhanced search functionality with partial matching
    const handleSearch = async (searchTerm) => {
        const normalizedSearch = searchTerm.toLowerCase().trim();
        
        if (!normalizedSearch) {
            elements.grid.innerHTML = '';
            state.displayedPokemon.clear();
            loadPokemonBatch(1, state.itemsPerPage);
            return;
        }

        try {
            toggleLoading(true);
            elements.grid.innerHTML = '';

            // Find matching Pokemon
            const matchingPokemon = state.allPokemonList.filter(pokemon => 
                pokemon.name.includes(normalizedSearch)
            );

            if (matchingPokemon.length > 0) {
                const fragment = document.createDocumentFragment();
                const processedIds = new Set();

                for (const pokemon of matchingPokemon) {
                    const id = pokemon.url.split('/')[6]; // Extract ID from URL
                    
                    if (!processedIds.has(id)) {
                        processedIds.add(id);
                        const pokemonData = await fetchPokemon(id);
                        
                        if (pokemonData) {
                            const card = createPokemonCard(pokemonData);
                            fragment.appendChild(card);
                        }
                    }
                }

                elements.grid.appendChild(fragment);
            } else {
                showError('No Pokémon found matching your search.');
            }
        } catch (error) {
            console.error('Search error:', error);
            showError('Error searching Pokemon. Please try again.');
        } finally {
            toggleLoading(false);
        }
    };

    // Transform API data
    const transformPokemonData = (data) => ({
        id: String(data.id).padStart(3, '0'),
        name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
        image: data.sprites.other['official-artwork'].front_default,
        types: data.types.map(type => type.type.name),
        stats: data.stats.map(stat => ({
            name: stat.stat.name,
            value: stat.base_stat
        }))
    });

    // Load Pokemon batch
    const loadPokemonBatch = async (startId, count) => {
        if (state.isLoading) return;
        
        try {
            state.isLoading = true;
            toggleLoading(true);

            const promises = [];
            for (let i = startId; i < startId + count && i <= 898; i++) {
                if (!state.displayedPokemon.has(i)) {
                    promises.push(fetchPokemon(i));
                    state.displayedPokemon.add(i);
                }
            }

            if (promises.length > 0) {
                const pokemons = await Promise.all(promises);
                const fragment = document.createDocumentFragment();

                pokemons.forEach(pokemon => {
                    if (pokemon) {
                        const card = createPokemonCard(pokemon);
                        fragment.appendChild(card);
                    }
                });

                elements.grid.appendChild(fragment);
            }
        } catch (error) {
            console.error('Error loading Pokemon batch:', error);
            showError('Failed to load Pokemon. Please try again.');
        } finally {
            state.isLoading = false;
            toggleLoading(false);
        }
    };

    // Create Pokemon Card
    const createPokemonCard = (pokemon) => {
        const mainType = pokemon.types[0].toLowerCase();
        const card = document.createElement('div');
        card.className = 'pc-container';
        card.dataset.pokemonName = pokemon.name.toLowerCase();
        card.dataset.pokemonId = pokemon.id;
        
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

    // Format stat names
    const formatStatName = (statName) => {
        return statName
            .replace('special-attack', 'Sp. Atk')
            .replace('special-defense', 'Sp. Def')
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    // Fetch Pokemon data
    const fetchPokemon = async (id) => {
        // Check if already in cache
        if (state.pokemonCache.has(id)) {
            return state.pokemonCache.get(id);
        }

        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            
            const pokemon = {
                id: String(data.id).padStart(3, '0'),
                name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
                image: data.sprites.other['official-artwork'].front_default,
                types: data.types.map(type => type.type.name),
                stats: data.stats.map(stat => ({
                    name: stat.stat.name,
                    value: stat.base_stat
                }))
            };
            
            // Add to cache
            state.pokemonCache.set(id, pokemon);
            return pokemon;
        } catch (error) {
            console.error(`Error fetching Pokemon ${id}:`, error);
            return null;
        }
    };

    // Helper functions
    const toggleLoading = (show) => {
        if (elements.loadingSpinner) {
            elements.loadingSpinner.style.display = show ? 'flex' : 'none';
        }
    };

    const showError = (message) => {
        elements.grid.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-circle"></i>
                <p>${message}</p>
            </div>
        `;
    };

    // Debounced search handler
    const debounce = (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    };

    // Initialize
    const init = async () => {
        if (elements.grid) {
            await initializePokemonList(); // Initialize the Pokemon list first
            elements.grid.innerHTML = '';
            state.displayedPokemon.clear();
            loadPokemonBatch(1, state.itemsPerPage);
            
            // Setup search with debounce
            const debouncedSearch = debounce(handleSearch, 300);
            
            if (elements.searchInput) {
                elements.searchInput.addEventListener('input', (e) => {
                    debouncedSearch(e.target.value);
                });

                // Add search button click handler
                if (elements.searchBtn) {
                    elements.searchBtn.addEventListener('click', () => {
                        handleSearch(elements.searchInput.value);
                    });
                }
            }

            // Infinite scroll
            window.addEventListener('scroll', () => {
                if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 1000) {
                    if (!state.isLoading && !elements.searchInput.value) {
                        state.currentPage++;
                        loadPokemonBatch(
                            state.currentPage * state.itemsPerPage + 1,
                            state.itemsPerPage
                        );
                    }
                }
            });
        }
    };

    return { init };
})();

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', window.PokemonDB.init); 