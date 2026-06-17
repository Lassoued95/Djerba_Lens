// Business information for the CopilotKit assistant
export const businessInfo = {
  // Basic Business Info
  name: "Djerba Lens",
  owner: "Mohamed",
  location: "Djerba, Tunisia",
  description: "Professional photographer and creative based in Djerba, Tunisia, specializing in tourist photography, landscapes, and digital content creation.",
  
  // Contact Information
  contact: {
    email: "djerbatnsphoto@gmail.com",
    phone: "+216 25 740 872",
    whatsapp: "+216 25 740 872",
    instagram: "@djerbalens",
    instagramUrl: "https://www.instagram.com/djerbalens",
    responseTime: "Within 24 hours"
  },
  
  // Services Offered
  services: [
    {
      name: "Tourist Photo Shoots",
      description: "Professional photography sessions for couples, families, and groups in Djerba",
      duration: "1-2 hours",
      features: [
        "30-50 edited photos",
        "Multiple locations in Djerba",
        "Professional lighting",
        "High-resolution files"
      ]
    },
    {
      name: "Promotional Videos",
      description: "High-quality video content for local businesses in Djerba",
      duration: "1-3 days",
      features: [
        "Professional videography",
        "Color grading & editing",
        "Scriptwriting assistance"
      ]
    },
    {
      name: "Photo Editing & Retouching",
      description: "Professional post-processing to enhance your photos",
      duration: "24-48 hours",
      features: [
        "Color correction",
        "Exposure adjustment",
        "Background removal",
        "Skin retouching",
        "Artistic effects"
      ]
    },
    {
      name: "Social Media Content",
      description: "Engaging visual content tailored for your social media platforms",
      duration: "1-2 days",
      features: [
        "Instagram-ready content",
        "Story templates",
        "Hashtag research",
        "Content calendar"
      ]
    }
  ],
  
  // Popular Packages
  packages: [
    {
      name: "Tourist Essential",
      description: "Perfect for couples and small groups in Djerba",
      features: [
        "2-hour photo session",
        "40 edited photos",
        "2 locations in Djerba",
        "Online gallery",
        "Mobile optimized"
      ]
    },
    {
      name: "Villa Shooting",
      description: "Professional photo & video package for rentals and real estate in Djerba",
      features: [
        "Interior & exterior photography",
        "Wide-angle and detail shots",
        "Video walk-through",
        "Color grading and editing"
      ]
    }
  ],
  
  // Experience & Stats
  experience: {
    yearsActive: 3,
    happyClients: "20+",
    photoSessions: "50+",
    fiveStarReviews: "50+"
  },
  
  // Specialties
  specialties: [
    "Tourist photography in Djerba",
    "Couple and family portraits",
    "Desert and beach photography",
    "Traditional Tunisian architecture",
    "Horse and camel riding sessions",
    "Luxury villa photography",
    "Local life and culture",
    "Promotional content for businesses"
  ],
  
  // Languages
  languages: ["Arabic", "French", "English"],
  
  // Popular Photo Locations in Djerba
  photoLocations: [
    "Djerba beaches and coastline",
    "Traditional medina",
    "Desert landscapes",
    "Local markets and souks",
    "Historic architecture",
    "Luxury resorts and villas",
    "Flamingo lagoons",
    "Traditional pottery workshops"
  ],
  
  // Booking Information
  booking: {
    advanceNotice: "1-2 weeks recommended, especially during peak tourist season",
    availability: "Available for shoots across Djerba island",
    travelFees: "May apply for distant locations within Tunisia",
    quickBooking: "WhatsApp for urgent bookings and faster response"
  },
  
  // FAQ
  faq: [
    {
      question: "How far in advance should I book?",
      answer: "I recommend booking at least 1-2 weeks in advance, especially during peak tourist season."
    },
    {
      question: "Do you travel outside of Djerba?",
      answer: "Yes, I'm available for shoots across Tunisia. Travel fees may apply for distant locations."
    },
    {
      question: "What's included in the photo packages?",
      answer: "All packages include professional editing, high-resolution files, and an online gallery for sharing."
    },
    {
      question: "How long does it take to receive photos?",
      answer: "Edited photos are typically delivered within 24-48 hours after the session."
    },
    {
      question: "Can you photograph in different weather conditions?",
      answer: "Yes, I work in various weather conditions and can adapt to create beautiful photos regardless of the weather."
    }
  ]
};

export const getBusinessContext = () => {
  return `
You are an AI assistant for Djerba Lens, a professional photography business in Djerba, Tunisia. 

BUSINESS OVERVIEW:
- Owner: Mohamed, a professional photographer and creative
- Location: Based exclusively in Djerba, Tunisia
- Specializes in: Tourist photography, landscapes, promotional content, and digital media
- Languages: Arabic, French, and English
- Experience: 3+ years with 20+ happy clients and 50+ photo sessions

CONTACT INFORMATION:
- Email: djerbatnsphoto@gmail.com
- Phone/WhatsApp: +216 25 740 872
- Instagram: @djerbatns (https://www.instagram.com/djerbatns)
- Response time: Within 24 hours
- For urgent bookings: WhatsApp is recommended for faster response

SERVICES OFFERED:
1. Tourist Photo Shoots (1-2 hours)
   - 30-50 edited photos
   - Multiple Djerba locations
   - Professional lighting
   - High-resolution files

2. Promotional Videos (1-3 days)
   - Professional videography
   - Color grading & editing
   - Scriptwriting assistance

3. Photo Editing & Retouching (24-48 hours)
   - Color correction, exposure adjustment
   - Background removal, skin retouching
   - Artistic effects

4. Social Media Content (1-2 days)
   - Instagram-ready content
   - Story templates, hashtag research
   - Content calendar

POPULAR PACKAGES:
- Tourist Essential: 2-hour session, 40 edited photos, 2 Djerba locations, online gallery
- Villa Shooting: Interior/exterior photography, wide-angle shots, video walk-through, professional editing

PHOTO LOCATIONS IN DJERBA:
- Beautiful beaches and coastline
- Traditional medina and markets
- Desert landscapes
- Historic architecture
- Luxury resorts and villas
- Flamingo lagoons
- Traditional pottery workshops

BOOKING INFO:
- Advance notice: 1-2 weeks recommended (peak season)
- Available across Djerba island
- Travel fees may apply for distant Tunisia locations
- Quick booking via WhatsApp

Always be helpful, professional, and enthusiastic about photography services. Provide specific details when asked and encourage potential clients to contact Mohamed for bookings or questions.
`;
};