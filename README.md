# Developer Utilities Web App

A comprehensive web application for essential developer utilities including text processing, time & date operations, and data format conversions.

## Features

### Text Utilities

#### Encode/Decode
- **Base64**: Encode and decode Base64 strings with full UTF-8 support
- **URL**: URL encoding and decoding
- **HTML**: HTML entity encoding and decoding with Unicode support
- **URI**: URI component encoding and decoding
- **Hex**: Hexadecimal encoding and decoding
- **Binary**: Binary encoding and decoding

#### Parse/Unparse
- **JSON**: Format (pretty print) and minify JSON
- **YAML**: Convert between YAML and JSON formats
- **CSV**: Convert between CSV and JSON formats
- **Query String**: Parse query strings to JSON and vice versa

### Time & Date Utilities

#### Unix Timestamp Converter
- Convert Unix timestamps to human-readable dates
- Convert dates to Unix timestamps
- Support for both seconds and milliseconds
- Multiple output formats (Local, UTC, ISO 8601)
- "Use Current" button for convenience

#### Timezone Converter
- Convert times between 77+ global timezones
- Support for Unix, ISO 8601, and local date/time inputs
- Comprehensive timezone coverage:
  - North America (US, Canada, Mexico)
  - South America (Brazil, Argentina, Peru, Colombia)
  - Europe (21 major cities and regions)
  - Asia (21 cities including East, South, Southeast Asia)
  - Africa (8 major cities)
  - Australia & Oceania (10 timezones)
- Real-time "Now" button for current time input

#### Date Calculator
- **Date Difference Calculator**: Calculate time between two dates
  - Results in days, hours, minutes, weeks, months, and years
  - Support for Unix, ISO 8601, and local date inputs
- **Add/Subtract Time**: Add or subtract time from a base date
  - Support for days, weeks, months, and years
  - Flexible input types (Unix, ISO 8601, local)

#### ISO 8601 Formatter
- Convert dates to/from ISO 8601 format
- Support for Unix, ISO 8601, and local date inputs
- Multiple output formats (ISO, Local, UTC)
- "Use Current" button for convenience

## UTF-8 Support

All encoding/decoding and parsing operations fully support UTF-8 characters, including:
- Unicode characters (emojis, international text)
- Multi-byte characters
- Special symbols and diacritics

The application uses modern JavaScript APIs like `TextEncoder` and `TextDecoder` to ensure proper UTF-8 handling.

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## Usage

### Text Utilities Tab

#### Encode/Decode
1. Select the encoding type from the dropdown (Base64, URL, HTML, URI, Hex, Binary)
2. Choose the operation (Encode or Decode)
3. Enter your text in the input area
4. Click the "Encode" or "Decode" button
5. The result will appear in the output area

#### Parse/Unparse
1. Select the data format from the dropdown (JSON, YAML, CSV, Query String)
2. Choose the operation (Parse or Unparse)
3. Enter your data in the input area
4. Click the "Parse" or "Unparse" button
5. The result will appear in the output area

### Time & Date Tab

#### Unix Timestamp Converter
1. Choose conversion direction (Timestamp to Date or Date to Timestamp)
2. Enter Unix timestamp or select date/time
3. Click "Convert" to see results in multiple formats
4. Use "Use Current" for current timestamp

#### Timezone Converter
1. Select input type (Unix Timestamp, ISO 8601, or Local Date/Time)
2. Enter date/time or use "Now" button
3. Choose source and target timezones from 77+ options
4. Click "Convert Timezone" to see results

#### Date Calculator
1. **For Date Difference**:
   - Select input type (Unix, ISO 8601, or Local)
   - Enter start and end dates
   - Click "Calculate Difference" for detailed breakdown

2. **For Add/Subtract Time**:
   - Select input type and enter base date
   - Choose operation (Add or Subtract)
   - Enter value and unit (days, weeks, months, years)
   - Click "Calculate" for result

#### ISO 8601 Formatter
1. Choose direction (To ISO 8601 or From ISO 8601)
2. For "To ISO": Select input type and enter date
3. For "From ISO": Enter ISO 8601 string
4. Click "Format" to convert

### Additional Features
- **Live Current Time**: Real-time display of current date and time
- **Swap**: Switch the input and output contents (Text Utilities)
- **Clear All**: Clear all inputs and outputs for the active tool
- **Helper Buttons**: "Use Current", "Now", and other convenience functions
- **Input Type Flexibility**: Support for Unix timestamps, ISO 8601, and local formats
- **Comprehensive Timezone Coverage**: 77+ timezones covering all major global regions
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Tab Navigation**: Easy switching between Text Utilities and Time & Date tools

## Technologies Used

- **React 18** with TypeScript for type-safe development
- **CSS Grid and Flexbox** for responsive layout
- **CSS custom properties** for consistent theming
- **Modern JavaScript APIs**: 
  - `TextEncoder`/`TextDecoder` for UTF-8 encoding/decoding
  - `Intl.DateTimeFormat` for timezone conversions
  - Native `Date` object for date/time operations
- **Component-based architecture** with modular design

## Key Features

- **Universal Input Support**: All time/date tools support Unix timestamps, ISO 8601, and local date formats
- **Comprehensive Timezone Database**: 77 timezones covering all continents and major cities
- **Real-time Updates**: Live current time display with second-level precision
- **Error Handling**: Graceful error messages for invalid inputs
- **Mobile-Friendly**: Fully responsive design that works on all devices
- **Accessibility**: Proper labeling and keyboard navigation support

## Future Enhancements

- Hash generation utilities (MD5, SHA1, SHA256, SHA512)
- Color picker and converter (Hex, RGB, HSL, CMYK)
- Regular expression tester with match highlighting
- JWT token decoder and validator
- QR code generator and reader
- XML/XPath parser and formatter
- Cron expression builder and parser
- UUID generator (v1, v4, v5)
- Password generator with customizable options
- Markdown to HTML converter
