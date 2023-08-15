import { Toaster } from "react-hot-toast";
import AppContent from "./components/AppContent";
import AppHeader from "./components/AppHeader";

function App() {
  return (
    <>
      <div className="container">
        <p className="text-center text-2xl font-extrabold mt-4 text-gray-600">
          TODO LIST
        </p>
        <div className="w-1/2 mx-auto">
          <AppHeader />
          <AppContent />
        </div>
      </div>
      <Toaster position="bottom-right" />
    </>
  );
}

export default App;
