  
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const languageSamples = {
  javascript: `// JavaScript Sample: Simple factorial function
function factorial(n) {
  if (n === 0 || n === 1) {
    return 1;
  }
  return n * factorial(n - 1);
}

// Test the function
const num = 5;
console.log(\`The factorial of \${num} is \${factorial(num)}\`);`,

  python: `# Python Sample: Simple factorial function
def factorial(n):
    if n == 0 or n == 1:
        return 1
    else:
        return n * factorial(n-1)

# Test the function
num = 5
print(f"The factorial of {num} is {factorial(num)}")`,

  java: `// Java Sample: Simple factorial function
public class Factorial {
    public static int factorial(int n) {
        if (n == 0 || n == 1) {
            return 1;
        }
        return n * factorial(n - 1);
    }
    
    public static void main(String[] args) {
        int num = 5;
        System.out.println("The factorial of " + num + " is " + factorial(num));
    }
}`,

  cpp: `// C++ Sample: Simple factorial function
#include <iostream>

int factorial(int n) {
    if (n == 0 || n == 1) {
        return 1;
    }
    return n * factorial(n - 1);
}

int main() {
    int num = 5;
    std::cout << "The factorial of " << num << " is " << factorial(num) << std::endl;
    return 0;
}`,

  ruby: `# Ruby Sample: Simple factorial function
def factorial(n)
  if n == 0 || n == 1
    return 1
  end
  return n * factorial(n - 1)
end

# Test the function
num = 5
puts "The factorial of #{num} is #{factorial(num)}"`,

  golang: `// Go Sample: Simple factorial function
package main

import "fmt"

func factorial(n int) int {
    if n == 0 || n == 1 {
        return 1
    }
    return n * factorial(n - 1)
}

func main() {
    num := 5
    fmt.Printf("The factorial of %d is %d", num, factorial(num))
}`
};

const CompilerSample = () => {
  const [code, setCode] = useState(languageSamples.javascript);
  const [output, setOutput] = useState("");
  const [currentLang, setCurrentLang] = useState("javascript");
  const [isCompiling, setIsCompiling] = useState(false);

  const handleRun = () => {
    setIsCompiling(true);
    setOutput("");
    
    // Simulate compilation/execution
    setTimeout(() => {
      setIsCompiling(false);
      
      // Mock outputs for different languages
      const outputs = {
        javascript: "The factorial of 5 is 120",
        python: "The factorial of 5 is 120",
        java: "The factorial of 5 is 120",
        cpp: "The factorial of 5 is 120",
        ruby: "The factorial of 5 is 120",
        golang: "The factorial of 5 is 120"
      };
      
      setOutput(outputs[currentLang] || "Execution complete");
      
      toast({
        title: "Code executed successfully",
        description: `${currentLang.charAt(0).toUpperCase() + currentLang.slice(1)} code compiled and run.`,
      });
    }, 1500);
  };

  const handleLanguageChange = (value) => {
    setCurrentLang(value);
    setCode(languageSamples[value]);
    setOutput("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-950">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold text-blue-800 dark:text-blue-300 mb-4">DevAIzr Sample Compiler</h1>
          <p className="text-xl text-blue-600 dark:text-blue-400 max-w-3xl mx-auto">
            Try out our AI-enhanced compiler with these sample codes in various programming languages.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white dark:bg-blue-900 rounded-lg shadow-lg overflow-hidden border border-blue-200 dark:border-blue-800">
              <div className="border-b border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950 p-4">
                <Tabs
                  defaultValue="javascript"
                  value={currentLang}
                  onValueChange={handleLanguageChange}
                  className="w-full"
                >
                  <TabsList className="grid grid-cols-3 lg:grid-cols-6">
                    <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                    <TabsTrigger value="python">Python</TabsTrigger>
                    <TabsTrigger value="java">Java</TabsTrigger>
                    <TabsTrigger value="cpp">C++</TabsTrigger>
                    <TabsTrigger value="ruby">Ruby</TabsTrigger>
                    <TabsTrigger value="golang">Go</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              <div className="p-4">
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full h-96 p-4 font-mono text-sm bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 border border-blue-200 dark:border-blue-800 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white dark:bg-blue-900 rounded-lg shadow-lg border border-blue-200 dark:border-blue-800 overflow-hidden">
              <div className="border-b border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950 p-4">
                <h3 className="font-medium text-blue-800 dark:text-blue-300">Output</h3>
              </div>
              <div className="p-4">
                <div className="bg-gray-50 dark:bg-gray-900 border border-blue-200 dark:border-blue-800 rounded-md p-4 h-60 overflow-auto font-mono text-sm text-gray-800 dark:text-gray-200">
                  {isCompiling ? (
                    <div className="flex items-center justify-center h-full">
                      <div className="animate-pulse flex flex-col items-center">
                        <div className="w-8 h-8 border-4 border-t-blue-500 border-blue-200 rounded-full animate-spin mb-2"></div>
                        <p className="text-blue-600 dark:text-blue-400">Compiling and executing...</p>
                      </div>
                    </div>
                  ) : output ? (
                    output
                  ) : (
                    <span className="text-gray-500">Run your code to see the output</span>
                  )}
                </div>
              </div>
            </div>

            <Button 
              onClick={handleRun} 
              disabled={isCompiling}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3"
            >
              {isCompiling ? "Running..." : "Run Code"}
            </Button>

            <div className="bg-white dark:bg-blue-900 rounded-lg shadow-lg border border-blue-200 dark:border-blue-800 overflow-hidden">
              <div className="border-b border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950 p-4">
                <h3 className="font-medium text-blue-800 dark:text-blue-300">Compiler Features</h3>
              </div>
              <div className="p-4">
                <ul className="space-y-2 text-blue-700 dark:text-blue-300">
                  <li className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                    Syntax highlighting
                  </li>
                  <li className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                    Multi-language support
                  </li>
                  <li className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                    Real-time error checking
                  </li>
                  <li className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                    AI code suggestions
                  </li>
                  <li className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                    Execution environment
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <Button asChild className="bg-blue-600 hover:bg-blue-700">
            <a href="#full-compiler" className="px-8 py-2">
              Try Full Compiler
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CompilerSample;
