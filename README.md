# 🌤️ Weather-Based Outfit Recommender

A responsive React application that allows users to search for a city's weather and receive outfit recommendations based on real-time weather data.

## 🚀 Features

- 🔍 **City Search**: Input any city name to get weather data using the OpenWeatherMap API.
- 🌦️ **Weather Display**: Shows temperature, weather condition (sunny, cloudy, rainy), wind speed, and humidity.
- 👕 **Outfit Recommendation**: Suggests what to wear based on current weather conditions (e.g., wear a jacket, carry an umbrella).
- 📜 **Search History**: Displays the last 5 searched cities.
- 💥 **Error Handling**: Gracefully handles errors such as invalid city names or API failures.
- 📱 **Responsive UI**: Optimized for mobile and desktop using Tailwind CSS.

### ✨ Bonus Features (if implemented)

- 🧠 Debounced auto-suggestions while typing city names.
- 🌗 Theme toggle (light/dark mode).
- 🎞️ Smooth animations on card transitions or weather changes.
- 📡 Retry logic for offline scenarios.

---

## 🧠 Tech Stack

- **React** (Functional Components + Hooks)
- **Redux** (for global state management)
- **Tailwind CSS** (for styling and responsiveness)
- **OpenWeatherMap API** (for weather data)

---

## 🛠️ Installation & Setup

1. **Clone the repository**

```bash
git clone https://github.com/your-username/weather-outfit-recommender.git
cd weather-outfit-recommender
npm i
npm run start