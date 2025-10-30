import { Calendar as CalendarIcon, Users, DollarSign, Calendar as CalendarDays } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

const events = [
  {
    name: "Halal Talk",
    date: "July 15, 2025",
    registrations: 100,
    revenue: "RM5,000.00",
    status: "Ended",
  },
  {
    name: "Halal Awareness Training",
    date: "August 5, 2025",
    registrations: 150,
    revenue: "RM10,000.00",
    status: "Published",
  },
  {
    name: "Halal Talk",
    date: "September 20, 2025",
    registrations: 0,
    revenue: "RM0.00",
    status: "Cancelled",
  },
  {
    name: "Halal Awareness Training",
    date: "September 20, 2025",
    registrations: 0,
    revenue: "RM0.00",
    status: "Draft",
  },
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

export default function Dashboard() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="flex-1 space-y-6 p-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Upcoming Events This Month
            </CardTitle>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Registrations This Month
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">250</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Revenue This Month
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">RM15,000</div>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <Button>Create New Event</Button>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Calendar</h2>
        <Card>
          <CardContent className="pt-6">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Event List</h2>
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b bg-muted/50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium">Event Name</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Date</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Registrations</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Revenue</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {events.map((event, index) => (
                    <tr key={index} className="hover:bg-muted/50">
                      <td className="px-4 py-3 text-sm">{event.name}</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{event.date}</td>
                      <td className="px-4 py-3 text-sm">{event.registrations}</td>
                      <td className="px-4 py-3 text-sm">{event.revenue}</td>
                      <td className="px-4 py-3">
                        <Badge className={getStatusColor(event.status)} variant="secondary">
                          {event.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <Button variant="ghost" size="sm">View Details</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
