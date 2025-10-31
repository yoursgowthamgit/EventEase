import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  Calendar,
  Clock,
  Users,
  CreditCard,
  CheckCircle,
  XCircle,
  RotateCcw,
} from "lucide-react";
import { storage } from "../utils/storage";


export const Dashboard = ({ onNavigate }) => {
  const [bookings, setBookings] = useState([]);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const savedBookings = storage.getBookings?.() || [];
    const savedPayments = storage.getPayments?.() || [];
    setBookings(savedBookings);
    setPayments(savedPayments);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-500";
      case "pending":
        return "bg-yellow-500";
      case "completed":
        return "bg-blue-500";
      case "cancelled":
        return "bg-red-500";
      default:
        return "bg-gray-400";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="h-4 w-4" />;
      case "pending":
        return <RotateCcw className="h-4 w-4" />;
      case "completed":
        return <CheckCircle className="h-4 w-4" />;
      case "cancelled":
        return <XCircle className="h-4 w-4" />;
      default:
        return <RotateCcw className="h-4 w-4" />;
    }
  };

  const totalSpent = payments
    .filter((p) => p.status === "completed")
    .reduce((sum, p) => sum + (p.amount || 0), 0);

  const upcomingBookings = bookings.filter((b) => {
    const bookingDate = new Date(`${b.date}T${b.time}`);
    return bookingDate > new Date() && b.status !== "cancelled";
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
            Your Dashboard
          </h1>
          <p className="text-lg text-gray-600">
            Manage your bookings and track your event planning journey
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Total Bookings</p>
                <p className="text-3xl font-bold text-blue-600">
                  {bookings.length}
                </p>
              </div>
              <Calendar className="h-8 w-8 text-blue-600" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Upcoming Events</p>
                <p className="text-3xl font-bold text-green-600">
                  {upcomingBookings.length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-green-600" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Total Spent</p>
                <p className="text-3xl font-bold text-yellow-600">
                  ₹{totalSpent.toLocaleString()}
                </p>
              </div>
              <CreditCard className="h-8 w-8 text-yellow-600" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Services Used</p>
                <p className="text-3xl font-bold text-purple-600">
                  {new Set(bookings.map((b) => b.serviceId)).size}
                </p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </CardContent>
          </Card>
        </div>

        {/* Bookings Section */}
        <Card>
          <CardHeader className="flex justify-between items-center">
            <CardTitle className="text-2xl">Your Bookings</CardTitle>
            <Button onClick={() => onNavigate("services")}>
              Book New Service
            </Button>
          </CardHeader>
          <CardContent>
            {bookings.length === 0 ? (
              <div className="text-center py-10">
                <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No bookings yet</h3>
                <p className="text-gray-500 mb-4">
                  Start by booking your first event service!
                </p>
                <Button onClick={() => onNavigate("services")}>
                  Browse Services
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {bookings
                  .sort(
                    (a, b) =>
                      new Date(b.createdAt).getTime() -
                      new Date(a.createdAt).getTime()
                  )
                  .map((b) => (
                    <div
                      key={b.id || Math.random()}
                      className="p-4 border rounded-lg hover:bg-gray-50 transition"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-lg">
                            {b.serviceName || "Unknown Service"}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {b.customerName || "Guest"} •{" "}
                            {b.customerPhone || "N/A"}
                          </p>
                        </div>
                        <Badge
                          className={`${getStatusColor(b.status)} text-white`}
                        >
                          <span className="flex items-center gap-1">
                            {getStatusIcon(b.status)}
                            {b.status
                              ? b.status.charAt(0).toUpperCase() +
                                b.status.slice(1)
                              : "Unknown"}
                          </span>
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-700">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          <span>
                            {b.date
                              ? new Date(b.date).toLocaleDateString()
                              : "N/A"}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span>{b.time || "N/A"}</span>
                        </div>
                        {b.guests && (
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-gray-500" />
                            <span>{b.guests} guests</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <CreditCard className="h-4 w-4 text-gray-500" />
                          <span>₹{(b.amount || 0).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
