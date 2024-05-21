import type {Metadata} from "next";
import {Noto_Sans} from "next/font/google";
import "./globals.scss";

const inter = Noto_Sans({
    subsets: ["latin"],
    weight: ['400','500','700']
});

export const metadata: Metadata = {
    title: "Тестовое задание",
};

export default function RootLayout(
    {
        children,
    }: Readonly<{
        children: React.ReactNode;
    }>) {
    return (
        <html lang="en">
        <body className={inter.className}>
        {children}
        </body>
        </html>
    );
}
