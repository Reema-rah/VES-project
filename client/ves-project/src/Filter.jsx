/*import React, { useEffect, useState } from "react";
import Space from "./Space";
import "./App.css";





function Filter({ cards }) {
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [filteredCards, setFilteredCards] = useState(cards);
  const [cards, setCards] = useState([]);

  

  let filters = ["All", "User Story", "Iteration", "Release"];

  const handleFilterButtonClick = (selectedCards) => {
    if (selectedFilters.includes(selectedCards)) {
      let filters = selectedFilters.filter((el) => el !== selectedCards);
      setSelectedFilters(filters);
    } else {
      setSelectedFilters([...selectedFilters, selectedCards]);
    }
  };

  useEffect(() => {
    filterCards();
  }, [selectedFilters]);

  const filterCards = () => {
    if (selectedFilters.length > 0) {
      let tempCards = selectedFilters.map((selectedCategory) => {
        let temp = cards.filter((card) => card.category === selectedCategory);
        return temp;
      });
      setFilteredItems(tempCards.flat());
    } else {
      setFilteredItems([...cards]);
    }
  };

  return (


    <div>
      <div className="buttons-container">
        {filters.map((category, idx) => (
          <button
            onClick={() => handleFilterButtonClick(category)}
            className={`button ${
              selectedFilters?.includes(category) ? "active" : ""
            }`}
            key={`filters-${idx}`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="items-container">
      {filteredItems.map((card, idx) => (
  <div key={`card-${idx}`} className="card">
    
  </div>
))}
        
      </div>
    </div>
  );
}

export default Filter;*/
import React, { useEffect, useState } from "react";
import "./App.css";

function Filter({ cards }) {
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);

  let filters = ["All", "User Story", "Iteration", "Release"];

  useEffect(() => {
    filterCards();
  }, [selectedFilters, cards]);

  const filterCards = () => {
    if (selectedFilters.length > 0) {
      const tempCards = cards.filter((card) =>
        selectedFilters.includes(card.category)
      );
      setFilteredCards(tempCards);
    } else {
      setFilteredCards(cards);
    }
  };

  const handleFilterButtonClick = (selectedCategory) => {
    if (selectedFilters.includes(selectedCategory)) {
      setSelectedFilters(selectedFilters.filter((el) => el !== selectedCategory));
    } else {
      setSelectedFilters([...selectedFilters, selectedCategory]);
    }
  };

  return (
    <div>
      <div className="buttons-container">
        {filters.map((category, idx) => (
          <button
            onClick={() => handleFilterButtonClick(category)}
            className={`button ${selectedFilters.includes(category) ? "active" : ""}`}
            key={`filters-${idx}`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="items-container">
        {filteredCards.map((card) => (
          <div key={card.id} className="card">
            <p>{card.name}</p>
            <p className="category">{card.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Filter;
