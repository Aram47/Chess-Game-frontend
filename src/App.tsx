import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";
import { AuthProvider } from "./providers/AuthProvider";
import { AuthBootstrap } from "./components/auth/AuthBootstrap";
import { GameProvider } from "./providers/GameProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ProfileProvider } from "./providers/ProfileProvider";
import { ProblemsProvider } from "./providers/ProblemsProvider";
import { TranslationProvider } from "./providers/TranslationProvider";
import { useTranslation } from "react-i18next";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const AppLayout = () => {
  const { lang } = useTranslation();

  return (
    <div className="app-root" data-lang={lang}>
      <RouterProvider router={router} />
    </div>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TranslationProvider>
        <AuthProvider>
          <AuthBootstrap>
            <ProfileProvider>
              <GameProvider>
                <ProblemsProvider>
                  <AppLayout />
                </ProblemsProvider>
              </GameProvider>
            </ProfileProvider>
          </AuthBootstrap>
        </AuthProvider>
      </TranslationProvider>
    </QueryClientProvider>
  );
}

export default App;
