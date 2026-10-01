document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loveForm');
    const photoInput = document.getElementById('photoInput');
    const fileNameDisplay = document.getElementById('fileName');
    const gallery = document.getElementById('gallery');

    // Update file name when selected
    photoInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            fileNameDisplay.textContent = e.target.files[0].name;
            fileNameDisplay.style.color = 'var(--secondary)';
        } else {
            fileNameDisplay.textContent = 'Seleccionar Foto...';
            fileNameDisplay.style.color = 'inherit';
        }
    });

    // Handle form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const file = photoInput.files[0];
        const message = document.getElementById('messageInput').value;

        if (file && message) {
            // Create a file reader to convert the image to a data URL
            const reader = new FileReader();
            
            reader.onload = function(event) {
                const imageUrl = event.target.result;
                createMemoryCard(imageUrl, message);
                
                // Reset form
                form.reset();
                fileNameDisplay.textContent = 'Seleccionar Foto...';
                fileNameDisplay.style.color = 'inherit';
            };
            
            reader.readAsDataURL(file);
        }
    });

    // Function to create and append a new memory card
    function createMemoryCard(imageUrl, message) {
        const date = new Date().toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        const cardHTML = `
            <article class="memory-card">
                <img src="${imageUrl}" alt="Nuestro recuerdo" class="memory-img">
                <div class="memory-content">
                    <p class="memory-text">${escapeHTML(message)}</p>
                    <p class="memory-date">✨ ${date}</p>
                </div>
            </article>
        `;

        // Insert at the beginning of the gallery
        gallery.insertAdjacentHTML('afterbegin', cardHTML);
    }

    // Helper function to prevent XSS
    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                "'": '&#39;',
                '"': '&quot;'
            }[tag] || tag)
        );
    }
});
