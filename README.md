# Movie Database App

A comprehensive movie discovery app built with React Native CLI, information on features and how to start are as follows:

---

## Features

- **Movie Search**: Live search functionality with debounced input
- **Movie Details**: Comprehensive movie information including ratings, overview, cast, and crew
- **Cast & Crew**: Detailed cast information with profile images
- **Responsive Design**: Optimized for various screen sizes
- **Offline Support**: Cached movie data for offline viewing
- **Watchlist (Not implemented)**

---

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- React Native CLI
- iOS: Xcode 12+ (for iOS development)
- Android: Android Studio with Android SDK (for Android development)

### 1. Install dependencies

```sh
npm install
```

### 2. Environment Setup

Create a `.env` file in the root directory:

```env
TMDB_API_KEY=your_tmdb_api_key_here
```

Get your API key from [The Movie Database (TMDB)](https://www.themoviedb.org/settings/api).

### 3. iOS Setup (iOS only)

```sh
cd ios && pod install && cd ..
```

### 4. Start the development server

```sh
npm run start
```

### 5. Run the app

For iOS:
```sh
npm run ios
```

For Android:
```sh
npm run android
```

---

## Testing

### Run Tests

```sh
npm test
```

### Test Coverage

The app includes comprehensive test coverage for UI components for now

## Tested Devices
- **Simulators**: iOS Simulator (iPhone 13, iPhone 15 Pro Max), Android Emulator (Google Pixel 7)

---

## API Integration

### TMDB API Endpoints Used

- `/search/movie` - Movie search
- `/movie/{id}` - Movie details
- `/movie/{id}/credits` - Cast and crew information
- `/movie/{id}/release_dates` - Movie ratings and release dates
- `/configuration` - API configuration for image URLs