import { Toaster } from "react-hot-toast";
import AppContent from "./components/AppContent";
import AppHeader from "./components/AppHeader";

function App() {
    return (
        <>
            <div className="container">
                <p className="mt-4 text-center text-2xl font-extrabold text-gray-600">
                    TODO LIST
                </p>
                <div className="mx-auto w-full px-4 md:w-1/2 md:px-0">
                    <AppHeader />
                    <AppContent />
                </div>
            </div>
            <Toaster position="bottom-right" />
        </>
    );
}

export default App;
