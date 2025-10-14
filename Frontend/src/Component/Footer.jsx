import React from "react";
import "./Footer.css";

export default function Footer() {
  const links = [
    "All Departments", "Store Directory", "Careers", "Our Company",
    "Sell on Walmart.com", "Help", "Product Recalls", "Accessibility",
    "Tax Exempt Program", "Get the Walmart App", "Safety Data Sheet",
    "Terms of Use", "Privacy Notice", "California Supply Chain Act",
    "Your Privacy Choices", "Notice at Collection", "AdChoices",
    "Consumer Health Data Privacy Notices", "Pharmacy", "Walmart Business",
    "#IYWYK", "Delete Account", "Brand Shop Directory"
  ];

  return (
    <footer className="footer">
      <div className="footer-links">
        {links.map((text, i) => (
          <a key={i} href="#">{text}</a>
        ))}
      </div>
      <p className="footer-copy">
        © 2025 Walmart. The trademarks Walmart and the Walmart Spark design are
        registered with the US Patent and Trademark Office. All Rights Reserved.
      </p>
    </footer>
  );
}
