document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const suggestionsBox = document.getElementById('suggestions-box');
    const resultsSection = document.getElementById('results-section');
    const resultsGrid = document.getElementById('results-grid');
    const app = document.getElementById('app');

 
    const mockResults = [
        {
            title: "SpaceX Starship - The Future of Space Travel",
            url: "https://www.spacex.com/vehicles/starship",
            desc: "Starship is a fully reusable transport system designed to carry both crew and cargo to Earth orbit, the Moon, Mars and beyond."
        },
        {
            title: "NASA - National Aeronautics and Space Administration",
            url: "https://www.nasa.gov",
            desc: "Explore the universe and discover our home planet with NASA. We share a common purpose to pioneer the future in space exploration, scientific discovery and..."
        },
        {
            title: "The Scale of the Universe 2",
            url: "https://htwins.net/scale2",
            desc: "Zoom from the edge of the universe to the quantum foam of spacetime and learn about everything in between."
        },
        {
            title: "James Webb Space Telescope | NASA",
            url: "https://webb.nasa.gov",
            desc: "The James Webb Space Telescope (JWST) is a space telescope developed by NASA with the European Space Agency (ESA) and the Canadian Space Agency (CSA)."
        },
        {
            title: "Hubble Space Telescope - ESA",
            url: "https://esahubble.org",
            desc: "The Hubble Space Telescope is a space-based observatory that has changed our understanding of the universe."
        }
    ];

    // Focus Effects
    searchInput.addEventListener('focus', () => {
        suggestionsBox.classList.remove('hidden');
    });

    // Close suggestions when clicking outside
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !suggestionsBox.contains(e.target)) {
            suggestionsBox.classList.add('hidden');
        }
    });

    // Handle Search
    const performSearch = (query) => {
        if (!query.trim()) return;

        // Visual transition
        document.body.classList.add('has-searched');
        suggestionsBox.classList.add('hidden');
        resultsSection.classList.remove('hidden');
        
        // Clear previous results
        resultsGrid.innerHTML = '';

        // Simulate network delay for realism
        setTimeout(() => {
            // Generate results (mock)
            mockResults.forEach((result, index) => {
                const card = document.createElement('div');
                card.className = 'result-card';
                card.style.animationDelay = `${index * 0.1}s`; // Staggered animation
                
                card.innerHTML = `
                    <div class="result-url">
                        <div class="result-favicon"></div>
                        <span>${result.url}</span>
                    </div>
                    <a href="${result.url}" class="result-title">${result.title}</a>
                    <p class="result-desc">${result.desc}</p>
                `;
                
                resultsGrid.appendChild(card);
            });
        }, 300);
    };

    // Event Listeners
    searchBtn.addEventListener('click', () => {
        performSearch(searchInput.value);
    });

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch(searchInput.value);
        }
    });

    // Handle Quick Links (mock interaction)
    document.querySelectorAll('.suggestion-item').forEach(item => {
        item.addEventListener('click', () => {
            const text = item.querySelector('span strong').textContent;
            searchInput.value = text;
            performSearch(text);
        });
    });
});
