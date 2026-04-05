# 🔍 Digit Detective

A fun and educational web game where players guess missing digits in famous numbers, mathematical constants, historical dates, and sequences.

## Game Features

- **25 Rounds** with progressively challenging sequences
- **Multiple Categories**: 
  - Mathematical Constants (Pi, e, Golden Ratio)
  - Fibonacci Sequence
  - Historical Dates (1066, 1776, 1945, etc.)
  - Atomic Numbers
  - ISBN Sequences
  - Phone Numbers
  - Physics & Chemistry Constants

- **Scoring System**:
  - +10 points for correct answers
  - -1 point for wrong answers
  - Streak tracking to encourage consistency

- **Features**:
  - No time pressure - solve at your own pace
  - Progress bar showing game advancement
  - Real-time score tracking
  - Final statistics and accuracy percentage
  - Category-by-category results breakdown
  - Local score history (saved to browser storage)
  - Fully responsive design (mobile-friendly)

## How to Play

1. Click "Start Game" to begin
2. Look at the sequence with missing digits (shown as blanks)
3. Enter the missing digit(s) in the input field
4. Click "Submit Answer" or press Enter
5. Get feedback immediately
6. Skip any round without penalty if you prefer
7. After 25 rounds, see your final score and results

## Example Rounds

- **Pi**: `3.1415926___8979...` → Answer: `358`
- **Year 1066**: `10__` → Answer: `66`
- **Fibonacci**: `1, 1, 2, 3, 5, 8, 13, __, 34...` → Answer: `21`
- **Atomic Number**: `(Carbon) __` → Answer: `6`
- **Phone Number**: `555-____` → Answer: `0100`

## Technology

Built with **vanilla HTML5, CSS3, and JavaScript** - no frameworks, no dependencies!

- Pure CSS for responsive design
- Local Storage for score persistence
- Input validation for digit-only entries

## Play Online

Visit: [Digit Detective on GitHub Pages](https://schlaufuchs26.github.io/digit-detective/)

## Project Structure

```
digit-detective/
├── index.html      # Main game HTML
├── style.css       # All styling
├── script.js       # Game logic
└── README.md       # This file
```

## Installation (Local Development)

1. Clone the repository:
   ```bash
   git clone https://github.com/schlaufuchs26/digit-detective.git
   cd digit-detective
   ```

2. Open `index.html` in your browser or run a local server:
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js (if http-server installed)
   http-server
   ```

3. Navigate to `http://localhost:8000`

## Features Breakdown

### Game Mechanics
- **Input Validation**: Only accepts digits (and some special cases like 'x')
- **Streak System**: Tracks consecutive correct answers
- **Score Persistence**: Your best scores are saved locally

### UI/UX
- Clean, modern design with gradient backgrounds
- Color-coded feedback (green for correct, red for incorrect, orange for skipped)
- Smooth animations and transitions
- Mobile-responsive layout
- Accessible typography and contrast

### Educational Value
- Learn interesting facts about mathematical constants
- Memorize famous historical years
- Discover atomic numbers
- Explore Fibonacci patterns

## Difficulty Levels

Rounds are organized by difficulty:
- **Easy (Level 1)**: Common historical dates, simple sequences
- **Medium (Level 2)**: Mathematical constants, advanced sequences
- **Hard (Level 3)**: Complex patterns and specialized knowledge

## Browser Support

- Chrome/Chromium (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome for Android)

## Score Ranges

- **200+ Points**: Outstanding! True Digit Detective! 🏆
- **150-199**: Excellent - You know your numbers! ⭐
- **100-149**: Good job - Nice performance! 👍
- **50-99**: Decent effort - Keep learning! 📚
- **Below 50**: Keep practicing - You'll improve! 💪

## Future Ideas

- Difficulty settings (Easy/Normal/Hard)
- Leaderboard system
- More categories (Sports statistics, ZIP codes, etc.)
- Time-based challenges
- Multiplayer mode
- Sound effects and music

## License

MIT License - Feel free to use, modify, and share!

## Credits

Created as an educational game to make learning numbers fun and engaging.

---

**Enjoy becoming a Digit Detective! 🔍**
