import { fetchAndRenderCategories, fetchFlashCard, fetchAndRenderFlashcards, hideOverlay } from './dataService.js';
import { displayFlashCard, flipCard } from './uiService.js';

document.addEventListener('DOMContentLoaded', function() 
{
    fetchAndRenderCategories();
    fetchAndRenderFlashcards();
});

// Global variables and event listeners for UI interactions
//document.getElementById("flashcard").addEventListener("click", flipCard);
// document.getElementById("overlay").addEventListener("click", hideOverlay);

// document.getElementById('flashcard').addEventListener('click', function(event) {
//     flipCard();
//     event.stopPropagation(); // Prevent the click from bubbling up to the overlay
// });