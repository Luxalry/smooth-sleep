// Main JavaScript file for Dr. Chama Elmanjra's website

document.addEventListener('DOMContentLoaded', () => {
    console.log("Le site est prêt !");

    // The API URL for your LOCAL Strapi instance
    const CMS_API_URL = 'http://localhost:1337/api';

    // --- Function to fetch articles ---
    async function fetchArticles() {
        const container = document.getElementById('articles-container');
        if (!container) return; // Exit if not on the blog page

        try {
            // In a real scenario, you would fetch from: `${CMS_API_URL}/articles`
            // For now, we use mock data.
            const articles = [
                { title: 'Démystifier l\'Endoscopie', summary: 'Un guide complet sur les procédures d\'endoscopie.' },
                { title: 'Gérer le Reflux Gastro-Œsophagien', summary: 'Conseils et traitements pour le RGO.' },
                { title: 'L\'importance du dépistage du cancer colorectal', summary: 'Pourquoi la coloscopie peut vous sauver la vie.' }
            ];

            container.innerHTML = ''; // Clear loading text
            articles.forEach(article => {
                const articleHTML = `
                    <div class="bg-white p-6 rounded-lg shadow-md">
                        <h2 class="text-xl font-bold mb-2">${article.title}</h2>
                        <p class="text-gray-600">${article.summary}</p>
                    </div>
                `;
                container.innerHTML += articleHTML;
            });
        } catch (error) {
            container.innerHTML = '<p class="text-red-500">Erreur lors du chargement des articles.</p>';
            console.error('Failed to fetch articles:', error);
        }
    }

    // --- Function to fetch researches ---
    async function fetchResearches() {
        const container = document.getElementById('researches-container');
        if (!container) return; // Exit if not on the researches page

         try {
            // Fetch researches from your local Strapi API
            // ?populate=pdf is crucial to get the file data
            const response = await fetch(`${CMS_API_URL}/researches?populate=pdf`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            const researches = result.data;
            
            if (researches.length === 0) {
                 container.innerHTML = '<p class="text-gray-500">Aucune recherche publiée pour le moment.</p>';
                 return;
            }

            container.innerHTML = ''; // Clear loading text
            researches.forEach(research => {
                const attributes = research.attributes;
                const title = attributes.title;
                // Get the URL of the PDF file
                const pdfData = attributes.pdf.data;
                const pdfUrl = pdfData ? `http://localhost:1337${pdfData.attributes.url}` : '#';

                const researchHTML = `
                    <div class="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
                        <p class="font-semibold">${title}</p>
                        <a href="${pdfUrl}" target="_blank" class="text-white bg-[var(--brand-primary)] py-2 px-4 rounded-md hover:bg-opacity-90">Voir PDF</a>
                    </div>
                `;
                container.innerHTML += researchHTML;
            });
        } catch (error) {
             container.innerHTML = '<p class="text-red-500">Erreur lors du chargement des recherches. Assurez-vous que le CMS est en cours d\'exécution et que les permissions sont correctes.</p>';
            console.error('Failed to fetch researches:', error);
        }
    }

    // Run fetch functions
    fetchArticles();
    fetchResearches();
});

