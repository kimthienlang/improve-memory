import { Dumbbell, Library, Spade, Timer } from "lucide-react";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";

const navigationData = [
  {
    title: "Recall Dash",
    href: "/recall-dash",
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
    title: "Collections",
    href: "/collections",
    icon: <Library />,
  },
];

function App() {


  return (
    <>
      <div className="container flex h-full flex-col items-center justify-center">
        <Navbar navigationData={navigationData} />

        <div className="container flex h-full items-center justify-center py-24">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default App;
