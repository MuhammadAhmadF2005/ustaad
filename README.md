# Ustaad - Skilled Workers Marketplace

Ustaad is a mobile application that connects skilled workers with customers in Pakistan, with a special focus on empowering underprivileged women by providing them a platform to offer their services.

## Features

- Service provider profiles and listings
- Service booking system
- In-app messaging
- Women empowerment section
- Rating and review system
- Location-based service discovery

## Tech Stack

- React Native
- TypeScript
- React Navigation
- Firebase (for authentication and database)
- Google Maps API
- Gemini API (for AI-powered features)

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ustaad.git
cd ustaad
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
Create a `.env` file in the root directory and add the following:
```
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
GEMINI_API_KEY=your_gemini_api_key
FIREBASE_CONFIG=your_firebase_config
```

4. Start the development server:
```bash
npm start
# or
yarn start
```

5. Run on Android:
```bash
npm run android
# or
yarn android
```

6. Run on iOS:
```bash
npm run ios
# or
yarn ios
```

## Project Structure

```
ustaad/
├── src/
│   ├── screens/         # Screen components
│   ├── components/      # Reusable components
│   ├── navigation/      # Navigation configuration
│   ├── services/        # API and service integrations
│   ├── assets/          # Images and other static assets
│   └── utils/           # Utility functions
├── App.tsx              # Main application component
└── package.json         # Project dependencies
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- All the skilled workers and service providers who make this platform valuable
- The women who are breaking barriers and providing services through our platform
- The open-source community for their valuable contributions 