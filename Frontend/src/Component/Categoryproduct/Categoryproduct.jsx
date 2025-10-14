
import React from 'react'
import "./Categoryproduct.css"

const categoryproduct = [
  { id: 1, name: "Top 100 baby registry items", image: "/images/item1.png" },
  { id: 2, name: "Diapers & wipes", image: "/images/item2.png" },
  { id: 3, name: "Nursing & feeding", image: "/images/item3.png" },
  { id: 4, name: "Baby apparel", image: "/images/item4.png" },
  { id: 5, name: "Baby gear", image: "/images/item5.png" },
  { id: 6, name: "Baby toys", image: "/images/item6.png" },
  { id: 7, name: "Nursery & decor", image: "/images/item7.png" },
  { id: 8, name: "Health & safety", image: "/images/item8.png" },
  { id: 9, name: "Car seats", image: "/images/item9.png" },
  { id: 10, name: "Strollers", image: "/images/item10.png" },
  { id: 11, name: "Baby skincare", image: "/images/item11.png" },
  { id: 12, name: "Bath & potty", image: "/images/item12.png" },
]

function Categoryproduct({products =categoryproduct}) {
  return (
    <div className="category-main">
    
            
      <div className="category-grid">
        {products.map((p) => (
          <div className="category-card" key={p.id}>
            <div className="image-card">
              <img src={p.image} alt={p.name} />
            </div>
            <p className="category-name">{p.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Categoryproduct

