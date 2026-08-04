import { RouterProvider } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import { HeroUIProvider } from "@heroui/react";
import { store } from "@/store";
import { router } from "@/app/router";

export default function App() {
  return (
    <ReduxProvider store={store}>
      <HeroUIProvider>
        <RouterProvider router={router} />
      </HeroUIProvider>
    </ReduxProvider>
  );
}
