import React, { useState } from "react";
import { CheckCircle, Clock, Users, Star } from "lucide-react";

export default function ServiceDetailsModal({
  service,
  isOpen,
  onClose,
  onBookNow,
  showBookingForm,
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    packageType: "",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookingData = {
      serviceId: service.id,
      ...formData,
    };

    try {
      const response = await fetch("http://localhost:8080/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        alert("Booking confirmed!");
        onClose();
      } else {
        alert("Booking failed!");
      }
    } catch (error) {
      console.error(error);
      alert("Error while booking!");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-3xl relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black text-lg"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-4 text-indigo-700">
          {service.name}
        </h2>

        {!showBookingForm ? (
          <>
            <p className="text-gray-600 mb-4">{service.description}</p>
            <p className="font-semibold text-indigo-600 text-lg mb-6">
              ₹{service.price.toLocaleString()} onwards
            </p>

            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-6">
              <div className="flex items-center gap-2">
                <CheckCircle className="text-green-500 w-4 h-4" /> Professional team
              </div>
              <div className="flex items-center gap-2">
                <Clock className="text-green-500 w-4 h-4" /> 24/7 Support
              </div>
              <div className="flex items-center gap-2">
                <Users className="text-green-500 w-4 h-4" /> Custom Packages
              </div>
              <div className="flex items-center gap-2">
                <Star className="text-green-500 w-4 h-4" /> 4.9/5 Rating
              </div>
            </div>

            <button
              onClick={onBookNow}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
            >
              Book This Service
            </button>
          </>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Booking Form
            </h3>

            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              className="w-full border rounded-lg p-2"
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              className="w-full border rounded-lg p-2"
              onChange={handleChange}
            />
            <input
              type="date"
              name="date"
              required
              className="w-full border rounded-lg p-2"
              onChange={handleChange}
            />

            <select
              name="packageType"
              required
              className="w-full border rounded-lg p-2"
              onChange={handleChange}
            >
              <option value="">Select Package</option>
              {service.packages.map((pkg) => (
                <option key={pkg} value={pkg}>
                  {pkg}
                </option>
              ))}
            </select>

            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
            >
              Confirm Booking
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
