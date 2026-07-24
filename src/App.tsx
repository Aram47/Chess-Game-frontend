import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";
import { AuthProvider } from "./providers/AuthProvider";
import { AuthBootstrap } from "./components/auth/AuthBootstrap";
import { GameProvider } from "./providers/GameProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ProfileProvider } from "./providers/ProfileProvider";
import { ProblemsProvider } from "./providers/ProblemsProvider";
import { TranslationProvider } from "./providers/TranslationProvider";
import { ThemeProvider } from "./providers/ThemeProvider";

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
      <ThemeProvider>
        <TranslationProvider>
          <AuthProvider>
            <AuthBootstrap>
              <ProfileProvider>
                <GameProvider>
                  <ProblemsProvider>
                    <RouterProvider router={router} />
                  </ProblemsProvider>
                </GameProvider>
              </ProfileProvider>
            </AuthBootstrap>
          </AuthProvider>
        </TranslationProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
