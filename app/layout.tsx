import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Writing Assistant',
  description: 'Grammar and spelling review for Microsoft Word',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(() => {
              if (typeof window !== 'undefined') {
                const noop = () => {};
                const history = window.history;

                const protectHistoryMethod = (name) => {
                  if (!history) return;

                  let method = typeof history[name] === 'function'
                    ? history[name].bind(history)
                    : noop;

                  try {
                    Object.defineProperty(history, name, {
                      configurable: true,
                      get() {
                        return typeof method === 'function' ? method : noop;
                      },
                      set(value) {
                        method = typeof value === 'function' ? value.bind(history) : noop;
                      },
                    });
                  } catch {
                    history[name] = method;
                  }
                }

                protectHistoryMethod('replaceState');
                protectHistoryMethod('pushState');

                if (typeof window.requestIdleCallback !== 'function') {
                  window.requestIdleCallback = (callback) => window.setTimeout(() => callback({ didTimeout: false, timeRemaining: () => 0 }), 1);
                }

                if (typeof window.cancelIdleCallback !== 'function') {
                  window.cancelIdleCallback = (id) => window.clearTimeout(id);
                }
              }
            })();`,
          }}
        />
        <script
          src="https://appsforoffice.microsoft.com/lib/1/hosted/office.js"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
