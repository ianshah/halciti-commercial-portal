import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CustomerNav } from "@/components/CustomerNav";
import { Linkedin, Facebook, Instagram } from "lucide-react";

const events = [
  {
    id: 1,
    title: "Halal Competency Training",
    description: "Understanding on Halal related body that manage Halal industry.",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop",
  },
  {
    id: 2,
    title: "Halal Talk",
    description: "Adakah DNA Babi itu Babi dari perspektif sains?",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&h=300&fit=crop",
  },
  {
    id: 3,
    title: "Halal Talk",
    description: "Alkohol dan Arak Sama ke?",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&h=300&fit=crop",
  },
  {
    id: 4,
    title: "Halal Awareness Training",
    description: "Understanding more on toward 'Halal' term.",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=300&fit=crop",
  },
  {
    id: 5,
    title: "Halal Science Awareness Training",
    description: "Understanding more on Halal Science and its roles.",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=300&fit=crop",
  },
  {
    id: 6,
    title: "Halal Executive Training",
    description: "Get certified from our professional speaker.",
    image: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=400&h=300&fit=crop",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <CustomerNav />
      
      <main>
        <section
          className="relative h-[500px] bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=500&fit=crop')",
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative container h-full flex flex-col items-center justify-center text-center text-white">
            <h1 className="text-5xl font-bold mb-4">Discover Halal With Us</h1>
            <p className="text-xl mb-4">
              Explore a wide range of Halal view in Islamic perspective from training, talk, workshops and more.
            </p>
            <p className="text-2xl font-bold text-accent">Competence. Efficience. Excellence.</p>
          </div>
        </section>

        <section className="container py-16">
          <h2 className="text-3xl font-bold mb-8">Upcoming Events</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <Link key={event.id} to={`/event/${event.id}`}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="h-full w-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>{event.title}</CardTitle>
                    <CardDescription>{event.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t py-8">
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
