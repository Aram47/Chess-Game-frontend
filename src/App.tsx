import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";
import { AuthProvider } from "./providers/AuthProvider";
import { PlayProvider } from "./providers/PlayProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <PlayProvider>
          <RouterProvider router={router} />
        </PlayProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
