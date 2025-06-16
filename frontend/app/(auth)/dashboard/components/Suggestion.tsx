"use client";

import React, { useState } from "react";

const Suggestion = ({ data }) => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggested, setSuggested] = useState(false);

  const handleSuggestion = async () => {
    setLoading(true);
    setSuggested(true);

    const prompt = `iven the following soil conditions:  
- Temperature: ${data.sensor.temperature}°C  
- Humidity: ${data.sensor.humidity} %
- Moisture: ${data.sensor.moisture} (scale: 0–1000, where 0 = waterlogged, 1000 = dry)  
- Soil pH: Normal (6.0–7.5)  

Suggest the top 10 crops best suited for these conditions, focusing on high yield and adaptability.  

*Response Requirements:*  
1. *Format*: List crops in priority order (1 to 10) with brief justifications.  
2. *Readability*: Use clear, conversational language without jargon.  
3. *Structure*: Separate each crop with a line break for easy scanning.  
4. *Additional Tips*: Include 2–3 practical farming tips (e.g., irrigation, spacing).  

Example:  
"1. Okra – Thrives in heat and tolerates moderate moisture. Plant in well-drained soil."`;

    try {
      const resp = await fetch(
        "https://api.search1api.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_SEARCH1API_KEY}`,
            "Content-Type": "application/json",
            "HTTP-Referer": window.location.origin,
            "X-Title": "MyAgriApp",
          },
          body: JSON.stringify({
            model: "deepseek-r1-70b-online",
            messages: [
              {
                role: "system",
                content: "You are an AI agriculture advisor.",
              },
              {
                role: "user",
                content: prompt,
              },
            ],
            temperature: 0.7,
            max_tokens: 400,
          }),
        }
      );

      const jsonData = await resp.json();
      const aiText = jsonData.choices?.[0]?.message?.content?.trim();
      setText(aiText ?? "No suggestions returned.");
    } catch (err) {
      console.error(err);
      setText("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen flex justify-center items-start">
      <div className="w-full max-w-screen-xl bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
        <h2 className="text-2xl font-semibold mb-4 text-green-700 text-center">
          Suggestions
        </h2>

        {suggested && (
          <div className="w-full mb-4 border-t pt-4">
            {loading ? (
              <div className="text-gray-600 text-center">Loading...</div>
            ) : (
              <pre className="whitespace-pre-wrap text-gray-800 leading-relaxed text-left">
                {text}
              </pre>
            )}
          </div>
        )}

        <button
          onClick={handleSuggestion}
          className="mt-4 px-5 py-2 bg-[#4caf50] hover:bg-[#66bb6a] text-white rounded-full  transition duration-200"
        >
          Suggestion
        </button>
      </div>
    </div>
  );
};

export default Suggestion;
