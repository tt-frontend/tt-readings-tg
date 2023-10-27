import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./Router";

function App() {
  useEffect(() => {
    Telegram.WebApp.enableClosingConfirmation();
  }, []);

  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App;
