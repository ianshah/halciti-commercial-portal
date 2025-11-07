import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { CalendarIcon, ArrowLeft, Upload, X, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const eventSchema = z.object({
  title: z.string()
    .trim()
    .min(3, { message: "Event title must be at least 3 characters" })
    .max(100, { message: "Event title must be less than 100 characters" }),
  description: z.string()
    .trim()
    .min(10, { message: "Description must be at least 10 characters" })
    .max(2000, { message: "Description must be less than 2000 characters" }),
  banner: z.instanceof(File).optional().or(z.string().optional()),
  date: z.date({
    required_error: "Event date is required",
  }),
  startTime: z.string()
    .trim()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, { message: "Invalid time format (HH:MM)" }),
  endTime: z.string()
    .trim()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, { message: "Invalid time format (HH:MM)" }),
  schedule: z.array(z.object({
    title: z.string().min(1, { message: "Session title is required" }),
    startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, { message: "Invalid time format" }),
    endTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, { message: "Invalid time format" }),
  })).optional(),
  facilitators: z.array(z.object({
    name: z.string().min(1, { message: "Facilitator name is required" }),
    role: z.string().min(1, { message: "Role is required" }),
    photo: z.instanceof(File).optional().or(z.string().optional()),
  })).optional(),
  sponsors: z.array(z.object({
    name: z.string().min(1, { message: "Sponsor name is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    logo: z.instanceof(File).optional().or(z.string().optional()),
  })).optional(),
  location: z.string()
    .trim()
    .min(3, { message: "Location must be at least 3 characters" })
    .max(200, { message: "Location must be less than 200 characters" }),
  venue: z.string()
    .trim()
    .min(3, { message: "Venue must be at least 3 characters" })
    .max(200, { message: "Venue must be less than 200 characters" }),
  category: z.string()
    .min(1, { message: "Please select a category" }),
  capacity: z.string()
    .regex(/^\d+$/, { message: "Capacity must be a number" })
    .refine((val) => parseInt(val) > 0, { message: "Capacity must be greater than 0" })
    .refine((val) => parseInt(val) <= 10000, { message: "Capacity must be 10000 or less" }),
  ticketPriceGeneral: z.string()
    .regex(/^\d+(\.\d{1,2})?$/, { message: "Invalid price format" })
    .refine((val) => parseFloat(val) >= 0, { message: "Price cannot be negative" }),
  ticketPriceVip: z.string()
    .regex(/^\d+(\.\d{1,2})?$/, { message: "Invalid price format" })
    .refine((val) => parseFloat(val) >= 0, { message: "Price cannot be negative" }),
  status: z.string()
    .min(1, { message: "Please select a status" }),
});

type EventFormData = z.infer<typeof eventSchema>;

export default function CreateEvent() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [scheduleItems, setScheduleItems] = useState([
    { title: "", startTime: "09:00", endTime: "10:00" }
  ]);
  const [facilitators, setFacilitators] = useState([
    { name: "", role: "", photo: undefined, photoPreview: null as string | null }
  ]);
  const [sponsors, setSponsors] = useState([
    { name: "", description: "", logo: undefined, logoPreview: null as string | null }
  ]);

  const form = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: "",
      description: "",
      startTime: "09:00",
      endTime: "17:00",
      schedule: [{ title: "", startTime: "09:00", endTime: "10:00" }],
      facilitators: [{ name: "", role: "", photo: undefined }],
      sponsors: [{ name: "", description: "", logo: undefined }],
      location: "",
      venue: "",
      category: "",
      capacity: "100",
      ticketPriceGeneral: "0.00",
      ticketPriceVip: "0.00",
      status: "draft",
    },
  });

  const onSubmit = (data: EventFormData) => {
    console.log("Event data:", data);
    
    toast({
      title: "Event created successfully",
      description: `${data.title} has been created and saved.`,
    });
    
    // Navigate back to admin dashboard
    navigate("/admin");
  };

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("banner", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setBannerPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeBanner = () => {
    form.setValue("banner", undefined);
    setBannerPreview(null);
  };

  const addScheduleItem = () => {
    const newItems = [...scheduleItems, { title: "", startTime: "09:00", endTime: "10:00" }];
    setScheduleItems(newItems);
    form.setValue("schedule", newItems);
  };

  const removeScheduleItem = (index: number) => {
    if (scheduleItems.length > 1) {
      const newItems = scheduleItems.filter((_, i) => i !== index);
      setScheduleItems(newItems);
      form.setValue("schedule", newItems);
    }
  };

  const updateScheduleItem = (index: number, field: string, value: string) => {
    const newItems = scheduleItems.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    );
    setScheduleItems(newItems);
    form.setValue("schedule", newItems);
  };

  const addFacilitator = () => {
    const newFacilitators = [...facilitators, { name: "", role: "", photo: undefined, photoPreview: null }];
    setFacilitators(newFacilitators);
    form.setValue("facilitators", newFacilitators.map(f => ({ name: f.name, role: f.role, photo: f.photo })));
  };

  const removeFacilitator = (index: number) => {
    if (facilitators.length > 1) {
      const newFacilitators = facilitators.filter((_, i) => i !== index);
      setFacilitators(newFacilitators);
      form.setValue("facilitators", newFacilitators.map(f => ({ name: f.name, role: f.role, photo: f.photo })));
    }
  };

  const updateFacilitator = (index: number, field: string, value: string) => {
    const newFacilitators = facilitators.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    );
    setFacilitators(newFacilitators);
    form.setValue("facilitators", newFacilitators.map(f => ({ name: f.name, role: f.role, photo: f.photo })));
  };

  const handleFacilitatorPhotoChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newFacilitators = facilitators.map((item, i) => 
          i === index ? { ...item, photo: file, photoPreview: reader.result as string } : item
        );
        setFacilitators(newFacilitators);
        form.setValue("facilitators", newFacilitators.map(f => ({ name: f.name, role: f.role, photo: f.photo })));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeFacilitatorPhoto = (index: number) => {
    const newFacilitators = facilitators.map((item, i) => 
      i === index ? { ...item, photo: undefined, photoPreview: null } : item
    );
    setFacilitators(newFacilitators);
    form.setValue("facilitators", newFacilitators.map(f => ({ name: f.name, role: f.role, photo: f.photo })));
  };

  const addSponsor = () => {
    const newSponsors = [...sponsors, { name: "", description: "", logo: undefined, logoPreview: null }];
    setSponsors(newSponsors);
    form.setValue("sponsors", newSponsors.map(s => ({ name: s.name, description: s.description, logo: s.logo })));
  };

  const removeSponsor = (index: number) => {
    if (sponsors.length > 1) {
      const newSponsors = sponsors.filter((_, i) => i !== index);
      setSponsors(newSponsors);
      form.setValue("sponsors", newSponsors.map(s => ({ name: s.name, description: s.description, logo: s.logo })));
    }
  };

  const updateSponsor = (index: number, field: string, value: string) => {
    const newSponsors = sponsors.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    );
    setSponsors(newSponsors);
    form.setValue("sponsors", newSponsors.map(s => ({ name: s.name, description: s.description, logo: s.logo })));
  };

  const handleSponsorLogoChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newSponsors = sponsors.map((item, i) => 
          i === index ? { ...item, logo: file, logoPreview: reader.result as string } : item
        );
        setSponsors(newSponsors);
        form.setValue("sponsors", newSponsors.map(s => ({ name: s.name, description: s.description, logo: s.logo })));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeSponsorLogo = (index: number) => {
    const newSponsors = sponsors.map((item, i) => 
      i === index ? { ...item, logo: undefined, logoPreview: null } : item
    );
    setSponsors(newSponsors);
    form.setValue("sponsors", newSponsors.map(s => ({ name: s.name, description: s.description, logo: s.logo })));
  };

  return (
    <div className="flex-1 space-y-6 p-8">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => navigate("/admin")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
      </div>

      <div>
        <h1 className="text-3xl font-bold">Create New Event</h1>
        <p className="text-muted-foreground mt-2">
          Fill in the details below to create a new event
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>
                Enter the core details about your event
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Event Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Tech Innovation Summit 2024" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your event in detail..."
                        className="min-h-32"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Provide a detailed description of what attendees can expect
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="banner"
                render={({ field: { value, onChange, ...field } }) => (
                  <FormItem>
                    <FormLabel>Event Banner/Poster</FormLabel>
                    <FormControl>
                      <div className="space-y-4">
                        {!bannerPreview ? (
                          <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                            <Upload className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
                            <div className="space-y-2">
                              <label htmlFor="banner-upload" className="cursor-pointer">
                                <span className="text-sm font-medium text-primary hover:underline">
                                  Click to upload
                                </span>
                                <span className="text-sm text-muted-foreground"> or drag and drop</span>
                              </label>
                              <p className="text-xs text-muted-foreground">
                                PNG, JPG or WEBP (max. 5MB)
                              </p>
                            </div>
                            <Input
                              id="banner-upload"
                              type="file"
                              accept="image/png,image/jpeg,image/webp"
                              className="hidden"
                              onChange={handleBannerChange}
                              {...field}
                            />
                          </div>
                        ) : (
                          <div className="relative rounded-lg overflow-hidden border">
                            <img
                              src={bannerPreview}
                              alt="Banner preview"
                              className="w-full h-48 object-cover"
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              className="absolute top-2 right-2"
                              onClick={removeBanner}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormDescription>
                      Upload an eye-catching banner for your event
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="conference">Conference</SelectItem>
                        <SelectItem value="workshop">Workshop</SelectItem>
                        <SelectItem value="seminar">Seminar</SelectItem>
                        <SelectItem value="training">Training</SelectItem>
                        <SelectItem value="networking">Networking</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Date & Time */}
          <Card>
            <CardHeader>
              <CardTitle>Date & Time</CardTitle>
              <CardDescription>
                When will your event take place?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Event Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date()}
                          initialFocus
                          className={cn("p-3 pointer-events-auto")}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="startTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Time</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="endTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Time</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Schedule Sessions */}
          <Card>
            <CardHeader>
              <CardTitle>Event Schedule</CardTitle>
              <CardDescription>
                Add multiple sessions to your event schedule
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {scheduleItems.map((item, index) => (
                <div key={index} className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-sm">Session {index + 1}</h4>
                    {scheduleItems.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeScheduleItem(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <FormLabel>Session Title</FormLabel>
                      <Input
                        placeholder="Registration & Welcome"
                        value={item.title}
                        onChange={(e) => updateScheduleItem(index, "title", e.target.value)}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <FormLabel>Start Time</FormLabel>
                        <Input
                          type="time"
                          value={item.startTime}
                          onChange={(e) => updateScheduleItem(index, "startTime", e.target.value)}
                        />
                      </div>
                      <div>
                        <FormLabel>End Time</FormLabel>
                        <Input
                          type="time"
                          value={item.endTime}
                          onChange={(e) => updateScheduleItem(index, "endTime", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              <Button
                type="button"
                variant="outline"
                onClick={addScheduleItem}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Schedule Session
              </Button>
            </CardContent>
          </Card>

          {/* Facilitators/Speakers */}
          <Card>
            <CardHeader>
              <CardTitle>Facilitators / Speakers</CardTitle>
              <CardDescription>
                Add speakers and facilitators for your event
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {facilitators.map((facilitator, index) => (
                <div key={index} className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-sm">Facilitator {index + 1}</h4>
                    {facilitators.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFacilitator(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  
                  <div className="space-y-3">
                    <div className="grid md:grid-cols-2 gap-3">
                      <div>
                        <FormLabel>Name</FormLabel>
                        <Input
                          placeholder="Dr. Sarah Johnson"
                          value={facilitator.name}
                          onChange={(e) => updateFacilitator(index, "name", e.target.value)}
                        />
                      </div>
                      <div>
                        <FormLabel>Role / Title</FormLabel>
                        <Input
                          placeholder="Keynote Speaker"
                          value={facilitator.role}
                          onChange={(e) => updateFacilitator(index, "role", e.target.value)}
                        />
                      </div>
                    </div>

                    <div>
                      <FormLabel>Photo</FormLabel>
                      {!facilitator.photoPreview ? (
                        <div className="border-2 border-dashed rounded-lg p-4 text-center hover:border-primary/50 transition-colors">
                          <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                          <label htmlFor={`facilitator-photo-${index}`} className="cursor-pointer">
                            <span className="text-sm font-medium text-primary hover:underline">
                              Upload photo
                            </span>
                          </label>
                          <Input
                            id={`facilitator-photo-${index}`}
                            type="file"
                            accept="image/png,image/jpeg,image/webp"
                            className="hidden"
                            onChange={(e) => handleFacilitatorPhotoChange(index, e)}
                          />
                        </div>
                      ) : (
                        <div className="relative rounded-lg overflow-hidden border w-32 h-32">
                          <img
                            src={facilitator.photoPreview}
                            alt="Facilitator preview"
                            className="w-full h-full object-cover"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute top-1 right-1 h-6 w-6"
                            onClick={() => removeFacilitatorPhoto(index)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              <Button
                type="button"
                variant="outline"
                onClick={addFacilitator}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Facilitator
              </Button>
            </CardContent>
          </Card>

          {/* Sponsors */}
          <Card>
            <CardHeader>
              <CardTitle>Sponsors</CardTitle>
              <CardDescription>
                Add sponsors and partners for your event
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {sponsors.map((sponsor, index) => (
                <div key={index} className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-sm">Sponsor {index + 1}</h4>
                    {sponsors.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeSponsor(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <FormLabel>Sponsor Name</FormLabel>
                      <Input
                        placeholder="Tech Corp Inc."
                        value={sponsor.name}
                        onChange={(e) => updateSponsor(index, "name", e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <FormLabel>Description</FormLabel>
                      <Textarea
                        placeholder="Gold Sponsor"
                        value={sponsor.description}
                        onChange={(e) => updateSponsor(index, "description", e.target.value)}
                        className="min-h-20"
                      />
                    </div>

                    <div>
                      <FormLabel>Logo</FormLabel>
                      {!sponsor.logoPreview ? (
                        <div className="border-2 border-dashed rounded-lg p-4 text-center hover:border-primary/50 transition-colors">
                          <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                          <label htmlFor={`sponsor-logo-${index}`} className="cursor-pointer">
                            <span className="text-sm font-medium text-primary hover:underline">
                              Upload logo
                            </span>
                          </label>
                          <Input
                            id={`sponsor-logo-${index}`}
                            type="file"
                            accept="image/png,image/jpeg,image/webp"
                            className="hidden"
                            onChange={(e) => handleSponsorLogoChange(index, e)}
                          />
                        </div>
                      ) : (
                        <div className="relative rounded-lg overflow-hidden border w-32 h-32">
                          <img
                            src={sponsor.logoPreview}
                            alt="Sponsor logo preview"
                            className="w-full h-full object-contain bg-muted p-2"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute top-1 right-1 h-6 w-6"
                            onClick={() => removeSponsorLogo(index)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              <Button
                type="button"
                variant="outline"
                onClick={addSponsor}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Sponsor
              </Button>
            </CardContent>
          </Card>

          {/* Location */}
          <Card>
            <CardHeader>
              <CardTitle>Location</CardTitle>
              <CardDescription>
                Where will your event be held?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="Convention Center" {...field} />
                    </FormControl>
                    <FormDescription>
                      General location or building name
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="venue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Venue Details</FormLabel>
                    <FormControl>
                      <Input placeholder="Hall A, Room 301" {...field} />
                    </FormControl>
                    <FormDescription>
                      Specific room or hall number
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Capacity & Pricing */}
          <Card>
            <CardHeader>
              <CardTitle>Capacity & Pricing</CardTitle>
              <CardDescription>
                Set event capacity and ticket prices
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="capacity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Event Capacity</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="100" {...field} />
                    </FormControl>
                    <FormDescription>
                      Maximum number of attendees
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="ticketPriceGeneral"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>General Ticket Price (RM)</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" placeholder="50.00" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="ticketPriceVip"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>VIP Ticket Price (RM)</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" placeholder="100.00" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Status */}
          <Card>
            <CardHeader>
              <CardTitle>Event Status</CardTitle>
              <CardDescription>
                Set the initial status for this event
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Draft events are not visible to the public
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Form Actions */}
          <div className="flex gap-4">
            <Button type="submit" size="lg">
              Create Event
            </Button>
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={() => navigate("/admin")}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
