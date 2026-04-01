import { Dumbbell, Settings, Spade, Timer } from "lucide-react";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import { Button } from "./components/ui/button";
import api from "./lib/api";

const navigationData = [
  {
    title: "Reaction speed test",
    href: "/reaction-speed-test",
    icon: <Timer />,
  },
  {
    title: "Card memory test",
    href: "/card-memory-test",
    icon: <Spade />,
  },
  {
    title: "Practice",
    href: "/practice",
    icon: <Dumbbell />,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: <Settings />,
  },
];

function App() {

  const handleClick = async () => {
    const res = await api.get('/auth/test');
    console.log('res: ', res)
  }

  return (
    <>
      <div className="container flex h-full flex-col items-center justify-center gap-6">
        <Navbar navigationData={navigationData} />
        <Button onClick={handleClick}>Test API</Button>
        <div className="container flex min-h-screen items-center justify-center">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default App;
