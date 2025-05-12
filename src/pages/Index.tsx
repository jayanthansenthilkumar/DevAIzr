
import React, { useState, useEffect } from "react";
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
  X,
  Play,
  Copy,
  CheckCircle,
  Globe,
  Server,
  Search,
  BookOpen,
  MessageSquare,
  Settings
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { NavigationMenu, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Language sample scripts
const sampleScripts = {
  python: `# Python Hello World
print("Hello, World!")

# Variables and Data Types
name = "DevAIzr"
version = 1.0
is_active = True

# Simple function
def greet(name):
    return f"Hello, {name}! Welcome to DevAIzr."

# Call the function
result = greet("Developer")
print(result)`,

  javascript: `// JavaScript Hello World
console.log("Hello, World!");

// Variables and Data Types
const name = "DevAIzr";
const version = 1.0;
const isActive = true;

// Simple function
function greet(name) {
  return \`Hello, \${name}! Welcome to DevAIzr.\`;
}

// Call the function
const result = greet("Developer");
console.log(result);`,

  cpp: `// C++ Hello World
#include <iostream>
#include <string>

int main() {
  std::cout << "Hello, World!" << std::endl;
  
  // Variables and Data Types
  std::string name = "DevAIzr";
  double version = 1.0;
  bool is_active = true;
  
  // Simple function
  auto greet = [](const std::string& name) {
    return "Hello, " + name + "! Welcome to DevAIzr.";
  };
  
  // Call the function
  std::string result = greet("Developer");
  std::cout << result << std::endl;
  
  return 0;
}`,

  java: `// Java Hello World
public class HelloWorld {
  public static void main(String[] args) {
    System.out.println("Hello, World!");
    
    // Variables and Data Types
    String name = "DevAIzr";
    double version = 1.0;
    boolean isActive = true;
    
    // Call the function
    String result = greet("Developer");
    System.out.println(result);
  }
  
  // Simple function
  public static String greet(String name) {
    return "Hello, " + name + "! Welcome to DevAIzr.";
  }
}`
};

const features = [
  {
    title: "Multi-Language Support",
    description: "Write, compile, and run code in over 50+ programming languages without switching platforms.",
    icon: <Globe className="h-8 w-8 text-primary" />
  },
  {
    title: "AI-Powered Assistance",
    description: "Get intelligent code suggestions, error detection, and optimization tips from our advanced AI.",
    icon: <Code className="h-8 w-8 text-primary" />
  },
  {
    title: "Real-time Collaboration",
    description: "Work together with your team in real-time with our collaborative editing features.",
    icon: <Users className="h-8 w-8 text-primary" />
  },
  {
    title: "Cloud Storage",
    description: "Save your projects to the cloud and access them from anywhere, anytime.",
    icon: <Server className="h-8 w-8 text-primary" />
  },
  {
    title: "Smart Search",
    description: "Find the right code snippets quickly with our intelligent search functionality.",
    icon: <Search className="h-8 w-8 text-primary" />
  },
  {
    title: "Comprehensive Documentation",
    description: "Access detailed documentation and examples for all supported languages.",
    icon: <BookOpen className="h-8 w-8 text-primary" />
  },
  {
    title: "Community Support",
    description: "Join our community of developers to share knowledge and get help when needed.",
    icon: <MessageSquare className="h-8 w-8 text-primary" />
  },
  {
    title: "Customizable Environment",
    description: "Personalize your coding environment with themes, keybindings, and more.",
    icon: <Settings className="h-8 w-8 text-primary" />
  }
];

const testimonials = [
  {
    name: "Alex Johnson",
    role: "Senior Developer",
    company: "TechCorp",
    content: "DevAIzr has revolutionized how I teach coding to my students. The real-time AI assistance makes debugging so much easier!"
  },
  {
    name: "Sarah Lee",
    role: "Data Scientist",
    company: "DataWorks",
    content: "The multi-language support is incredible. I can switch between Python, R, and SQL seamlessly for my data analysis projects."
  },
  {
    name: "Michael Chen",
    role: "Full Stack Developer",
    company: "WebSolutions",
    content: "The collaboration features have been a game-changer for our remote team. We can pair program even when we're thousands of miles apart."
  },
  {
    name: "Priya Patel",
    role: "CS Student",
    company: "University Tech",
    content: "As a student, DevAIzr has been invaluable for learning new languages. The interactive tutorials and AI suggestions helped me improve quickly."
  }
];

const Index = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [selectedLanguage, setSelectedLanguage] = useState("python");
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

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

  const simulateCodeExecution = () => {
    setIsRunning(true);
    setOutput("");
    
    // Simulate typing effect for output
    const language = selectedLanguage;
    let expectedOutput = "";
    
    switch (language) {
      case "python":
        expectedOutput = "Hello, World!\nHello, Developer! Welcome to DevAIzr.";
        break;
      case "javascript":
        expectedOutput = "Hello, World!\nHello, Developer! Welcome to DevAIzr.";
        break;
      case "cpp":
        expectedOutput = "Hello, World!\nHello, Developer! Welcome to DevAIzr.";
        break;
      case "java":
        expectedOutput = "Hello, World!\nHello, Developer! Welcome to DevAIzr.";
        break;
      default:
        expectedOutput = "Hello, World!";
    }
    
    let i = 0;
    const typeOutput = () => {
      if (i < expectedOutput.length) {
        setOutput(prev => prev + expectedOutput.charAt(i));
        i++;
        setTimeout(typeOutput, 30);
      } else {
        setIsRunning(false);
      }
    };
    
    // Simulate compilation delay
    setTimeout(typeOutput, 500);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(sampleScripts[selectedLanguage as keyof typeof sampleScripts]);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  useEffect(() => {
    setOutput("");
  }, [selectedLanguage]);

  // Add scroll detection to update active section as user scrolls  // Add scroll detection to update active section as user scrolls
  useEffect(() => {
    // Add throttling to avoid excessive function calls during scroll
    let lastScrollTime = 0;
    const scrollThrottle = 100; // ms between allowed function calls
    
    const handleScroll = () => {
      const now = Date.now();
      if (now - lastScrollTime < scrollThrottle) return;
      lastScrollTime = now;
      
      const sections = [
        "home",
        "about",
        "compiler",
        "compiler-sample",
        "contact"
      ];
      
      // Find which section is currently visible in the viewport
      let currentSection = null;
      let maxVisibility = 0;
      
      sections.forEach(sectionId => {
        const element = document.getElementById(sectionId);
        if (!element) return;
        
        const rect = element.getBoundingClientRect();
        // Calculate how much of the section is visible in the viewport
        const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
        const visibilityRatio = visibleHeight > 0 ? visibleHeight / element.clientHeight : 0;
        
        // Special case for the first section - if its top is above viewport but still partially visible
        if (sectionId === "home" && rect.top < 0 && rect.bottom > 0) {
          const homeVisibility = rect.bottom / element.clientHeight;
          if (homeVisibility > maxVisibility) {
            maxVisibility = homeVisibility;
            currentSection = sectionId;
          }
        } 
        // For all sections, find the one with the most visibility
        else if (visibilityRatio > maxVisibility) {
          maxVisibility = visibilityRatio;
          currentSection = sectionId;
        }
      });
      
      if (currentSection && currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Call once to set initial active section
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation Bar */}
      <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-blue-100">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Code className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-gradient-blue">DevAIzr</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex">
            <NavigationMenu>
              <NavigationMenuList className="gap-2">                <NavigationMenuLink 
                  className={navigationMenuTriggerStyle()}
                  data-active={activeSection === "home" ? "true" : undefined}
                  onClick={() => scrollToSection("home")}
                  aria-current={activeSection === "home" ? "page" : undefined}
                >
                  <Home className="mr-2 h-4 w-4" />
                  Home
                </NavigationMenuLink>

                <NavigationMenuLink 
                  className={navigationMenuTriggerStyle()}
                  data-active={activeSection === "about" ? "true" : undefined}
                  onClick={() => scrollToSection("about")}
                  aria-current={activeSection === "about" ? "page" : undefined}
                >
                  <Info className="mr-2 h-4 w-4" />
                  About
                </NavigationMenuLink>                <NavigationMenuLink 
                  className={navigationMenuTriggerStyle()}
                  data-active={activeSection === "compiler" ? "true" : undefined}
                  onClick={() => scrollToSection("compiler")}
                  aria-current={activeSection === "compiler" ? "page" : undefined}
                >
                  <Code className="mr-2 h-4 w-4" />
                  Compiler
                </NavigationMenuLink>

                <NavigationMenuLink 
                  className={navigationMenuTriggerStyle()}
                  data-active={activeSection === "compiler-sample" ? "true" : undefined}
                  onClick={() => scrollToSection("compiler-sample")}
                  aria-current={activeSection === "compiler-sample" ? "page" : undefined}
                >
                  <FileCode className="mr-2 h-4 w-4" />
                  Compiler Sample
                </NavigationMenuLink>

                <NavigationMenuLink 
                  className={navigationMenuTriggerStyle()}
                  data-active={activeSection === "contact" ? "true" : undefined}
                  onClick={() => scrollToSection("contact")}
                  aria-current={activeSection === "contact" ? "page" : undefined}
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
          <div className="md:hidden px-4 py-2 bg-background border-t animate-fade-in">            <div className="flex flex-col space-y-2">
              <button 
                className="flex items-center p-2 rounded-md transition-colors hover:bg-accent hover:text-accent-foreground"
                data-active={activeSection === "home" ? "true" : undefined}
                onClick={() => scrollToSection("home")}
                aria-current={activeSection === "home" ? "page" : undefined}
              >
                <Home className="mr-2 h-4 w-4" />
                Home
              </button>
              <button 
                className="flex items-center p-2 rounded-md transition-colors hover:bg-accent hover:text-accent-foreground"
                data-active={activeSection === "about" ? "true" : undefined}
                onClick={() => scrollToSection("about")}
                aria-current={activeSection === "about" ? "page" : undefined}
              >
                <Info className="mr-2 h-4 w-4" />
                About
              </button>              
              <button 
                className="flex items-center p-2 rounded-md transition-colors hover:bg-accent hover:text-accent-foreground"
                data-active={activeSection === "compiler" ? "true" : undefined}
                onClick={() => scrollToSection("compiler")}
                aria-current={activeSection === "compiler" ? "page" : undefined}
              >
                <Code className="mr-2 h-4 w-4" />
                Compiler
              </button>
              <button 
                className="flex items-center p-2 rounded-md transition-colors hover:bg-accent hover:text-accent-foreground"
                data-active={activeSection === "contributors" ? "true" : undefined}
                onClick={() => scrollToSection("contributors")}
                aria-current={activeSection === "contributors" ? "page" : undefined}
              >
                <Users className="mr-2 h-4 w-4" />
                Contributors
              </button>
              <button 
                className="flex items-center p-2 rounded-md transition-colors hover:bg-accent hover:text-accent-foreground"
                data-active={activeSection === "compiler-sample" ? "true" : undefined}
                onClick={() => scrollToSection("compiler-sample")}
                aria-current={activeSection === "compiler-sample" ? "page" : undefined}
              >
                <FileCode className="mr-2 h-4 w-4" />
                Compiler Sample
              </button>
              <button 
                className="flex items-center p-2 rounded-md transition-colors hover:bg-accent hover:text-accent-foreground"
                data-active={activeSection === "contact" ? "true" : undefined}
                onClick={() => scrollToSection("contact")}
                aria-current={activeSection === "contact" ? "page" : undefined}
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
          <div className="absolute inset-0 z-0 bg-gradient-to-br from-blue-50 via-blue-100 to-sky-50"></div>
          <div className="container relative z-10">
            <div className="flex flex-col items-center text-center space-y-8">
              <div className="animate-fade-in">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
                    DevAIzr
                  </span>
                </h1>
                <p className="text-xl md:text-2xl mt-4 text-slate-700 max-w-2xl">
                  AI-powered online compiler for all programming languages
                </p>
                <p className="text-slate-600 mt-6 max-w-3xl mx-auto">
                  Write, compile, and run code in over 50+ programming languages with intelligent assistance and real-time collaboration
                </p>
              </div>
                <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: "200ms" }}>
                <Button size="lg" onClick={handleDemoClick} className="bg-gradient-blue">
                  Try Our Compiler
                </Button>
                <Link to="/register">
                  <Button size="lg" variant="outline">
                    Get Started
                  </Button>
                </Link>
              </div>
              
              <div className="mt-8 animate-float">
                <ChevronDown 
                  className="h-8 w-8 text-primary cursor-pointer" 
                  onClick={() => scrollToSection("about")} 
                />
              </div>
            </div>
          </div>

          {/* Decorative Code Blocks */}
          <div className="hidden md:block absolute -right-20 top-40 rotate-6 opacity-40 animate-float">
            <div className="bg-white shadow-lg rounded-lg p-4 border border-blue-100 max-w-xs">
              <pre className="text-xs text-blue-800">
                <code>{`function hello() {
  console.log("Hello!");
}`}</code>
              </pre>
            </div>
          </div>
          
          <div className="hidden md:block absolute -left-20 top-60 -rotate-6 opacity-40 animate-float" style={{ animationDelay: "1s" }}>
            <div className="bg-white shadow-lg rounded-lg p-4 border border-blue-100 max-w-xs">
              <pre className="text-xs text-blue-800">
                <code>{`def greet():
  print("Welcome!")`}</code>
              </pre>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16 bg-gradient-to-b from-blue-50 to-white">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-3">About DevAIzr</h2>
              <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
              <p className="text-slate-600 max-w-3xl mx-auto">
                DevAIzr is an innovative AI-powered online compiler designed to transform how developers write, test, and optimize code across multiple programming languages.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 animate-fade-in">
                <div className="space-y-2">
                  <h3 className="text-2xl font-semibold text-blue-700">Our Mission</h3>
                  <p className="text-slate-600">
                    To create the most intuitive and intelligent coding platform that empowers developers of all skill levels to write better code faster.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-2xl font-semibold text-blue-700">Our Vision</h3>
                  <p className="text-slate-600">
                    A world where coding is accessible to everyone, and AI assistance removes barriers to learning and mastering programming languages.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold text-blue-700">Why Choose DevAIzr?</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="mr-2 mt-1 text-green-500">✓</span>
                      <span className="text-slate-600">Support for 50+ programming languages</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1 text-green-500">✓</span>
                      <span className="text-slate-600">AI-powered code suggestions and error detection</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1 text-green-500">✓</span>
                      <span className="text-slate-600">Real-time collaboration features</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1 text-green-500">✓</span>
                      <span className="text-slate-600">Cloud-based storage for your projects</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1 text-green-500">✓</span>
                      <span className="text-slate-600">Responsive design for coding on any device</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="relative">
                <div className="relative z-10 bg-white rounded-lg shadow-xl p-6 border border-blue-100 animate-float">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="text-xs text-slate-500">main.py</div>
                  </div>
                  <pre className="text-sm bg-slate-50 p-4 rounded font-mono text-slate-800">
                    <code>{`# DevAIzr Code Editor
class DevAIzr:
    def __init__(self):
        self.languages = 50+
        self.ai_enabled = True
        
    def analyze_code(self, code):
        # AI magic happens here
        return {
            "suggestions": [...],
            "optimizations": [...],
            "errors": []
        }

# Initialize DevAIzr
editor = DevAIzr()
result = editor.analyze_code("your_code_here")
print("Ready to code smarter!")`}</code>
                  </pre>
                </div>
                
                <div className="absolute top-10 -right-6 bg-blue-500 rounded-lg p-3 text-white text-sm shadow-lg animate-float" style={{ animationDelay: "0.5s" }}>
                  <p>AI suggestion: Use type hints for better readability</p>
                </div>
                
                <div className="absolute -bottom-6 -left-6 bg-green-500 rounded-lg p-3 text-white text-sm shadow-lg animate-float" style={{ animationDelay: "1s" }}>
                  <p>No errors detected in your code!</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="compiler" className="py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-3">Our Compiler</h2>
              <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
              <p className="text-slate-600 max-w-3xl mx-auto">
                Discover the powerful features that make DevAIzr the preferred choice for developers worldwide.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="border-blue-100 shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                  <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                    <div className="p-3 bg-blue-100 rounded-full">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-blue-800">{feature.title}</h3>
                    <p className="text-slate-600">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
              <div className="mt-12 text-center">
              <div className="flex justify-center gap-4">
                <Button onClick={() => window.location.href = "public/Compiler/index.html"} className="bg-primary hover:bg-primary/90">
                  Try Our Compiler
                </Button>
                <Link to="/features">
                  <Button variant="outline">Explore All Features</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 bg-blue-50">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-3">What Our Users Say</h2>
              <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="border-blue-100 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="bg-blue-100 text-primary w-10 h-10 rounded-full flex items-center justify-center mr-4">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-semibold text-blue-800">{testimonial.name}</h4>
                        <p className="text-sm text-slate-500">{testimonial.role}, {testimonial.company}</p>
                      </div>
                    </div>
                    <p className="text-slate-600 italic">"{testimonial.content}"</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Compiler Sample Section */}
        <section id="compiler-sample" className="py-16 bg-gradient-to-b from-white to-blue-50">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-3">Try Our Compiler</h2>
              <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
              <p className="text-slate-600 max-w-3xl mx-auto">
                Experience the power of our online compiler with these interactive code samples. Choose a language and run the code to see it in action.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="bg-white border border-blue-200 rounded-lg shadow-lg overflow-hidden">
                <div className="border-b border-blue-100 px-4 py-3 flex items-center justify-between bg-blue-50">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <Tabs defaultValue="python" className="w-[400px]" onValueChange={setSelectedLanguage}>
                    <TabsList className="bg-blue-100/50">
                      <TabsTrigger value="python">Python</TabsTrigger>
                      <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                      <TabsTrigger value="cpp">C++</TabsTrigger>
                      <TabsTrigger value="java">Java</TabsTrigger>
                    </TabsList>
                  </Tabs>
                  <div className="flex">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-slate-500 hover:text-slate-700"
                      onClick={copyToClipboard}
                    >
                      {isCopied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row">
                  <div className="w-full md:w-7/12">
                    <pre className="p-4 bg-slate-900 text-slate-100 font-mono text-sm h-[300px] overflow-y-auto">
                      <code>{sampleScripts[selectedLanguage as keyof typeof sampleScripts]}</code>
                    </pre>
                  </div>
                  
                  <div className="w-full md:w-5/12 border-t md:border-t-0 md:border-l border-blue-100">
                    <div className="p-3 bg-slate-800 text-white font-mono text-xs flex justify-between items-center">
                      <span>Output</span>
                      <Button 
                        size="sm" 
                        className="h-7 gap-1"
                        onClick={simulateCodeExecution}
                        disabled={isRunning}
                      >
                        <Play className="h-3 w-3" />
                        Run
                      </Button>
                    </div>
                    <div className="p-4 bg-slate-900 text-green-400 font-mono text-sm h-[248px] overflow-auto">
                      {output ? (
                        output.split('\n').map((line, i) => <div key={i}>{line}</div>)
                      ) : (
                        <span className="text-slate-500">// Output will appear here when you run the code</span>
                      )}
                    </div>
                  </div>
                </div>
                  <div className="p-4 border-t border-blue-100 bg-blue-50 flex justify-between items-center">                  <span className="text-sm text-slate-600">
                    {isRunning ? "Compiling and running..." : "Ready to run"}
                  </span>
                  <Link to="/login">
                    <Button>Try Full Compiler</Button>
                  </Link>
                </div>
              </div>
              
              <div className="mt-8 bg-blue-100 p-4 rounded-lg border border-blue-200">
                <h3 className="text-lg font-semibold text-blue-800 mb-2">Supported Languages</h3>                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white rounded p-2 text-center border border-blue-200">
                    <span className="text-slate-700">Python</span>
                  </div>
                  <div className="bg-white rounded p-2 text-center border border-blue-200">
                    <span className="text-slate-700">JavaScript</span>
                  </div>
                  <div className="bg-white rounded p-2 text-center border border-blue-200">
                    <span className="text-slate-700">Java</span>
                  </div>
                  <div className="bg-white rounded p-2 text-center border border-blue-200">
                    <span className="text-slate-700">C++</span>
                  </div>
                  <div className="bg-white rounded p-2 text-center border border-blue-200">
                    <span className="text-slate-700">C#</span>
                  </div>
                  <div className="bg-white rounded p-2 text-center border border-blue-200">
                    <span className="text-slate-700">Ruby</span>
                  </div>
                  <div className="bg-white rounded p-2 text-center border border-blue-200">
                    <span className="text-slate-700">PHP</span>
                  </div>
                  <div className="bg-white rounded p-2 text-center border border-blue-200">
                    <span className="text-slate-700">Go</span>
                  </div>
                </div>
                <p className="text-center text-sm text-slate-600 mt-3">And 40+ more languages...</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 bg-blue-50">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-3">Contact Us</h2>
              <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
              <p className="text-slate-600 max-w-3xl mx-auto">
                Have questions or feedback? We'd love to hear from you. Reach out to our team using the form below.
              </p>
            </div>
            
            <div className="max-w-md mx-auto">
              <Card className="border-blue-100">
                <CardContent className="pt-6">
                  <form className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-1 text-slate-700">Name</label>
                      <input
                        id="name"
                        type="text"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-1 text-slate-700">Email</label>
                      <input
                        id="email"
                        type="email"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="your.email@example.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium mb-1 text-slate-700">Subject</label>
                      <input
                        id="subject"
                        type="text"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Subject of your message"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-1 text-slate-700">Message</label>
                      <textarea
                        id="message"
                        className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Your message"
                      />
                    </div>
                    <Button className="w-full bg-gradient-blue">Send Message</Button>
                  </form>
                </CardContent>
              </Card>
              
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="border-blue-100">
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <Mail className="h-6 w-6 text-primary mb-2" />
                    <h3 className="font-medium text-blue-800">Email</h3>
                    <p className="text-sm text-slate-600">support@devaisr.com</p>
                  </CardContent>
                </Card>
                
                <Card className="border-blue-100">
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <MessageSquare className="h-6 w-6 text-primary mb-2" />
                    <h3 className="font-medium text-blue-800">Live Chat</h3>
                    <p className="text-sm text-slate-600">Available 24/7</p>
                  </CardContent>
                </Card>
                
                <Card className="border-blue-100">
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <Globe className="h-6 w-6 text-primary mb-2" />
                    <h3 className="font-medium text-blue-800">Social</h3>
                    <p className="text-sm text-slate-600">@devaisr</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Code className="h-6 w-6 text-blue-300" />
                <span className="text-xl font-bold text-white">DevAIzr</span>
              </div>
              <p className="text-blue-200 mb-4">
                AI-powered online compiler for all programming languages
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-blue-300 hover:text-white">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-blue-300 hover:text-white">
                  <span className="sr-only">GitHub</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-blue-300 hover:text-white">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div>              <h3 className="text-lg font-semibold mb-4 text-white">Product</h3>
              <ul className="space-y-2 text-blue-200">
                <li><a href="public/Compiler/index.html" className="hover:text-white">Compiler</a></li>
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">Documentation</a></li>
                <li><a href="#" className="hover:text-white">Release Notes</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Company</h3>
              <ul className="space-y-2 text-blue-200">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Press</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Legal</h3>
              <ul className="space-y-2 text-blue-200">
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white">Cookie Policy</a></li>
                <li><a href="#" className="hover:text-white">Data Processing</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-blue-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-blue-300 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} DevAIzr. All rights reserved.
            </div>
            <div className="text-blue-300 text-sm">
              Made with ❤️ for developers worldwide
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
