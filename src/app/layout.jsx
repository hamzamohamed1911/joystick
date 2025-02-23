"use client";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import './globals.css';
import { SnackbarProvider } from "notistack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; 
import { PersistGate } from "redux-persist/integration/react";

// Create a new queryClient instance
const queryClient = new QueryClient();

export default function RootLayout({ children }) {
  return (
    <html dir="rtl" lang="ar">
      <body suppressHydrationWarning={true}>
        {/* Wrap your app with QueryClientProvider */}
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <SnackbarProvider
                maxSnack={3}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
              >
                <NavBar />
                {children}
                <Footer /> 
              </SnackbarProvider>
            </PersistGate>
          </Provider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
