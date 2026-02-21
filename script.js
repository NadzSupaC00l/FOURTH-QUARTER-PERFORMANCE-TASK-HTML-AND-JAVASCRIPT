// Student-friendly motivation quotes
const quotes = [
    { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { text: "Your future is created by what you do today, not tomorrow.", author: "Robert Kiyosaki" },
    { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
    { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
    { text: "Success is the sum of small efforts repeated day in and day out.", author: "Robert Collier" },
    { text: "You don't have to be great to start, but you have to start to be great.", author: "Zig Ziglar" },
    { text: "Dream big and dare to fail.", author: "Norman Vaughan" },
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "Education is the passport to the future.", author: "Malcolm X" },
    { text: "Your attitude determines your direction.", author: "Unknown" },
    { text: "Every expert was once a beginner.", author: "Helen Hayes" },
    { text: "Small steps every day lead to big results.", author: "Unknown" },
    { text: "You are capable of amazing things.", author: "Unknown" },
    { text: "Push yourself because no one else is going to do it for you.", author: "Unknown" },
    { text: "Difficult roads often lead to beautiful destinations.", author: "Unknown" },
    { text: "Your only limit is your mind.", author: "Unknown" },
    { text: "Progress, not perfection.", author: "Unknown" },
    { text: "You got this! 💪", author: "Unknown" },
    { text: "Make today so awesome that yesterday gets jealous.", author: "Unknown" },
    { text: "Stars can't shine without darkness.", author: "Unknown" },
    { text: "Be the energy you want to attract.", author: "Unknown" },
    { text: "Your time is now. Start where you are.", author: "Unknown" },
    { text: "One day or day one. You decide.", author: "Unknown" },
    { text: "You are stronger than you think.", author: "Unknown" },
    { text: "Focus on the step in front of you, not the whole staircase.", author: "Unknown" },
    { text: "Every accomplishment starts with the decision to try.", author: "Unknown" },
    { text: "You are doing better than you think you are.", author: "Unknown" },
    { text: "Keep going, you're getting there.", author: "Unknown" },
    { text: "Your potential is endless.", author: "Unknown" },
    { text: "Do something today that your future self will thank you for.", author: "Unknown" }
];

let quoteHistory = JSON.parse(localStorage.getItem('quoteHistory')) || [];
let currentQuote = null;

// Load daily quote on page load
window.onload = function() {
    loadDailyQuote();
    renderHistory();
};

function generateQuote() {
    // Get random quote
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    
    // Add timestamp
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    
    currentQuote = {
        ...quote,
        date: dateStr,
        timestamp: now.getTime()
    };
    
    // Display quote
    document.getElementById('quoteText').textContent = quote.text;
    document.getElementById('quoteAuthor').textContent = "— " + quote.author;
    document.getElementById('quoteDate').textContent = dateStr;
    
    // Show copy button
    document.getElementById('copyBtn').style.display = 'flex';
    
    // Save to history
    quoteHistory.unshift(currentQuote);
    if (quoteHistory.length > 20) quoteHistory = quoteHistory.slice(0, 20);
    localStorage.setItem('quoteHistory', JSON.stringify(quoteHistory));
    
    // Save as daily quote
    localStorage.setItem('dailyQuote', JSON.stringify({
        quote: currentQuote,
        date: new Date().toDateString()
    }));
    
    renderHistory();
    showToast('New quote generated! ✨');
}

function loadDailyQuote() {
    const saved = localStorage.getItem('dailyQuote');
    if (saved) {
        const data = JSON.parse(saved);
        const today = new Date().toDateString();
        
        if (data.date === today) {
            currentQuote = data.quote;
            document.getElementById('quoteText').textContent = currentQuote.text;
            document.getElementById('quoteAuthor').textContent = "— " + currentQuote.author;
            document.getElementById('quoteDate').textContent = currentQuote.date;
            document.getElementById('copyBtn').style.display = 'flex';
        }
    }
}

function copyCurrentQuote() {
    if (!currentQuote) return;
    
    const textToCopy = `"${currentQuote.text}" — ${currentQuote.author}`;
    copyToClipboard(textToCopy);
}

function copyQuoteFromHistory(index) {
    const quote = quoteHistory[index];
    const textToCopy = `"${quote.text}" — ${quote.author}`;
    copyToClipboard(textToCopy);
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast('Copied to clipboard! ✨');
    });
}

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2000);
}

function renderHistory() {
    const historyList = document.getElementById('historyList');
    
    if (quoteHistory.length === 0) {
        historyList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-clipboard-list"></i>
                <p>No quotes generated yet. Start your journey! 🌟</p>
            </div>
        `;
        return;
    }
    
    historyList.innerHTML = quoteHistory.map((quote, index) => `
        <div class="history-item">
            <div class="history-content">
                <p class="history-quote">"${quote.text}"</p>
                <p class="history-meta">— ${quote.author} • ${quote.date}</p>
            </div>
            <div class="history-actions">
                <button class="btn-icon" onclick="copyQuoteFromHistory(${index})" title="Copy quote">
                    <i class="fas fa-copy"></i>
                </button>
            </div>
        </div>
    `).join('');
}