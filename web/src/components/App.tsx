import React, { useState } from "react";
import "./App.css";
import { debugData } from "../utils/debugData";
import { fetchNui } from "../utils/fetchNui";
import jsonData from "./Info.json";

debugData([
  {
    action: "setVisible",
    data: true,
  },
]);

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState(""); // État local pour le terme de recherche

  const debugtest = async (buttonText: string) => {
    try {
      console.log(`Clicked button text: ${buttonText}`);
      await fetchNui<void>("someNuiCallback", buttonText);
      console.log("Texte du bouton envoyé au serveur avec succès");
    } catch (error) {
      console.error("Erreur lors de l'envoi du texte du bouton au serveur:", error);
    }
  };

  const data: string[] = jsonData;

  // Filtrer les boutons en fonction du terme de recherche
  const filteredButtons = data.filter((buttonText) =>
    buttonText.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="nui-wrapper">
      <div className="popup-thing">
        <div>
          <h1>animpostfx</h1>
          {/* Barre de recherche */}
          <input
            type="text"
            className="search-input"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="scroll-box">
            <h2>List of Buttons:</h2>
            {/* Afficher uniquement les boutons filtrés */}
            {filteredButtons.map((buttonText, index) => (
              <button onClick={() => debugtest(buttonText)} key={index}>
                {buttonText}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
