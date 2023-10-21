import { QueryClientProvider } from "@tanstack/react-query";
import ReactDOM from "react-dom/client";
import { StyledSystem } from "./Theme";
import { queryClient } from "./config";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <StyledSystem />
  </QueryClientProvider>
);

/*


        <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        </QueryClientProvider>

*/
