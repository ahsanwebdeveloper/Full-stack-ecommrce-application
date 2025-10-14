import React, { useState } from "react";
import "./MedicationTherapy.css";

const faqs = [
  { question: "What is MTM?", answer: "Medication Therapy Management (MTM) is a service to help optimize drug therapy and improve therapeutic outcomes for patients." },
  { question: "What are the benefits of an MTM service?", answer: "It improves medication use, reduces risk of adverse events, and ensures patients get the best possible results from their medications." },
  { question: "How can I prepare for a review?", answer: "Bring a list of all your medications, including prescriptions, over-the-counter drugs, vitamins, and supplements." },
  { question: "How much does it cost?", answer: "Most MTM services are covered by insurance or offered at no cost to the patient." },
  { question: "Testimonials", answer: "Patients report improved confidence in their therapy and better health outcomes." },
];

const MedicationTherapy = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="mtm-container">
      {/* --- Header Section --- */}
      <div className="mtm-header">
        <div className="mtm-text">
          <h2>Medication Therapy Management</h2>
          <p>Call <b>1-800-508-0960</b> to see if you qualify for medication advice.</p>
        </div>
        <div className="mtm-img">
          <img
            src="data:image/jpeg;base64,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"
            alt="Pharmacist helping"
          />
        </div>
      </div>

      {/* --- FAQ Section --- */}
      <div className="faq-section">
        <h3>FAQ</h3>
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`faq-item ${openIndex === index ? "open" : ""}`}
            onClick={() => toggleFAQ(index)}
          >
            <div className="faq-question">
              {faq.question} <span>{openIndex === index ? "▲" : "▼"}</span>
            </div>
            {openIndex === index && (
              <div className="faq-answer">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>

      {/* --- Hours Section --- */}
      <div className="hours">
        <h3>Hours of Service</h3>
        <p>Monday - Friday 8:00 a.m - 6:00 p.m CST</p>
      </div>

      {/* --- Contact Section --- */}
      <div className="contact">
        <h3>Contact Us</h3>
        <p>📞 Call: <b>1-800-508-0960</b></p>
        <p>📠 Fax: <b>1-877-969-9123</b></p>
      </div>
    </div>
  );
};

export default MedicationTherapy;
