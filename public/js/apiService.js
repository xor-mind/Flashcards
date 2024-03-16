export const fetchCategories = () => {
    return fetch('http://localhost:3000/api/categories')
        .then(response => response.json())
        .catch(error => console.error('Error fetching categories:', error));
};

export const fetchFlashcards = (categoryId = null) => {
    let url = 'http://localhost:3000/api/flashcards'; // Adjusted to use the /api/ path for consistency
    if (categoryId !== null) {
        url += `?category_id=${categoryId}`;
    }

    return fetch(url)
        .then(response => response.json())
        .catch(error => console.error('Error fetching flashcards:', error));
};