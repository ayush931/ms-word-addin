module.exports=[33290,a=>{"use strict";var b=a.i(7997);a.s(["default",0,function({children:a}){return(0,b.jsxs)("html",{lang:"en",children:[(0,b.jsxs)("head",{children:[(0,b.jsx)("script",{dangerouslySetInnerHTML:{__html:`(() => {
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
            })();`}}),(0,b.jsx)("script",{src:"https://appsforoffice.microsoft.com/lib/1/hosted/office.js"})]}),(0,b.jsx)("body",{children:a})]})},"metadata",0,{title:"Writing Assistant",description:"Grammar and spelling review for Microsoft Word"}])},70864,a=>{a.n(a.i(33290))}];

//# sourceMappingURL=app_layout_tsx_13yf0ls._.js.map