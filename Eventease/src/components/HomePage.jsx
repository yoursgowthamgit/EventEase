import React from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import {
  Calendar,
  Users,
  Star,
  Camera,
  UtensilsCrossed,
  Building,
  Palette,
} from "lucide-react";

export const HomePage = ({ onNavigate }) => {
  const features = [
    {
      icon: Calendar,
      title: "Easy Booking",
      description: "Book your events with just a few clicks",
      gradient: "gradient-orange-pink",
    },
    {
      icon: Users,
      title: "Expert Team",
      description: "Professional service providers for all your needs",
      gradient: "gradient-blue-purple",
    },
    {
      icon: Star,
      title: "Premium Quality",
      description: "Top-rated services with guaranteed satisfaction",
      gradient: "gradient-green-yellow",
    },
  ];

  const services = [
    { icon: Camera, name: "Photography", color: "text-orange-500" },
    { icon: UtensilsCrossed, name: "Catering", color: "text-purple-500" },
    { icon: Building, name: "Convention Hall", color: "text-green-500" },
    { icon: Palette, name: "Decoration", color: "text-pink-500" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
         <h1 className="text-5xl font-bold text-center">
  Make Your <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">Events</span>
</h1>
 <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            From photography to catering, we provide everything you need to
            create magical moments that last a lifetime.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="hero"
              size="lg"
              onClick={() => onNavigate("services")}
              className="text-lg px-8 py-4"
            >
              Explore Services
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-4 bg-white/10 backdrop-blur-sm border-primary text-primary hover:bg-primary hover:text-white"
            >
              View Packages
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Why Choose EventEase?
            </h2>
            <p className="text-xl text-muted-foreground">
              Experience the difference with our premium event services
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className="text-center shadow-card hover:shadow-glow transition-smooth transform hover:scale-105"
                >
                  <CardContent className="p-8">
                    <div
                      className={`w-16 h-16 mx-auto mb-6 rounded-full ${feature.gradient} flex items-center justify-center`}
                    >
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-xl text-muted-foreground">
              Professional event services tailored to your needs
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card
                  key={index}
                  className="text-center shadow-card hover:shadow-glow transition-smooth transform hover:scale-105 cursor-pointer"
                  onClick={() => onNavigate("services")}
                >
                  <CardContent className="p-6">
                    <Icon
                      className={`h-12 w-12 mx-auto mb-4 ${service.color}`}
                    />
                    <h3 className="font-semibold">{service.name}</h3>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Plan Your Event?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust us with their
            special moments.
          </p>
          <Button
            variant="card"
            size="lg"
            onClick={() => onNavigate("services")}
            className="text-lg px-8 py-4"
          >
            Get Started Today
          </Button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
