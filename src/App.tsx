import { cn } from "./lib/cn";

function App() {
  const isActive = true;
  return (
    <div 
    className = {cn(
      "p-10",
      "text-4xl",
      isActive && "text-blue-600"
    )}
    >
      cn helper is working 
    </div>
  );
}

export default App;