import Aside from "./components/Aside";
import PaletteList from "./components/PaletteList";

export default function App() {
  return (
    <main className="flex flex-col md:flex-row">
      <Aside />
      <PaletteList />
    </main>
  );
}
