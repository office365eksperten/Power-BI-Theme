import React, { useState } from "react";
import { ChromePicker } from "react-color";

export default function PowerBIThemeGenerator() {
  const [colors, setColors] = useState(["#1f77b4", "#ff7f0e", "#2ca02c"]);
  const [background, setBackground] = useState("#ffffff");
  const [foreground, setForeground] = useState("#000000");

  const handleColorChange = (color, index) => {
    const newColors = [...colors];
    newColors[index] = color.hex;
    setColors(newColors);
  };

  // 🛠 Rettelse: Definerer `generateJSON`
  const generateJSON = () => {
    const theme = {
      name: "Custom Theme",
      dataColors: colors,
      background,
      foreground,
      tableAccent: colors[0]
    };

    const blob = new Blob([JSON.stringify(theme, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "powerbi-theme.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="p-6 max-w-xl mx-auto space-y-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold">Power BI Theme Generator</h2>
      <div className="space-y-2">
        {colors.map((color, index) => (
          <div key={index} className="flex items-center space-x-2">
            <ChromePicker color={color} onChange={(c) => handleColorChange(c, index)} />
          </div>
        ))}
      </div>
      <div>
        <label className="block font-medium">Background</label>
        <ChromePicker color={background} onChange={(c) => setBackground(c.hex)} />
      </div>
      <div>
        <label className="block font-medium">Foreground</label>
        <ChromePicker color={foreground} onChange={(c) => setForeground(c.hex)} />
      </div>

      {/* 🛠 Rettelse: Bruger en standard <button> i stedet for 'Button' */}
      <button onClick={generateJSON} className="w-full bg-blue-500 text-white py-2 px-4 rounded">
        Download JSON
      </button>
    </div>
  );
}