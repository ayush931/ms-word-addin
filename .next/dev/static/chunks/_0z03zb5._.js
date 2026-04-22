(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/Header.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Header",
    ()=>Header
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
'use client';
;
const Header = ({ scanning, onScan })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: "topbar",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "eyebrow",
                        children: "Word review"
                    }, void 0, false, {
                        fileName: "[project]/components/Header.tsx",
                        lineNumber: 17,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        children: "Writing assistant"
                    }, void 0, false, {
                        fileName: "[project]/components/Header.tsx",
                        lineNumber: 18,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/Header.tsx",
                lineNumber: 16,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: "scan-button",
                type: "button",
                onClick: onScan,
                disabled: scanning,
                "aria-busy": scanning,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "scan-icon",
                        "aria-hidden": "true"
                    }, void 0, false, {
                        fileName: "[project]/components/Header.tsx",
                        lineNumber: 27,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "Scan"
                    }, void 0, false, {
                        fileName: "[project]/components/Header.tsx",
                        lineNumber: 28,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/Header.tsx",
                lineNumber: 20,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/Header.tsx",
        lineNumber: 15,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = Header;
var _c;
__turbopack_context__.k.register(_c, "Header");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ScorePanel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ScorePanel",
    ()=>ScorePanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
'use client';
;
const ScorePanel = ({ score, statusText, scanning, progress })=>{
    const needsReview = typeof score === 'number' && score < 100;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "score-panel",
        "aria-label": "Writing score",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "score-ring",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    children: scanning ? "..." : score
                }, void 0, false, {
                    fileName: "[project]/components/ScorePanel.tsx",
                    lineNumber: 22,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/components/ScorePanel.tsx",
                lineNumber: 21,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "score-copy",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                        children: scanning ? "Scanning" : needsReview ? "Needs review" : "Ready"
                    }, void 0, false, {
                        fileName: "[project]/components/ScorePanel.tsx",
                        lineNumber: 25,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: statusText
                    }, void 0, false, {
                        fileName: "[project]/components/ScorePanel.tsx",
                        lineNumber: 28,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    scanning && progress && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "scan-progress",
                        "aria-live": "polite",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "scan-progress-row",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            progress.current,
                                            " of ",
                                            progress.total,
                                            " paragraphs scanned"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/ScorePanel.tsx",
                                        lineNumber: 33,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            Math.round(progress.current / progress.total * 100),
                                            "%"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/ScorePanel.tsx",
                                        lineNumber: 34,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/ScorePanel.tsx",
                                lineNumber: 32,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "scan-progress-track",
                                "aria-hidden": "true",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "scan-progress-bar",
                                    style: {
                                        width: `${progress.current / progress.total * 100}%`
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/components/ScorePanel.tsx",
                                    lineNumber: 37,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/components/ScorePanel.tsx",
                                lineNumber: 36,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/ScorePanel.tsx",
                        lineNumber: 31,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/ScorePanel.tsx",
                lineNumber: 24,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/ScorePanel.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = ScorePanel;
var _c;
__turbopack_context__.k.register(_c, "ScorePanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/Tabs.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Tabs",
    ()=>Tabs
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
'use client';
;
const Tabs = ({ activeFilter, counts, onFilterChange })=>{
    const filters = [
        {
            id: 'all',
            label: 'All',
            count: counts.all
        },
        {
            id: 'style',
            label: 'Style',
            count: counts.style
        },
        {
            id: 'spelling',
            label: 'Spelling',
            count: counts.spelling
        },
        {
            id: 'grammar',
            label: 'Grammar',
            count: counts.grammar
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
        className: "tabs",
        "aria-label": "Suggestion filters",
        children: filters.map((f)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: `tab ${activeFilter === f.id ? 'active' : ''}`,
                type: "button",
                onClick: ()=>onFilterChange(f.id),
                children: [
                    f.label,
                    " ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: f.count
                    }, void 0, false, {
                        fileName: "[project]/components/Tabs.tsx",
                        lineNumber: 31,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, f.id, true, {
                fileName: "[project]/components/Tabs.tsx",
                lineNumber: 25,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)))
    }, void 0, false, {
        fileName: "[project]/components/Tabs.tsx",
        lineNumber: 23,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = Tabs;
var _c;
__turbopack_context__.k.register(_c, "Tabs");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/Pagination.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Pagination",
    ()=>Pagination
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
'use client';
;
const Pagination = ({ currentPage, pageCount, totalCount, visibleCount, pageSize, onPageChange })=>{
    if (totalCount <= pageSize) return null;
    const startIdx = (currentPage - 1) * pageSize + 1;
    const endIdx = Math.min(currentPage * pageSize, totalCount);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "pagination",
        "aria-label": "Suggestion pages",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: "action reject",
                type: "button",
                disabled: currentPage <= 1,
                onClick: ()=>onPageChange(currentPage - 1),
                children: "Previous"
            }, void 0, false, {
                fileName: "[project]/components/Pagination.tsx",
                lineNumber: 32,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                id: "pageInfo",
                children: [
                    "Page ",
                    currentPage,
                    "/",
                    pageCount,
                    " • ",
                    startIdx,
                    "-",
                    endIdx,
                    " of ",
                    totalCount
                ]
            }, void 0, true, {
                fileName: "[project]/components/Pagination.tsx",
                lineNumber: 40,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: "action reject",
                type: "button",
                disabled: currentPage >= pageCount,
                onClick: ()=>onPageChange(currentPage + 1),
                children: "Next"
            }, void 0, false, {
                fileName: "[project]/components/Pagination.tsx",
                lineNumber: 43,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/Pagination.tsx",
        lineNumber: 31,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = Pagination;
var _c;
__turbopack_context__.k.register(_c, "Pagination");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/SuggestionCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SuggestionCard",
    ()=>SuggestionCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
'use client';
;
const SuggestionCard = ({ suggestion, isNew, onAccept, onDismiss, onFocusSuggestion, onSelectReplacement })=>{
    const canAutoFix = suggestion.autoFixable !== false && suggestion.selectedReplacement;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
        className: `suggestion-card ${isNew ? 'new' : ''}`,
        role: "button",
        tabIndex: 0,
        onClick: ()=>onFocusSuggestion(suggestion.id),
        onKeyDown: (event)=>{
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onFocusSuggestion(suggestion.id);
            }
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "suggestion-meta",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: `badge ${suggestion.type}`,
                        children: suggestion.type.charAt(0).toUpperCase() + suggestion.type.slice(1)
                    }, void 0, false, {
                        fileName: "[project]/components/SuggestionCard.tsx",
                        lineNumber: 42,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: [
                            "Paragraph ",
                            suggestion.paragraphIndex + 1
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/SuggestionCard.tsx",
                        lineNumber: 45,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/SuggestionCard.tsx",
                lineNumber: 41,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "context",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SuggestionContext, {
                    suggestion: suggestion
                }, void 0, false, {
                    fileName: "[project]/components/SuggestionCard.tsx",
                    lineNumber: 49,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/components/SuggestionCard.tsx",
                lineNumber: 48,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "message",
                children: suggestion.message
            }, void 0, false, {
                fileName: "[project]/components/SuggestionCard.tsx",
                lineNumber: 52,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            canAutoFix ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "replacement-row",
                children: suggestion.replacements.slice(0, 4).map((replacement, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "replacement",
                        type: "button",
                        onClick: (event)=>{
                            event.stopPropagation();
                            onSelectReplacement(suggestion.id, replacement);
                        },
                        children: replacement
                    }, idx, false, {
                        fileName: "[project]/components/SuggestionCard.tsx",
                        lineNumber: 57,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0)))
            }, void 0, false, {
                fileName: "[project]/components/SuggestionCard.tsx",
                lineNumber: 55,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "manual-review",
                children: "Manual review required"
            }, void 0, false, {
                fileName: "[project]/components/SuggestionCard.tsx",
                lineNumber: 71,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "actions",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "action accept",
                        type: "button",
                        disabled: !canAutoFix,
                        onClick: (event)=>{
                            event.stopPropagation();
                            onAccept(suggestion.id);
                        },
                        children: "Fix"
                    }, void 0, false, {
                        fileName: "[project]/components/SuggestionCard.tsx",
                        lineNumber: 75,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "action reject",
                        type: "button",
                        onClick: (event)=>{
                            event.stopPropagation();
                            onDismiss(suggestion.id);
                        },
                        children: "Reject"
                    }, void 0, false, {
                        fileName: "[project]/components/SuggestionCard.tsx",
                        lineNumber: 86,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/SuggestionCard.tsx",
                lineNumber: 74,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/SuggestionCard.tsx",
        lineNumber: 29,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = SuggestionCard;
/**
 * Inline helper to render the context snippet with the error highlighted.
 */ const SuggestionContext = ({ suggestion })=>{
    const text = suggestion.paragraphText;
    const start = Math.max(0, suggestion.offset - 55);
    const end = Math.min(text.length, suggestion.offset + suggestion.length + 55);
    const before = text.slice(start, suggestion.offset);
    const wrong = text.slice(suggestion.offset, suggestion.offset + suggestion.length);
    const after = text.slice(suggestion.offset + suggestion.length, end);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            start > 0 && "...",
            before,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "highlight",
                children: wrong
            }, void 0, false, {
                fileName: "[project]/components/SuggestionCard.tsx",
                lineNumber: 116,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            after,
            end < text.length && "..."
        ]
    }, void 0, true);
};
_c1 = SuggestionContext;
var _c, _c1;
__turbopack_context__.k.register(_c, "SuggestionCard");
__turbopack_context__.k.register(_c1, "SuggestionContext");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/SuggestionList.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SuggestionList",
    ()=>SuggestionList
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$SuggestionCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/SuggestionCard.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
const SuggestionList = ({ suggestions, scanning, latestId, onAccept, onDismiss, onFocusSuggestion, onSelectReplacement })=>{
    _s();
    const listRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Auto-scroll to newly found suggestions during scan
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SuggestionList.useEffect": ()=>{
            if (scanning && latestId) {
                const card = listRef.current?.querySelector(`[data-id="${latestId}"]`);
                card?.scrollIntoView({
                    block: "nearest",
                    behavior: "smooth"
                });
            }
        }
    }["SuggestionList.useEffect"], [
        scanning,
        latestId
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "suggestions",
        "aria-live": "polite",
        ref: listRef,
        children: [
            suggestions.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    "data-id": s.id,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$SuggestionCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SuggestionCard"], {
                        suggestion: s,
                        isNew: s.id === latestId,
                        onAccept: onAccept,
                        onDismiss: onDismiss,
                        onFocusSuggestion: onFocusSuggestion,
                        onSelectReplacement: onSelectReplacement
                    }, void 0, false, {
                        fileName: "[project]/components/SuggestionList.tsx",
                        lineNumber: 43,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, s.id, false, {
                    fileName: "[project]/components/SuggestionList.tsx",
                    lineNumber: 42,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))),
            suggestions.length === 0 && !scanning && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "empty-state",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "empty-mark",
                        "aria-hidden": "true"
                    }, void 0, false, {
                        fileName: "[project]/components/SuggestionList.tsx",
                        lineNumber: 56,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                        children: "No suggestions"
                    }, void 0, false, {
                        fileName: "[project]/components/SuggestionList.tsx",
                        lineNumber: 57,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "Scan the document to review the writing."
                    }, void 0, false, {
                        fileName: "[project]/components/SuggestionList.tsx",
                        lineNumber: 58,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/SuggestionList.tsx",
                lineNumber: 55,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/SuggestionList.tsx",
        lineNumber: 40,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(SuggestionList, "84n7gRvM2a8Nl9i4H/fLGxCIUPc=");
_c = SuggestionList;
var _c;
__turbopack_context__.k.register(_c, "SuggestionList");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/constants/config.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Global configuration constants for the application.
 */ /** Endpoint for the LanguageTool API */ __turbopack_context__.s([
    "LANGUAGE_TOOL_CONCURRENCY",
    ()=>LANGUAGE_TOOL_CONCURRENCY,
    "LANGUAGE_TOOL_ENDPOINT",
    ()=>LANGUAGE_TOOL_ENDPOINT,
    "LOCAL_SCAN_CONCURRENCY",
    ()=>LOCAL_SCAN_CONCURRENCY,
    "SCAN_BATCH_SIZE",
    ()=>SCAN_BATCH_SIZE,
    "SUGGESTIONS_PAGE_SIZE",
    ()=>SUGGESTIONS_PAGE_SIZE,
    "SUPPORTED_LANGUAGES",
    ()=>SUPPORTED_LANGUAGES
]);
const LANGUAGE_TOOL_ENDPOINT = "https://api.languagetool.org/v2/check";
const SCAN_BATCH_SIZE = 50;
const SUGGESTIONS_PAGE_SIZE = 50;
const LANGUAGE_TOOL_CONCURRENCY = 4;
const LOCAL_SCAN_CONCURRENCY = 4;
const SUPPORTED_LANGUAGES = [
    {
        value: "en-US",
        label: "English (US)"
    },
    {
        value: "en-GB",
        label: "English (UK)"
    },
    {
        value: "en-AU",
        label: "English (AU)"
    },
    {
        value: "en-CA",
        label: "English (CA)"
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/Settings.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Settings",
    ()=>Settings
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/constants/config.ts [app-client] (ecmascript)");
'use client';
;
;
const Settings = ({ onlineEnabled, onOnlineToggle, language, onLanguageChange })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
        className: "settings",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "toggle",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "checkbox",
                        checked: onlineEnabled,
                        onChange: (e)=>onOnlineToggle(e.target.checked)
                    }, void 0, false, {
                        fileName: "[project]/components/Settings.tsx",
                        lineNumber: 25,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "LanguageTool"
                    }, void 0, false, {
                        fileName: "[project]/components/Settings.tsx",
                        lineNumber: 30,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/Settings.tsx",
                lineNumber: 24,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                value: language,
                onChange: (e)=>onLanguageChange(e.target.value),
                "aria-label": "Language",
                children: __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SUPPORTED_LANGUAGES"].map((lang)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                        value: lang.value,
                        children: lang.label
                    }, lang.value, false, {
                        fileName: "[project]/components/Settings.tsx",
                        lineNumber: 38,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)))
            }, void 0, false, {
                fileName: "[project]/components/Settings.tsx",
                lineNumber: 32,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/Settings.tsx",
        lineNumber: 23,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = Settings;
var _c;
__turbopack_context__.k.register(_c, "Settings");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/hooks/useScanner.ts [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

const e = new Error("Could not parse module '[project]/hooks/useScanner.ts'\n\nReturn statement is not allowed here");
e.code = 'MODULE_UNPARSABLE';
throw e;
}),
"[project]/utils/checks.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "countOccurrencesBefore",
    ()=>countOccurrencesBefore,
    "groupSuggestionsByParagraph",
    ()=>groupSuggestionsByParagraph,
    "mergeSuggestions",
    ()=>mergeSuggestions,
    "runDocumentStyleChecks",
    ()=>runDocumentStyleChecks,
    "runLocalChecks",
    ()=>runLocalChecks
]);
const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];
const RANGE_WORDS = new Set([
    ...MONTHS,
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
]);
const KNOWN_ABBREVIATIONS = new Set([
    "AI",
    "API",
    "CPU",
    "CSS",
    "DNA",
    "DOI",
    "GPU",
    "HTML",
    "HTTP",
    "HTTPS",
    "MRI",
    "NASA",
    "NLP",
    "PDF",
    "RNA",
    "URL",
    "XML",
    "JSON",
    "UI"
]);
function runLocalChecks(paragraph) {
    const checks = [
        ...findRegexIssues(paragraph, /\b(teh)\b/gi, "spelling", "Possible spelling mistake.", [
            "the"
        ]),
        ...findRegexIssues(paragraph, /\b(recieve|recieved|recieving)\b/gi, "spelling", "Possible spelling mistake.", [
            "receive"
        ]),
        ...findRegexIssues(paragraph, /\b(seperate|seperated|seperately)\b/gi, "spelling", "Possible spelling mistake.", [
            "separate"
        ]),
        ...findRegexIssues(paragraph, /\b(definately)\b/gi, "spelling", "Possible spelling mistake.", [
            "definitely"
        ]),
        ...findRegexIssues(paragraph, /\b(alot)\b/gi, "spelling", "Possible spelling mistake.", [
            "a lot"
        ]),
        ...findRegexIssues(paragraph, / {2,}/g, "grammar", "Use one space.", [
            " "
        ]),
        ...findRegexIssues(paragraph, /\b(is|are|was|were)\s+\1\b/gi, "grammar", "Repeated verb.", [
            "$1"
        ]),
        ...findRegexIssues(paragraph, /\b(\w+)\s+\1\b/gi, "grammar", "Repeated word.", [
            "$1"
        ]),
        ...findRegexIssues(paragraph, /\b(i)\b/g, "grammar", "Capitalize the pronoun.", [
            "I"
        ]),
        ...findRegexIssues(paragraph, /\s+([,.!?;:])/g, "grammar", "Remove the space before punctuation.", [
            "$1"
        ]),
        ...findRegexIssues(paragraph, /([!?]){2,}/g, "grammar", "Use one punctuation mark.", [
            "$1"
        ]),
        ...findRegexIssues(paragraph, /([,;:!?])(?=\S)/g, "grammar", "Add a space after punctuation.", [
            "$1 "
        ]),
        ...findRegexIssues(paragraph, /([A-Za-z]{3,}\.)(?=[A-Z][a-z])/g, "grammar", "Add a space after the period.", [
            "$1 "
        ])
    ];
    return checks;
}
function runDocumentStyleChecks(paragraphs) {
    const variant = detectEnglishVariant(paragraphs.map((p)=>p.text).join("\n"));
    const dateStyle = detectDateStyle(paragraphs.map((p)=>p.text).join("\n"));
    return [
        ...findOperatorSpacingIssues(paragraphs),
        ...findRangeHyphenIssues(paragraphs),
        ...findQuoteIssues(paragraphs, variant),
        ...findApostropheIssues(paragraphs),
        ...findAbstractWordCountIssues(paragraphs),
        ...findLongHeadingIssues(paragraphs),
        ...findDateIssues(paragraphs, dateStyle),
        ...findAbbreviationIssues(paragraphs)
    ];
}
/**
 * Identifies issues in text based on a regular expression and returns formal suggestions.
 */ function findRegexIssues(paragraph, regex, type, message, replacements) {
    const issues = [];
    let match;
    while((match = regex.exec(paragraph.text)) !== null){
        const replacementValues = replacements.map((r)=>r.replace("$1", match[1] || ""));
        issues.push({
            id: Math.random().toString(36).substring(2, 11),
            paragraphIndex: paragraph.paragraphIndex,
            paragraphText: paragraph.text,
            offset: match.index,
            length: match[0].length,
            type,
            message,
            replacements: replacementValues,
            selectedReplacement: replacementValues[0] || "",
            source: "Local",
            severity: "error",
            autoFixable: true
        });
    }
    return issues;
}
function createSuggestion(paragraph, offset, length, ruleId, message, replacements, autoFixable = true, severity = autoFixable ? "error" : "warning") {
    return {
        id: Math.random().toString(36).substring(2, 11),
        paragraphIndex: paragraph.paragraphIndex,
        paragraphText: paragraph.text,
        offset,
        length,
        type: "style",
        ruleId,
        severity,
        autoFixable,
        message,
        replacements,
        selectedReplacement: autoFixable ? replacements[0] || "" : "",
        source: "Document style"
    };
}
function isSkippedParagraph(text) {
    const trimmed = text.trim();
    return trimmed.startsWith("```") || /^(```|~~~)/.test(trimmed) || /^(figure|fig\.|table)\s+\d+/i.test(trimmed) || /[\t|]/.test(text);
}
function protectedRanges(text) {
    const ranges = [];
    const patterns = [
        /`[^`]*`/g,
        /https?:\/\/\S+/gi,
        /www\.\S+/gi,
        /\b(?:[A-Z][a-z]?\d*){2,}\b/g
    ];
    for (const pattern of patterns){
        let match;
        while((match = pattern.exec(text)) !== null){
            ranges.push([
                match.index,
                match.index + match[0].length
            ]);
        }
    }
    return ranges;
}
function overlapsProtected(text, start, end) {
    return protectedRanges(text).some(([rangeStart, rangeEnd])=>start < rangeEnd && end > rangeStart);
}
function wordCount(text) {
    return text.trim().match(/\b[\w'-]+\b/g)?.length || 0;
}
function findOperatorSpacingIssues(paragraphs) {
    const issues = [];
    for (const paragraph of paragraphs){
        if (isSkippedParagraph(paragraph.text)) continue;
        const regex = /\b[\w.]+(?:\s*[-+*/=]\s*[\w.]+)+\b/g;
        let match;
        while((match = regex.exec(paragraph.text)) !== null){
            const original = match[0];
            if (!/[+*/=]/.test(original) || overlapsProtected(paragraph.text, match.index, match.index + original.length)) {
                continue;
            }
            const replacement = original.replace(/\s*([-+*/=])\s*/g, " $1 ").replace(/\s{2,}/g, " ");
            if (replacement !== original) {
                issues.push(createSuggestion(paragraph, match.index, original.length, "operator-spacing", "Use exactly one space before and after binary arithmetic operators.", [
                    replacement
                ]));
            }
        }
    }
    return issues;
}
function findRangeHyphenIssues(paragraphs) {
    const issues = [];
    for (const paragraph of paragraphs){
        if (isSkippedParagraph(paragraph.text)) continue;
        const regex = /\b([A-Za-z]+|\d{1,4})(-)([A-Za-z]+|\d{1,4})\b/g;
        let match;
        while((match = regex.exec(paragraph.text)) !== null){
            const [original, left, , right] = match;
            const isNumericRange = /^\d/.test(left) && /^\d/.test(right);
            const isNamedRange = RANGE_WORDS.has(left) && RANGE_WORDS.has(right);
            if (!isNumericRange && !isNamedRange || overlapsProtected(paragraph.text, match.index, match.index + original.length)) {
                continue;
            }
            issues.push(createSuggestion(paragraph, match.index, original.length, "en-dash-range", "Use an en dash for numeric, date, or named ranges.", [
                `${left}–${right}`
            ]));
        }
    }
    return issues;
}
function detectEnglishVariant(text) {
    const us = countMatches(text, /\b(color|analyze|analyzed|organization|behavior|center)\b/gi) + countMatches(text, monthDateRegex("g"));
    const uk = countMatches(text, /\b(colour|analyse|analysed|organisation|behaviour|centre)\b/gi) + countMatches(text, dayMonthRegex("g"));
    return uk > us ? "uk" : "us";
}
function findQuoteIssues(paragraphs, variant) {
    const issues = [];
    for (const paragraph of paragraphs){
        if (isSkippedParagraph(paragraph.text)) continue;
        const doubleQuoteRegex = /"([^"\n]+)"/g;
        let doubleMatch;
        while((doubleMatch = doubleQuoteRegex.exec(paragraph.text)) !== null){
            if (overlapsProtected(paragraph.text, doubleMatch.index, doubleMatch.index + doubleMatch[0].length)) continue;
            issues.push(createSuggestion(paragraph, doubleMatch.index, doubleMatch[0].length, "quotation-style", variant === "us" ? "Use curly double quotation marks for primary US English quotes." : "Use curly double quotation marks only for nested UK English quotes.", [
                `“${doubleMatch[1]}”`
            ]));
        }
        const singleQuoteRegex = /(?<!\w)'([^'\n]+)'(?!\w)/g;
        let singleMatch;
        while((singleMatch = singleQuoteRegex.exec(paragraph.text)) !== null){
            if (overlapsProtected(paragraph.text, singleMatch.index, singleMatch.index + singleMatch[0].length)) continue;
            issues.push(createSuggestion(paragraph, singleMatch.index, singleMatch[0].length, "quotation-style", variant === "uk" ? "Use curly single quotation marks for primary UK English quotes." : "Use curly single quotation marks for nested US English quotes.", [
                `‘${singleMatch[1]}’`
            ]));
        }
    }
    return issues;
}
function findApostropheIssues(paragraphs) {
    const issues = [];
    for (const paragraph of paragraphs){
        if (isSkippedParagraph(paragraph.text)) continue;
        const regex = /\b[A-Za-z]+'[A-Za-z]+\b|'\d{2}s\b/g;
        let match;
        while((match = regex.exec(paragraph.text)) !== null){
            if (overlapsProtected(paragraph.text, match.index, match.index + match[0].length)) continue;
            issues.push(createSuggestion(paragraph, match.index, match[0].length, "smart-apostrophe", "Use a typographic apostrophe.", [
                match[0].replace(/'/g, "’")
            ]));
        }
    }
    return issues;
}
function findAbstractWordCountIssues(paragraphs) {
    const headingIndex = paragraphs.findIndex((p)=>/^abstract:?$/i.test(p.text.trim()));
    if (headingIndex === -1) return [];
    const abstractParagraphs = [];
    for(let i = headingIndex + 1; i < paragraphs.length; i++){
        const text = paragraphs[i].text.trim();
        if (!text) continue;
        if (isLikelyHeading(text)) break;
        abstractParagraphs.push(text);
    }
    const count = wordCount(abstractParagraphs.join(" "));
    if (count >= 150 && count <= 200) return [];
    const heading = paragraphs[headingIndex];
    return [
        createSuggestion(heading, 0, heading.text.length, "abstract-word-count", `Abstract is ${count} words; required range is 150-200 words.`, [], false)
    ];
}
function findLongHeadingIssues(paragraphs) {
    const issues = [];
    for (const paragraph of paragraphs){
        const text = paragraph.text.trim();
        if (!isLikelyHeading(text)) continue;
        const count = wordCount(text);
        if (count <= 60) continue;
        issues.push(createSuggestion(paragraph, Math.max(0, paragraph.text.indexOf(text)), text.length, "heading-length", `Heading is ${count} words; trim it to 60 words or fewer.`, [], false));
    }
    return issues;
}
function detectDateStyle(text) {
    const us = countMatches(text, monthDateRegex("g"));
    const uk = countMatches(text, dayMonthRegex("g"));
    return uk > us ? "uk" : "us";
}
function findDateIssues(paragraphs, dominantStyle) {
    const issues = [];
    for (const paragraph of paragraphs){
        if (isSkippedParagraph(paragraph.text)) continue;
        const wrongStyleRegex = dominantStyle === "us" ? dayMonthRegex("g") : monthDateRegex("g");
        let match;
        while((match = wrongStyleRegex.exec(paragraph.text)) !== null){
            const replacement = dominantStyle === "us" ? toUsDate(match[1], match[2], match[3]) : toUkDate(match[1], match[2], match[3]);
            issues.push(createSuggestion(paragraph, match.index, match[0].length, "date-format-consistency", dominantStyle === "us" ? "Use the dominant US date style: Month DD, YYYY." : "Use the dominant UK date style: DD Month YYYY.", [
                replacement
            ]));
        }
        const numericDateRegex = /\b(\d{1,2})\/(\d{1,2})\/(\d{4})\b/g;
        while((match = numericDateRegex.exec(paragraph.text)) !== null){
            const first = Number(match[1]);
            const second = Number(match[2]);
            const ambiguous = first <= 12 && second <= 12;
            if (!ambiguous) continue;
            issues.push(createSuggestion(paragraph, match.index, match[0].length, "ambiguous-date", "Numeric date is ambiguous; use a spelled-out date format.", [], false));
        }
    }
    return issues;
}
function findAbbreviationIssues(paragraphs) {
    const issues = [];
    const definitions = new Map();
    const definedAbbreviations = new Set();
    for (const paragraph of paragraphs){
        if (isSkippedParagraph(paragraph.text)) continue;
        const spacingRegex = /\b([A-Z][A-Za-z]+(?:\s+[A-Z][A-Za-z]+)+)\(([A-Za-z]{2,})\)/g;
        let spacingMatch;
        while((spacingMatch = spacingRegex.exec(paragraph.text)) !== null){
            issues.push(createSuggestion(paragraph, spacingMatch.index, spacingMatch[0].length, "abbreviation-spacing", "Use one space between the full form and its abbreviation.", [
                `${spacingMatch[1]} (${spacingMatch[2].toUpperCase()})`
            ]));
        }
        const definitionRegex = /\b([A-Z][A-Za-z]+(?:\s+[A-Z][A-Za-z]+)+)\s+\(([A-Za-z]{2,})\)/g;
        let definitionMatch;
        while((definitionMatch = definitionRegex.exec(paragraph.text)) !== null){
            const fullForm = definitionMatch[1];
            const abbreviation = definitionMatch[2].toUpperCase();
            definitions.set(fullForm.toLowerCase(), abbreviation);
            definedAbbreviations.add(abbreviation);
            if (definitionMatch[2] !== abbreviation) {
                issues.push(createSuggestion(paragraph, definitionMatch.index, definitionMatch[0].length, "abbreviation-capitals", "Use full capitals for abbreviations.", [
                    `${fullForm} (${abbreviation})`
                ]));
            }
        }
        const wordRegex = /\b[A-Za-z]{2,}\b/g;
        let wordMatch;
        while((wordMatch = wordRegex.exec(paragraph.text)) !== null){
            const token = wordMatch[0];
            const upper = token.toUpperCase();
            if (KNOWN_ABBREVIATIONS.has(upper) && token !== upper) {
                issues.push(createSuggestion(paragraph, wordMatch.index, token.length, "abbreviation-capitals", "Use full capitals for abbreviations.", [
                    upper
                ]));
            } else if (KNOWN_ABBREVIATIONS.has(upper) && token === upper && !definedAbbreviations.has(upper)) {
                issues.push(createSuggestion(paragraph, wordMatch.index, token.length, "abbreviation-first-use", "Define this abbreviation on first use with the full form followed by the abbreviation in parentheses.", [], false));
            }
        }
        for (const [fullForm, abbreviation] of Array.from(definitions)){
            const fullFormRegex = new RegExp(`\\b${escapeRegExp(fullForm)}\\b`, "gi");
            let fullFormMatch;
            while((fullFormMatch = fullFormRegex.exec(paragraph.text)) !== null){
                const following = paragraph.text.slice(fullFormMatch.index + fullFormMatch[0].length, fullFormMatch.index + fullFormMatch[0].length + abbreviation.length + 4);
                if (/^\s*\(/.test(following)) continue;
                issues.push(createSuggestion(paragraph, fullFormMatch.index, fullFormMatch[0].length, "abbreviation-consistency", `Use the defined abbreviation "${abbreviation}" after first definition.`, [
                    abbreviation
                ]));
            }
        }
    }
    return issues;
}
function isLikelyHeading(text) {
    const trimmed = text.trim();
    if (!trimmed || trimmed.length > 500) return false;
    if (/^abstract:?$/i.test(trimmed)) return true;
    if (/^[A-Z][A-Z0-9\s,;:()/-]+$/.test(trimmed) && wordCount(trimmed) > 1) return true;
    return /^(introduction|methods?|results?|discussion|conclusion|references|background|appendix)\b/i.test(trimmed);
}
function monthDateRegex(flags = "") {
    return new RegExp(`\\b(${MONTHS.join("|")})\\s+(\\d{1,2}),\\s+(\\d{4})\\b`, flags);
}
function dayMonthRegex(flags = "") {
    return new RegExp(`\\b(\\d{1,2})\\s+(${MONTHS.join("|")})\\s+(\\d{4})\\b`, flags);
}
function toUsDate(day, month, year) {
    return `${month} ${Number(day)}, ${year}`;
}
function toUkDate(month, day, year) {
    return `${Number(day)} ${month} ${year}`;
}
function countMatches(text, regex) {
    return Array.from(text.matchAll(regex)).length;
}
function escapeRegExp(text) {
    return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function mergeSuggestions(remote, local) {
    const seenRanges = new Set();
    const merged = [];
    for (const s of [
        ...remote,
        ...local
    ]){
        const rangeKey = `${s.paragraphIndex}:${s.offset}:${s.length}`;
        if (!seenRanges.has(rangeKey) && s.selectedReplacement) {
            seenRanges.add(rangeKey);
            merged.push(s);
        }
    }
    return merged;
}
function groupSuggestionsByParagraph(suggestions) {
    const grouped = new Map();
    for (const s of suggestions){
        if (!grouped.has(s.paragraphIndex)) {
            grouped.set(s.paragraphIndex, []);
        }
        grouped.get(s.paragraphIndex).push(s);
    }
    return grouped;
}
function countOccurrencesBefore(text, search, offset) {
    if (!search) return 0;
    let count = 0;
    let idx = text.indexOf(search);
    while(idx !== -1 && idx < offset){
        count++;
        idx = text.indexOf(search, idx + search.length);
    }
    return count;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/utils/errors.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AppError",
    ()=>AppError,
    "ErrorCode",
    ()=>ErrorCode,
    "getFriendlyErrorMessage",
    ()=>getFriendlyErrorMessage,
    "handleServiceError",
    ()=>handleServiceError
]);
var ErrorCode = /*#__PURE__*/ function(ErrorCode) {
    ErrorCode["WORD_NOT_FOUND"] = "WORD_NOT_FOUND";
    ErrorCode["WORD_SYNC_FAILED"] = "WORD_SYNC_FAILED";
    ErrorCode["WORD_SELECTION_FAILED"] = "WORD_SELECTION_FAILED";
    ErrorCode["WORD_REPLACEMENT_FAILED"] = "WORD_REPLACEMENT_FAILED";
    ErrorCode["PARAGRAPH_CHANGED"] = "PARAGRAPH_CHANGED";
    ErrorCode["LANGUAGETOOL_API_ERROR"] = "LANGUAGETOOL_API_ERROR";
    ErrorCode["LANGUAGETOOL_OFFLINE"] = "LANGUAGETOOL_OFFLINE";
    ErrorCode["UNEXPECTED_ERROR"] = "UNEXPECTED_ERROR";
    ErrorCode["MANUAL_REVIEW_REQUIRED"] = "MANUAL_REVIEW_REQUIRED";
    return ErrorCode;
}({});
class AppError extends Error {
    code;
    originalError;
    isOperational;
    constructor(code, message, originalError, isOperational = true){
        super(message);
        this.name = "AppError";
        this.code = code;
        this.originalError = originalError;
        this.isOperational = isOperational;
        Object.setPrototypeOf(this, AppError.prototype);
    }
}
function handleServiceError(error, defaultCode = "UNEXPECTED_ERROR") {
    if (error instanceof AppError) {
        throw error;
    }
    // Handle Office/Word specific errors
    if (error.name === "OfficeExtension.Error") {
        throw new AppError("WORD_SYNC_FAILED", "Word failed to sync. The document may have changed or is no longer accessible.", error);
    }
    // Handle network errors
    if (error instanceof TypeError && error.message === "Failed to fetch") {
        throw new AppError("LANGUAGETOOL_OFFLINE", "Unable to reach the grammar service. Please check your internet connection.", error);
    }
    const message = error instanceof Error ? error.message : String(error);
    throw new AppError(defaultCode, message, error);
}
function getFriendlyErrorMessage(error) {
    if (error instanceof AppError) {
        return error.message;
    }
    if (typeof error === "string") {
        return error;
    }
    return error?.message || "An unexpected error occurred.";
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/services/word.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "readParagraphs",
    ()=>readParagraphs,
    "replaceSuggestionText",
    ()=>replaceSuggestionText,
    "replaceSuggestionsTextBatch",
    ()=>replaceSuggestionsTextBatch,
    "selectSuggestionText",
    ()=>selectSuggestionText,
    "setSuggestionHighlights",
    ()=>setSuggestionHighlights
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$checks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/checks.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$errors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/errors.ts [app-client] (ecmascript)");
;
;
function getWordApi() {
    const word = globalThis.Word;
    if (!word?.run) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$errors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AppError"](__TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$errors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ErrorCode"].WORD_NOT_FOUND, "Open this add-in in Word to scan a document.");
    }
    return word;
}
async function readParagraphs() {
    try {
        const word = getWordApi();
        return await word.run(async (context)=>{
            const paragraphs = context.document.body.paragraphs;
            paragraphs.load("items/text");
            await context.sync();
            return paragraphs.items.map((paragraph, index)=>({
                    paragraphIndex: index,
                    text: paragraph.text.replace(/\r/g, "")
                }));
        });
    } catch (error) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$errors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["handleServiceError"])(error, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$errors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ErrorCode"].WORD_SYNC_FAILED);
    }
}
async function setSuggestionHighlights(suggestions, highlightColor) {
    if (!suggestions.length) return;
    try {
        const word = getWordApi();
        await word.run(async (context)=>{
            const paragraphs = context.document.body.paragraphs;
            paragraphs.load("items");
            await context.sync();
            const grouped = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$checks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["groupSuggestionsByParagraph"])(suggestions);
            const pending = [];
            for (const [pIdx, pSuggestions] of Array.from(grouped)){
                const paragraph = paragraphs.items[pIdx];
                if (!paragraph) continue;
                for (const s of pSuggestions){
                    const original = s.paragraphText.slice(s.offset, s.offset + s.length);
                    const matches = paragraph.search(original, {
                        matchCase: true,
                        matchWholeWord: false
                    });
                    matches.load("items");
                    pending.push({
                        s,
                        original,
                        matches
                    });
                }
            }
            if (!pending.length) return;
            await context.sync();
            for (const { s, original, matches } of pending){
                const occIdx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$checks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["countOccurrencesBefore"])(s.paragraphText, original, s.offset);
                const target = matches.items[occIdx] || matches.items[0];
                if (target) {
                    target.font.highlightColor = highlightColor;
                }
            }
            await context.sync();
        });
    } catch (error) {
        console.warn("Could not update highlights in Word.", error);
    // We don't throw here as highlighting is non-critical
    }
}
async function selectSuggestionText(suggestion) {
    try {
        const original = suggestion.paragraphText.slice(suggestion.offset, suggestion.offset + suggestion.length);
        const occIdx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$checks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["countOccurrencesBefore"])(suggestion.paragraphText, original, suggestion.offset);
        const word = getWordApi();
        await word.run(async (context)=>{
            const paragraphs = context.document.body.paragraphs;
            paragraphs.load("items");
            await context.sync();
            const paragraph = paragraphs.items[suggestion.paragraphIndex];
            if (!paragraph) throw new __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$errors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AppError"](__TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$errors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ErrorCode"].PARAGRAPH_CHANGED, "Paragraph changed. Please scan again.");
            if (!original) {
                paragraph.getRange().select();
                await context.sync();
                return;
            }
            const matches = paragraph.search(original, {
                matchCase: true,
                matchWholeWord: false
            });
            matches.load("items");
            await context.sync();
            const target = matches.items[occIdx] || matches.items[0];
            if (target) {
                target.select();
            } else {
                paragraph.getRange().select();
            }
            await context.sync();
        });
    } catch (error) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$errors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["handleServiceError"])(error, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$errors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ErrorCode"].WORD_SELECTION_FAILED);
    }
}
async function replaceSuggestionText(suggestion) {
    if (suggestion.autoFixable === false || !suggestion.selectedReplacement) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$errors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AppError"](__TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$errors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ErrorCode"].MANUAL_REVIEW_REQUIRED, "This issue needs manual review.");
    }
    try {
        const original = suggestion.paragraphText.slice(suggestion.offset, suggestion.offset + suggestion.length);
        const occIdx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$checks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["countOccurrencesBefore"])(suggestion.paragraphText, original, suggestion.offset);
        const word = getWordApi();
        await word.run(async (context)=>{
            const paragraphs = context.document.body.paragraphs;
            paragraphs.load("items");
            await context.sync();
            const paragraph = paragraphs.items[suggestion.paragraphIndex];
            if (!paragraph) throw new __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$errors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AppError"](__TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$errors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ErrorCode"].PARAGRAPH_CHANGED, "Paragraph changed. Please scan again.");
            const matches = paragraph.search(original, {
                matchCase: true,
                matchWholeWord: false
            });
            matches.load("items");
            await context.sync();
            const target = matches.items[occIdx] || matches.items[0];
            if (!target) throw new __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$errors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AppError"](__TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$errors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ErrorCode"].WORD_REPLACEMENT_FAILED, "Original text not found in the paragraph. Please scan again.");
            target.font.highlightColor = null;
            target.insertText(suggestion.selectedReplacement, word.InsertLocation.replace);
            await context.sync();
        });
    } catch (error) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$errors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["handleServiceError"])(error, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$errors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ErrorCode"].WORD_REPLACEMENT_FAILED);
    }
}
async function replaceSuggestionsTextBatch(suggestions) {
    const fixableSuggestions = suggestions.filter((s)=>s.autoFixable !== false && s.selectedReplacement);
    if (!fixableSuggestions.length) return;
    try {
        const word = getWordApi();
        const grouped = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$checks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["groupSuggestionsByParagraph"])([
            ...fixableSuggestions
        ].sort((a, b)=>{
            if (a.paragraphIndex !== b.paragraphIndex) return a.paragraphIndex - b.paragraphIndex;
            // Replace backwards in the same paragraph to preserve offsets
            return b.offset - a.offset;
        }));
        await word.run(async (context)=>{
            const paragraphs = context.document.body.paragraphs;
            paragraphs.load("items");
            await context.sync();
            for (const [pIdx, pSuggestions] of Array.from(grouped)){
                const paragraph = paragraphs.items[pIdx];
                if (!paragraph) continue;
                const pending = [];
                for (const s of pSuggestions){
                    const original = s.paragraphText.slice(s.offset, s.offset + s.length);
                    const matches = paragraph.search(original, {
                        matchCase: true,
                        matchWholeWord: false
                    });
                    matches.load("items");
                    pending.push({
                        s,
                        matches,
                        occIdx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$checks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["countOccurrencesBefore"])(s.paragraphText, original, s.offset)
                    });
                }
                await context.sync();
                for (const { matches, occIdx, s } of pending){
                    const target = matches.items[occIdx] || matches.items[0];
                    if (target) {
                        target.font.highlightColor = null;
                        target.insertText(s.selectedReplacement, word.InsertLocation.replace);
                    }
                }
            }
            await context.sync();
        });
    } catch (error) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$errors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["handleServiceError"])(error, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$errors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ErrorCode"].WORD_REPLACEMENT_FAILED);
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>WritingAssistant
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
// Components
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Header.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ScorePanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ScorePanel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Tabs.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Pagination$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Pagination.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$SuggestionList$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/SuggestionList.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Settings$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Settings.tsx [app-client] (ecmascript)");
// Hooks & Services
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useScanner$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useScanner.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$word$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/word.ts [app-client] (ecmascript)");
// Constants & Types
var __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/constants/config.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
;
function WritingAssistant() {
    _s();
    const { suggestions, setSuggestions, scanning, progress, status, setStatus, latestId, startScan } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useScanner$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScanner"])();
    // Local UI state
    const [activeFilter, setActiveFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('all');
    const [currentPage, setCurrentPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [onlineEnabled, setOnlineEnabled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [language, setLanguage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("en-US");
    const autoScanStartedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    // Initialize Office
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "WritingAssistant.useEffect": ()=>{
            let cancelled = false;
            const office = globalThis.Office;
            if (!office?.onReady) {
                setStatus("Office runtime not detected.");
                return ({
                    "WritingAssistant.useEffect": ()=>{
                        cancelled = true;
                    }
                })["WritingAssistant.useEffect"];
            }
            office.onReady({
                "WritingAssistant.useEffect": ()=>{
                    if (cancelled) return;
                    const hasWordHost = typeof globalThis.Word !== 'undefined';
                    setStatus("Document connection active. Ready to scan.");
                    if (!hasWordHost) {
                        setStatus("Open this add-in in Word to scan a document.");
                        return;
                    }
                    if (autoScanStartedRef.current) return;
                    autoScanStartedRef.current = true;
                    // Auto-start once on load only when the Word host is available.
                    void startScan(onlineEnabled, language);
                }
            }["WritingAssistant.useEffect"]);
            return ({
                "WritingAssistant.useEffect": ()=>{
                    cancelled = true;
                }
            })["WritingAssistant.useEffect"];
        }
    }["WritingAssistant.useEffect"], [
        language,
        onlineEnabled,
        setStatus,
        startScan
    ]);
    // --- Computed State ---
    const filteredSuggestions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "WritingAssistant.useMemo[filteredSuggestions]": ()=>{
            return suggestions.filter({
                "WritingAssistant.useMemo[filteredSuggestions]": (s)=>activeFilter === 'all' || s.type === activeFilter
            }["WritingAssistant.useMemo[filteredSuggestions]"]);
        }
    }["WritingAssistant.useMemo[filteredSuggestions]"], [
        suggestions,
        activeFilter
    ]);
    const counts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "WritingAssistant.useMemo[counts]": ()=>{
            return suggestions.reduce({
                "WritingAssistant.useMemo[counts]": (acc, s)=>{
                    acc.all += 1;
                    if (s.type === 'style') acc.style += 1;
                    if (s.type === 'spelling') acc.spelling += 1;
                    if (s.type === 'grammar') acc.grammar += 1;
                    return acc;
                }
            }["WritingAssistant.useMemo[counts]"], {
                all: 0,
                style: 0,
                spelling: 0,
                grammar: 0
            });
        }
    }["WritingAssistant.useMemo[counts]"], [
        suggestions
    ]);
    const visibleSuggestions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "WritingAssistant.useMemo[visibleSuggestions]": ()=>{
            const start = (currentPage - 1) * __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SUGGESTIONS_PAGE_SIZE"];
            return filteredSuggestions.slice(start, start + __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SUGGESTIONS_PAGE_SIZE"]);
        }
    }["WritingAssistant.useMemo[visibleSuggestions]"], [
        filteredSuggestions,
        currentPage
    ]);
    const visibleFixableCount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "WritingAssistant.useMemo[visibleFixableCount]": ()=>visibleSuggestions.filter({
                "WritingAssistant.useMemo[visibleFixableCount]": (s)=>s.autoFixable !== false && s.selectedReplacement
            }["WritingAssistant.useMemo[visibleFixableCount]"]).length
    }["WritingAssistant.useMemo[visibleFixableCount]"], [
        visibleSuggestions
    ]);
    const pageCount = Math.max(1, Math.ceil(filteredSuggestions.length / __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SUGGESTIONS_PAGE_SIZE"]));
    const score = suggestions.length ? Math.max(0, 100 - counts.all * 7) : "--";
    // Reset pagination when filter changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "WritingAssistant.useEffect": ()=>{
            setCurrentPage(1);
        }
    }["WritingAssistant.useEffect"], [
        activeFilter
    ]);
    // --- Handlers ---
    const handleAccept = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "WritingAssistant.useCallback[handleAccept]": async (id, replacement)=>{
            const suggestion = suggestions.find({
                "WritingAssistant.useCallback[handleAccept].suggestion": (s)=>s.id === id
            }["WritingAssistant.useCallback[handleAccept].suggestion"]);
            if (!suggestion) return;
            if (suggestion.autoFixable === false) {
                setStatus("This issue needs manual review.");
                return;
            }
            const suggestionToApply = replacement ? {
                ...suggestion,
                selectedReplacement: replacement
            } : suggestion;
            try {
                setStatus("Applying change...");
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$word$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["replaceSuggestionText"])(suggestionToApply);
                setSuggestions({
                    "WritingAssistant.useCallback[handleAccept]": (prev)=>prev.filter({
                            "WritingAssistant.useCallback[handleAccept]": (s)=>s.id !== id
                        }["WritingAssistant.useCallback[handleAccept]"])
                }["WritingAssistant.useCallback[handleAccept]"]);
                setStatus("Change applied successfully.");
            } catch (err) {
                setStatus(err.message || "Failed to apply change.");
            }
        }
    }["WritingAssistant.useCallback[handleAccept]"], [
        suggestions,
        setSuggestions,
        setStatus
    ]);
    const handleDismiss = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "WritingAssistant.useCallback[handleDismiss]": async (id)=>{
            const suggestion = suggestions.find({
                "WritingAssistant.useCallback[handleDismiss].suggestion": (s)=>s.id === id
            }["WritingAssistant.useCallback[handleDismiss].suggestion"]);
            if (suggestion) {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$word$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setSuggestionHighlights"])([
                    suggestion
                ], null);
            }
            setSuggestions({
                "WritingAssistant.useCallback[handleDismiss]": (prev)=>prev.filter({
                        "WritingAssistant.useCallback[handleDismiss]": (s)=>s.id !== id
                    }["WritingAssistant.useCallback[handleDismiss]"])
            }["WritingAssistant.useCallback[handleDismiss]"]);
        }
    }["WritingAssistant.useCallback[handleDismiss]"], [
        suggestions,
        setSuggestions
    ]);
    const handleSelectReplacement = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "WritingAssistant.useCallback[handleSelectReplacement]": (id, replacement)=>{
            setSuggestions({
                "WritingAssistant.useCallback[handleSelectReplacement]": (prev)=>prev.map({
                        "WritingAssistant.useCallback[handleSelectReplacement]": (s)=>s.id === id ? {
                                ...s,
                                selectedReplacement: replacement
                            } : s
                    }["WritingAssistant.useCallback[handleSelectReplacement]"])
            }["WritingAssistant.useCallback[handleSelectReplacement]"]);
            void handleAccept(id, replacement);
        }
    }["WritingAssistant.useCallback[handleSelectReplacement]"], [
        setSuggestions,
        handleAccept
    ]);
    const handleAcceptVisible = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "WritingAssistant.useCallback[handleAcceptVisible]": async ()=>{
            const fixableSuggestions = visibleSuggestions.filter({
                "WritingAssistant.useCallback[handleAcceptVisible].fixableSuggestions": (s)=>s.autoFixable !== false && s.selectedReplacement
            }["WritingAssistant.useCallback[handleAcceptVisible].fixableSuggestions"]);
            if (!fixableSuggestions.length) return;
            try {
                setStatus(`Processing ${fixableSuggestions.length} items...`);
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$word$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["replaceSuggestionsTextBatch"])(fixableSuggestions);
                const visibleIds = new Set(fixableSuggestions.map({
                    "WritingAssistant.useCallback[handleAcceptVisible]": (s)=>s.id
                }["WritingAssistant.useCallback[handleAcceptVisible]"]));
                setSuggestions({
                    "WritingAssistant.useCallback[handleAcceptVisible]": (prev)=>prev.filter({
                            "WritingAssistant.useCallback[handleAcceptVisible]": (s)=>!visibleIds.has(s.id)
                        }["WritingAssistant.useCallback[handleAcceptVisible]"])
                }["WritingAssistant.useCallback[handleAcceptVisible]"]);
                setStatus("Batch update complete.");
            } catch (err) {
                setStatus(err.message || "Batch update failed.");
            }
        }
    }["WritingAssistant.useCallback[handleAcceptVisible]"], [
        visibleSuggestions,
        setSuggestions,
        setStatus
    ]);
    const handleDismissVisible = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "WritingAssistant.useCallback[handleDismissVisible]": async ()=>{
            if (!visibleSuggestions.length) return;
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$word$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setSuggestionHighlights"])(visibleSuggestions, null);
            const visibleIds = new Set(visibleSuggestions.map({
                "WritingAssistant.useCallback[handleDismissVisible]": (s)=>s.id
            }["WritingAssistant.useCallback[handleDismissVisible]"]));
            setSuggestions({
                "WritingAssistant.useCallback[handleDismissVisible]": (prev)=>prev.filter({
                        "WritingAssistant.useCallback[handleDismissVisible]": (s)=>!visibleIds.has(s.id)
                    }["WritingAssistant.useCallback[handleDismissVisible]"])
            }["WritingAssistant.useCallback[handleDismissVisible]"]);
        }
    }["WritingAssistant.useCallback[handleDismissVisible]"], [
        visibleSuggestions,
        setSuggestions
    ]);
    const handleFocusSuggestion = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "WritingAssistant.useCallback[handleFocusSuggestion]": async (id)=>{
            const suggestion = suggestions.find({
                "WritingAssistant.useCallback[handleFocusSuggestion].suggestion": (s)=>s.id === id
            }["WritingAssistant.useCallback[handleFocusSuggestion].suggestion"]);
            if (!suggestion) return;
            try {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$word$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["selectSuggestionText"])(suggestion);
                setStatus(`Selected issue in paragraph ${suggestion.paragraphIndex + 1}.`);
            } catch (err) {
                setStatus(err.message || "Unable to select this issue in Word.");
            }
        }
    }["WritingAssistant.useCallback[handleFocusSuggestion]"], [
        suggestions,
        setStatus
    ]);
    // --- Render ---
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "app-shell",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Header"], {
                scanning: scanning,
                onScan: ()=>startScan(onlineEnabled, language)
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 191,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ScorePanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScorePanel"], {
                score: score,
                statusText: status,
                scanning: scanning,
                progress: progress
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 196,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "quick-actions",
                "aria-label": "Suggestion actions",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "action accept",
                        type: "button",
                        disabled: visibleFixableCount === 0 || scanning,
                        onClick: handleAcceptVisible,
                        children: "Fix visible"
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 204,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "action reject",
                        type: "button",
                        disabled: visibleSuggestions.length === 0 || scanning,
                        onClick: handleDismissVisible,
                        children: "Dismiss visible"
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 212,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 203,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tabs"], {
                activeFilter: activeFilter,
                counts: counts,
                onFilterChange: setActiveFilter
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 222,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Pagination$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Pagination"], {
                currentPage: currentPage,
                pageCount: pageCount,
                totalCount: filteredSuggestions.length,
                visibleCount: visibleSuggestions.length,
                pageSize: __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SUGGESTIONS_PAGE_SIZE"],
                onPageChange: setCurrentPage
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 228,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$SuggestionList$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SuggestionList"], {
                suggestions: visibleSuggestions,
                scanning: scanning,
                latestId: latestId,
                onAccept: handleAccept,
                onDismiss: handleDismiss,
                onFocusSuggestion: handleFocusSuggestion,
                onSelectReplacement: handleSelectReplacement
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 237,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Settings$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Settings"], {
                onlineEnabled: onlineEnabled,
                onOnlineToggle: setOnlineEnabled,
                language: language,
                onLanguageChange: setLanguage
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 247,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/page.tsx",
        lineNumber: 190,
        columnNumber: 5
    }, this);
}
_s(WritingAssistant, "V/o5HBDMuE67/bTD0zKChrJrNAI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useScanner$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScanner"]
    ];
});
_c = WritingAssistant;
var _c;
__turbopack_context__.k.register(_c, "WritingAssistant");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ "use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch(type){
            case REACT_FRAGMENT_TYPE:
                return "Fragment";
            case REACT_PROFILER_TYPE:
                return "Profiler";
            case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
            case REACT_SUSPENSE_TYPE:
                return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
                return "Activity";
            case REACT_VIEW_TRANSITION_TYPE:
                return "ViewTransition";
        }
        if ("object" === typeof type) switch("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof){
            case REACT_PORTAL_TYPE:
                return "Portal";
            case REACT_CONTEXT_TYPE:
                return type.displayName || "Context";
            case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
            case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                    return getComponentNameFromType(type(innerType));
                } catch (x) {}
        }
        return null;
    }
    function testStringCoercion(value) {
        return "" + value;
    }
    function checkKeyStringCoercion(value) {
        try {
            testStringCoercion(value);
            var JSCompiler_inline_result = !1;
        } catch (e) {
            JSCompiler_inline_result = !0;
        }
        if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
            return testStringCoercion(value);
        }
    }
    function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE) return "<...>";
        try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
        } catch (x) {
            return "<...>";
        }
    }
    function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
        return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return !1;
        }
        return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
        }
        warnAboutAccessingKey.isReactWarning = !0;
        Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: !0
        });
    }
    function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, props, owner, debugStack, debugTask) {
        var refProp = props.ref;
        type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type: type,
            key: key,
            props: props,
            _owner: owner
        };
        null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
            enumerable: !1,
            get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", {
            enumerable: !1,
            value: null
        });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: null
        });
        Object.defineProperty(type, "_debugStack", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
    }
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
        var children = config.children;
        if (void 0 !== children) if (isStaticChildren) if (isArrayImpl(children)) {
            for(isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)validateChildKeys(children[isStaticChildren]);
            Object.freeze && Object.freeze(children);
        } else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
        else validateChildKeys(children);
        if (hasOwnProperty.call(config, "key")) {
            children = getComponentNameFromType(type);
            var keys = Object.keys(config).filter(function(k) {
                return "key" !== k;
            });
            isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
            didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', isStaticChildren, children, keys, children), didWarnAboutKeySpread[children + isStaticChildren] = !0);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
            maybeKey = {};
            for(var propName in config)"key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(maybeKey, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
        return ReactElement(type, children, maybeKey, getOwner(), debugStack, debugTask);
    }
    function validateChildKeys(node) {
        isValidElement(node) ? node._store && (node._store.validated = 1) : "object" === typeof node && null !== node && node.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node._payload.status ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
    }
    function isValidElement(object) {
        return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    var React = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_VIEW_TRANSITION_TYPE = Symbol.for("react.view_transition"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
        return null;
    };
    React = {
        react_stack_bottom_frame: function(callStackForError) {
            return callStackForError();
        }
    };
    var specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = React.react_stack_bottom_frame.bind(React, UnknownOwner)();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutKeySpread = {};
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.jsxDEV = function(type, config, maybeKey, isStaticChildren) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        if (trackActualOwner) {
            var previousStackTraceLimit = Error.stackTraceLimit;
            Error.stackTraceLimit = 10;
            var debugStackDEV = Error("react-stack-top-frame");
            Error.stackTraceLimit = previousStackTraceLimit;
        } else debugStackDEV = unknownOwnerDebugStack;
        return jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStackDEV, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
    };
}();
}),
"[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)");
}
}),
]);

//# sourceMappingURL=_0z03zb5._.js.map