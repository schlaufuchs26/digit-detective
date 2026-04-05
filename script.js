// Game State
const gameState = {
    currentRound: 0,
    score: 0,
    streak: 0,
    bestStreak: 0,
    totalAttempts: 0,
    correctAnswers: 0,
    categoryStats: {},
    rounds: []
};

// Game Data - 25 rounds with various digit sequences
const gameRounds = [
    // Pi digits
    {
        category: 'Pi',
        description: 'The ratio of a circle\'s circumference to its diameter',
        sequence: '3.14159265___8979...',
        answer: '358',
        difficulty: 1
    },
    {
        category: 'Pi',
        description: 'Continue the sequence of Pi',
        sequence: '3.14159265358___...',
        answer: '979',
        difficulty: 2
    },
    {
        category: 'Pi',
        description: 'Another segment of Pi\'s digits',
        sequence: '3.14159___5358979...',
        answer: '265',
        difficulty: 1
    },

    // Fibonacci Sequence
    {
        category: 'Fibonacci',
        description: 'The famous Fibonacci sequence',
        sequence: '1, 1, 2, 3, 5, 8, 1_, 21, 34...',
        answer: '3',
        difficulty: 1
    },
    {
        category: 'Fibonacci',
        description: 'Continue the Fibonacci sequence',
        sequence: '1, 1, 2, 3, 5, 8, 13, 21, __, 55...',
        answer: '34',
        difficulty: 1
    },
    {
        category: 'Fibonacci',
        description: 'Advanced Fibonacci sequence',
        sequence: '..., 89, 144, 2__, 377...',
        answer: '33',
        difficulty: 2
    },

    // Euler's Number (e)
    {
        category: 'Mathematical Constant (e)',
        description: 'Euler\'s number, base of natural logarithms',
        sequence: '2.7182___159...',
        answer: '82815',
        difficulty: 2
    },
    {
        category: 'Mathematical Constant (e)',
        description: 'Digits of Euler\'s number',
        sequence: '2.71828__828...',
        answer: '15',
        difficulty: 2
    },

    // Golden Ratio
    {
        category: 'Golden Ratio',
        description: 'The golden ratio in mathematics and nature',
        sequence: '1.61803398___...',
        answer: '874',
        difficulty: 2
    },
    {
        category: 'Golden Ratio',
        description: 'Another representation of the golden ratio',
        sequence: '1.6___339887...',
        answer: '180',
        difficulty: 2
    },

    // Famous Historical Years
    {
        category: 'Historical Dates',
        description: 'Year of the Norman Conquest of England',
        sequence: '10__',
        answer: '66',
        difficulty: 1
    },
    {
        category: 'Historical Dates',
        description: 'Year when the American Declaration of Independence was signed',
        sequence: '17__',
        answer: '76',
        difficulty: 1
    },
    {
        category: 'Historical Dates',
        description: 'Year World War II ended',
        sequence: '194_',
        answer: '5',
        difficulty: 1
    },
    {
        category: 'Historical Dates',
        description: 'Year the first Apollo moon landing occurred',
        sequence: '196_',
        answer: '9',
        difficulty: 1
    },
    {
        category: 'Historical Dates',
        description: 'Year the Berlin Wall fell',
        sequence: '198_',
        answer: '9',
        difficulty: 1
    },

    // Atomic Numbers
    {
        category: 'Atomic Numbers',
        description: 'Atomic number of Carbon (essential for life)',
        sequence: '__',
        answer: '6',
        difficulty: 1
    },
    {
        category: 'Atomic Numbers',
        description: 'Atomic number of Oxygen (needed for respiration)',
        sequence: '__',
        answer: '8',
        difficulty: 1
    },
    {
        category: 'Atomic Numbers',
        description: 'Atomic number of Gold (Au)',
        sequence: '__',
        answer: '79',
        difficulty: 2
    },
    {
        category: 'Atomic Numbers',
        description: 'Atomic number of Uranium (U)',
        sequence: '__',
        answer: '92',
        difficulty: 2
    },

    // ISBN-like sequences
    {
        category: 'ISBN Sequence',
        description: 'Standard Book Number check digit pattern',
        sequence: '978-0-306-4_-2',
        answer: '06',
        difficulty: 2
    },
    {
        category: 'ISBN Sequence',
        description: 'Another ISBN-like sequence',
        sequence: '97___414300',
        answer: '8035',
        difficulty: 2
    },

    // Phone Numbers
    {
        category: 'Phone Number',
        description: 'Emergency services number in US',
        sequence: '9__',
        answer: '11',
        difficulty: 1
    },
    {
        category: 'Phone Number',
        description: 'Common fictional phone number format',
        sequence: '555-____',
        answer: '0100',
        difficulty: 1
    },

    // Speed of Light
    {
        category: 'Physics Constant',
        description: 'Speed of light in m/s (scientific notation)',
        sequence: '3.___x10^8',
        answer: '00',
        difficulty: 2
    },

    // Avogadro's Number
    {
        category: 'Chemistry Constant',
        description: 'Avogadro\'s number (scientific notation)',
        sequence: '6.022 __ 10^23',
        answer: 'x',
        difficulty: 3
    }
];

// DOM Elements
const startScreen = document.getElementById('startScreen');
const gameScreen = document.getElementById('gameScreen');
const gameOverScreen = document.getElementById('gameOverScreen');
const startBtn = document.getElementById('startBtn');
const playAgainBtn = document.getElementById('playAgainBtn');
const submitBtn = document.getElementById('submitBtn');
const skipBtn = document.getElementById('skipBtn');
const answerInput = document.getElementById('answerInput');

// Event Listeners
startBtn.addEventListener('click', startGame);
playAgainBtn.addEventListener('click', resetGame);
submitBtn.addEventListener('click', submitAnswer);
skipBtn.addEventListener('click', skipRound);
answerInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') submitAnswer();
});

// Game Functions
function startGame() {
    // Initialize round order (shuffle for variety)
    gameState.rounds = shuffleArray([...gameRounds]);
    
    // Initialize category stats
    gameState.categoryStats = {};
    gameState.rounds.forEach(round => {
        if (!gameState.categoryStats[round.category]) {
            gameState.categoryStats[round.category] = { correct: 0, total: 0 };
        }
    });

    gameState.currentRound = 0;
    gameState.score = 0;
    gameState.streak = 0;
    gameState.bestStreak = 0;
    gameState.totalAttempts = 0;
    gameState.correctAnswers = 0;

    showScreen('gameScreen');
    loadRound();
}

function loadRound() {
    if (gameState.currentRound >= gameState.rounds.length) {
        endGame();
        return;
    }

    const round = gameState.rounds[gameState.currentRound];
    
    // Update UI
    document.getElementById('roundNumber').textContent = `Round ${gameState.currentRound + 1} / 25`;
    document.getElementById('score').textContent = gameState.score;
    document.getElementById('streak').textContent = gameState.streak;
    
    // Update progress bar
    const progress = ((gameState.currentRound) / gameState.rounds.length) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
    
    // Load round content
    document.getElementById('category').textContent = round.category;
    document.getElementById('description').textContent = round.description;
    document.getElementById('sequence').textContent = round.sequence;
    
    // Clear input and feedback
    answerInput.value = '';
    document.getElementById('feedback').textContent = '';
    document.getElementById('feedback').className = 'feedback';
    
    // Focus input
    answerInput.focus();
}

function submitAnswer() {
    const round = gameState.rounds[gameState.currentRound];
    const userAnswer = answerInput.value.trim().toUpperCase();
    const correctAnswer = round.answer.toUpperCase();
    
    if (!userAnswer) {
        showFeedback('Please enter an answer', 'incorrect');
        return;
    }

    gameState.totalAttempts++;
    const isCorrect = userAnswer === correctAnswer;
    
    // Update stats
    gameState.categoryStats[round.category].total++;
    
    if (isCorrect) {
        gameState.score += 10;
        gameState.streak++;
        gameState.correctAnswers++;
        gameState.categoryStats[round.category].correct++;
        
        if (gameState.streak > gameState.bestStreak) {
            gameState.bestStreak = gameState.streak;
        }
        
        showFeedback(`✓ Correct! The answer was ${correctAnswer}`, 'correct');
    } else {
        gameState.score = Math.max(0, gameState.score - 1);
        gameState.streak = 0;
        showFeedback(`✗ Wrong! The correct answer was ${correctAnswer}`, 'incorrect');
    }

    disableInput(true);
    setTimeout(() => {
        gameState.currentRound++;
        disableInput(false);
        loadRound();
    }, 2000);
}

function skipRound() {
    const round = gameState.rounds[gameState.currentRound];
    gameState.categoryStats[round.category].total++;
    gameState.streak = 0;
    
    showFeedback(`Skipped! The answer was ${round.answer.toUpperCase()}`, 'skipped');
    disableInput(true);
    
    setTimeout(() => {
        gameState.currentRound++;
        disableInput(false);
        loadRound();
    }, 1500);
}

function submitAnswer() {
    const round = gameState.rounds[gameState.currentRound];
    const userAnswer = answerInput.value.trim().toUpperCase();
    const correctAnswer = round.answer.toUpperCase();
    
    if (!userAnswer) {
        showFeedback('Please enter an answer', 'incorrect');
        return;
    }

    gameState.totalAttempts++;
    const isCorrect = userAnswer === correctAnswer;
    
    // Update stats
    gameState.categoryStats[round.category].total++;
    
    if (isCorrect) {
        gameState.score += 10;
        gameState.streak++;
        gameState.correctAnswers++;
        gameState.categoryStats[round.category].correct++;
        
        if (gameState.streak > gameState.bestStreak) {
            gameState.bestStreak = gameState.streak;
        }
        
        showFeedback(`✓ Correct! The answer was ${correctAnswer}`, 'correct');
    } else {
        gameState.score = Math.max(0, gameState.score - 1);
        gameState.streak = 0;
        showFeedback(`✗ Wrong! The correct answer was ${correctAnswer}`, 'incorrect');
    }

    disableInput(true);
    setTimeout(() => {
        gameState.currentRound++;
        disableInput(false);
        loadRound();
    }, 2000);
}

function showFeedback(message, type) {
    const feedback = document.getElementById('feedback');
    feedback.textContent = message;
    feedback.className = `feedback ${type}`;
}

function disableInput(disabled) {
    answerInput.disabled = disabled;
    submitBtn.disabled = disabled;
    skipBtn.disabled = disabled;
}

function endGame() {
    showScreen('gameOverScreen');
    
    // Calculate stats
    const accuracy = gameState.totalAttempts > 0 
        ? Math.round((gameState.correctAnswers / gameState.totalAttempts) * 100) 
        : 0;
    
    // Update final stats
    document.getElementById('finalScore').textContent = gameState.score;
    document.getElementById('correctCount').textContent = gameState.correctAnswers;
    document.getElementById('accuracy').textContent = accuracy;
    document.getElementById('bestStreak').textContent = gameState.bestStreak;
    
    // Score message
    let message = '';
    let messageClass = '';
    
    if (gameState.score >= 200) {
        message = '🏆 Outstanding! You\'re a true Digit Detective!';
        messageClass = 'excellent';
    } else if (gameState.score >= 150) {
        message = '⭐ Excellent work! You know your numbers!';
        messageClass = 'excellent';
    } else if (gameState.score >= 100) {
        message = '👍 Good job! Nice performance!';
        messageClass = 'good';
    } else if (gameState.score >= 50) {
        message = '📚 Decent effort! Keep learning!';
        messageClass = 'decent';
    } else {
        message = '💪 Keep practicing! You\'ll improve!';
        messageClass = 'needs-work';
    }
    
    const scoreMessage = document.getElementById('scoreMessage');
    scoreMessage.textContent = message;
    scoreMessage.className = `score-message ${messageClass}`;
    
    // Category results
    const categoryResults = document.getElementById('categoryResults');
    categoryResults.innerHTML = '';
    
    for (const [category, stats] of Object.entries(gameState.categoryStats)) {
        const categoryAccuracy = stats.total > 0 
            ? Math.round((stats.correct / stats.total) * 100) 
            : 0;
        
        let resultClass = 'success';
        if (categoryAccuracy < 50) resultClass = 'poor';
        else if (categoryAccuracy < 75) resultClass = 'partial';
        
        const resultHtml = `
            <div class="category-result ${resultClass}">
                <div class="category-result-name">${category}</div>
                <div class="category-result-score">${stats.correct}/${stats.total} (${categoryAccuracy}%)</div>
            </div>
        `;
        categoryResults.innerHTML += resultHtml;
    }
    
    // Save score to localStorage
    saveScore({
        score: gameState.score,
        accuracy: accuracy,
        date: new Date().toISOString(),
        streak: gameState.bestStreak
    });
}

function resetGame() {
    showScreen('startScreen');
    gameState.currentRound = 0;
    answerInput.value = '';
}

function showScreen(screenId) {
    [startScreen, gameScreen, gameOverScreen].forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

// Utility Functions
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function saveScore(scoreData) {
    let scores = JSON.parse(localStorage.getItem('digitDetectiveScores') || '[]');
    scores.push(scoreData);
    // Keep only last 10 scores
    scores = scores.slice(-10);
    localStorage.setItem('digitDetectiveScores', JSON.stringify(scores));
}

// Initialize
console.log('🔍 Digit Detective loaded! Ready to play.');
