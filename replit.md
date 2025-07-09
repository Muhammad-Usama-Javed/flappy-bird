# Flappy Bird Game

## Overview

This is a modern Flappy Bird game built with React, TypeScript, and Canvas API. The application features a full-stack architecture with a React frontend implementing the game logic and a Node.js/Express backend with database support via Drizzle ORM and PostgreSQL.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite with hot module replacement
- **State Management**: Zustand for game state, audio, and UI state
- **Styling**: Tailwind CSS with shadcn/ui components
- **Game Engine**: HTML5 Canvas with custom physics and collision detection
- **Audio**: Web Audio API for sound effects

### Backend Architecture
- **Runtime**: Node.js with Express framework
- **Database**: PostgreSQL with Drizzle ORM
- **Session Management**: Express sessions with PostgreSQL store
- **Development**: Development server with hot reload and error overlay

## Key Components

### Game Logic
- **Game Loop**: Custom animation loop using requestAnimationFrame
- **Physics Engine**: Custom gravity and collision detection system
- **Game Objects**: Bird, Pipe, and Background classes with render methods
- **State Management**: Game phases (ready, playing, ended) with Zustand

### Audio System
- **Sound Effects**: Hit and success sounds with mute functionality
- **Audio Store**: Centralized audio management with volume control
- **Performance**: Sound cloning for overlapping playback

### User Interface
- **Game Canvas**: Full-screen responsive canvas with touch controls
- **Menu System**: Start screen, game over screen, and pause functionality
- **Controls**: Keyboard (spacebar), mouse click, and touch input support
- **Score Display**: Current score and high score persistence

### Database Schema
- **Users Table**: Basic user authentication structure (id, username, password)
- **Extensible**: Ready for user profiles, leaderboards, and score tracking

## Data Flow

1. **Game Initialization**: Canvas setup, game object creation, and audio loading
2. **Input Handling**: Event listeners for keyboard, mouse, and touch inputs
3. **Game Loop**: Physics updates, collision detection, and rendering
4. **State Updates**: Zustand stores manage game state, score, and audio
5. **Persistence**: High scores saved to localStorage (ready for database integration)

## External Dependencies

### Frontend Dependencies
- **React Ecosystem**: React, React DOM, React Three Fiber for 3D support
- **UI Components**: Radix UI primitives with shadcn/ui styling
- **State Management**: Zustand with selectors for reactive state
- **Utilities**: Class variance authority, clsx, date-fns, cmdk

### Backend Dependencies
- **Database**: Drizzle ORM with PostgreSQL (Neon serverless)
- **Server**: Express with session management
- **Development**: TSX for TypeScript execution, ESBuild for production builds

### Development Tools
- **Build System**: Vite with React plugin and GLSL shader support
- **Type Checking**: TypeScript with strict mode
- **Error Handling**: Runtime error overlay for development
- **Asset Support**: GLTF, GLB, and audio file imports

## Deployment Strategy

### Development
- **Frontend**: Vite dev server with HMR on client directory
- **Backend**: Express server with TSX for TypeScript execution
- **Database**: PostgreSQL with Drizzle migrations

### Production
- **Build Process**: Vite builds frontend to dist/public, ESBuild bundles backend
- **Server**: Node.js serves static files and API routes
- **Database**: PostgreSQL with connection pooling via Neon serverless

### Environment Configuration
- **Database URL**: Required environment variable for PostgreSQL connection
- **Development Mode**: Automatic detection for development vs production features
- **Static Assets**: Served from dist/public in production

## Changelog

```
Changelog:
- July 08, 2025. Initial setup
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```