import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Calendar, MapPin, Clock, User, Mail, Phone, Hash, Download, ArrowLeft } from "lucide-react";

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

export default function TicketDownload() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const orderData = location.state;

  const event = events[id as keyof typeof events];
  const confirmationNumber = orderData?.confirmationNumber || `GH-${Date.now().toString().slice(-8)}`;

  if (!event) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Event not found</h1>
          <Button onClick={() => navigate("/")} className="mt-4">
            Return Home
          </Button>
        </div>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header - Hidden when printing */}
      <div className="print:hidden border-b">
        <div className="container py-4 flex items-center justify-between">
          <Button variant="ghost" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <Button onClick={handlePrint}>
            <Download className="h-4 w-4 mr-2" />
            Download / Print
          </Button>
        </div>
      </div>

      <main className="container py-12">
        <div className="max-w-4xl mx-auto">
          {/* Ticket Card */}
          <Card className="overflow-hidden">
            <div className="bg-gradient-to-r from-primary to-primary/80 p-8 text-primary-foreground">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-3xl font-bold mb-2">Global Haltech</h1>
                  <p className="text-primary-foreground/90">Event Ticket</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-primary-foreground/90 mb-1">Confirmation</p>
                  <p className="text-xl font-mono font-bold">{confirmationNumber}</p>
                </div>
              </div>
            </div>

            <CardContent className="p-8 space-y-8">
              {/* Event Details */}
              <div>
                <h2 className="text-2xl font-bold mb-6">{event.title}</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Calendar className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">Date</p>
                        <p className="font-medium">{event.date}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">Time</p>
                        <p className="font-medium">{event.time}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">Location</p>
                        <p className="font-medium">{event.location}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Hash className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">Ticket Type</p>
                        <p className="font-medium capitalize">{orderData?.ticketType || 'General'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Attendee Information */}
              {orderData && (
                <div>
                  <h3 className="font-semibold text-lg mb-4">Attendee Information</h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                      <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">Name</p>
                        <p className="font-medium">{orderData.firstName} {orderData.lastName}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="font-medium">{orderData.email}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">Phone</p>
                        <p className="font-medium">{orderData.phone}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Hash className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">Quantity</p>
                        <p className="font-medium">{orderData.quantity} {orderData.quantity > 1 ? 'tickets' : 'ticket'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <Separator />

              {/* QR Code Placeholder */}
              <div className="flex flex-col items-center justify-center py-8">
                <div className="w-48 h-48 bg-muted rounded-lg flex items-center justify-center mb-4">
                  <div className="text-center text-muted-foreground">
                    <Hash className="h-12 w-12 mx-auto mb-2" />
                    <p className="text-sm">QR Code</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground text-center">
                  Scan this code at the event entrance
                </p>
              </div>

              {/* Important Information */}
              <div className="bg-muted/50 rounded-lg p-6">
                <h4 className="font-semibold mb-3">Important Information</h4>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Please arrive at least 15 minutes before the event starts</li>
                  <li>• Bring a valid ID for verification</li>
                  <li>• This ticket is non-transferable and non-refundable</li>
                  <li>• Keep this ticket safe - you'll need it for entry</li>
                </ul>
              </div>
            </CardContent>

            {/* Footer */}
            <div className="bg-muted/30 px-8 py-4 text-center text-sm text-muted-foreground border-t">
              <p>© 2024 Global Haltech. All rights reserved.</p>
              <p className="mt-1">For support, contact: support@globalhaltech.com</p>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
