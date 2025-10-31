import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { storage } from "../utils/storage";
import { Calendar, CreditCard, Users, TrendingUp, LogOut } from "lucide-react";

export const AdminDashboard = ({ onNavigate }) => {
  const [bookings, setBookings] = useState([]);
  const [payments, setPayments] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    setBookings(storage.getBookings());
    setPayments(storage.getPayments());
    setServices(storage.getServices());
  }, []);

  const totalRevenue = payments
    .filter((p) => p.status === "completed")
    .reduce((sum, p) => sum + p.amount, 0);

  const pendingBookings = bookings.filter((b) => b.status === "pending").length;

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    onNavigate("login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Logout */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <p className="text-xl text-muted-foreground">
              Manage your event management business
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md transition"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Revenue
                  </p>
                  <p className="text-3xl font-bold text-primary">
                    ₹{totalRevenue.toLocaleString()}
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Bookings
                  </p>
                  <p className="text-3xl font-bold text-success">
                    {bookings.length}
                  </p>
                </div>
                <Calendar className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Pending Bookings
                  </p>
                  <p className="text-3xl font-bold text-warning">
                    {pendingBookings}
                  </p>
                </div>
                <Users className="h-8 w-8 text-warning" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Active Services
                  </p>
                  <p className="text-3xl font-bold text-secondary">
                    {services.length}
                  </p>
                </div>
                <CreditCard className="h-8 w-8 text-secondary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Bookings */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-2xl">Recent Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {bookings.slice(0, 10).map((booking) => (
                <div key={booking.id} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{booking.serviceName}</h3>
                      <p className="text-sm text-muted-foreground">
                        {booking.customerName} • {booking.customerPhone}
                      </p>
                      <p className="text-sm">
                        {new Date(booking.date).toLocaleDateString()} at{" "}
                        {booking.time}
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge
                        variant={
                          booking.status === "confirmed"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {booking.status}
                      </Badge>
                      <p className="text-sm font-semibold mt-1">
                        ₹{booking.amount.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
