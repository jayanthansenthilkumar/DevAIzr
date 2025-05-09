
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Home, 
  Info, 
  Code, 
  Users, 
  FileCode, 
  Mail, 
  ChevronDown, 
  Menu, 
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { NavigationMenu, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";

const Index = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  const handleDemoClick = () => {
    scrollToSection("compiler-sample");
    toast({
      title: "Demo Available",
      description: "Try our compiler sample below!",
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation Bar */}
      <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Code className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">DevAIzr</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex">
            <NavigationMenu>
              <NavigationMenuList className="gap-2">
                <NavigationMenuLink 
                  className={`${navigationMenuTriggerStyle()} ${activeSection === "home" ? "bg-accent text-accent-foreground" : ""}`} 
                  onClick={() => scrollToSection("home")}
                >
                  <Home className="mr-2 h-4 w-4" />
                  Home
                </NavigationMenuLink>

                <NavigationMenuLink 
                  className={`${navigationMenuTriggerStyle()} ${activeSection === "about" ? "bg-accent text-accent-foreground" : ""}`} 
                  onClick={() => scrollToSection("about")}
                >
                  <Info className="mr-2 h-4 w-4" />
                  About
                </NavigationMenuLink>

                <NavigationMenuLink 
                  className={`${navigationMenuTriggerStyle()} ${activeSection === "compiler" ? "bg-accent text-accent-foreground" : ""}`} 
                  onClick={() => scrollToSection("compiler")}
                >
                  <Code className="mr-2 h-4 w-4" />
                  Compiler
                </NavigationMenuLink>

                <NavigationMenuLink 
                  className={`${navigationMenuTriggerStyle()} ${activeSection === "contributors" ? "bg-accent text-accent-foreground" : ""}`} 
                  onClick={() => scrollToSection("contributors")}
                >
                  <Users className="mr-2 h-4 w-4" />
                  Contributors
                </NavigationMenuLink>

                <NavigationMenuLink 
                  className={`${navigationMenuTriggerStyle()} ${activeSection === "compiler-sample" ? "bg-accent text-accent-foreground" : ""}`} 
                  onClick={() => scrollToSection("compiler-sample")}
                >
                  <FileCode className="mr-2 h-4 w-4" />
                  Compiler Sample
                </NavigationMenuLink>

                <NavigationMenuLink 
                  className={`${navigationMenuTriggerStyle()} ${activeSection === "contact" ? "bg-accent text-accent-foreground" : ""}`} 
                  onClick={() => scrollToSection("contact")}
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Contact
                </NavigationMenuLink>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex gap-2">
            <Link to="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link to="/register">
              <Button>Register</Button>
            </Link>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden px-4 py-2 bg-background border-t animate-fade-in">
            <div className="flex flex-col space-y-2">
              <button 
                className={`flex items-center p-2 rounded-md ${activeSection === "home" ? "bg-accent text-accent-foreground" : ""}`}
                onClick={() => scrollToSection("home")}
              >
                <Home className="mr-2 h-4 w-4" />
                Home
              </button>
              <button 
                className={`flex items-center p-2 rounded-md ${activeSection === "about" ? "bg-accent text-accent-foreground" : ""}`}
                onClick={() => scrollToSection("about")}
              >
                <Info className="mr-2 h-4 w-4" />
                About
              </button>
              <button 
                className={`flex items-center p-2 rounded-md ${activeSection === "compiler" ? "bg-accent text-accent-foreground" : ""}`}
                onClick={() => scrollToSection("compiler")}
              >
                <Code className="mr-2 h-4 w-4" />
                Compiler
              </button>
              <button 
                className={`flex items-center p-2 rounded-md ${activeSection === "contributors" ? "bg-accent text-accent-foreground" : ""}`}
                onClick={() => scrollToSection("contributors")}
              >
                <Users className="mr-2 h-4 w-4" />
                Contributors
              </button>
              <button 
                className={`flex items-center p-2 rounded-md ${activeSection === "compiler-sample" ? "bg-accent text-accent-foreground" : ""}`}
                onClick={() => scrollToSection("compiler-sample")}
              >
                <FileCode className="mr-2 h-4 w-4" />
                Compiler Sample
              </button>
              <button 
                className={`flex items-center p-2 rounded-md ${activeSection === "contact" ? "bg-accent text-accent-foreground" : ""}`}
                onClick={() => scrollToSection("contact")}
              >
                <Mail className="mr-2 h-4 w-4" />
                Contact
              </button>
              
              <div className="flex gap-2 pt-2 border-t">
                <Link to="/login" className="flex-1">
                  <Button variant="outline" className="w-full">Login</Button>
                </Link>
                <Link to="/register" className="flex-1">
                  <Button className="w-full">Register</Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section id="home" className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary/5 via-primary/10 to-accent/5"></div>
          <div className="container relative z-10">
            <div className="flex flex-col items-center text-center space-y-8">
              <div className="animate-fade-in">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                  <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                    DevAIzr
                  </span>
                </h1>
                <p className="text-xl md:text-2xl mt-4 text-muted-foreground max-w-2xl">
                  AI-powered online compiler for all programming languages
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: "200ms" }}>
                <Button size="lg" onClick={handleDemoClick}>
                  Try Demo
                </Button>
                <Link to="/register">
                  <Button size="lg" variant="outline">
                    Get Started
                  </Button>
                </Link>
              </div>
              
              <div className="mt-8 animate-bounce">
                <ChevronDown 
                  className="h-8 w-8 text-muted-foreground cursor-pointer" 
                  onClick={() => scrollToSection("about")} 
                />
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16 bg-secondary/5">
          <div className="container">
            <h2 className="text-3xl font-bold mb-8 text-center">About DevAIzr</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">What is DevAIzr?</h3>
                <p className="text-muted-foreground">
                  DevAIzr is an innovative AI-powered online compiler that supports multiple programming languages.
                  It provides intelligent code suggestions, real-time error detection, and optimization tips.
                </p>
                <p className="text-muted-foreground">
                  Our platform is designed for developers of all skill levels, from beginners learning their first
                  language to professionals working on complex projects.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Key Features</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="mr-2 mt-1 text-green-500">✓</span>
                    <span>Support for 50+ programming languages</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 mt-1 text-green-500">✓</span>
                    <span>AI-powered code suggestions and error detection</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 mt-1 text-green-500">✓</span>
                    <span>Real-time collaboration features</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 mt-1 text-green-500">✓</span>
                    <span>Cloud-based storage for your projects</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 mt-1 text-green-500">✓</span>
                    <span>Responsive design for coding on any device</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Compiler Section */}
        <section id="compiler" className="py-16">
          <div className="container">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Compiler</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="transform transition-all hover:scale-105">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Code className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Multi-language Support</h3>
                  <p className="text-muted-foreground">
                    Code in Python, JavaScript, Java, C++, and many more languages all in one platform.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="transform transition-all hover:scale-105">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <FileCode className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">AI Assistance</h3>
                  <p className="text-muted-foreground">
                    Get intelligent code suggestions, error detection, and optimization tips from our AI.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="transform transition-all hover:scale-105">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Collaboration</h3>
                  <p className="text-muted-foreground">
                    Work together with teammates in real-time, share projects, and track changes.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Contributors Section */}
        <section id="contributors" className="py-16 bg-secondary/5">
          <div className="container">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Contributors</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="aspect-square bg-muted flex items-center justify-center">
                    <Users className="h-16 w-16 text-muted-foreground/50" />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold">Contributor {index + 1}</h3>
                    <p className="text-sm text-muted-foreground">Lead Developer</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link to="/contributors">
                <Button variant="outline">View All Contributors</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Compiler Sample Section */}
        <section id="compiler-sample" className="py-16">
          <div className="container">
            <h2 className="text-3xl font-bold mb-8 text-center">Try Our Compiler</h2>
            <div className="bg-card border rounded-lg shadow-sm overflow-hidden">
              <div className="border-b px-4 py-3 flex items-center justify-between bg-muted/50">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-sm text-muted-foreground">Sample.py</div>
                <div></div>
              </div>
              <div className="p-4 bg-black/90 text-green-400 font-mono text-sm overflow-x-auto">
                <pre>{`# DevAIzr Sample Code
def greet(name):
    return f"Hello, {name}! Welcome to DevAIzr."

# Call the function with your name
print(greet("Developer"))

# Sample output will appear here
# > Hello, Developer! Welcome to DevAIzr.`}</pre>
              </div>
              <div className="p-4 border-t">
                <Button>Run Code</Button>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <Link to="/compiler">
                <Button>Try Full Compiler</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 bg-secondary/5">
          <div className="container">
            <h2 className="text-3xl font-bold mb-8 text-center">Contact Us</h2>
            <div className="max-w-md mx-auto">
              <Card>
                <CardContent className="pt-6">
                  <form className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                      <input
                        id="name"
                        type="text"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                      <input
                        id="email"
                        type="email"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="your.email@example.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
                      <textarea
                        id="message"
                        className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Your message"
                      />
                    </div>
                    <Button className="w-full">Send Message</Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-muted py-8">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Code className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">DevAIzr</span>
            </div>
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} DevAIzr. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
