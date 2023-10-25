import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import dayjs from "dayjs";

dayjs.locale("ru");

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
