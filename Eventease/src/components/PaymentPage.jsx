import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { CreditCard, Smartphone, Banknote, CheckCircle } from "lucide-react";
import { storage } from "../utils/storage";
import { useToast } from "../hooks/use-toast";

export const PaymentPage = ({ booking, onSuccess, onCancel }) => {
  const { toast } = useToast();
  const [selectedMethod, setSelectedMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);

  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <CardContent className="p-8 text-center">
            <h2 className="text-xl font-semibold mb-4">No booking found</h2>
            <Button onClick={onCancel}>Return to Services</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handlePayment = async () => {
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      const payment = {
        id: storage.generateId(),
        bookingId: booking.id,
        amount: booking.amount,
        method: selectedMethod,
        status: "completed",
        receipt: `RCP-${Date.now()}`,
        createdAt: new Date().toISOString(),
      };

      // Update booking status
      const bookings = storage.getBookings();
      const updatedBookings = bookings.map((b) =>
        b.id === booking.id ? { ...b, status: "confirmed" } : b
      );
      storage.saveBookings(updatedBookings);

      // Save payment
      storage.addPayment(payment);

      toast({
        title: "Payment Successful!",
        description: "Your booking has been confirmed.",
      });

      setIsProcessing(false);
      onSuccess();
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            Complete Payment
          </h1>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Booking Summary */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Booking Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg">{booking.serviceName}</h3>
                <p className="text-gray-500">{booking.customerName}</p>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>Date: {new Date(booking.date).toLocaleDateString()}</div>
                <div>Time: {booking.time}</div>
              </div>
              <div className="pt-4 border-t">
                <div className="flex justify-between items-center text-xl font-bold">
                  <span>Total Amount:</span>
                  <span className="text-blue-600">
                    ₹{booking.amount.toLocaleString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Methods */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  id: "card",
                  icon: CreditCard,
                  label: "Credit/Debit Card",
                  gradient: "bg-gradient-to-r from-blue-400 to-purple-500",
                },
                {
                  id: "upi",
                  icon: Smartphone,
                  label: "UPI Payment",
                  gradient: "bg-gradient-to-r from-green-400 to-yellow-400",
                },
                {
                  id: "cash",
                  icon: Banknote,
                  label: "Cash Payment",
                  gradient: "bg-gradient-to-r from-orange-400 to-pink-500",
                },
              ].map((method) => {
                const Icon = method.icon;
                return (
                  <div
                    key={method.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedMethod === method.id
                        ? "border-blue-500 bg-blue-50"
                        : "hover:bg-gray-100"
                    }`}
                    onClick={() => setSelectedMethod(method.id)}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full ${method.gradient} flex items-center justify-center`}
                      >
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <span className="font-medium">{method.label}</span>
                      {selectedMethod === method.id && (
                        <CheckCircle className="h-5 w-5 text-blue-500 ml-auto" />
                      )}
                    </div>
                  </div>
                );
              })}

              <div className="pt-6 space-y-3">
                <Button
                  className="w-full bg-blue-600 text-white hover:bg-blue-700"
                  onClick={handlePayment}
                  disabled={isProcessing}
                >
                  {isProcessing
                    ? "Processing Payment..."
                    : `Pay ₹${booking.amount.toLocaleString()}`}
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={onCancel}
                >
                  Cancel & Go Back
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
