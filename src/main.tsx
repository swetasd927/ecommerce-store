// import ReactDOM from "react-dom/client";
// import { QueryClient } from "@tanstack/react-query";
// import { QueryClientProvider } from "@tanstack/react-query";

// import "./index.css";
// import App from "./App";

// const queryClient = new QueryClient();
// //creates react query cache manager

// ReactDOM.createRoot(
//   document.getElementById("root")!
// ).render(
//   //wrap entire app
//   <QueryClientProvider client={queryClient}>
//     <App />
//   </QueryClientProvider>
// );


import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import "./index.css";
import App from "./App";

const queryClient = new QueryClient();

ReactDOM.createRoot(
  document.getElementById("root")!
).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </QueryClientProvider>
);