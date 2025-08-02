import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import '../styles/index.css';

import {BrowserRouter} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {Toaster} from "sonner"
import {AuthProvider} from "@/components/context/authContext.jsx";
import {EditingProvider} from "@/components/context/editingContext.jsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    <EditingProvider>
                        <App/>
                        <Toaster position="top-center" richColors/>
                        {/*<ReactQueryDevtools initialIsOpen={false} />*/}
                    </EditingProvider>
                </AuthProvider>
            </QueryClientProvider>
        </BrowserRouter>
    </React.StrictMode>
);
