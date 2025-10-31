import React, { useState } from "react";
import { Calendar, Users, Settings, Menu, Home, LogIn, UserPlus } from "lucide-react";
import { Button } from "../components/ui/button";

export const Navbar = ({ currentPage, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // ✅ Temporary login check (you can replace this with real authentication logic)
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  // Navigation items based on login state
  const navItems = [
    { id: "home", label: "Home", icon: Home, show: true },
    { id: "services", label: "Services", icon: Calendar, show: true },
    { id: "dashboard", label: "Dashboard", icon: Users, show: isLoggedIn },
    { id: "admin", label: "Admin", icon: Settings, show: isLoggedIn },
    { id: "login", label: "Login", icon: LogIn, show: !isLoggedIn },
    { id: "signup", label: "Signup", icon: UserPlus, show: !isLoggedIn },
  ].filter((item) => item.show);

  return (
    <nav className="bg-gray-900 text-white shadow-md relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Calendar className="h-8 w-8 text-blue-500 mr-3" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              EventEase
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all ${
                      currentPage === item.id
                        ? "bg-blue-600 text-white shadow"
                        : "text-gray-300 hover:text-white hover:bg-gray-700"
                    }`}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-gray-700">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onNavigate(item.id);
                      setIsMenuOpen(false);
                    }}
                    className={`flex items-center px-3 py-2 rounded-md text-base font-medium w-full text-left transition-all ${
                      currentPage === item.id
                        ? "bg-blue-600 text-white shadow"
                        : "text-gray-300 hover:text-white hover:bg-gray-700"
                    }`}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
