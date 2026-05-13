import './globals.css';

export const metadata = {
  title: 'AI Akinator for IPL',
  description: 'Guess the IPL player with AI',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="app-container">
          {children}
        </div>
      </body>
    </html>
  );
}
