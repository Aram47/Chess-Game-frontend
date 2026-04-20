import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";
import { AuthProvider } from "./providers/AuthProvider";
import { GameProvider } from "./providers/GameProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ProfileProvider } from "./providers/ProfileProvider";

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
        <ProfileProvider>
          <GameProvider>
            <RouterProvider router={router} />
          </GameProvider>
        </ProfileProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
