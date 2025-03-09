// frontend/src/components/SupplierCard.jsx

import React from "react";
import { ArrowRight } from "lucide-react";
import "../static/css/SupplierCard.css";

const cardData = [
  {
    id: 1,
    name: "Supplier: Rifat",
    image: "./src/assets/boom.png",
    details: "Ratings: ☆★★★★",
  },
  {
    id: 2,
    name: "Supplier: Shad",
    image: "./src/assets/boom.png",
    details: "Ratings: ☆★★★★",
  },
  {
    id: 3,
    name: "Supplier: Fahim",
    image: "./src/assets/boom.png",
    details: "Ratings: ☆★★★★",
  },
  {
    id: 4,
    name: "Supplier: Affan",
    image: "./src/assets/boom.png",
    details: "Ratings: ☆★★★★",
  },
];

const SupplierCard = () => {
  return (
    <section className="supplier-card">
      <div className="container">
        <h2 className="title">Top Suppliers</h2>

        <div className="grid">
          {cardData.map((card) => (
            <section key={card.id} className="card">
              <h3 className="card-title">{card.name}</h3>
              <div className="card-image">
                <img src={card.image} alt={card.name} />
              </div>
              <p className="card-description">{card.details}</p>
              <div className="card-footer">
                <button className="card-button">
                  View Details <ArrowRight className="icon" />
                </button>
              </div>
            </section>
          ))}
        </div>

        <div className="button-container">
          <button className="see-more-button">
            See More <ArrowRight className="icon" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default SupplierCard;
