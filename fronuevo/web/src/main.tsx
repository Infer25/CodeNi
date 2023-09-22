import React from "react";
import ReactDOM from "react-dom/client";
import { StyledSystem } from "./Theme";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./config";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <StyledSystem/>
        </QueryClientProvider>
  </React.StrictMode>
);

/*


        <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        </QueryClientProvider>

*/
