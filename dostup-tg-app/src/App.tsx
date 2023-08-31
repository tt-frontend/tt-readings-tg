import { BrowserRouter } from "react-router-dom";
import { Router } from "./Router";
import { NextUIProvider } from "@nextui-org/react";

function App() {
  return (
    <BrowserRouter>
      <NextUIProvider>
        <Router />
      </NextUIProvider>
    </BrowserRouter>
  );
}

export default App;
