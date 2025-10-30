import { useParams } from "react-router-dom";
import { CustomerNav } from "@/components/CustomerNav";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Linkedin, Facebook, Instagram, Calendar, MapPin, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const facilitators = [
  {
    name: "Dr. Ahmad Jabbar",
    role: "JAKIM Halal Trainer",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
  },
  {
    name: "Sarah Chen",
    role: "Halal Product Journalist (Moderator)",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
  },
  {
    name: "Noranim Mohd Noor",
    role: "CEO Global Haltech",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
  },
];

const schedule = [
  { time: "10:00 AM - 10:30 AM", title: "Opening Keynote" },
  { time: "10:30 AM - 12:00 PM", title: "First Session" },
  { time: "12:00 PM - 1:30 PM", title: "Second Session" },
  { time: "1:30 PM - 2:00 PM", title: "Question and Answer" },
];

export default function EventDetail() {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-background">
      <CustomerNav />
      
      <main className="container py-8">
        <div className="flex justify-between items-start mb-8">
          <h1 className="text-4xl font-bold">Halal Awareness Training</h1>
          <Button size="lg">Buy Tickets</Button>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardContent className="p-0">
                <img
                  src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop"
                  alt="Halal Awareness Training"
                  className="w-full rounded-lg"
                />
              </CardContent>
            </Card>

            <section>
              <h2 className="text-2xl font-bold mb-4">Event Details</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <h3 className="font-semibold mb-2">Date & Time</h3>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>Wednesday</p>
                    <p>9 July 2025</p>
                    <p>10:00am - 02:00pm</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Location</h3>
                  <p className="text-sm text-muted-foreground">Online platform</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Event Type</h3>
                  <p className="text-sm text-muted-foreground">Training</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Language</h3>
                  <div className="text-sm text-muted-foreground">
                    <p>English</p>
                    <p>Malay</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">About the Event</h2>
              <p className="text-muted-foreground">
                The Halal Awareness Training is training on Halal Awareness amongst Malaysian who want to discover more on Halal definition.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Facilitator</h2>
              <div className="grid gap-6 sm:grid-cols-3">
                {facilitators.map((facilitator, index) => (
                  <div key={index} className="text-center">
                    <img
                      src={facilitator.image}
                      alt={facilitator.name}
                      className="w-32 h-32 rounded-full mx-auto mb-3 object-cover"
                    />
                    <h3 className="font-semibold">{facilitator.name}</h3>
                    <p className="text-sm text-muted-foreground">{facilitator.role}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Schedule</h2>
              <div className="space-y-3">
                {schedule.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded border-2 border-primary" />
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Credentials/Sponsors</h2>
              <div className="flex gap-8 items-center justify-center bg-muted p-8 rounded-lg">
                <div className="text-center">
                  <Badge className="text-lg px-6 py-3">HRDCORP CLAIMABLE</Badge>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">MIHA</div>
                  <p className="text-sm">Malaysia International Halal Academy</p>
                </div>
              </div>
            </section>
          </div>

          <div>
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="inline-block bg-primary text-primary-foreground px-4 py-2 rounded-lg text-2xl font-bold mb-2">
                    RM180/PAX
                  </div>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div className="text-sm">
                      <p>Wednesday, 9 July 2025</p>
                      <p>Wednesday, 23 July 2025</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <p className="text-sm">10:00AM to 02:00PM</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <p className="text-sm">Online platform</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold">COURSE OUTLINE</h3>
                  <ul className="text-sm space-y-2 text-muted-foreground">
                    <li>• Understanding definition of Halal, Haram & Shubhah</li>
                    <li>• Understanding concept Halalan Thoyibban</li>
                    <li>• Understanding impurities, category and how to handle</li>
                    <li>• Understanding sources of Halal Ingredient</li>
                    <li>• Understanding process in Malaysian halal certificate</li>
                    <li>• Understanding general requirement for Malaysian halal certificate</li>
                  </ul>
                </div>

                <Button className="w-full mt-6" size="lg">Register Now</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <footer className="border-t py-8 mt-16">
        <div className="container">
          <div className="flex justify-center gap-6 mb-4">
            <a href="#" className="text-muted-foreground hover:text-foreground">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground">
              <Instagram className="h-5 w-5" />
            </a>
          </div>
          <p className="text-center text-sm text-muted-foreground">
            © 2025 Global Haltech. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
