import { CustomerNav } from "@/components/CustomerNav";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Target, Award, Building2 } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <CustomerNav />
      
      <main className="container py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Hero Section */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">About Global Haltech</h1>
            <p className="text-xl text-muted-foreground">
              Empowering communities through innovative events and educational programs
            </p>
          </div>

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-semibold">Our Mission</h2>
                </div>
                <p className="text-muted-foreground">
                  To create transformative experiences that connect people, foster learning, 
                  and build sustainable communities through world-class events and programs.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-accent/10">
                    <Award className="h-6 w-6 text-accent" />
                  </div>
                  <h2 className="text-2xl font-semibold">Our Vision</h2>
                </div>
                <p className="text-muted-foreground">
                  To be the leading platform for innovative events that inspire growth, 
                  collaboration, and positive change across diverse communities worldwide.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* About Content */}
          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-secondary/10">
                    <Building2 className="h-6 w-6 text-secondary" />
                  </div>
                  <h2 className="text-2xl font-semibold">Who We Are</h2>
                </div>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Global Haltech is a premier event management organization dedicated to creating 
                    exceptional experiences that bring people together. Through our Halciti Portal, 
                    we provide seamless access to a diverse range of events, from professional 
                    development workshops to community gatherings.
                  </p>
                  <p>
                    Our team of experienced professionals works tirelessly to ensure every event 
                    meets the highest standards of quality, engagement, and impact. We believe in 
                    the power of connection and the transformative potential of shared experiences.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-semibold">What We Do</h2>
                </div>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    We specialize in organizing and managing events that cater to various interests 
                    and professional development needs. Our services include:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Professional development workshops and seminars</li>
                    <li>Community engagement events and gatherings</li>
                    <li>Educational programs and training sessions</li>
                    <li>Networking opportunities for professionals</li>
                    <li>Cultural and social events</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-primary">500+</div>
              <div className="text-sm text-muted-foreground">Events Hosted</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-primary">50K+</div>
              <div className="text-sm text-muted-foreground">Participants</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-primary">100+</div>
              <div className="text-sm text-muted-foreground">Facilitators</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-primary">25+</div>
              <div className="text-sm text-muted-foreground">Countries</div>
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
