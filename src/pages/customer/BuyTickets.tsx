import { CustomerNav } from "@/components/CustomerNav";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Calendar, MapPin, Clock, Minus, Plus } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const ticketSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(100, "First name must be less than 100 characters"),
  lastName: z.string().trim().min(1, "Last name is required").max(100, "Last name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  phone: z.string().trim().min(10, "Phone number must be at least 10 digits").max(20, "Phone number must be less than 20 digits"),
  ticketType: z.string().min(1, "Please select a ticket type"),
});

type TicketFormData = z.infer<typeof ticketSchema>;

// Mock event data
const events = {
  "1": {
    title: "Tech Innovation Summit 2024",
    date: "March 15, 2024",
    time: "9:00 AM - 5:00 PM",
    location: "Convention Center, Hall A",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop",
  },
  "2": {
    title: "Leadership Excellence Workshop",
    date: "March 20, 2024",
    time: "2:00 PM - 6:00 PM",
    location: "Business Hub, Room 301",
    image: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&h=400&fit=crop",
  },
};

const ticketTypes = [
  { id: "standard", name: "Standard", price: 50 },
  { id: "vip", name: "VIP", price: 100 },
  { id: "group", name: "Group (5+)", price: 40 },
];

export default function BuyTickets() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [selectedTicketType, setSelectedTicketType] = useState("");

  const event = events[id as keyof typeof events];

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<TicketFormData>({
    resolver: zodResolver(ticketSchema),
  });

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

  const selectedTicket = ticketTypes.find(t => t.id === selectedTicketType);
  const totalPrice = selectedTicket ? selectedTicket.price * quantity : 0;

  const onSubmit = async (data: TicketFormData) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast({
        title: "Tickets reserved!",
        description: `${quantity} ticket(s) reserved. Check your email for confirmation.`,
      });
      
      setTimeout(() => navigate(`/event/${id}`), 2000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process ticket purchase. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <CustomerNav />
      
      <main className="container py-12">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <Button variant="ghost" onClick={() => navigate(`/event/${id}`)}>
              ← Back to Event
            </Button>
            <h1 className="text-4xl font-bold tracking-tight">Buy Tickets</h1>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Ticket Form */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Attendee Information</CardTitle>
                <CardDescription>Please provide your details for ticket registration</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        {...register("firstName")}
                        placeholder="John"
                      />
                      {errors.firstName && (
                        <p className="text-sm text-destructive">{errors.firstName.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        {...register("lastName")}
                        placeholder="Doe"
                      />
                      {errors.lastName && (
                        <p className="text-sm text-destructive">{errors.lastName.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      {...register("email")}
                      placeholder="john.doe@example.com"
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive">{errors.email.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      {...register("phone")}
                      placeholder="+1 (555) 000-0000"
                    />
                    {errors.phone && (
                      <p className="text-sm text-destructive">{errors.phone.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ticketType">Ticket Type</Label>
                    <Select
                      value={selectedTicketType}
                      onValueChange={(value) => {
                        setSelectedTicketType(value);
                        setValue("ticketType", value);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select ticket type" />
                      </SelectTrigger>
                      <SelectContent>
                        {ticketTypes.map((ticket) => (
                          <SelectItem key={ticket.id} value={ticket.id}>
                            {ticket.name} - ${ticket.price}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.ticketType && (
                      <p className="text-sm text-destructive">{errors.ticketType.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>Quantity</Label>
                    <div className="flex items-center gap-4">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="text-2xl font-semibold w-12 text-center">{quantity}</span>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => setQuantity(Math.min(10, quantity + 1))}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? "Processing..." : `Complete Purchase - $${totalPrice}`}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Order Summary */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Event Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  
                  <div>
                    <h3 className="font-semibold text-lg mb-3">{event.title}</h3>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <span className="text-muted-foreground">{event.date}</span>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <span className="text-muted-foreground">{event.time}</span>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <span className="text-muted-foreground">{event.location}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {selectedTicket && (
                <Card>
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Ticket Type</span>
                        <span className="font-medium">{selectedTicket.name}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Price per ticket</span>
                        <span className="font-medium">${selectedTicket.price}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Quantity</span>
                        <span className="font-medium">{quantity}</span>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total</span>
                      <span className="text-primary">${totalPrice}</span>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
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
