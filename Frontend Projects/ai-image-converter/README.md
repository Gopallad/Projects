# AI Image Generator

A React-based web application that generates AI-powered images from text prompts using OpenAI's DALL-E 3 API.

## Features

- Generate images from text descriptions using DALL-E 3
- Responsive UI with loading states and error handling
- Real-time prompt input with instant image generation

## Tech Stack

- React 19
- React Scripts
- OpenAI API (DALL-E 3)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- OpenAI API key

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the root directory and add your OpenAI API key:
   ```
   REACT_APP_OPENAI_API_KEY=your_openai_api_key
   ```
4. Start the development server:
   ```
   npm start
   ```

## Usage

1. Enter a text description in the input field
2. Click the "Generate" button
3. Wait for the AI to generate your image
4. The generated image will appear below the input field

## Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Runs the test suite
- `npm run eject` - Ejects from Create React App

## License

MIT
