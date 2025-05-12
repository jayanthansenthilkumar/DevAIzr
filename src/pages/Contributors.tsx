
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const contributors = [
  {
    name: "Alex Johnson",
    role: "Lead Developer",
    contributions: 127,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&q=80",
    github: "https://github.com/alexjohnson",
  },
  {
    name: "Samantha Lee",
    role: "UI/UX Designer",
    contributions: 98,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&q=80",
    github: "https://github.com/samanthalee",
  },
  {
    name: "Marcus Chen",
    role: "Backend Engineer",
    contributions: 142,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&q=80",
    github: "https://github.com/marcuschen",
  },
  {
    name: "Priya Patel",
    role: "AI Specialist",
    contributions: 89,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&q=80",
    github: "https://github.com/priyapatel",
  },
  {
    name: "David Kim",
    role: "Full Stack Developer",
    contributions: 104,
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop&q=80",
    github: "https://github.com/davidkim",
  },
  {
    name: "Lisa Wong",
    role: "DevOps Engineer",
    contributions: 76,
    avatar: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop&q=80",
    github: "https://github.com/lisawong",
  },
];

const Contributors = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-950">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl font-bold text-blue-800 dark:text-blue-300 mb-4">Our Amazing Contributors</h1>
          <p className="text-xl text-blue-600 dark:text-blue-400 max-w-2xl mx-auto">
            DevAIzr is made possible by these talented individuals who contribute their time and expertise to our project.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {contributors.map((contributor, index) => (
            <Card key={index} className="border border-blue-200 dark:border-blue-800 shadow-lg hover:shadow-xl transition-all duration-300 animate-scale-in bg-white dark:bg-blue-900">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-4">
                  <img 
                    src={contributor.avatar} 
                    alt={contributor.name} 
                    className="w-16 h-16 rounded-full object-cover border-2 border-blue-500"
                  />
                  <div>
                    <CardTitle className="text-blue-800 dark:text-blue-300">{contributor.name}</CardTitle>
                    <CardDescription className="text-blue-600 dark:text-blue-400">{contributor.role}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  <p className="mb-2">
                    <span className="font-medium">Contributions:</span> {contributor.contributions}
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full bg-blue-50 hover:bg-blue-100 dark:bg-blue-800 dark:hover:bg-blue-700">
                  <a href={contributor.github} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                    </svg>
                    View on GitHub
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-300 mb-4">Want to Contribute?</h2>
            <p className="text-lg text-blue-600 dark:text-blue-400 max-w-2xl mx-auto mb-6">
              We welcome contributions from developers of all skill levels. Join our community and help make DevAIzr even better!
            </p>
          </div>
          <Button asChild className="bg-blue-600 hover:bg-blue-700">
            <Link to="https://github.com/devAIzr/contribute" className="px-8 py-2">
              Get Started Contributing
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Contributors;
