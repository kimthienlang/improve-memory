import { Dumbbell, Settings, Spade, Timer } from "lucide-react";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";

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
  return (
    <>
      <div className="container flex h-full flex-col items-center justify-center gap-6">
        <Navbar navigationData={navigationData} />
        <div className="container flex min-h-screen items-center justify-center">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default App;
