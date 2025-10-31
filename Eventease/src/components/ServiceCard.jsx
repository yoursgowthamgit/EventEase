import React from "react";
import { Camera, UtensilsCrossed, Building, Palette } from "lucide-react";

const categoryIcons = {
  photography: Camera,
  catering: UtensilsCrossed,
  hall: Building,
  decoration: Palette,
};

const gradientClasses = {
  photography: "bg-gradient-to-r from-orange-400 to-pink-500",
  catering: "bg-gradient-to-r from-blue-400 to-purple-500",
  hall: "bg-gradient-to-r from-green-400 to-yellow-400",
  decoration: "bg-gradient-to-r from-pink-400 to-orange-400",
};

export const ServiceCard = ({ service, onViewDetails, onBookNow }) => {
  const Icon = categoryIcons[service.category];
  const gradientClass = gradientClasses[service.category];

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300">
      {/* Image/Banner with Gradient Overlay */}
      <div className={`relative h-48 ${gradientClass}`}>
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute top-4 left-4">
          <span className="bg-white/20 text-white px-3 py-1 rounded-md text-sm backdrop-blur-sm flex items-center">
            {Icon && <Icon className="h-3 w-3 mr-1" />}
            {service.category.charAt(0).toUpperCase() + service.category.slice(1)}
          </span>
        </div>
        <div className="absolute bottom-4 left-4 text-white">
          <h3 className="text-xl font-bold mb-1">{service.name}</h3>
          <p className="text-sm opacity-90">{service.description}</p>
        </div>
      </div>

      <div className="p-6 space-y-4">
        {/* Price */}
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-blue-600">
            ₹{service.price.toLocaleString()}
          </span>
          <span className="text-sm text-gray-500">Starting from</span>
        </div>

        {/* Packages */}
        {service.packages && (
          <div>
            <h4 className="font-semibold mb-2">Available Packages:</h4>
            <div className="flex flex-wrap gap-2">
              {service.packages.slice(0, 2).map((pkg, index) => (
                <span
                  key={index}
                  className="bg-gray-200 text-gray-800 px-2 py-1 rounded-md text-xs"
                >
                  {pkg}
                </span>
              ))}
              {service.packages.length > 2 && (
                <span className="border px-2 py-1 rounded-md text-xs">
                  +{service.packages.length - 2} more
                </span>
              )}
            </div>
          </div>
        )}

        <div className="space-y-2">
          <button
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
            onClick={() => onViewDetails(service)}
          >
            View Details
          </button>
          <button
            className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
            onClick={() => onBookNow(service)}
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};
