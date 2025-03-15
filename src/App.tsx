import { ChevronRight } from "lucide-react";
import { Button } from "./components/ui/button";

function App() {
  return (
    <>
      <h1 className="font-writing text-center text-3xl">FrndzOnly</h1>
      <Button variant="destructive" size="lg">
        <ChevronRight />
        Shadcn
      </Button>
    </>
  );
}

export default App;
