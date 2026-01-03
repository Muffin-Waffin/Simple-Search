document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('searchBox');
    const searchBtn = document.getElementById('search-btn');
    // const suggestionsBox = document.getElementById('suggestions-box'); // Removed
    const resultsSection = document.getElementById('results-section');
    const resultsGrid = document.getElementById('results-grid');
    const paginationControls = document.getElementById('pagination-controls');
    const app = document.getElementById('app');

    let currentPage = 1;
    const itemsPerPage = 10;
    let currentQuery = '';





    // Focus Effects - Suggestions removed
    // input.addEventListener('focus', () => {
    //     suggestionsBox.classList.remove('hidden');
    // });

    // Close suggestions when clicking outside - Removed
    // document.addEventListener('click', (e) => {
    //     if (!input.contains(e.target) && !suggestionsBox.contains(e.target)) {
    //         suggestionsBox.classList.add('hidden');
    //     }
    // });


    // Handle Search
    const performSearch = async (query, page = 1) => {
        if (!query.trim()) return;

        currentQuery = query;
        currentPage = page;

        // Visual transition
        document.body.classList.add('has-searched');
        resultsSection.classList.remove('hidden');

        // Clear previous results and pagination
        resultsGrid.innerHTML = '';
        paginationControls.innerHTML = '';

        try {
            const response = await fetch(`http://127.0.0.1:5000/search?q=${encodeURIComponent(query)}&page=${page}&limit=${itemsPerPage}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();

            // Check if backend is still returning the old array format
            if (Array.isArray(data)) {
                throw new Error("Backend outdated. Please restart python app.py");
            }

            const results = data.results;
            const total = data.total;

            if (!results || results.length === 0 && page === 1) {
                resultsGrid.innerHTML = '<p class="no-results">No results found.</p>';
                return;
            }

            // Generate results
            results.forEach((result, index) => {
                const card = document.createElement('div');
                card.className = 'result-card';
                card.style.animationDelay = `${index * 0.1}s`; // Staggered animation

                // Fallback for missing fields if necessary, assuming db returns similar structure
                const title = result.name || "No Title";
                const url = result.link || "#";
                const desc = result.description || "No description available.";

                card.innerHTML = `
                    <div class="result-url">
                        <div class="result-favicon"></div>
                        <span>${url}</span>
                    </div>
                    <a href="${url}" class="result-title">${title}</a>
                    <p class="result-desc">${desc}</p>
                `;

                resultsGrid.appendChild(card);
            });

            // Update stats
            const stats = document.querySelector('.result-stats');
            if (stats) {
                stats.textContent = `Page ${page}`;
            }

            // Pagination Controls
            renderPaginationControls(total);

        } catch (error) {
            console.error('Error fetching search results:', error);
            resultsGrid.innerHTML = `<p class="error-message">Error: ${error.message}. <br>Make sure the backend is running and restarted.</p>`;
        }
    };

    const renderPaginationControls = (totalCount) => {
        const totalPages = Math.ceil(totalCount / itemsPerPage);

        const prevBtn = document.createElement('button');
        prevBtn.textContent = 'Previous';
        prevBtn.disabled = currentPage === 1;
        prevBtn.className = 'pagination-btn';
        prevBtn.onclick = () => performSearch(currentQuery, currentPage - 1);

        const nextBtn = document.createElement('button');
        nextBtn.textContent = 'Next';
        nextBtn.disabled = currentPage >= totalPages;
        nextBtn.className = 'pagination-btn';
        nextBtn.onclick = () => performSearch(currentQuery, currentPage + 1);

        const pageInfo = document.createElement('span');
        pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
        pageInfo.className = 'pagination-info';

        paginationControls.appendChild(prevBtn);
        paginationControls.appendChild(pageInfo);
        paginationControls.appendChild(nextBtn);
    };

    // Event Listeners
    searchBtn.addEventListener('click', () => {
        performSearch(input.value);
    });

    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch(input.value);
        }
    });

    // Handle Quick Links (mock interaction) - Removed or updated to reuse performSearch
    // document.querySelectorAll('.suggestion-item').forEach(item => {
    //     item.addEventListener('click', () => {
    //         const text = item.querySelector('span strong').textContent;
    //         input.value = text;
    //         performSearch(text);
    //     });
    // });
});

