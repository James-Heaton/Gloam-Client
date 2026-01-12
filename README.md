# Gloam: The Winding Path - Frontend

A dark fantasy text-based adventure game built with React and Vite. Navigate a deadly castle, make risky decisions, and discover treasure... or die trying.

**Backend Repository**: https://github.com/James-Heaton/Gloam-API

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS v4** - Utility-first styling
- **Context API** - State management (Auth & Game state)

## Features

### Game Mechanics
- **Character Creation**: Choose from multiple character types (Fighter, Ranger, Wizard) with different HP/MP stats
- **Trait System**: Select 2 traits that modify gameplay (Lucky, Strong, Wise, Stealthy)
- **20+ Interconnected Areas**: Branching paths through a mysterious castle
- **Risk-Based Decisions**: Each area offers 3 actions with hidden dice rolls (2d6) determining outcomes
- **Magic Actions**: Each area offers 1 special magic action which uses MP
- **Trait Procs**: Traits activate with percentage chances to modify outcomes
- **Stealthy Mechanic**: 3 one-time-use escapes to bypass dangerous situations

### UI/UX Features
- **Dark Fantasy Aesthetic**: Stone textures, custom Washington Text font, amber/red/stone color palette
- **Typewriter Effects**: Atmospheric text animations with click-to-skip
- **Responsive Design**: Mobile-friendly with collapsible character stats panel and navbar
- **Animated Transitions**: Smooth page transitions and login/register exit animations
- **Sticky Navbar**: Always-accessible navigation (desktop only)

## Project Structure
```
src/
├── assets/
│   ├── fonts/          # Custom Washington Text font
│   └── images/         # Background images and textures
├── components/
│   ├── game/           # Game-specific components
│   │   ├── ActionButton.jsx
│   │   ├── ActionList.jsx
│   │   ├── AreaDisplay.jsx
│   │   ├── CharacterStatsPanel.jsx
│   │   ├── GameOverModal.jsx
│   │   ├── GamePage.jsx
│   │   ├── OutcomeModal.jsx
│   │   └── StealthyButton.jsx
│   ├── Navbar.jsx
│   └── ProtectedRoute.jsx
├── context/
│   ├── AuthContext.js       # Authentication state
│   ├── AuthProvider.jsx
│   ├── GameContext.js        # Game state
│   └── GameProvider.jsx
├── hooks/
│   └── useTypewriter.js      # Custom typing animation hook
├── pages/
│   ├── About.jsx
│   ├── DeleteConfirmation.jsx
│   ├── EditAdventurer.jsx
│   ├── Landing.jsx
│   ├── Login.jsx
│   ├── MyAdventurers.jsx
│   ├── NewAdventurer.jsx
│   ├── Register.jsx
│   └── Rules.jsx
├── services/
│   └── api.js               # API communication layer
├── App.jsx
├── main.jsx
└── index.css                # Tailwind imports & custom styles
```

## Setup & Installation

### Prerequisites
- Node.js 18+ and npm
- Backend API running (see https://github.com/James-Heaton/Gloam-API)

### Installation

1. **Clone the repository**
```bash
   git clone git@github.com:James-Heaton/Gloam-Client.git
   cd gloam-client
```

2. **Install dependencies**
```bash
   npm install
```

3. **Configure API endpoint**
   - Update the API URL in `src/services/api.js` to point to your backend:
```javascript
   const API_URL = "http://localhost:8000";
```

4. **Start development server**
```bash
   npm run dev
```

5. **Access the app**
   - Open `http://localhost:5173` in your browser

## Development

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

### Custom Font Setup

The Washington Text font is located in `src/assets/fonts/`. It's imported in `src/index.css`:
```css
@font-face {
  font-family: 'Washington';
  src: url('./assets/fonts/WashingtonText.ttf') format('truetype');
}
```

Use the custom class `font-washington` to apply it.

### Tailwind Configuration

Tailwind v4 is configured in `postcss.config.js`. Custom utilities and animations are defined in `src/index.css`.

Key custom animations:
- `fadeIn` - Page transitions
- `fadeOut` - Login/register exit
- `panUp` - Background pan animation
- Typewriter effect - Custom React hook

## API Integration

The frontend communicates with the Django REST API through `src/services/api.js`. Key endpoints:

- **Auth**: `/login`, `/register`
- **Characters**: `/characters`, `/characters/:id`, `/characters/:id/set-active`
- **Game**: `/game/state`, `/game/action`, `/game/reset`
- **Reference Data**: `/charactertypes`, `/traits`

## Responsive Breakpoints

- Mobile: < 768px (collapsible stats, stacked layout)
- Tablet: 768px - 1024px
- Desktop: > 1024px (sticky stats panel, side-by-side layout)

## Building for Production
```bash
npm run build
```

The optimized build will be in the `dist/` directory.

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## Credits

- **Developer**: James Heaton
- **Nashville Software School**: Coding Bootcamp Capstone Project
- **Inspiration**: Dungeons & Dragons, Zork, Choose-Your-Own-Adventure books

## License

This project is for educational purposes.