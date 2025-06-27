"use client"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { Provider as ReduxProvider } from "react-redux";
import { persistor, store } from "@/redux/store";
import { PersistGate } from "redux-persist/integration/react";

const Provider = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <ReduxProvider store={store}>

            <NextThemesProvider
                attribute="class"
                defaultTheme="dark"
                enableSystem
                disableTransitionOnChange
            >

                <PersistGate loading={null} persistor={persistor}>
                    {children}
                </PersistGate>
            </NextThemesProvider>
        </ReduxProvider>
    )
}

export default Provider;