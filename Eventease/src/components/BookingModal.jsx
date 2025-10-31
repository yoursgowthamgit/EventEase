import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Badge } from "../components/ui/badge";
import { Calendar, User } from "lucide-react";
import { useToast } from "../hooks/use-toast";

export const BookingModal = ({ service, isOpen, onClose, onSuccess }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    date: "",
    time: "",
    guests: "",
    requirements: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Simple ID generator
  const generateId = () => `bk_${Math.random().toString(36).substr(2, 9)}`;

  // Check time slot availability (2-hour buffer)
  const checkAvailability = (date, time) => {
    const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    const selectedDateTime = new Date(`${date}T${time}`);

    const conflicts = bookings.filter((b) => {
      const bookingDateTime = new Date(`${b.date}T${b.time}`);
      const diff = Math.abs(selectedDateTime - bookingDateTime);
      return diff < 2 * 60 * 60 * 1000; // within 2 hours
    });

    return conflicts.length === 0;
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { customerName, customerEmail, customerPhone, date, time } = formData;

      if (!customerName || !customerEmail || !customerPhone || !date || !time) {
        toast({
          title: "Missing Information",
          description: "Please fill in all required fields.",
          variant: "destructive",
        });
        return;
      }

      if (!checkAvailability(date, time)) {
        toast({
          title: "Time Slot Unavailable",
          description: "This slot is already booked. Try another time.",
          variant: "destructive",
        });
        return;
      }

      const booking = {
        id: generateId(),
        serviceId: service.id,
        serviceName: service.name,
        date,
        time,
        amount: service.price,
        customerName,
        customerEmail,
        customerPhone,
        guests: formData.guests || "",
        requirements: formData.requirements || "",
        status: "pending",
        createdAt: new Date().toISOString(),
      };

      // Save booking to localStorage
      const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
      bookings.push(booking);
      localStorage.setItem("bookings", JSON.stringify(bookings));

      toast({
        title: "Booking Confirmed 🎉",
        description: "Your booking has been saved locally!",
      });

      setTimeout(() => {
        onSuccess?.();
        onClose();
      }, 800);
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: "Booking failed. Try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () =>
    setFormData({
      customerName: "",
      customerEmail: "",
      customerPhone: "",
      date: "",
      time: "",
      guests: "",
      requirements: "",
    });

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Book {service.name}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Service Info */}
          <div className="p-4 bg-muted rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{service.name}</h3>
                <p className="text-sm text-muted-foreground">{service.description}</p>
              </div>
              <Badge variant="secondary" className="text-lg px-3 py-1">
                ₹{service.price.toLocaleString()}
              </Badge>
            </div>
          </div>

          {/* Customer Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <User className="h-5 w-5" /> Customer Information
            </h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Full Name *</Label>
                <Input
                  placeholder="Enter your name"
                  value={formData.customerName}
                  onChange={(e) => handleInputChange("customerName", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label>Phone Number *</Label>
                <Input
                  placeholder="Enter phone"
                  value={formData.customerPhone}
                  onChange={(e) => handleInputChange("customerPhone", e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <Label>Email Address *</Label>
              <Input
                type="email"
                placeholder="Enter email"
                value={formData.customerEmail}
                onChange={(e) => handleInputChange("customerEmail", e.target.value)}
                required
              />
            </div>
          </div>

          {/* Event Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Calendar className="h-5 w-5" /> Event Details
            </h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Event Date *</Label>
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange("date", e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  required
                />
              </div>
              <div>
                <Label>Event Time *</Label>
                <Input
                  type="time"
                  value={formData.time}
                  onChange={(e) => handleInputChange("time", e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <Label>Number of Guests (Optional)</Label>
              <Input
                type="number"
                placeholder="e.g. 100"
                value={formData.guests}
                onChange={(e) => handleInputChange("guests", e.target.value)}
              />
            </div>

            <div>
              <Label>Special Requirements (Optional)</Label>
              <Textarea
                placeholder="Add any special notes..."
                value={formData.requirements}
                onChange={(e) => handleInputChange("requirements", e.target.value)}
                rows={3}
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <Button type="button" variant="outline" onClick={handleClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="flex-1 bg-primary text-white">
              {isSubmitting ? "Processing..." : "Confirm Booking"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
