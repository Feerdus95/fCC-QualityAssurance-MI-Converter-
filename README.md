# 🔄 Metric-Imperial Converter

[![Node.js Version](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen.svg)](https://nodejs.org/)
[![NPM Version](https://img.shields.io/badge/npm-latest-blue.svg)](https://www.npmjs.com/)

A robust web application that seamlessly converts between metric and imperial units. Built with precision and extensive testing as part of the freeCodeCamp Quality Assurance certification.

## 🌟 Key Features

- **Comprehensive Unit Support**
  - 🌊 Volume: Gallons (gal) ↔️ Liters (L)
  - ⚖️ Weight: Pounds (lbs) ↔️ Kilograms (kg)
  - 📏 Distance: Miles (mi) ↔️ Kilometers (km)

- **Smart Input Handling**
  - Processes decimal numbers (e.g., `3.1mi`)
  - Accepts fractional inputs (e.g., `1/2km`)
  - Handles complex fractions (e.g., `5.4/3lbs`)
  - Defaults to 1 for unit-only inputs (e.g., `kg`)

## 🚀 Quick Start

### Prerequisites
- Node.js ≥ 14.0.0
- npm (comes with Node.js)

### Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/metric-imperial-converter.git
   cd metric-imperial-converter
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file (optional):
   ```env
   PORT=3000
   NODE_ENV=development
   ```

## 💻 Usage

### Starting the Server

```bash
# Development mode with hot reload
npm run dev

# Production mode
npm start
```

### API Endpoint

```http
GET /api/convert?input=[number][unit]
```

### Example Requests & Responses

```javascript
// Request: /api/convert?input=3.1mi
{
  "initNum": 3.1,
  "initUnit": "mi",
  "returnNum": 4.98934,
  "returnUnit": "km",
  "string": "3.1 miles converts to 4.98934 kilometers"
}

// Request: /api/convert?input=1/2km
{
  "initNum": 0.5,
  "initUnit": "km",
  "returnNum": 0.31069,
  "returnUnit": "mi",
  "string": "0.5 kilometers converts to 0.31069 miles"
}
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run unit tests only
npm run test:unit

# Run functional tests only
npm run test:functional
```

### Test Coverage
- ✅ Unit tests for conversion functions
- ✅ Input validation and parsing
- ✅ API endpoint integration tests
- ✅ Edge cases and error handling

## 📊 Conversion Reference

| From      | To        | Formula           | Example                |
|-----------|-----------|-------------------|------------------------|
| Gallons   | Liters    | gal × 3.78541    | 2 gal = 7.57082 L     |
| Liters    | Gallons   | L ÷ 3.78541      | 5 L = 1.32086 gal     |
| Pounds    | Kilograms | lbs × 0.453592   | 3 lbs = 1.36078 kg    |
| Kilograms | Pounds    | kg ÷ 0.453592    | 2 kg = 4.40925 lbs    |
| Miles     | Kilometers| mi × 1.60934     | 1 mi = 1.60934 km     |
| Kilometers| Miles     | km ÷ 1.60934     | 10 km = 6.21371 mi    |

## 🔍 Troubleshooting

### Common Issues

1. **Invalid Unit Error**
   - Ensure units are spelled correctly (gal, L, mi, km, lbs, kg)
   - Units are case-insensitive except for 'L'

2. **Invalid Number Error**
   - Check for proper fraction format (e.g., '1/2' not '1/2/3')
   - Verify decimal number format

3. **Server Connection Issues**
   - Verify the server is running
   - Check the correct port is being used
   - Ensure no other service is using the same port

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- FreeCodeCamp for the project requirements and testing suite
- The Node.js community for excellent documentation
- Contributors who helped improve this project