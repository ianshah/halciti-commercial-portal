import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Calendar, MapPin, Users, DollarSign, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock data - replace with actual data fetching
const eventDetails = {
  id: "1",
  name: "Halal Awareness Training",
  description: "Comprehensive training on Halal certification and compliance standards.",
  date: "August 5, 2025",
  time: "9:00 AM - 5:00 PM",
  location: "Kuala Lumpur Convention Centre",
  venue: "Hall A",
  category: "Training",
  capacity: 200,
  ticketPrice: 50,
  vipTicketPrice: 100,
  registrations: 150,
  revenue: "RM10,000.00",
  status: "Published",
};

const attendees = [
  { id: 1, name: "Ahmad bin Abdullah", email: "ahmad@example.com", ticketType: "General", paymentStatus: "Paid", registrationDate: "July 1, 2025" },
  { id: 2, name: "Fatimah binti Hassan", email: "fatimah@example.com", ticketType: "VIP", paymentStatus: "Paid", registrationDate: "July 2, 2025" },
  { id: 3, name: "Muhammad bin Ali", email: "muhammad@example.com", ticketType: "General", paymentStatus: "Paid", registrationDate: "July 3, 2025" },
  { id: 4, name: "Aisha binti Omar", email: "aisha@example.com", ticketType: "VIP", paymentStatus: "Pending", registrationDate: "July 4, 2025" },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Published":
      return "bg-secondary text-secondary-foreground";
    case "Ended":
      return "bg-muted text-muted-foreground";
    case "Cancelled":
      return "bg-destructive/10 text-destructive";
    case "Draft":
      return "bg-accent/10 text-accent-foreground";
    default:
      return "";
  }
};

export default function EventDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="flex-1 space-y-6 p-8">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/admin")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{eventDetails.name}</h1>
          <p className="text-muted-foreground mt-1">{eventDetails.description}</p>
        </div>
        <Badge className={getStatusColor(eventDetails.status)} variant="secondary">
          {eventDetails.status}
        </Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Registrations</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{eventDetails.registrations}</div>
            <p className="text-xs text-muted-foreground">
              of {eventDetails.capacity} capacity
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{eventDetails.revenue}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Event Date</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{eventDetails.date}</div>
            <p className="text-xs text-muted-foreground">{eventDetails.time}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Location</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-sm font-semibold">{eventDetails.location}</div>
            <p className="text-xs text-muted-foreground">{eventDetails.venue}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Event Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Category</p>
              <p className="text-base">{eventDetails.category}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Capacity</p>
              <p className="text-base">{eventDetails.capacity} attendees</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">General Ticket Price</p>
              <p className="text-base">RM{eventDetails.ticketPrice}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">VIP Ticket Price</p>
              <p className="text-base">RM{eventDetails.vipTicketPrice}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Attendee List</CardTitle>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Ticket Type</TableHead>
                <TableHead>Payment Status</TableHead>
                <TableHead>Registration Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {attendees.map((attendee) => (
                <TableRow key={attendee.id}>
                  <TableCell className="font-medium">{attendee.name}</TableCell>
                  <TableCell>{attendee.email}</TableCell>
                  <TableCell>{attendee.ticketType}</TableCell>
                  <TableCell>
                    <Badge variant={attendee.paymentStatus === "Paid" ? "default" : "secondary"}>
                      {attendee.paymentStatus}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{attendee.registrationDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
