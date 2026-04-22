1:"$Sreact.fragment"
3:I[39756,["/_next/static/chunks/0dbhjjzl8qfwv.js"],"default"]
4:I[37457,["/_next/static/chunks/0dbhjjzl8qfwv.js"],"default"]
:HL["/_next/static/chunks/0o.f.lzudvgdf.css","style"]
2:T5c7,(() => {
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
            })();0:{"rsc":["$","$1","c",{"children":[[["$","link","0",{"rel":"stylesheet","href":"/_next/static/chunks/0o.f.lzudvgdf.css","precedence":"next"}],["$","script","script-0",{"src":"/_next/static/chunks/0dbhjjzl8qfwv.js","async":true}]],["$","html",null,{"lang":"en","children":[["$","head",null,{"children":[["$","script",null,{"dangerouslySetInnerHTML":{"__html":"$2"}}],["$","script",null,{"src":"https://appsforoffice.microsoft.com/lib/1/hosted/office.js"}]]}],["$","body",null,{"children":["$","$L3",null,{"parallelRouterKey":"children","template":["$","$L4",null,{}],"notFound":[[["$","title",null,{"children":"404: This page could not be found."}],["$","div",null,{"style":{"fontFamily":"system-ui,\"Segoe UI\",Roboto,Helvetica,Arial,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\"","height":"100vh","textAlign":"center","display":"flex","flexDirection":"column","alignItems":"center","justifyContent":"center"},"children":["$","div",null,{"children":[["$","style",null,{"dangerouslySetInnerHTML":{"__html":"body{color:#000;background:#fff;margin:0}.next-error-h1{border-right:1px solid rgba(0,0,0,.3)}@media (prefers-color-scheme:dark){body{color:#fff;background:#000}.next-error-h1{border-right:1px solid rgba(255,255,255,.3)}}"}}],["$","h1",null,{"className":"next-error-h1","style":{"display":"inline-block","margin":"0 20px 0 0","padding":"0 23px 0 0","fontSize":24,"fontWeight":500,"verticalAlign":"top","lineHeight":"49px"},"children":404}],["$","div",null,{"style":{"display":"inline-block"},"children":["$","h2",null,{"style":{"fontSize":14,"fontWeight":400,"lineHeight":"49px","margin":0},"children":"This page could not be found."}]}]]}]}]],[]]}]}]]}]]}],"isPartial":false,"staleTime":300,"varyParams":null,"buildId":"beRPbNTAYu-1JxGHw4dw5"}
