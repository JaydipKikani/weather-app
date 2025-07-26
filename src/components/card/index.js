import React, { useEffect, useState } from "react";

const Card = (props) => {
  const { Data } = props;
  const [wheather, setwheather] = useState();
  useEffect(() => {
    setwheather(Data);
  }, [Data]);
  const { main, wind, name } = wheather || {
    main: "",
    wind: "",
    name: "",
  };

  const condition = wheather?.weather?.[0]?.main;

  const getWeatherIcon = (main) => {
    switch (main) {
      case "Rain":
        return "☔ Raining";
      case "Clouds":
        return "☁️ Cloudy";
      case "Clear":
        return "☀️ Sunny";
      case "Thunderstorm":
        return "⛈️ Thunderstorm";
      case "Snow":
        return "❄️ Snowy";
      default:
        return `🌡️ Weather: ${main}`;
    }
  };

  const getSuggestions = (condition, temp, windSpeed) => {
    const suggestions = [];

    if (condition === "Rain" || condition === "Thunderstorm") {
      suggestions.push("☔ Take an umbrella");
    }

    if (condition === "Clear") {
      suggestions.push("🕶 Wear sunglasses");
    }

    if (temp < 15) {
      suggestions.push("🧥 Wear a jacket");
    }

    if (windSpeed > 6) {
      suggestions.push("💨 It's windy, wear something warm");
    }

    if (condition === "Snow") {
      suggestions.push("🧣 Bundle up, it’s snowy!");
    }

    if (suggestions.length === 0) {
      suggestions.push("✅ No special gear needed. Enjoy your day!");
    }

    return suggestions;
  };

  const suggestions = getSuggestions(
    condition,
    (main?.temp - 273.15).toFixed(2),
    wind?.speed
  );

  return (
    <React.Fragment>
      <div className="flex justify-center items-center min-h-[400px] mt-16 px-4">
        <div className="max-w-md w-full rounded-lg bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white shadow-2xl shadow-indigo-600/50 overflow-hidden">
          {Data && Data.cod === 200 ? (
            <div className="p-6">
              <h2 className="text-3xl font-extrabold mb-6 border-b border-indigo-500 pb-2">
                Weather Details
              </h2>

              <div className="space-y-4 text-gray-300">
                <div className="grid grid-cols-2 gap-x-4">
                  <span className="font-semibold text-indigo-400">City:</span>
                  <span className="text-yellow-300 text-right">{name}</span>
                </div>

                <div className="grid grid-cols-2 gap-x-4">
                  <span className="font-semibold text-indigo-400">
                    Temperature:
                  </span>
                  <span className="text-blue-400 text-right">
                    {(main?.temp - 273.15).toFixed(1)}°C
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-x-4">
                  <span className="font-semibold text-indigo-400">
                    Humidity:
                  </span>
                  <span className="text-green-400 text-right">
                    {main?.humidity}%
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-x-4">
                  <span className="font-semibold text-indigo-400">
                    Wind Speed:
                  </span>
                  <span className="text-purple-400 text-right">
                    {wind?.speed} km/h
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-x-4 items-center">
                  <span className="font-semibold text-indigo-400">
                    Condition:
                  </span>
                  <span className="text-purple-300 text-right text-lg font-semibold">
                    {getWeatherIcon(condition)}
                  </span>
                </div>
              </div>

              <div className="mt-6 bg-indigo-900 bg-opacity-30 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-3 text-indigo-300">
                  Suggestions:
                </h3>
                <ul className="list-disc list-inside space-y-1 text-gray-200">
                  {suggestions?.map((item, index) => (
                    <li
                      key={index}
                      className="hover:text-indigo-400 transition-colors"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            Data?.cod !== undefined && (
              <div className="p-8">
                <h1 className="text-center text-3xl font-bold text-red-500">
                  {Data?.message}
                </h1>
              </div>
            )
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Card;
