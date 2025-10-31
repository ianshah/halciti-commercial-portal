import { CustomerNav } from "@/components/CustomerNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Calendar, MapPin, Clock, Mail, Download, Share2 } from "lucide-react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

// Mock event data
const events = {
  "1": {
    title: "Tech Innovation Summit 2024",
    date: "March 15, 2024",
    time: "9:00 AM - 5:00 PM",
    location: "Convention Center, Hall A",
  },
  "2": {
    title: "Leadership Excellence Workshop",
    date: "March 20, 2024",
    time: "2:00 PM - 6:00 PM",
    location: "Business Hub, Room 301",
  },
};

export default function PurchaseConfirmation() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const orderData = location.state;

  const event = events[id as keyof typeof events];
  const confirmationNumber = `GH-${Date.now().toString().slice(-8)}`;

  if (!event) {
    return (
      <div className="min-h-screen bg-background">
        <CustomerNav />
        <div className="container py-12 text-center">
          <h1 className="text-2xl font-bold">Event not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <CustomerNav />
      
      <main className="container py-12">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Success Message */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="h-20 w-20 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-500" />
              </div>
            </div>
            <h1 className="text-4xl font-bold tracking-tight">Purchase Confirmed!</h1>
            <p className="text-xl text-muted-foreground">
              Your tickets have been successfully reserved
            </p>
          </div>

          {/* Confirmation Details */}
          <Card>
            <CardHeader>
              <CardTitle>Order Confirmation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Confirmation Number</p>
                <p className="text-2xl font-bold text-primary">{confirmationNumber}</p>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Event Details</h3>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium text-lg">{event.title}</p>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <span className="text-muted-foreground">{event.date}</span>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <span className="text-muted-foreground">{event.time}</span>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <span className="text-muted-foreground">{event.location}</span>
                  </div>
                </div>
              </div>

              {orderData && (
                <>
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Order Summary</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Ticket Type</span>
                        <span className="font-medium capitalize">{orderData.ticketType}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Quantity</span>
                        <span className="font-medium">{orderData.quantity}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Total Amount</span>
                        <span className="font-medium">${orderData.totalPrice}</span>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Attendee Information</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Name</span>
                        <span className="font-medium">{orderData.firstName} {orderData.lastName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Email</span>
                        <span className="font-medium">{orderData.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Phone</span>
                        <span className="font-medium">{orderData.phone}</span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card>
            <CardHeader>
              <CardTitle>What's Next?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Check your email</p>
                  <p className="text-sm text-muted-foreground">
                    We've sent a confirmation email with your tickets and event details.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Add to calendar</p>
                  <p className="text-sm text-muted-foreground">
                    Don't forget to add the event to your calendar so you don't miss it.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Download className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Download tickets</p>
                  <p className="text-sm text-muted-foreground">
                    Your tickets are also available for download in the confirmation email.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="outline" className="flex-1" onClick={() => navigate(`/event/${id}`)}>
              View Event Details
            </Button>
            <Button variant="outline" className="flex-1">
              <Download className="h-4 w-4 mr-2" />
              Download Tickets
            </Button>
            <Button className="flex-1" onClick={() => navigate("/")}>
              Browse More Events
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t mt-20">
        <div className="container py-8">
          <div className="text-center text-sm text-muted-foreground">
            © 2024 Global Haltech. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
