import { useState, useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { HomePage } from "../components/HomePage";
import ServicesPage from "../components/ServicesPage";
import { Dashboard } from "../components/Dashboard";
import { AdminDashboard } from "../components/AdminDashboard";
import { PaymentPage } from "../components/PaymentPage";
import { LoginPage } from "../components/login";  
import { SignupPage } from "../components/Signup";


export default function EventManagementApp() {
  const [currentPage, setCurrentPage] = useState("home");
  const [pendingBooking, setPendingBooking] = useState(null);

  useEffect(() => {
    const handleNavigateToPayment = (event) => {
      setPendingBooking(event.detail);
      setCurrentPage("payment");
    };

    window.addEventListener("navigate-to-payment", handleNavigateToPayment);

    return () => {
      window.removeEventListener("navigate-to-payment", handleNavigateToPayment);
    };
  }, []);

  const handlePaymentSuccess = () => {
    setPendingBooking(null);
    setCurrentPage("dashboard");
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage onNavigate={setCurrentPage} />;
      case "services":
        return <ServicesPage onNavigate={setCurrentPage} />;
      case "dashboard":
        return <Dashboard onNavigate={setCurrentPage} />;
      case "admin":
        return <AdminDashboard onNavigate={setCurrentPage} />;
      case "login":
        return <LoginPage onNavigate={setCurrentPage} />;
      case "signup":
        return <SignupPage onNavigate={setCurrentPage} />;
      case "payment":
        return (
          <PaymentPage
            booking={pendingBooking}
            onSuccess={handlePaymentSuccess}
            onCancel={() => setCurrentPage("services")}
          />
        );
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />
      {renderCurrentPage()}
    </div>
  );
}
