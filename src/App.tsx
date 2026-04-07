import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";
import { AuthProvider } from "./providers/AuthProvider";
import { PlayProvider } from "./providers/PlayProvider";

function App() {
  return (
    <AuthProvider>
      <PlayProvider>
        <RouterProvider router={router} />
      </PlayProvider>
    </AuthProvider>
  );
}

export default App;
