import "./globals.css";

export const metadata = {
  title: "Interview Project",
  description: "My interview project",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
