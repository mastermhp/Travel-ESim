module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[project]/Downloads/travel-e-sim-system/hooks/use-toast.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "reducer",
    ()=>reducer,
    "toast",
    ()=>toast,
    "useToast",
    ()=>useToast
]);
// Inspired by react-hot-toast library
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-e-sim-system/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1000000;
const actionTypes = {
    ADD_TOAST: 'ADD_TOAST',
    UPDATE_TOAST: 'UPDATE_TOAST',
    DISMISS_TOAST: 'DISMISS_TOAST',
    REMOVE_TOAST: 'REMOVE_TOAST'
};
let count = 0;
function genId() {
    count = (count + 1) % Number.MAX_SAFE_INTEGER;
    return count.toString();
}
const toastTimeouts = new Map();
const addToRemoveQueue = (toastId)=>{
    if (toastTimeouts.has(toastId)) {
        return;
    }
    const timeout = setTimeout(()=>{
        toastTimeouts.delete(toastId);
        dispatch({
            type: 'REMOVE_TOAST',
            toastId: toastId
        });
    }, TOAST_REMOVE_DELAY);
    toastTimeouts.set(toastId, timeout);
};
const reducer = (state, action)=>{
    switch(action.type){
        case 'ADD_TOAST':
            return {
                ...state,
                toasts: [
                    action.toast,
                    ...state.toasts
                ].slice(0, TOAST_LIMIT)
            };
        case 'UPDATE_TOAST':
            return {
                ...state,
                toasts: state.toasts.map((t)=>t.id === action.toast.id ? {
                        ...t,
                        ...action.toast
                    } : t)
            };
        case 'DISMISS_TOAST':
            {
                const { toastId } = action;
                // ! Side effects ! - This could be extracted into a dismissToast() action,
                // but I'll keep it here for simplicity
                if (toastId) {
                    addToRemoveQueue(toastId);
                } else {
                    state.toasts.forEach((toast)=>{
                        addToRemoveQueue(toast.id);
                    });
                }
                return {
                    ...state,
                    toasts: state.toasts.map((t)=>t.id === toastId || toastId === undefined ? {
                            ...t,
                            open: false
                        } : t)
                };
            }
        case 'REMOVE_TOAST':
            if (action.toastId === undefined) {
                return {
                    ...state,
                    toasts: []
                };
            }
            return {
                ...state,
                toasts: state.toasts.filter((t)=>t.id !== action.toastId)
            };
    }
};
const listeners = [];
let memoryState = {
    toasts: []
};
function dispatch(action) {
    memoryState = reducer(memoryState, action);
    listeners.forEach((listener)=>{
        listener(memoryState);
    });
}
function toast({ ...props }) {
    const id = genId();
    const update = (props)=>dispatch({
            type: 'UPDATE_TOAST',
            toast: {
                ...props,
                id
            }
        });
    const dismiss = ()=>dispatch({
            type: 'DISMISS_TOAST',
            toastId: id
        });
    dispatch({
        type: 'ADD_TOAST',
        toast: {
            ...props,
            id,
            open: true,
            onOpenChange: (open)=>{
                if (!open) dismiss();
            }
        }
    });
    return {
        id: id,
        dismiss,
        update
    };
}
function useToast() {
    const [state, setState] = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](memoryState);
    __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        listeners.push(setState);
        return ()=>{
            const index = listeners.indexOf(setState);
            if (index > -1) {
                listeners.splice(index, 1);
            }
        };
    }, [
        state
    ]);
    return {
        ...state,
        toast,
        dismiss: (toastId)=>dispatch({
                type: 'DISMISS_TOAST',
                toastId
            })
    };
}
;
}),
"[project]/Downloads/travel-e-sim-system/lib/utils.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-e-sim-system/node_modules/clsx/dist/clsx.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-e-sim-system/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-ssr] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
}),
"[project]/Downloads/travel-e-sim-system/components/ui/toast.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Toast",
    ()=>Toast,
    "ToastAction",
    ()=>ToastAction,
    "ToastClose",
    ()=>ToastClose,
    "ToastDescription",
    ()=>ToastDescription,
    "ToastProvider",
    ()=>ToastProvider,
    "ToastTitle",
    ()=>ToastTitle,
    "ToastViewport",
    ()=>ToastViewport
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-e-sim-system/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-e-sim-system/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-e-sim-system/node_modules/@radix-ui/react-toast/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-e-sim-system/node_modules/class-variance-authority/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/Downloads/travel-e-sim-system/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-e-sim-system/lib/utils.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
const ToastProvider = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Provider"];
const ToastViewport = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Viewport"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Downloads/travel-e-sim-system/components/ui/toast.tsx",
        lineNumber: 16,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
ToastViewport.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Viewport"].displayName;
const toastVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cva"])('group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full', {
    variants: {
        variant: {
            default: 'border bg-background text-foreground',
            destructive: 'destructive group border-destructive bg-destructive text-destructive-foreground'
        }
    },
    defaultVariants: {
        variant: 'default'
    }
});
const Toast = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](({ className, variant, ...props }, ref)=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Root"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])(toastVariants({
            variant
        }), className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Downloads/travel-e-sim-system/components/ui/toast.tsx",
        lineNumber: 49,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
});
Toast.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Root"].displayName;
const ToastAction = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Action"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Downloads/travel-e-sim-system/components/ui/toast.tsx",
        lineNumber: 62,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
ToastAction.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Action"].displayName;
const ToastClose = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Close"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600', className),
        "toast-close": "",
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
            className: "h-4 w-4"
        }, void 0, false, {
            fileName: "[project]/Downloads/travel-e-sim-system/components/ui/toast.tsx",
            lineNumber: 86,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/Downloads/travel-e-sim-system/components/ui/toast.tsx",
        lineNumber: 77,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
ToastClose.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Close"].displayName;
const ToastTitle = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Title"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('text-sm font-semibold', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Downloads/travel-e-sim-system/components/ui/toast.tsx",
        lineNumber: 95,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
ToastTitle.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Title"].displayName;
const ToastDescription = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Description"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('text-sm opacity-90', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Downloads/travel-e-sim-system/components/ui/toast.tsx",
        lineNumber: 107,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
ToastDescription.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Description"].displayName;
;
}),
"[project]/Downloads/travel-e-sim-system/components/ui/toaster.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Toaster",
    ()=>Toaster
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-e-sim-system/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-e-sim-system/hooks/use-toast.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$components$2f$ui$2f$toast$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-e-sim-system/components/ui/toast.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
function Toaster() {
    const { toasts } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useToast"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$components$2f$ui$2f$toast$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ToastProvider"], {
        children: [
            toasts.map(function({ id, title, description, action, ...props }) {
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$components$2f$ui$2f$toast$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Toast"], {
                    ...props,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid gap-1",
                            children: [
                                title && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$components$2f$ui$2f$toast$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ToastTitle"], {
                                    children: title
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/travel-e-sim-system/components/ui/toaster.tsx",
                                    lineNumber: 22,
                                    columnNumber: 25
                                }, this),
                                description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$components$2f$ui$2f$toast$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ToastDescription"], {
                                    children: description
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/travel-e-sim-system/components/ui/toaster.tsx",
                                    lineNumber: 24,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/travel-e-sim-system/components/ui/toaster.tsx",
                            lineNumber: 21,
                            columnNumber: 13
                        }, this),
                        action,
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$components$2f$ui$2f$toast$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ToastClose"], {}, void 0, false, {
                            fileName: "[project]/Downloads/travel-e-sim-system/components/ui/toaster.tsx",
                            lineNumber: 28,
                            columnNumber: 13
                        }, this)
                    ]
                }, id, true, {
                    fileName: "[project]/Downloads/travel-e-sim-system/components/ui/toaster.tsx",
                    lineNumber: 20,
                    columnNumber: 11
                }, this);
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$components$2f$ui$2f$toast$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ToastViewport"], {}, void 0, false, {
                fileName: "[project]/Downloads/travel-e-sim-system/components/ui/toaster.tsx",
                lineNumber: 32,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/travel-e-sim-system/components/ui/toaster.tsx",
        lineNumber: 17,
        columnNumber: 5
    }, this);
}
}),
"[project]/Downloads/travel-e-sim-system/components/ui/button.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>Button,
    "buttonVariants",
    ()=>buttonVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-e-sim-system/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-e-sim-system/node_modules/@radix-ui/react-slot/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-e-sim-system/node_modules/class-variance-authority/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-e-sim-system/lib/utils.ts [app-ssr] (ecmascript)");
;
;
;
;
const buttonVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cva"])("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive", {
    variants: {
        variant: {
            default: 'bg-primary text-primary-foreground hover:bg-primary/90',
            destructive: 'bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
            outline: 'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
            secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
            ghost: 'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
            link: 'text-primary underline-offset-4 hover:underline'
        },
        size: {
            default: 'h-9 px-4 py-2 has-[>svg]:px-3',
            sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
            lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
            icon: 'size-9',
            'icon-sm': 'size-8',
            'icon-lg': 'size-10'
        }
    },
    defaultVariants: {
        variant: 'default',
        size: 'default'
    }
});
function Button({ className, variant, size, asChild = false, ...props }) {
    const Comp = asChild ? __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Slot"] : 'button';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Comp, {
        "data-slot": "button",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])(buttonVariants({
            variant,
            size,
            className
        })),
        ...props
    }, void 0, false, {
        fileName: "[project]/Downloads/travel-e-sim-system/components/ui/button.tsx",
        lineNumber: 52,
        columnNumber: 5
    }, this);
}
;
}),
"[project]/Downloads/travel-e-sim-system/components/ui/card.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Card",
    ()=>Card,
    "CardAction",
    ()=>CardAction,
    "CardContent",
    ()=>CardContent,
    "CardDescription",
    ()=>CardDescription,
    "CardFooter",
    ()=>CardFooter,
    "CardHeader",
    ()=>CardHeader,
    "CardTitle",
    ()=>CardTitle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-e-sim-system/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-e-sim-system/lib/utils.ts [app-ssr] (ecmascript)");
;
;
function Card({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Downloads/travel-e-sim-system/components/ui/card.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
function CardHeader({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-header",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Downloads/travel-e-sim-system/components/ui/card.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
function CardTitle({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-title",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('leading-none font-semibold', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Downloads/travel-e-sim-system/components/ui/card.tsx",
        lineNumber: 33,
        columnNumber: 5
    }, this);
}
function CardDescription({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-description",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('text-muted-foreground text-sm', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Downloads/travel-e-sim-system/components/ui/card.tsx",
        lineNumber: 43,
        columnNumber: 5
    }, this);
}
function CardAction({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-action",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('col-start-2 row-span-2 row-start-1 self-start justify-self-end', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Downloads/travel-e-sim-system/components/ui/card.tsx",
        lineNumber: 53,
        columnNumber: 5
    }, this);
}
function CardContent({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-content",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('px-6', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Downloads/travel-e-sim-system/components/ui/card.tsx",
        lineNumber: 66,
        columnNumber: 5
    }, this);
}
function CardFooter({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-footer",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('flex items-center px-6 [.border-t]:pt-6', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Downloads/travel-e-sim-system/components/ui/card.tsx",
        lineNumber: 76,
        columnNumber: 5
    }, this);
}
;
}),
"[project]/Downloads/travel-e-sim-system/components/whatsapp-chatbot.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WhatsAppChatbot",
    ()=>WhatsAppChatbot
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-e-sim-system/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-e-sim-system/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__ = __turbopack_context__.i("[project]/Downloads/travel-e-sim-system/node_modules/lucide-react/dist/esm/icons/message-circle.js [app-ssr] (ecmascript) <export default as MessageCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/Downloads/travel-e-sim-system/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__ = __turbopack_context__.i("[project]/Downloads/travel-e-sim-system/node_modules/lucide-react/dist/esm/icons/send.js [app-ssr] (ecmascript) <export default as Send>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__ = __turbopack_context__.i("[project]/Downloads/travel-e-sim-system/node_modules/lucide-react/dist/esm/icons/phone.js [app-ssr] (ecmascript) <export default as Phone>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__ = __turbopack_context__.i("[project]/Downloads/travel-e-sim-system/node_modules/lucide-react/dist/esm/icons/mail.js [app-ssr] (ecmascript) <export default as Mail>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/Downloads/travel-e-sim-system/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-ssr] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/Downloads/travel-e-sim-system/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-ssr] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-e-sim-system/components/ui/button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-e-sim-system/components/ui/card.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
function WhatsAppChatbot() {
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showInitialOptions, setShowInitialOptions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [isVisible, setIsVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const whatsappNumber = "+4670271587";
    const supportEmail = "support@esimconnect.com";
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setTimeout(()=>setIsVisible(true), 500);
    }, []);
    const quickReplies = [
        {
            id: 1,
            text: "How do I activate my eSIM?",
            message: "Hello! I need help activating my eSIM. Can you guide me through the process?",
            icon: "📱",
            gradient: "from-blue-500 to-cyan-500"
        },
        {
            id: 2,
            text: "Check my order status",
            message: "Hi! I would like to check the status of my order. Can you help me?",
            icon: "📦",
            gradient: "from-purple-500 to-pink-500"
        },
        {
            id: 3,
            text: "Data not working",
            message: "Hello! My eSIM data is not working. I need technical support.",
            icon: "🔧",
            gradient: "from-orange-500 to-red-500"
        },
        {
            id: 4,
            text: "Pricing & Plans",
            message: "Hi! I have questions about your pricing and available plans.",
            icon: "💰",
            gradient: "from-green-500 to-emerald-500"
        },
        {
            id: 5,
            text: "Become an Agent",
            message: "Hello! I'm interested in becoming an agent. Can you provide more information?",
            icon: "🤝",
            gradient: "from-indigo-500 to-blue-500"
        },
        {
            id: 6,
            text: "Talk to Support",
            message: "Hi! I need to speak with a support representative.",
            icon: "💬",
            gradient: "from-teal-500 to-cyan-500"
        }
    ];
    const sendWhatsAppMessage = (message)=>{
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/${whatsappNumber.replace(/\+/g, "")}?text=${encodedMessage}`, "_blank");
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            !isOpen && isVisible && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-8 duration-500",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 -z-10",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0 rounded-full bg-[#25D366] opacity-20 animate-ping"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/travel-e-sim-system/components/whatsapp-chatbot.jsx",
                                lineNumber: 76,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-pulse"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/travel-e-sim-system/components/whatsapp-chatbot.jsx",
                                lineNumber: 77,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/travel-e-sim-system/components/whatsapp-chatbot.jsx",
                        lineNumber: 75,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                        onClick: ()=>setIsOpen(true),
                        className: "relative h-16 w-16 rounded-full shadow-2xl bg-gradient-to-br from-[#25D366] to-[#20BA5A] hover:from-[#20BA5A] hover:to-[#1DA851] transition-all duration-300 hover:scale-110 group border-4 border-white",
                        size: "icon",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__["MessageCircle"], {
                                className: "h-7 w-7 text-white group-hover:rotate-12 transition-transform duration-300"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/travel-e-sim-system/components/whatsapp-chatbot.jsx",
                                lineNumber: 85,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "absolute -top-1 -right-1 flex h-5 w-5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/travel-e-sim-system/components/whatsapp-chatbot.jsx",
                                        lineNumber: 89,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "relative inline-flex rounded-full h-5 w-5 bg-red-500 border-2 border-white"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/travel-e-sim-system/components/whatsapp-chatbot.jsx",
                                        lineNumber: 90,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/travel-e-sim-system/components/whatsapp-chatbot.jsx",
                                lineNumber: 88,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                className: "absolute -top-2 -left-2 h-4 w-4 text-yellow-400 animate-pulse"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/travel-e-sim-system/components/whatsapp-chatbot.jsx",
                                lineNumber: 94,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/travel-e-sim-system/components/whatsapp-chatbot.jsx",
                        lineNumber: 80,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute bottom-full right-0 mb-3 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-gray-900 text-white text-sm px-4 py-2 rounded-lg shadow-lg",
                            children: [
                                "Need help? Chat with us!",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute top-full right-4 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-gray-900"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/travel-e-sim-system/components/whatsapp-chatbot.jsx",
                                    lineNumber: 101,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/travel-e-sim-system/components/whatsapp-chatbot.jsx",
                            lineNumber: 99,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Downloads/travel-e-sim-system/components/whatsapp-chatbot.jsx",
                        lineNumber: 98,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/travel-e-sim-system/components/whatsapp-chatbot.jsx",
                lineNumber: 73,
                columnNumber: 9
            }, this),
            isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-8 zoom-in-95 duration-300",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                    className: "w-[400px] h-[650px] shadow-2xl flex flex-col overflow-hidden border-0 ring-1 ring-gray-200",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardHeader"], {
                            className: "relative bg-gradient-to-br from-[#25D366] via-[#22C55E] to-[#20BA5A] text-white p-5 overflow-hidden",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute inset-0 opacity-10",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute top-0 left-0 w-40 h-40 bg-white rounded-full blur-3xl animate-pulse"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/travel-e-sim-system/components/whatsapp-chatbot.jsx",
                                            lineNumber: 113,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute bottom-0 right-0 w-32 h-32 bg-white rounded-full blur-2xl animate-pulse delay-75"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/travel-e-sim-system/components/whatsapp-chatbot.jsx",
                                            lineNumber: 114,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/travel-e-sim-system/components/whatsapp-chatbot.jsx",
                                    lineNumber: 112,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative flex items-center justify-between",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "relative h-12 w-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center ring-2 ring-white/30 animate-pulse",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__["MessageCircle"], {
                                                            className: "h-6 w-6 text-white"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/travel-e-sim-system/components/whatsapp-chatbot.jsx",
                                                            lineNumber: 120,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "absolute -bottom-1 -right-1 h-4 w-4 bg-green-400 rounded-full border-2 border-white"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/travel-e-sim-system/components/whatsapp-chatbot.jsx",
                                                            lineNumber: 121,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Downloads/travel-e-sim-system/components/whatsapp-chatbot.jsx",
                                                    lineNumber: 119,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardTitle"], {
                                                            className: "text-lg font-bold",
                                                            children: "Travel Esim Support"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/travel-e-sim-system/components/whatsapp-chatbot.jsx",
                                                            lineNumber: 124,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xs text-white/90 flex items-center gap-1",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "inline-block w-2 h-2 bg-green-300 rounded-full animate-pulse"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Downloads/travel-e-sim-system/components/whatsapp-chatbot.jsx",
                                                                    lineNumber: 126,
                                                                    columnNumber: 23
                                                                }, this),
                                                                "Online - We reply instantly"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Downloads/travel-e-sim-system/components/whatsapp-chatbot.jsx",
                                                            lineNumber: 125,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Downloads/travel-e-sim-system/components/whatsapp-chatbot.jsx",
                                                    lineNumber: 123,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/travel-e-sim-system/components/whatsapp-chatbot.jsx",
                                            lineNumber: 118,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                            variant: "ghost",
                                            size: "icon",
                                            onClick: ()=>setIsOpen(false),
                                            className: "h-9 w-9 text-white hover:bg-white/20 hover:rotate-90 transition-all duration-300 rounded-full",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                className: "h-5 w-5"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/travel-e-sim-system/components/whatsapp-chatbot.jsx",
                                                lineNumber: 137,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/travel-e-sim-system/components/whatsapp-chatbot.jsx",
                                            lineNumber: 131,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/travel-e-sim-system/components/whatsapp-chatbot.jsx",
                                    lineNumber: 117,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/travel-e-sim-system/components/whatsapp-chatbot.jsx",
                            lineNumber: 110,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardContent"], {
                            className: "flex-1 overflow-y-auto p-5 bg-gradient-to-b from-gray-50 to-white space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-2 animate-in slide-in-from-left duration-500",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative bg-white rounded-2xl rounded-tl-none p-4 shadow-md max-w-[300px] border border-gray-100",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "absolute -left-2 top-0 w-0 h-0 border-t-[12px] border-r-[12px] border-transparent border-r-white"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/travel-e-sim-system/components/whatsapp-chatbot.jsx",
                                                lineNumber: 145,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2 mb-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "h-6 w-6 rounded-full bg-gradient-to-br from-[#25D366] to-[#20BA5A] flex items-center justify-center",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                                            className: "h-3 w-3 text-white"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/travel-e-sim-system/components/whatsapp-chatbot.jsx",
                                                            lineNumber: 149,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/travel-e-sim-system/components/whatsapp-chatbot.jsx",
                                                        lineNumber: 148,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-xs font-semibold text-gray-600",
                                                        children: "Support Bot"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/travel-e-sim-system/components/whatsapp-chatbot.jsx",
                                                        lineNumber: 151,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/travel-e-sim-system/components/whatsapp-chatbot.jsx",
                                                lineNumber: 147,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-gray-800 leading-relaxed",
                                                children: [
                                                    "Hello! Welcome to",
                                                    " ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-bold bg-gradient-to-r from-[#25D366] to-[#20BA5A] bg-clip-text text-transparent",
                                                        children: "Travel Esim"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/travel-e-sim-system/components/whatsapp-chatbot.jsx",
                                                        lineNumber: 156,
                                                        columnNumber: 21
                                                    }, this),
                                                    " ",
                                                    "support."
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/travel-e-sim-system/components/whatsapp-chatbot.jsx",
                                                lineNumber: 154,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-gray-600 mt-2",
                                                children: "How can we help you today?"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/travel-e-sim-system/components/whatsapp-chatbot.jsx",
                                                lineNumber: 161,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-gray-400 mt-3",
                                                children: "Choose a topic below:"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/travel-e-sim-system/components/whatsapp-chatbot.jsx",
                                                lineNumber: 162,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/travel-e-sim-system/components/whatsapp-chatbot.jsx",
                                        lineNumber: 144,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/travel-e-sim-system/components/whatsapp-chatbot.jsx",
                                    lineNumber: 143,
                                    columnNumber: 15
                                }, this),
                                showInitialOptions && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-2",
                                    children: quickReplies.map((reply, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "animate-in slide-in-from-right fade-in duration-500",
                                            style: {
                                                animationDelay: `${index * 75}ms`
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                variant: "outline",
                                                className: "group relative w-full justify-between text-left h-auto py-3 px-4 bg-white hover:bg-gradient-to-r hover:from-white hover:to-gray-50 border border-gray-200 hover:border-[#25D366] hover:shadow-lg transition-all duration-300 rounded-xl overflow-hidden",
                                                onClick: ()=>{
                                                    sendWhatsAppMessage(reply.message);
                                                    setShowInitialOptions(false);
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: `absolute inset-0 bg-gradient-to-r ${reply.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/travel-e-sim-system/components/whatsapp-chatbot.jsx",
                                                        lineNumber: 183,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-3 relative z-10",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "h-10 w-10 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-300",
                                                                children: reply.icon
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/travel-e-sim-system/components/whatsapp-chatbot.jsx",
                                                                lineNumber: 188,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-sm text-gray-700 font-medium",
                                                                children: reply.text
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/travel-e-sim-system/components/whatsapp-chatbot.jsx",
                                                                lineNumber: 191,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Downloads/travel-e-sim-system/components/whatsapp-chatbot.jsx",
                                                        lineNumber: 187,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                                        className: "h-4 w-4 text-gray-400 group-hover:text-[#25D366] group-hover:translate-x-1 transition-all duration-300"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/travel-e-sim-system/components/whatsapp-chatbot.jsx",
                                                        lineNumber: 194,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/travel-e-sim-system/components/whatsapp-chatbot.jsx",
                                                lineNumber: 174,
                                                columnNumber: 23
                                            }, this)
                                        }, reply.id, false, {
                                            fileName: "[project]/Downloads/travel-e-sim-system/components/whatsapp-chatbot.jsx",
                                            lineNumber: 169,
                                            columnNumber: 21
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/travel-e-sim-system/components/whatsapp-chatbot.jsx",
                                    lineNumber: 167,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-gradient-to-br from-white to-gray-50 rounded-2xl p-5 shadow-md border border-gray-100 mt-6 animate-in fade-in slide-in-from-bottom duration-700 delay-500",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2 mb-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "h-1 w-1 rounded-full bg-[#25D366]"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/travel-e-sim-system/components/whatsapp-chatbot.jsx",
                                                    lineNumber: 203,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs font-bold text-gray-700 uppercase tracking-wider",
                                                    children: "Direct Contact"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/travel-e-sim-system/components/whatsapp-chatbot.jsx",
                                                    lineNumber: 204,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/travel-e-sim-system/components/whatsapp-chatbot.jsx",
                                            lineNumber: 202,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                    variant: "outline",
                                                    className: "group w-full justify-start gap-3 h-auto py-4 bg-white hover:bg-gradient-to-r hover:from-[#25D366]/5 hover:to-transparent border-gray-200 hover:border-[#25D366] hover:shadow-md transition-all duration-300 rounded-xl",
                                                    onClick: ()=>sendWhatsAppMessage("Hello! I need support."),
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "h-10 w-10 rounded-full bg-gradient-to-br from-[#25D366] to-[#20BA5A] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__["Phone"], {
                                                                className: "h-5 w-5 text-white"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/travel-e-sim-system/components/whatsapp-chatbot.jsx",
                                                                lineNumber: 215,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/travel-e-sim-system/components/whatsapp-chatbot.jsx",
                                                            lineNumber: 214,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-left flex-1",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-sm font-semibold text-gray-800",
                                                                    children: "WhatsApp Support"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Downloads/travel-e-sim-system/components/whatsapp-chatbot.jsx",
                                                                    lineNumber: 218,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-xs text-gray-500",
                                                                    children: whatsappNumber
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Downloads/travel-e-sim-system/components/whatsapp-chatbot.jsx",
                                                                    lineNumber: 219,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Downloads/travel-e-sim-system/components/whatsapp-chatbot.jsx",
                                                            lineNumber: 217,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                                            className: "h-4 w-4 text-gray-400 group-hover:text-[#25D366] group-hover:translate-x-1 transition-all duration-300"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/travel-e-sim-system/components/whatsapp-chatbot.jsx",
                                                            lineNumber: 221,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Downloads/travel-e-sim-system/components/whatsapp-chatbot.jsx",
                                                    lineNumber: 209,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                    href: `mailto:${supportEmail}`,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                        variant: "outline",
                                                        className: "group w-full justify-start gap-3 h-auto py-4 bg-white hover:bg-gradient-to-r hover:from-blue-500/5 hover:to-transparent border-gray-200 hover:border-blue-500 hover:shadow-md transition-all duration-300 rounded-xl",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__["Mail"], {
                                                                    className: "h-5 w-5 text-white"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Downloads/travel-e-sim-system/components/whatsapp-chatbot.jsx",
                                                                    lineNumber: 231,
                                                                    columnNumber: 25
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/travel-e-sim-system/components/whatsapp-chatbot.jsx",
                                                                lineNumber: 230,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-left flex-1",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-sm font-semibold text-gray-800",
                                                                        children: "Email Support"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Downloads/travel-e-sim-system/components/whatsapp-chatbot.jsx",
                                                                        lineNumber: 234,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-xs text-gray-500",
                                                                        children: supportEmail
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Downloads/travel-e-sim-system/components/whatsapp-chatbot.jsx",
                                                                        lineNumber: 235,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Downloads/travel-e-sim-system/components/whatsapp-chatbot.jsx",
                                                                lineNumber: 233,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                                                className: "h-4 w-4 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-300"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/travel-e-sim-system/components/whatsapp-chatbot.jsx",
                                                                lineNumber: 237,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Downloads/travel-e-sim-system/components/whatsapp-chatbot.jsx",
                                                        lineNumber: 226,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/travel-e-sim-system/components/whatsapp-chatbot.jsx",
                                                    lineNumber: 225,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/travel-e-sim-system/components/whatsapp-chatbot.jsx",
                                            lineNumber: 207,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/travel-e-sim-system/components/whatsapp-chatbot.jsx",
                                    lineNumber: 201,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/travel-e-sim-system/components/whatsapp-chatbot.jsx",
                            lineNumber: 142,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-4 bg-gradient-to-t from-gray-50 to-white border-t border-gray-100",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                className: "w-full bg-gradient-to-r from-[#25D366] to-[#20BA5A] hover:from-[#20BA5A] hover:to-[#1DA851] gap-2 h-12 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 font-semibold",
                                onClick: ()=>sendWhatsAppMessage("Hello! I need help with my Travel Esim."),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__["Send"], {
                                        className: "h-5 w-5 group-hover:translate-x-1 transition-transform"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/travel-e-sim-system/components/whatsapp-chatbot.jsx",
                                        lineNumber: 249,
                                        columnNumber: 17
                                    }, this),
                                    "Start WhatsApp Chat"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/travel-e-sim-system/components/whatsapp-chatbot.jsx",
                                lineNumber: 245,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Downloads/travel-e-sim-system/components/whatsapp-chatbot.jsx",
                            lineNumber: 244,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/travel-e-sim-system/components/whatsapp-chatbot.jsx",
                    lineNumber: 109,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/Downloads/travel-e-sim-system/components/whatsapp-chatbot.jsx",
                lineNumber: 108,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true);
}
}),
"[project]/Downloads/travel-e-sim-system/lib/i18n/translations/en.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "en",
    ()=>en
]);
const en = {
    // Common
    common: {
        loading: "Loading...",
        error: "Error",
        success: "Success",
        save: "Save",
        cancel: "Cancel",
        delete: "Delete",
        edit: "Edit",
        search: "Search",
        filter: "Filter",
        viewDetails: "View Details",
        close: "Close",
        confirm: "Confirm",
        back: "Back",
        next: "Next",
        submit: "Submit",
        or: "or"
    },
    // Navigation
    nav: {
        home: "Home",
        plans: "Plans",
        about: "About",
        contact: "Contact",
        login: "Login",
        register: "Register",
        profile: "Profile",
        logout: "Logout",
        dashboard: "Dashboard"
    },
    // Homepage
    home: {
        hero: {
            badge: "Instant Activation",
            typewriterText: "Stay Connected Anywhere",
            title: "Around the World",
            subtitle: "Instant eSIM data plans for 190+ countries. No physical SIM needed. Activate in seconds and enjoy seamless global connectivity wherever you go.",
            browsePlans: "Browse Plans",
            exploreCoverage: "Explore Coverage",
            stat1Label: "Countries",
            stat2Label: "Happy Travelers",
            stat3Label: "User Rating",
            secureBadge: "Secure",
            secureDesc: "256-bit encryption",
            instantBadge: "Instant",
            instantDesc: "2 min activation"
        },
        features: {
            badge: "Why Choose Us",
            title: "Everything You Need for",
            titleHighlight: "Seamless Travel",
            subtitle: "Experience hassle-free connectivity with features designed for modern travelers",
            instant: {
                title: "Instant Activation",
                description: "Get connected in under 2 minutes. Scan QR code and start using data immediately."
            },
            countries: {
                title: "190+ Countries",
                description: "Global coverage across all continents. One platform for all your travel connectivity needs."
            },
            secure: {
                title: "Secure & Reliable",
                description: "Bank-level encryption and 99.9% uptime. Your data and privacy are protected."
            },
            affordable: {
                title: "Affordable Plans",
                description: "Competitive pricing with no hidden fees. Pay only for what you need."
            },
            management: {
                title: "Easy Management",
                description: "Manage all your eSIMs in one app. Check usage, top up, and switch plans instantly."
            },
            support: {
                title: "24/7 Support",
                description: "Round-the-clock customer support in multiple languages. We are here to help."
            }
        },
        howItWorks: {
            badge: "Simple Process",
            title: "Get Connected in",
            titleHighlight: "4 Easy Steps",
            subtitle: "From purchase to activation, we have made it incredibly simple",
            step1Title: "Choose Your Plan",
            step1Desc: "Select your destination and pick the perfect data plan for your trip duration.",
            step2Title: "Receive QR Code",
            step2Desc: "Get your eSIM QR code instantly via email or in the app after payment.",
            step3Title: "Scan & Activate",
            step3Desc: "Scan the QR code in your phone settings and activate your eSIM in seconds.",
            step4Title: "Start Roaming",
            step4Desc: "You are connected! Enjoy high-speed data wherever you travel."
        },
        countries: {
            badge: "Global Coverage",
            title: "Connect in",
            titleHighlight: "190+ Countries",
            subtitle: "From bustling cities to remote destinations, stay connected wherever your journey takes you",
            popularTitle: "Popular Destinations",
            viewAll: "View All",
            searchPlaceholder: "Search countries...",
            allRegions: "All Regions",
            showingResults: "Showing",
            country: "country",
            countries: "countries",
            plan: "plan",
            plans: "plans",
            exploreAll: "Explore All Countries",
            loadingCountries: "Loading countries..."
        },
        coverage: {
            badge: "Global Coverage",
            title: "Available in",
            titleHighlight: "190+ Countries",
            subtitle: "From bustling cities to remote destinations, stay connected everywhere",
            searchPlaceholder: "Search for a country...",
            viewAllCountries: "View All Countries"
        },
        pricing: {
            badge: "Flexible Pricing",
            title: "Choose Your",
            titleHighlight: "Perfect Plan",
            subtitle: "Affordable data plans for every type of traveler. No hidden fees, cancel anytime.",
            mostPopular: "Most Popular",
            selected: "Selected",
            selectPlan: "Select Plan",
            customPlan: "Need a custom plan? Contact our sales team",
            contactSales: "Contact Sales"
        },
        agent: {
            badge: "Agent Program",
            title: "Become an Agent,",
            titleHighlight: "Earn More",
            subtitle: "Join thousands of taxi drivers, tour guides, and entrepreneurs earning extra income by selling eSIMs to travelers.",
            earnTitle: "Earn Commission",
            earnDesc: "Make 15-25% commission on every eSIM sale you make",
            payoutsTitle: "Instant Payouts",
            payoutsDesc: "Get paid directly to your wallet or mobile money account",
            appTitle: "Easy to Use App",
            appDesc: "Sell eSIMs in seconds with our intuitive agent app",
            verifiedTitle: "Verified Agent",
            verifiedDesc: "Get official agent status and marketing materials",
            becomeAgent: "Become an Agent",
            agentLogin: "Agent Login",
            stat1: "Active Agents",
            stat2: "Paid in Commissions",
            stat3: "Countries"
        },
        testimonials: {
            badge: "Testimonials",
            title: "Loved by",
            titleHighlight: "Travelers Worldwide",
            subtitle: "See what our customers and agents have to say about their experience"
        }
    },
    // Plans page
    plans: {
        title: "Choose Your Plan",
        subtitle: "Find the perfect data plan for your journey",
        filters: {
            country: "Country",
            dataAmount: "Data Amount",
            duration: "Duration",
            all: "All"
        },
        card: {
            popular: "Popular",
            validity: "days",
            selectPlan: "Select Plan",
            details: "View Details",
            coverage: "Coverage",
            data: "Data",
            speed: "Speed"
        }
    },
    // Auth
    auth: {
        login: {
            title: "Welcome Back",
            subtitle: "Sign in to your account",
            email: "Email Address",
            phone: "Phone Number",
            password: "Password",
            loginButton: "Login",
            forgotPassword: "Forgot password?",
            noAccount: "Don't have an account?",
            signUp: "Sign up",
            emailTab: "Email",
            phoneTab: "Phone",
            requestOtp: "Request OTP",
            verifyOtp: "Verify OTP",
            enterOtp: "Enter OTP"
        },
        register: {
            title: "Create Account",
            subtitle: "Join us today",
            name: "Full Name",
            email: "Email Address",
            phone: "Phone Number",
            password: "Password",
            confirmPassword: "Confirm Password",
            registerButton: "Create Account",
            haveAccount: "Already have an account?",
            signIn: "Sign in"
        }
    },
    // Checkout
    checkout: {
        title: "Complete Your Order",
        customerInfo: "Customer Information",
        email: "Email Address",
        phone: "Phone Number",
        optional: "optional",
        orderSummary: "Order Summary",
        plan: "Plan",
        country: "Country",
        data: "Data",
        validity: "Validity",
        days: "days",
        price: "Price",
        total: "Total",
        payNow: "Pay Now",
        securePayment: "Secure payment powered by Stripe"
    },
    // Profile
    profile: {
        title: "My Profile",
        personalInfo: "Personal Information",
        name: "Name",
        email: "Email",
        phone: "Phone",
        myOrders: "My Orders",
        orderHistory: "Order History",
        noOrders: "No orders yet",
        orderId: "Order ID",
        date: "Date",
        status: "Status",
        amount: "Amount",
        viewDetails: "View Details"
    },
    // Admin
    admin: {
        dashboard: "Dashboard",
        overview: "Overview",
        orders: "Orders",
        agents: "Agents",
        plans: "Plans",
        settings: "Settings",
        totalRevenue: "Total Revenue",
        totalOrders: "Orders",
        activeAgents: "Active Agents",
        countries: "Countries",
        fromLastMonth: "from last month",
        revenueByCountry: "Revenue by Country",
        orderStatus: "Order Status",
        monthlyTrend: "Monthly Revenue Trend"
    },
    // Agent
    agent: {
        dashboard: "Agent Dashboard",
        createSale: "Create Sale",
        myOrders: "My Orders",
        earnings: "Earnings",
        wallet: "Wallet",
        requestPayout: "Request Payout",
        totalEarnings: "Total Earnings",
        availableBalance: "Available Balance",
        pendingCommission: "Pending Commission"
    },
    // Footer
    footer: {
        description: "Instant eSIM activation for global travelers. Stay connected in 190+ countries with affordable data plans.",
        contactSupport: "Contact Support",
        subscribe: "Subscribe to our newsletter",
        emailPlaceholder: "Enter your email",
        product: "Product",
        company: "Company",
        forAgents: "For Agents",
        support: "Support",
        copyright: "All rights reserved.",
        privacyPolicy: "Privacy Policy",
        termsOfService: "Terms of Service",
        cookiePolicy: "Cookie Policy",
        links: {
            coverage: "Coverage",
            pricing: "Pricing",
            howItWorks: "How It Works",
            devices: "eSIM Compatible Devices",
            about: "About Us",
            blog: "Blog",
            careers: "Careers",
            press: "Press Kit",
            becomeAgent: "Become an Agent",
            agentLogin: "Agent Login",
            agentResources: "Agent Resources",
            commission: "Commission Structure",
            helpCenter: "Help Center",
            contactUs: "Contact Us",
            faqs: "FAQs",
            installGuide: "Installation Guide"
        }
    }
};
}),
"[project]/Downloads/travel-e-sim-system/lib/i18n/translations/ar.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ar",
    ()=>ar
]);
const ar = {
    common: {
        loading: "جاري التحميل...",
        error: "خطأ",
        success: "نجاح",
        save: "حفظ",
        cancel: "إلغاء",
        delete: "حذف",
        edit: "تعديل",
        search: "بحث",
        filter: "تصفية",
        viewDetails: "عرض التفاصيل",
        close: "إغلاق",
        confirm: "تأكيد",
        back: "رجوع",
        next: "التالي",
        submit: "إرسال",
        or: "أو"
    },
    nav: {
        home: "الرئيسية",
        plans: "الخطط",
        about: "حول",
        contact: "اتصل",
        login: "تسجيل الدخول",
        register: "التسجيل",
        profile: "الملف الشخصي",
        logout: "تسجيل الخروج",
        dashboard: "لوحة التحكم"
    },
    home: {
        hero: {
            badge: "تفعيل فوري",
            typewriterText: "ابق متصلاً في أي مكان",
            title: "حول العالم",
            subtitle: "خطط بيانات eSIM فورية لأكثر من 190 دولة. لا حاجة لبطاقة SIM فعلية. قم بالتفعيل في ثوانٍ واستمتع باتصال عالمي سلس أينما ذهبت.",
            browsePlans: "تصفح الخطط",
            exploreCoverage: "استكشف التغطية",
            description: "احصل على اتصال فوري في أكثر من 150 دولة. لا حاجة لبطاقة SIM فعلية. تفعيل في ثوانٍ.",
            cta: "تصفح الخطط",
            ctaSecondary: "اعرف المزيد",
            stat1Label: "دولة",
            stat2Label: "مسافرون سعداء",
            stat3Label: "تقييم المستخدم",
            secureBadge: "آمن",
            secureDesc: "تشفير 256 بت",
            instantBadge: "فوري",
            instantDesc: "تفعيل في دقيقتين"
        },
        features: {
            badge: "لماذا تختارنا",
            title: "كل ما تحتاجه",
            titleHighlight: "للسفر السلس",
            subtitle: "استمتع باتصال خالٍ من المتاعب مع ميزات مصممة للمسافرين العصريين",
            instant: {
                title: "تفعيل فوري",
                description: "اتصل في أقل من دقيقتين. امسح رمز QR وابدأ استخدام البيانات فوراً."
            },
            global: {
                title: "تغطية عالمية",
                description: "الوصول في أكثر من 150 دولة حول العالم"
            },
            affordable: {
                title: "خطط بأسعار معقولة",
                description: "أسعار تنافسية بدون رسوم مخفية. ادفع فقط مقابل ما تحتاجه."
            },
            support: {
                title: "دعم 24/7",
                description: "دعم العملاء على مدار الساعة بلغات متعددة. نحن هنا للمساعدة."
            },
            countries: {
                title: "أكثر من 190 دولة",
                description: "تغطية عالمية عبر جميع القارات. منصة واحدة لجميع احتياجات الاتصال أثناء السفر."
            },
            management: {
                title: "إدارة سهلة",
                description: "أدر جميع بطاقات eSIM الخاصة بك في تطبيق واحد. تحقق من الاستخدام، أعد الشحن، وبدل الخطط على الفور."
            },
            secure: {
                title: "آمن وموثوق",
                description: "تشفير على مستوى البنوك ووقت تشغيل 99.9٪. بياناتك وخصوصيتك محمية."
            }
        },
        howItWorks: {
            badge: "عملية بسيطة",
            title: "اتصل في",
            titleHighlight: "4 خطوات سهلة",
            subtitle: "من الشراء إلى التفعيل، جعلنا الأمر بسيطاً بشكل لا يصدق",
            step1Title: "اختر خطتك",
            step1Desc: "حدد وجهتك واختر خطة البيانات المثالية لمدة رحلتك.",
            step2Title: "احصل على رمز QR",
            step2Desc: "احصل على رمز QR الخاص بـ eSIM فوراً عبر البريد الإلكتروني أو في التطبيق بعد الدفع.",
            step3Title: "امسح وفعّل",
            step3Desc: "امسح رمز QR في إعدادات هاتفك وفعّل eSIM في ثوانٍ.",
            step4Title: "ابدأ التجوال",
            step4Desc: "أنت متصل! استمتع ببيانات عالية السرعة أينما سافرت.",
            step1: {
                title: "اختر خطتك",
                description: "اختر من خطط البيانات المرنة لدينا"
            },
            step2: {
                title: "احصل على رمز QR",
                description: "احصل على eSIM الخاص بك على الفور عبر البريد الإلكتروني"
            },
            step3: {
                title: "امسح واتصل",
                description: "قم بالتفعيل وابدأ الاستخدام على الفور"
            }
        },
        countries: {
            badge: "تغطية عالمية",
            title: "اتصل في",
            titleHighlight: "أكثر من 190 دولة",
            subtitle: "من المدن الصاخبة إلى الوجهات النائية، ابق متصلاً أينما أخذتك رحلتك",
            popularTitle: "الوجهات الشعبية",
            viewAll: "عرض الكل",
            searchPlaceholder: "البحث عن الدول...",
            allRegions: "جميع المناطق",
            showingResults: "عرض",
            country: "دولة",
            countries: "دول",
            plan: "خطة",
            plans: "خطط",
            exploreAll: "استكشف جميع الدول",
            loadingCountries: "تحميل الدول..."
        },
        coverage: {
            badge: "تغطية عالمية",
            title: "متاح في",
            titleHighlight: "أكثر من 190 دولة",
            subtitle: "من المدن الصاخبة إلى الوجهات النائية، ابق متصلاً في كل مكان",
            searchPlaceholder: "البحث عن دولة...",
            viewAllCountries: "عرض جميع الدول"
        },
        pricing: {
            badge: "أسعار مرنة",
            title: "اختر",
            titleHighlight: "خطتك المثالية",
            subtitle: "خطط بيانات بأسعار معقولة لكل نوع من المسافرين. بدون رسوم مخفية، إلغاء في أي وقت.",
            mostPopular: "الأكثر شعبية",
            selected: "محدد",
            selectPlan: "اختر الخطة",
            customPlan: "هل تحتاج خطة مخصصة؟ اتصل بفريق المبيعات لدينا",
            contactSales: "اتصل بالمبيعات"
        },
        agent: {
            badge: "برنامج الوكلاء",
            title: "كن وكيلاً،",
            titleHighlight: "اربح أكثر",
            subtitle: "انضم إلى آلاف سائقي سيارات الأجرة والمرشدين السياحيين ورجال الأعمال الذين يكسبون دخلاً إضافياً ببيع eSIMs للمسافرين.",
            earnTitle: "اكسب عمولة",
            earnDesc: "احصل على عمولة 15-25٪ على كل عملية بيع eSIM تقوم بها",
            payoutsTitle: "دفعات فورية",
            payoutsDesc: "احصل على أموالك مباشرة إلى محفظتك أو حساب الأموال عبر الهاتف المحمول",
            appTitle: "تطبيق سهل الاستخدام",
            appDesc: "بيع eSIMs في ثوانٍ باستخدام تطبيق الوكيل البديهي الخاص بنا",
            verifiedTitle: "وكيل موثق",
            verifiedDesc: "احصل على حالة الوكيل الرسمية والمواد التسويقية",
            becomeAgent: "كن وكيلاً",
            agentLogin: "تسجيل دخول الوكيل",
            stat1: "الوكلاء النشطون",
            stat2: "المدفوعات في العمولات",
            stat3: "الدول"
        },
        testimonials: {
            badge: "شهادات",
            title: "محبوب من",
            titleHighlight: "المسافرين في جميع أنحاء العالم",
            subtitle: "انظر ما يقوله عملاؤنا ووكلاؤنا عن تجربتهم"
        }
    },
    plans: {
        title: "اختر خطتك",
        subtitle: "اعثر على خطة البيانات المثالية لرحلتك",
        filters: {
            country: "البلد",
            dataAmount: "كمية البيانات",
            duration: "المدة",
            all: "الكل"
        },
        card: {
            popular: "شائع",
            validity: "أيام",
            selectPlan: "اختر الخطة",
            details: "عرض التفاصيل",
            coverage: "التغطية",
            data: "البيانات",
            speed: "السرعة"
        }
    },
    auth: {
        login: {
            title: "مرحباً بعودتك",
            subtitle: "قم بتسجيل الدخول إلى حسابك",
            email: "عنوان البريد الإلكتروني",
            phone: "رقم الهاتف",
            password: "كلمة المرور",
            loginButton: "تسجيل الدخول",
            forgotPassword: "نسيت كلمة المرور؟",
            noAccount: "ليس لديك حساب؟",
            signUp: "سجل",
            emailTab: "البريد الإلكتروني",
            phoneTab: "الهاتف",
            requestOtp: "طلب OTP",
            verifyOtp: "تحقق من OTP",
            enterOtp: "أدخل OTP"
        },
        register: {
            title: "إنشاء حساب",
            subtitle: "انضم إلينا اليوم",
            name: "الاسم الكامل",
            email: "عنوان البريد الإلكتروني",
            phone: "رقم الهاتف",
            password: "كلمة المرور",
            confirmPassword: "تأكيد كلمة المرور",
            registerButton: "إنشاء حساب",
            haveAccount: "هل لديك حساب بالفعل؟",
            signIn: "تسجيل الدخول"
        }
    },
    checkout: {
        title: "أكمل طلبك",
        customerInfo: "معلومات العميل",
        email: "عنوان البريد الإلكتروني",
        phone: "رقم الهاتف",
        optional: "اختياري",
        orderSummary: "ملخص الطلب",
        plan: "الخطة",
        country: "البلد",
        data: "البيانات",
        validity: "الصلاحية",
        days: "أيام",
        price: "السعر",
        total: "الإجمالي",
        payNow: "ادفع الآن",
        securePayment: "دفع آمن مدعوم من Stripe"
    },
    profile: {
        title: "ملفي الشخصي",
        personalInfo: "المعلومات الشخصية",
        name: "الاسم",
        email: "البريد الإلكتروني",
        phone: "الهاتف",
        myOrders: "طلباتي",
        orderHistory: "سجل الطلبات",
        noOrders: "لا توجد طلبات بعد",
        orderId: "رقم الطلب",
        date: "التاريخ",
        status: "الحالة",
        amount: "المبلغ",
        viewDetails: "عرض التفاصيل"
    },
    admin: {
        dashboard: "لوحة التحكم",
        overview: "نظرة عامة",
        orders: "الطلبات",
        agents: "الوكلاء",
        plans: "الخطط",
        settings: "الإعدادات",
        totalRevenue: "إجمالي الإيرادات",
        totalOrders: "الطلبات",
        activeAgents: "الوكلاء النشطون",
        countries: "الدول",
        fromLastMonth: "من الشهر الماضي",
        revenueByCountry: "الإيرادات حسب البلد",
        orderStatus: "حالة الطلب",
        monthlyTrend: "اتجاه الإيرادات الشهرية"
    },
    agent: {
        dashboard: "لوحة تحكم الوكيل",
        createSale: "إنشاء عملية بيع",
        myOrders: "طلباتي",
        earnings: "الأرباح",
        wallet: "المحفظة",
        requestPayout: "طلب الدفع",
        totalEarnings: "إجمالي الأرباح",
        availableBalance: "الرصيد المتاح",
        pendingCommission: "العمولة المعلقة"
    },
    footer: {
        description: "تفعيل eSIM فوري للمسافرين العالميين. ابق متصلاً في أكثر من 190 دولة بخطط بيانات بأسعار معقولة.",
        contactSupport: "اتصل بالدعم",
        subscribe: "اشترك في نشرتنا الإخبارية",
        emailPlaceholder: "أدخل بريدك الإلكتروني",
        product: "المنتج",
        company: "الشركة",
        forAgents: "للوكلاء",
        support: "الدعم",
        copyright: "جميع الحقوق محفوظة.",
        privacyPolicy: "سياسة الخصوصية",
        termsOfService: "شروط الخدمة",
        cookiePolicy: "سياسة ملفات تعريف الارتباط",
        links: {
            coverage: "التغطية",
            pricing: "الأسعار",
            howItWorks: "كيف يعمل",
            devices: "الأجهزة المتوافقة مع eSIM",
            about: "من نحن",
            blog: "المدونة",
            careers: "الوظائف",
            press: "المطبوعات",
            becomeAgent: "كن وكيلاً",
            agentLogin: "تسجيل دخول الوكيل",
            agentResources: "موارد الوكيل",
            commission: "هيكل العمولة",
            helpCenter: "مركز المساعدة",
            contactUs: "اتصل بنا",
            faqs: "الأسئلة الشائعة",
            installGuide: "دليل التثبيت"
        }
    }
};
}),
"[project]/Downloads/travel-e-sim-system/lib/i18n/translations/fr.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "fr",
    ()=>fr
]);
const fr = {
    common: {
        loading: "Chargement...",
        error: "Erreur",
        success: "Succès",
        save: "Enregistrer",
        cancel: "Annuler",
        delete: "Supprimer",
        edit: "Modifier",
        search: "Rechercher",
        filter: "Filtrer",
        viewDetails: "Voir les détails",
        close: "Fermer",
        confirm: "Confirmer",
        back: "Retour",
        next: "Suivant",
        submit: "Soumettre",
        or: "ou"
    },
    nav: {
        home: "Accueil",
        plans: "Plans",
        about: "À propos",
        contact: "Contact",
        login: "Connexion",
        register: "S'inscrire",
        profile: "Profil",
        logout: "Déconnexion",
        dashboard: "Tableau de bord"
    },
    home: {
        hero: {
            title: "Voyagez dans le monde",
            subtitle: "Restez connecté avec l'eSIM mondiale",
            description: "Obtenez une connectivité instantanée dans plus de 150 pays. Pas besoin de carte SIM physique. Activation en quelques secondes.",
            cta: "Parcourir les plans",
            ctaSecondary: "En savoir plus"
        },
        features: {
            title: "Pourquoi choisir notre eSIM",
            instant: {
                title: "Activation instantanée",
                description: "Connectez-vous en quelques secondes avec un code QR"
            },
            global: {
                title: "Couverture mondiale",
                description: "Accès dans plus de 150 pays du monde"
            },
            affordable: {
                title: "Tarifs abordables",
                description: "Économisez jusqu'à 90% sur les frais d'itinérance"
            },
            support: {
                title: "Support 24/7",
                description: "Assistance client 24h/24 et 7j/7"
            }
        },
        howItWorks: {
            title: "Comment ça marche",
            step1: {
                title: "Choisissez votre plan",
                description: "Sélectionnez parmi nos plans de données flexibles"
            },
            step2: {
                title: "Recevez le code QR",
                description: "Obtenez votre eSIM instantanément par e-mail"
            },
            step3: {
                title: "Scannez et connectez",
                description: "Activez et commencez à utiliser immédiatement"
            }
        }
    },
    plans: {
        title: "Choisissez votre plan",
        subtitle: "Trouvez le plan de données parfait pour votre voyage",
        filters: {
            country: "Pays",
            dataAmount: "Quantité de données",
            duration: "Durée",
            all: "Tous"
        },
        card: {
            popular: "Populaire",
            validity: "jours",
            selectPlan: "Sélectionner le plan",
            details: "Voir les détails",
            coverage: "Couverture",
            data: "Données",
            speed: "Vitesse"
        }
    },
    auth: {
        login: {
            title: "Bienvenue",
            subtitle: "Connectez-vous à votre compte",
            email: "Adresse e-mail",
            phone: "Numéro de téléphone",
            password: "Mot de passe",
            loginButton: "Connexion",
            forgotPassword: "Mot de passe oublié?",
            noAccount: "Vous n'avez pas de compte?",
            signUp: "S'inscrire",
            emailTab: "E-mail",
            phoneTab: "Téléphone",
            requestOtp: "Demander OTP",
            verifyOtp: "Vérifier OTP",
            enterOtp: "Entrez OTP"
        },
        register: {
            title: "Créer un compte",
            subtitle: "Rejoignez-nous aujourd'hui",
            name: "Nom complet",
            email: "Adresse e-mail",
            phone: "Numéro de téléphone",
            password: "Mot de passe",
            confirmPassword: "Confirmer le mot de passe",
            registerButton: "Créer un compte",
            haveAccount: "Vous avez déjà un compte?",
            signIn: "Se connecter"
        }
    },
    checkout: {
        title: "Complétez votre commande",
        customerInfo: "Informations client",
        email: "Adresse e-mail",
        phone: "Numéro de téléphone",
        optional: "optionnel",
        orderSummary: "Résumé de la commande",
        plan: "Plan",
        country: "Pays",
        data: "Données",
        validity: "Validité",
        days: "jours",
        price: "Prix",
        total: "Total",
        payNow: "Payer maintenant",
        securePayment: "Paiement sécurisé par Stripe"
    },
    profile: {
        title: "Mon profil",
        personalInfo: "Informations personnelles",
        name: "Nom",
        email: "E-mail",
        phone: "Téléphone",
        myOrders: "Mes commandes",
        orderHistory: "Historique des commandes",
        noOrders: "Aucune commande pour le moment",
        orderId: "ID de commande",
        date: "Date",
        status: "Statut",
        amount: "Montant",
        viewDetails: "Voir les détails"
    },
    admin: {
        dashboard: "Tableau de bord",
        overview: "Vue d'ensemble",
        orders: "Commandes",
        agents: "Agents",
        plans: "Plans",
        settings: "Paramètres",
        totalRevenue: "Revenu total",
        totalOrders: "Commandes",
        activeAgents: "Agents actifs",
        countries: "Pays",
        fromLastMonth: "du mois dernier",
        revenueByCountry: "Revenu par pays",
        orderStatus: "Statut de la commande",
        monthlyTrend: "Tendance mensuelle des revenus"
    },
    agent: {
        dashboard: "Tableau de bord agent",
        createSale: "Créer une vente",
        myOrders: "Mes commandes",
        earnings: "Gains",
        wallet: "Portefeuille",
        requestPayout: "Demander un paiement",
        totalEarnings: "Gains totaux",
        availableBalance: "Solde disponible",
        pendingCommission: "Commission en attente"
    }
};
}),
"[project]/Downloads/travel-e-sim-system/lib/i18n/translations/es.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "es",
    ()=>es
]);
const es = {
    common: {
        loading: "Cargando...",
        error: "Error",
        success: "Éxito",
        save: "Guardar",
        cancel: "Cancelar",
        delete: "Eliminar",
        edit: "Editar",
        search: "Buscar",
        filter: "Filtrar",
        viewDetails: "Ver Detalles",
        close: "Cerrar",
        confirm: "Confirmar",
        back: "Atrás",
        next: "Siguiente",
        submit: "Enviar",
        or: "o"
    },
    nav: {
        home: "Inicio",
        plans: "Planes",
        about: "Acerca de",
        contact: "Contacto",
        login: "Iniciar Sesión",
        register: "Registrarse",
        profile: "Perfil",
        logout: "Cerrar Sesión",
        dashboard: "Panel"
    },
    home: {
        hero: {
            badge: "Activación Instantánea",
            typewriterText: "Mantente Conectado en Cualquier Lugar",
            title: "Alrededor del Mundo",
            subtitle: "Planes de datos eSIM instantáneos para más de 190 países. No se necesita SIM física. Activa en segundos y disfruta de conectividad global sin interrupciones dondequiera que vayas.",
            browsePlans: "Explorar Planes",
            exploreCoverage: "Explorar Cobertura",
            stat1Label: "Países",
            stat2Label: "Viajeros Felices",
            stat3Label: "Calificación de Usuario",
            secureBadge: "Seguro",
            secureDesc: "Cifrado de 256 bits",
            instantBadge: "Instantáneo",
            instantDesc: "Activación en 2 min"
        },
        features: {
            badge: "Por Qué Elegirnos",
            title: "Todo lo que Necesitas para",
            titleHighlight: "Viajes Sin Interrupciones",
            subtitle: "Experimenta conectividad sin complicaciones con características diseñadas para viajeros modernos",
            instant: {
                title: "Activación Instantánea",
                description: "Conéctate en menos de 2 minutos. Escanea el código QR y comienza a usar datos inmediatamente."
            },
            countries: {
                title: "Más de 190 Países",
                description: "Cobertura global en todos los continentes. Una plataforma para todas tus necesidades de conectividad de viaje."
            },
            secure: {
                title: "Seguro y Confiable",
                description: "Cifrado de nivel bancario y 99.9% de tiempo de actividad. Tus datos y privacidad están protegidos."
            },
            affordable: {
                title: "Planes Asequibles",
                description: "Precios competitivos sin tarifas ocultas. Paga solo por lo que necesitas."
            },
            management: {
                title: "Gestión Fácil",
                description: "Administra todas tus eSIMs en una aplicación. Verifica el uso, recarga y cambia de planes al instante."
            },
            support: {
                title: "Soporte 24/7",
                description: "Atención al cliente las 24 horas en múltiples idiomas. Estamos aquí para ayudar."
            }
        },
        howItWorks: {
            badge: "Proceso Simple",
            title: "Conéctate en",
            titleHighlight: "4 Pasos Fáciles",
            subtitle: "Desde la compra hasta la activación, lo hemos hecho increíblemente simple",
            step1Title: "Elige Tu Plan",
            step1Desc: "Selecciona tu destino y elige el plan de datos perfecto para la duración de tu viaje.",
            step2Title: "Recibe el Código QR",
            step2Desc: "Obtén tu código QR de eSIM instantáneamente por correo electrónico o en la aplicación después del pago.",
            step3Title: "Escanea y Activa",
            step3Desc: "Escanea el código QR en la configuración de tu teléfono y activa tu eSIM en segundos.",
            step4Title: "Comienza a Navegar",
            step4Desc: "¡Estás conectado! Disfruta de datos de alta velocidad donde sea que viajes."
        },
        countries: {
            badge: "Cobertura Global",
            title: "Conéctate en",
            titleHighlight: "Más de 190 Países",
            subtitle: "Desde ciudades bulliciosas hasta destinos remotos, mantente conectado donde sea que te lleve tu viaje",
            popularTitle: "Destinos Populares",
            viewAll: "Ver Todo",
            searchPlaceholder: "Buscar países...",
            allRegions: "Todas las Regiones",
            showingResults: "Mostrando",
            country: "país",
            countries: "países",
            plan: "plan",
            plans: "planes",
            exploreAll: "Explorar Todos los Países",
            loadingCountries: "Cargando países..."
        },
        coverage: {
            badge: "Cobertura Global",
            title: "Disponible en",
            titleHighlight: "Más de 190 Países",
            subtitle: "Desde ciudades bulliciosas hasta destinos remotos, mantente conectado en todas partes",
            searchPlaceholder: "Buscar un país...",
            viewAllCountries: "Ver Todos los Países"
        },
        pricing: {
            badge: "Precios Flexibles",
            title: "Elige Tu",
            titleHighlight: "Plan Perfecto",
            subtitle: "Planes de datos asequibles para cada tipo de viajero. Sin tarifas ocultas, cancela en cualquier momento.",
            mostPopular: "Más Popular",
            selected: "Seleccionado",
            selectPlan: "Seleccionar Plan",
            customPlan: "¿Necesitas un plan personalizado? Contacta a nuestro equipo de ventas",
            contactSales: "Contactar Ventas"
        },
        agent: {
            badge: "Programa de Agentes",
            title: "Conviértete en Agente,",
            titleHighlight: "Gana Más",
            subtitle: "Únete a miles de taxistas, guías turísticos y emprendedores que ganan ingresos adicionales vendiendo eSIMs a viajeros.",
            earnTitle: "Gana Comisión",
            earnDesc: "Gana 15-25% de comisión en cada venta de eSIM que hagas",
            payoutsTitle: "Pagos Instantáneos",
            payoutsDesc: "Recibe pagos directamente en tu billetera o cuenta de dinero móvil",
            appTitle: "Aplicación Fácil de Usar",
            appDesc: "Vende eSIMs en segundos con nuestra intuitiva aplicación para agentes",
            verifiedTitle: "Agente Verificado",
            verifiedDesc: "Obtén el estado de agente oficial y materiales de marketing",
            becomeAgent: "Conviértete en Agente",
            agentLogin: "Inicio de Sesión de Agente",
            stat1: "Agentes Activos",
            stat2: "Pagado en Comisiones",
            stat3: "Países"
        },
        testimonials: {
            badge: "Testimonios",
            title: "Amado por",
            titleHighlight: "Viajeros de Todo el Mundo",
            subtitle: "Mira lo que nuestros clientes y agentes dicen sobre su experiencia"
        }
    },
    plans: {
        title: "Elige Tu Plan",
        subtitle: "Encuentra el plan de datos perfecto para tu viaje",
        filters: {
            country: "País",
            dataAmount: "Cantidad de Datos",
            duration: "Duración",
            all: "Todos"
        },
        card: {
            popular: "Popular",
            validity: "días",
            selectPlan: "Seleccionar Plan",
            details: "Ver Detalles",
            coverage: "Cobertura",
            data: "Datos",
            speed: "Velocidad"
        }
    },
    auth: {
        login: {
            title: "Bienvenido de Nuevo",
            subtitle: "Inicia sesión en tu cuenta",
            email: "Correo Electrónico",
            phone: "Número de Teléfono",
            password: "Contraseña",
            loginButton: "Iniciar Sesión",
            forgotPassword: "¿Olvidaste tu contraseña?",
            noAccount: "¿No tienes una cuenta?",
            signUp: "Regístrate",
            emailTab: "Correo",
            phoneTab: "Teléfono",
            requestOtp: "Solicitar OTP",
            verifyOtp: "Verificar OTP",
            enterOtp: "Ingresar OTP"
        },
        register: {
            title: "Crear Cuenta",
            subtitle: "Únete a nosotros hoy",
            name: "Nombre Completo",
            email: "Correo Electrónico",
            phone: "Número de Teléfono",
            password: "Contraseña",
            confirmPassword: "Confirmar Contraseña",
            registerButton: "Crear Cuenta",
            haveAccount: "¿Ya tienes una cuenta?",
            signIn: "Iniciar sesión"
        }
    },
    checkout: {
        title: "Completa Tu Pedido",
        customerInfo: "Información del Cliente",
        email: "Correo Electrónico",
        phone: "Número de Teléfono",
        optional: "opcional",
        orderSummary: "Resumen del Pedido",
        plan: "Plan",
        country: "País",
        data: "Datos",
        validity: "Validez",
        days: "días",
        price: "Precio",
        total: "Total",
        payNow: "Pagar Ahora",
        securePayment: "Pago seguro con Stripe"
    },
    profile: {
        title: "Mi Perfil",
        personalInfo: "Información Personal",
        name: "Nombre",
        email: "Correo",
        phone: "Teléfono",
        myOrders: "Mis Pedidos",
        orderHistory: "Historial de Pedidos",
        noOrders: "Aún no hay pedidos",
        orderId: "ID de Pedido",
        date: "Fecha",
        status: "Estado",
        amount: "Monto",
        viewDetails: "Ver Detalles"
    },
    admin: {
        dashboard: "Panel de Control",
        overview: "Resumen",
        orders: "Pedidos",
        agents: "Agentes",
        plans: "Planes",
        settings: "Configuración",
        totalRevenue: "Ingresos Totales",
        totalOrders: "Pedidos",
        activeAgents: "Agentes Activos",
        countries: "Países",
        fromLastMonth: "del mes pasado",
        revenueByCountry: "Ingresos por País",
        orderStatus: "Estado del Pedido",
        monthlyTrend: "Tendencia de Ingresos Mensuales"
    },
    agent: {
        dashboard: "Panel de Agente",
        createSale: "Crear Venta",
        myOrders: "Mis Pedidos",
        earnings: "Ganancias",
        wallet: "Billetera",
        requestPayout: "Solicitar Pago",
        totalEarnings: "Ganancias Totales",
        availableBalance: "Saldo Disponible",
        pendingCommission: "Comisión Pendiente"
    },
    footer: {
        description: "Activación instantánea de eSIM para viajeros globales. Mantente conectado en más de 190 países con planes de datos asequibles.",
        contactSupport: "Contactar Soporte",
        subscribe: "Suscríbete a nuestro boletín",
        emailPlaceholder: "Ingresa tu correo",
        product: "Producto",
        company: "Empresa",
        forAgents: "Para Agentes",
        support: "Soporte",
        copyright: "Todos los derechos reservados.",
        privacyPolicy: "Política de Privacidad",
        termsOfService: "Términos de Servicio",
        cookiePolicy: "Política de Cookies",
        links: {
            coverage: "Cobertura",
            pricing: "Precios",
            howItWorks: "Cómo Funciona",
            devices: "Dispositivos Compatibles con eSIM",
            about: "Acerca de Nosotros",
            blog: "Blog",
            careers: "Carreras",
            press: "Kit de Prensa",
            becomeAgent: "Conviértete en Agente",
            agentLogin: "Inicio de Sesión de Agente",
            agentResources: "Recursos para Agentes",
            commission: "Estructura de Comisión",
            helpCenter: "Centro de Ayuda",
            contactUs: "Contáctanos",
            faqs: "Preguntas Frecuentes",
            installGuide: "Guía de Instalación"
        }
    }
};
}),
"[project]/Downloads/travel-e-sim-system/lib/i18n/translations/pt.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "pt",
    ()=>pt
]);
const pt = {
    common: {
        loading: "Carregando...",
        error: "Erro",
        success: "Sucesso",
        save: "Salvar",
        cancel: "Cancelar",
        delete: "Excluir",
        edit: "Editar",
        search: "Pesquisar",
        filter: "Filtrar",
        viewDetails: "Ver Detalhes",
        close: "Fechar",
        confirm: "Confirmar",
        back: "Voltar",
        next: "Próximo",
        submit: "Enviar",
        or: "ou"
    },
    nav: {
        home: "Início",
        plans: "Planos",
        about: "Sobre",
        contact: "Contato",
        login: "Entrar",
        register: "Registrar",
        profile: "Perfil",
        logout: "Sair",
        dashboard: "Painel"
    },
    home: {
        hero: {
            badge: "Ativação Instantânea",
            typewriterText: "Mantenha-se Conectado em Qualquer Lugar",
            title: "Ao Redor do Mundo",
            subtitle: "Planos de dados eSIM instantâneos para mais de 190 países. Não é necessário SIM físico. Ative em segundos e desfrute de conectividade global perfeita onde quer que vá.",
            browsePlans: "Explorar Planos",
            exploreCoverage: "Explorar Cobertura",
            stat1Label: "Países",
            stat2Label: "Viajantes Felizes",
            stat3Label: "Avaliação do Usuário",
            secureBadge: "Seguro",
            secureDesc: "Criptografia de 256 bits",
            instantBadge: "Instantâneo",
            instantDesc: "Ativação em 2 min"
        },
        features: {
            badge: "Por Que Nos Escolher",
            title: "Tudo o Que Você Precisa para",
            titleHighlight: "Viagens Sem Interrupções",
            subtitle: "Experimente conectividade sem complicações com recursos projetados para viajantes modernos",
            instant: {
                title: "Ativação Instantânea",
                description: "Conecte-se em menos de 2 minutos. Escaneie o código QR e comece a usar dados imediatamente."
            },
            countries: {
                title: "Mais de 190 Países",
                description: "Cobertura global em todos os continentes. Uma plataforma para todas as suas necessidades de conectividade de viagem."
            },
            secure: {
                title: "Seguro e Confiável",
                description: "Criptografia de nível bancário e 99,9% de tempo de atividade. Seus dados e privacidade estão protegidos."
            },
            affordable: {
                title: "Planos Acessíveis",
                description: "Preços competitivos sem taxas ocultas. Pague apenas pelo que você precisa."
            },
            management: {
                title: "Gerenciamento Fácil",
                description: "Gerencie todos os seus eSIMs em um aplicativo. Verifique o uso, recarregue e mude de planos instantaneamente."
            },
            support: {
                title: "Suporte 24/7",
                description: "Atendimento ao cliente 24 horas em vários idiomas. Estamos aqui para ajudar."
            }
        },
        howItWorks: {
            badge: "Processo Simples",
            title: "Conecte-se em",
            titleHighlight: "4 Passos Fáceis",
            subtitle: "Da compra à ativação, tornamos incrivelmente simples",
            step1Title: "Escolha Seu Plano",
            step1Desc: "Selecione seu destino e escolha o plano de dados perfeito para a duração da sua viagem.",
            step2Title: "Receba o Código QR",
            step2Desc: "Obtenha seu código QR eSIM instantaneamente por e-mail ou no aplicativo após o pagamento.",
            step3Title: "Escaneie e Ative",
            step3Desc: "Escaneie o código QR nas configurações do seu telefone e ative seu eSIM em segundos.",
            step4Title: "Comece a Navegar",
            step4Desc: "Você está conectado! Desfrute de dados de alta velocidade onde quer que viaje."
        },
        countries: {
            badge: "Cobertura Global",
            title: "Conecte-se em",
            titleHighlight: "Mais de 190 Países",
            subtitle: "De cidades movimentadas a destinos remotos, mantenha-se conectado onde quer que sua jornada o leve",
            popularTitle: "Destinos Populares",
            viewAll: "Ver Tudo",
            searchPlaceholder: "Pesquisar países...",
            allRegions: "Todas as Regiões",
            showingResults: "Mostrando",
            country: "país",
            countries: "países",
            plan: "plano",
            plans: "planos",
            exploreAll: "Explorar Todos os Países",
            loadingCountries: "Carregando países..."
        },
        coverage: {
            badge: "Cobertura Global",
            title: "Disponível em",
            titleHighlight: "Mais de 190 Países",
            subtitle: "De cidades movimentadas a destinos remotos, mantenha-se conectado em todos os lugares",
            searchPlaceholder: "Pesquisar um país...",
            viewAllCountries: "Ver Todos os Países"
        },
        pricing: {
            badge: "Preços Flexíveis",
            title: "Escolha Seu",
            titleHighlight: "Plano Perfeito",
            subtitle: "Planos de dados acessíveis para cada tipo de viajante. Sem taxas ocultas, cancele a qualquer momento.",
            mostPopular: "Mais Popular",
            selected: "Selecionado",
            selectPlan: "Selecionar Plano",
            customPlan: "Precisa de um plano personalizado? Entre em contato com nossa equipe de vendas",
            contactSales: "Contatar Vendas"
        },
        agent: {
            badge: "Programa de Agentes",
            title: "Torne-se um Agente,",
            titleHighlight: "Ganhe Mais",
            subtitle: "Junte-se a milhares de motoristas de táxi, guias turísticos e empreendedores que ganham renda extra vendendo eSIMs para viajantes.",
            earnTitle: "Ganhe Comissão",
            earnDesc: "Ganhe 15-25% de comissão em cada venda de eSIM que você fizer",
            payoutsTitle: "Pagamentos Instantâneos",
            payoutsDesc: "Receba diretamente em sua carteira ou conta de dinheiro móvel",
            appTitle: "Aplicativo Fácil de Usar",
            appDesc: "Venda eSIMs em segundos com nosso aplicativo intuitivo para agentes",
            verifiedTitle: "Agente Verificado",
            verifiedDesc: "Obtenha o status de agente oficial e materiais de marketing",
            becomeAgent: "Torne-se um Agente",
            agentLogin: "Login do Agente",
            stat1: "Agentes Ativos",
            stat2: "Pago em Comissões",
            stat3: "Países"
        },
        testimonials: {
            badge: "Depoimentos",
            title: "Amado por",
            titleHighlight: "Viajantes do Mundo Todo",
            subtitle: "Veja o que nossos clientes e agentes dizem sobre sua experiência"
        }
    },
    plans: {
        title: "Escolha Seu Plano",
        subtitle: "Encontre o plano de dados perfeito para sua jornada",
        filters: {
            country: "País",
            dataAmount: "Quantidade de Dados",
            duration: "Duração",
            all: "Todos"
        },
        card: {
            popular: "Popular",
            validity: "dias",
            selectPlan: "Selecionar Plano",
            details: "Ver Detalhes",
            coverage: "Cobertura",
            data: "Dados",
            speed: "Velocidade"
        }
    },
    auth: {
        login: {
            title: "Bem-vindo de Volta",
            subtitle: "Entre na sua conta",
            email: "Endereço de E-mail",
            phone: "Número de Telefone",
            password: "Senha",
            loginButton: "Entrar",
            forgotPassword: "Esqueceu a senha?",
            noAccount: "Não tem uma conta?",
            signUp: "Inscrever-se",
            emailTab: "E-mail",
            phoneTab: "Telefone",
            requestOtp: "Solicitar OTP",
            verifyOtp: "Verificar OTP",
            enterOtp: "Inserir OTP"
        },
        register: {
            title: "Criar Conta",
            subtitle: "Junte-se a nós hoje",
            name: "Nome Completo",
            email: "Endereço de E-mail",
            phone: "Número de Telefone",
            password: "Senha",
            confirmPassword: "Confirmar Senha",
            registerButton: "Criar Conta",
            haveAccount: "Já tem uma conta?",
            signIn: "Entrar"
        }
    },
    checkout: {
        title: "Complete Seu Pedido",
        customerInfo: "Informações do Cliente",
        email: "Endereço de E-mail",
        phone: "Número de Telefone",
        optional: "opcional",
        orderSummary: "Resumo do Pedido",
        plan: "Plano",
        country: "País",
        data: "Dados",
        validity: "Validade",
        days: "dias",
        price: "Preço",
        total: "Total",
        payNow: "Pagar Agora",
        securePayment: "Pagamento seguro com Stripe"
    },
    profile: {
        title: "Meu Perfil",
        personalInfo: "Informações Pessoais",
        name: "Nome",
        email: "E-mail",
        phone: "Telefone",
        myOrders: "Meus Pedidos",
        orderHistory: "Histórico de Pedidos",
        noOrders: "Ainda sem pedidos",
        orderId: "ID do Pedido",
        date: "Data",
        status: "Status",
        amount: "Valor",
        viewDetails: "Ver Detalhes"
    },
    admin: {
        dashboard: "Painel de Controle",
        overview: "Visão Geral",
        orders: "Pedidos",
        agents: "Agentes",
        plans: "Planos",
        settings: "Configurações",
        totalRevenue: "Receita Total",
        totalOrders: "Pedidos",
        activeAgents: "Agentes Ativos",
        countries: "Países",
        fromLastMonth: "do mês passado",
        revenueByCountry: "Receita por País",
        orderStatus: "Status do Pedido",
        monthlyTrend: "Tendência de Receita Mensal"
    },
    agent: {
        dashboard: "Painel do Agente",
        createSale: "Criar Venda",
        myOrders: "Meus Pedidos",
        earnings: "Ganhos",
        wallet: "Carteira",
        requestPayout: "Solicitar Pagamento",
        totalEarnings: "Ganhos Totais",
        availableBalance: "Saldo Disponível",
        pendingCommission: "Comissão Pendente"
    },
    footer: {
        description: "Ativação instantânea de eSIM para viajantes globais. Mantenha-se conectado em mais de 190 países com planos de dados acessíveis.",
        contactSupport: "Contatar Suporte",
        subscribe: "Inscreva-se em nossa newsletter",
        emailPlaceholder: "Digite seu e-mail",
        product: "Produto",
        company: "Empresa",
        forAgents: "Para Agentes",
        support: "Suporte",
        copyright: "Todos os direitos reservados.",
        privacyPolicy: "Política de Privacidade",
        termsOfService: "Termos de Serviço",
        cookiePolicy: "Política de Cookies",
        links: {
            coverage: "Cobertura",
            pricing: "Preços",
            howItWorks: "Como Funciona",
            devices: "Dispositivos Compatíveis com eSIM",
            about: "Sobre Nós",
            blog: "Blog",
            careers: "Carreiras",
            press: "Kit de Imprensa",
            becomeAgent: "Torne-se um Agente",
            agentLogin: "Login do Agente",
            agentResources: "Recursos para Agentes",
            commission: "Estrutura de Comissão",
            helpCenter: "Central de Ajuda",
            contactUs: "Fale Conosco",
            faqs: "Perguntas Frequentes",
            installGuide: "Guia de Instalação"
        }
    }
};
}),
"[project]/Downloads/travel-e-sim-system/lib/i18n/translations/zh.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "zh",
    ()=>zh
]);
const zh = {
    common: {
        loading: "加载中...",
        error: "错误",
        success: "成功",
        save: "保存",
        cancel: "取消",
        delete: "删除",
        edit: "编辑",
        search: "搜索",
        filter: "筛选",
        viewDetails: "查看详情",
        close: "关闭",
        confirm: "确认",
        back: "返回",
        next: "下一步",
        submit: "提交",
        or: "或"
    },
    nav: {
        home: "首页",
        plans: "套餐",
        about: "关于",
        contact: "联系",
        login: "登录",
        register: "注册",
        profile: "个人资料",
        logout: "退出",
        dashboard: "仪表板"
    },
    home: {
        hero: {
            badge: "即时激活",
            typewriterText: "随时随地保持连接",
            title: "环游世界",
            subtitle: "超过190个国家的即时eSIM数据套餐。无需实体SIM卡。几秒钟内激活，享受无缝全球连接。",
            browsePlans: "浏览套餐",
            exploreCoverage: "探索覆盖范围",
            stat1Label: "国家",
            stat2Label: "快乐旅行者",
            stat3Label: "用户评分",
            secureBadge: "安全",
            secureDesc: "256位加密",
            instantBadge: "即时",
            instantDesc: "2分钟激活"
        },
        features: {
            badge: "为什么选择我们",
            title: "您需要的一切",
            titleHighlight: "无缝旅行",
            subtitle: "体验为现代旅行者设计的无忧连接功能",
            instant: {
                title: "即时激活",
                description: "不到2分钟即可连接。扫描二维码立即开始使用数据。"
            },
            countries: {
                title: "190+个国家",
                description: "覆盖所有大洲。一个平台满足您所有的旅行连接需求。"
            },
            secure: {
                title: "安全可靠",
                description: "银行级加密和99.9%正常运行时间。您的数据和隐私受到保护。"
            },
            affordable: {
                title: "实惠套餐",
                description: "具有竞争力的价格，无隐藏费用。只为您需要的付费。"
            },
            management: {
                title: "轻松管理",
                description: "在一个应用中管理所有eSIM。即时查看使用情况、充值和切换套餐。"
            },
            support: {
                title: "24/7支持",
                description: "全天候多语言客户支持。我们随时为您服务。"
            }
        },
        howItWorks: {
            badge: "简单流程",
            title: "只需",
            titleHighlight: "4个简单步骤",
            subtitle: "从购买到激活，我们让一切变得极其简单",
            step1Title: "选择您的套餐",
            step1Desc: "选择您的目的地并为您的旅行期间选择完美的数据套餐。",
            step2Title: "接收二维码",
            step2Desc: "付款后立即通过电子邮件或应用程序获取您的eSIM二维码。",
            step3Title: "扫描并激活",
            step3Desc: "在手机设置中扫描二维码，几秒钟内激活您的eSIM。",
            step4Title: "开始漫游",
            step4Desc: "您已连接！无论您到哪里旅行，都能享受高速数据。"
        },
        countries: {
            badge: "全球覆盖",
            title: "连接到",
            titleHighlight: "190+个国家",
            subtitle: "从繁华都市到偏远目的地，无论您的旅程将您带到哪里，都能保持连接",
            popularTitle: "热门目的地",
            viewAll: "查看全部",
            searchPlaceholder: "搜索国家...",
            allRegions: "所有地区",
            showingResults: "显示",
            country: "国家",
            countries: "国家",
            plan: "套餐",
            plans: "套餐",
            exploreAll: "探索所有国家",
            loadingCountries: "加载国家中..."
        },
        coverage: {
            badge: "全球覆盖",
            title: "可用于",
            titleHighlight: "190+个国家",
            subtitle: "从繁华都市到偏远目的地，随处保持连接",
            searchPlaceholder: "搜索国家...",
            viewAllCountries: "查看所有国家"
        },
        pricing: {
            badge: "灵活定价",
            title: "选择您的",
            titleHighlight: "完美套餐",
            subtitle: "适合每种类型旅行者的实惠数据套餐。无隐藏费用，随时取消。",
            mostPopular: "最受欢迎",
            selected: "已选择",
            selectPlan: "选择套餐",
            customPlan: "需要定制套餐？联系我们的销售团队",
            contactSales: "联系销售"
        },
        agent: {
            badge: "代理计划",
            title: "成为代理，",
            titleHighlight: "赚取更多",
            subtitle: "加入数千名出租车司机、导游和企业家，通过向旅行者销售eSIM赚取额外收入。",
            earnTitle: "赚取佣金",
            earnDesc: "每笔eSIM销售赚取15-25%的佣金",
            payoutsTitle: "即时付款",
            payoutsDesc: "直接支付到您的钱包或移动钱包账户",
            appTitle: "易于使用的应用",
            appDesc: "使用我们直观的代理应用程序在几秒钟内销售eSIM",
            verifiedTitle: "认证代理",
            verifiedDesc: "获得官方代理身份和营销材料",
            becomeAgent: "成为代理",
            agentLogin: "代理登录",
            stat1: "活跃代理",
            stat2: "已支付佣金",
            stat3: "国家"
        },
        testimonials: {
            badge: "推荐",
            title: "受到",
            titleHighlight: "全球旅行者的喜爱",
            subtitle: "看看我们的客户和代理对他们体验的评价"
        }
    },
    plans: {
        title: "选择您的套餐",
        subtitle: "为您的旅程找到完美的数据套餐",
        filters: {
            country: "国家",
            dataAmount: "数据量",
            duration: "期限",
            all: "全部"
        },
        card: {
            popular: "热门",
            validity: "天",
            selectPlan: "选择套餐",
            details: "查看详情",
            coverage: "覆盖范围",
            data: "数据",
            speed: "速度"
        }
    },
    auth: {
        login: {
            title: "欢迎回来",
            subtitle: "登录您的账户",
            email: "电子邮件地址",
            phone: "电话号码",
            password: "密码",
            loginButton: "登录",
            forgotPassword: "忘记密码？",
            noAccount: "没有账户？",
            signUp: "注册",
            emailTab: "电子邮件",
            phoneTab: "电话",
            requestOtp: "请求OTP",
            verifyOtp: "验证OTP",
            enterOtp: "输入OTP"
        },
        register: {
            title: "创建账户",
            subtitle: "立即加入我们",
            name: "全名",
            email: "电子邮件地址",
            phone: "电话号码",
            password: "密码",
            confirmPassword: "确认密码",
            registerButton: "创建账户",
            haveAccount: "已有账户？",
            signIn: "登录"
        }
    },
    checkout: {
        title: "完成您的订单",
        customerInfo: "客户信息",
        email: "电子邮件地址",
        phone: "电话号码",
        optional: "可选",
        orderSummary: "订单摘要",
        plan: "套餐",
        country: "国家",
        data: "数据",
        validity: "有效期",
        days: "天",
        price: "价格",
        total: "总计",
        payNow: "立即支付",
        securePayment: "由Stripe提供的安全支付"
    },
    profile: {
        title: "我的个人资料",
        personalInfo: "个人信息",
        name: "姓名",
        email: "电子邮件",
        phone: "电话",
        myOrders: "我的订单",
        orderHistory: "订单历史",
        noOrders: "暂无订单",
        orderId: "订单号",
        date: "日期",
        status: "状态",
        amount: "金额",
        viewDetails: "查看详情"
    },
    admin: {
        dashboard: "仪表板",
        overview: "概览",
        orders: "订单",
        agents: "代理",
        plans: "套餐",
        settings: "设置",
        totalRevenue: "总收入",
        totalOrders: "订单",
        activeAgents: "活跃代理",
        countries: "国家",
        fromLastMonth: "与上月相比",
        revenueByCountry: "按国家收入",
        orderStatus: "订单状态",
        monthlyTrend: "月度收入趋势"
    },
    agent: {
        dashboard: "代理仪表板",
        createSale: "创建销售",
        myOrders: "我的订单",
        earnings: "收入",
        wallet: "钱包",
        requestPayout: "请求付款",
        totalEarnings: "总收入",
        availableBalance: "可用余额",
        pendingCommission: "待处理佣金"
    },
    footer: {
        description: "为全球旅行者提供即时eSIM激活。通过实惠的数据套餐在超过190个国家保持连接。",
        contactSupport: "联系支持",
        subscribe: "订阅我们的新闻通讯",
        emailPlaceholder: "输入您的电子邮件",
        product: "产品",
        company: "公司",
        forAgents: "代理专区",
        support: "支持",
        copyright: "保留所有权利。",
        privacyPolicy: "隐私政策",
        termsOfService: "服务条款",
        cookiePolicy: "Cookie政策",
        links: {
            coverage: "覆盖范围",
            pricing: "定价",
            howItWorks: "如何运作",
            devices: "eSIM兼容设备",
            about: "关于我们",
            blog: "博客",
            careers: "职业",
            press: "新闻资料",
            becomeAgent: "成为代理",
            agentLogin: "代理登录",
            agentResources: "代理资源",
            commission: "佣金结构",
            helpCenter: "帮助中心",
            contactUs: "联系我们",
            faqs: "常见问题",
            installGuide: "安装指南"
        }
    }
};
}),
"[project]/Downloads/travel-e-sim-system/lib/i18n/translations/sw.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "sw",
    ()=>sw
]);
const sw = {
    common: {
        loading: "Inapakia...",
        error: "Hitilafu",
        success: "Mafanikio",
        save: "Hifadhi",
        cancel: "Ghairi",
        delete: "Futa",
        edit: "Hariri",
        search: "Tafuta",
        filter: "Chuja",
        viewDetails: "Tazama Maelezo",
        close: "Funga",
        confirm: "Thibitisha",
        back: "Rudi",
        next: "Ifuatayo",
        submit: "Wasilisha",
        or: "au"
    },
    nav: {
        home: "Nyumbani",
        plans: "Mipango",
        about: "Kuhusu",
        contact: "Wasiliana",
        login: "Ingia",
        register: "Jisajili",
        profile: "Wasifu",
        logout: "Toka",
        dashboard: "Dashibodi"
    },
    home: {
        hero: {
            badge: "Uamilishaji wa Haraka",
            typewriterText: "Kuwa Umeunganishwa Popote",
            title: "Duniani Kote",
            subtitle: "Mipango ya data ya eSIM ya papo hapo kwa nchi zaidi ya 190. Hakuna haja ya SIM ya kimwili. Amilisha katika sekunde na furahia muunganisho wa kimataifa bila matatizo popote unapoenda.",
            browsePlans: "Angalia Mipango",
            exploreCoverage: "Gundua Upatikanaji",
            stat1Label: "Nchi",
            stat2Label: "Wasafiri Wenye Furaha",
            stat3Label: "Ukadiriaji wa Mtumiaji",
            secureBadge: "Salama",
            secureDesc: "Usimbaji wa vipande 256",
            instantBadge: "Haraka",
            instantDesc: "Uamilishaji wa dakika 2"
        },
        features: {
            badge: "Kwa Nini Utuchague",
            title: "Kila Kitu Unachohitaji kwa",
            titleHighlight: "Safari Bila Matatizo",
            subtitle: "Furahia muunganisho bila wasiwasi na vipengele vilivyoundwa kwa wasafiri wa kisasa",
            instant: {
                title: "Uamilishaji wa Haraka",
                description: "Unganishwa katika chini ya dakika 2. Changanua msimbo wa QR na uanze kutumia data mara moja."
            },
            countries: {
                title: "Nchi Zaidi ya 190",
                description: "Upatikanaji wa kimataifa kwenye kontinenti zote. Jukwaa moja kwa mahitaji yako yote ya muunganisho wa safari."
            },
            secure: {
                title: "Salama na ya Kuaminika",
                description: "Usimbaji wa kiwango cha benki na wakati wa kuwa hai wa 99.9%. Data yako na faragha yako vinalindwa."
            },
            affordable: {
                title: "Mipango ya Bei Nafuu",
                description: "Bei za ushindani bila ada zilizofichwa. Lipa tu kwa unachohitaji."
            },
            management: {
                title: "Usimamizi Rahisi",
                description: "Simamia eSIM zako zote katika programu moja. Angalia matumizi, jaza tena, na badilisha mipango papo hapo."
            },
            support: {
                title: "Msaada wa Saa 24/7",
                description: "Msaada wa wateja usiku na mchana katika lugha nyingi. Tuko hapa kusaidia."
            }
        },
        howItWorks: {
            badge: "Mchakato Rahisi",
            title: "Unganishwa katika",
            titleHighlight: "Hatua 4 Rahisi",
            subtitle: "Kutoka ununuzi hadi uamilishaji, tumefanya iwe rahisi sana",
            step1Title: "Chagua Mpango Wako",
            step1Desc: "Chagua marudio yako na uchague mpango kamili wa data kwa muda wa safari yako.",
            step2Title: "Pokea Msimbo wa QR",
            step2Desc: "Pata msimbo wako wa QR wa eSIM papo hapo kupitia barua pepe au programu baada ya malipo.",
            step3Title: "Changanua na Uamilishe",
            step3Desc: "Changanua msimbo wa QR katika mipangilio ya simu yako na uamilishe eSIM yako katika sekunde.",
            step4Title: "Anza Kutumia",
            step4Desc: "Umeunganishwa! Furahia data ya kasi kubwa popote unakosafiri."
        },
        countries: {
            badge: "Upatikanaji wa Kimataifa",
            title: "Unganisha katika",
            titleHighlight: "Nchi Zaidi ya 190",
            subtitle: "Kutoka miji yenye msongamano hadi maeneo ya mbali, baki umeunganishwa popote safari yako inakupeleka",
            popularTitle: "Maeneo Maarufu",
            viewAll: "Tazama Yote",
            searchPlaceholder: "Tafuta nchi...",
            allRegions: "Mikoa Yote",
            showingResults: "Inaonyesha",
            country: "nchi",
            countries: "nchi",
            plan: "mpango",
            plans: "mipango",
            exploreAll: "Gundua Nchi Zote",
            loadingCountries: "Inapakia nchi..."
        },
        coverage: {
            badge: "Upatikanaji wa Kimataifa",
            title: "Inapatikana katika",
            titleHighlight: "Nchi Zaidi ya 190",
            subtitle: "Kutoka miji yenye msongamano hadi maeneo ya mbali, baki umeunganishwa kila mahali",
            searchPlaceholder: "Tafuta nchi...",
            viewAllCountries: "Tazama Nchi Zote"
        },
        pricing: {
            badge: "Bei za Kubadilika",
            title: "Chagua",
            titleHighlight: "Mpango Wako Kamili",
            subtitle: "Mipango ya data ya bei nafuu kwa kila aina ya msafiri. Hakuna ada zilizofichwa, futa wakati wowote.",
            mostPopular: "Maarufu Zaidi",
            selected: "Imechaguliwa",
            selectPlan: "Chagua Mpango",
            customPlan: "Unahitaji mpango maalum? Wasiliana na timu yetu ya mauzo",
            contactSales: "Wasiliana na Mauzo"
        },
        agent: {
            badge: "Programu ya Mawakala",
            title: "Kuwa Wakala,",
            titleHighlight: "Pata Zaidi",
            subtitle: "Jiunge na maelfu ya madereva wa teksi, waongozaji wa utalii, na wajasiriamali wanaopata mapato ya ziada kwa kuuza eSIM kwa wasafiri.",
            earnTitle: "Pata Tume",
            earnDesc: "Pata tume ya 15-25% kwa kila mauzo ya eSIM unayofanya",
            payoutsTitle: "Malipo ya Haraka",
            payoutsDesc: "Pata malipo moja kwa moja kwenye pochi yako au akaunti ya pesa ya simu",
            appTitle: "Programu Rahisi Kutumia",
            appDesc: "Uza eSIM katika sekunde kwa programu yetu ya kielimu ya mawakala",
            verifiedTitle: "Wakala Aliyethibitishwa",
            verifiedDesc: "Pata hadhi ya wakala rasmi na nyenzo za uuzaji",
            becomeAgent: "Kuwa Wakala",
            agentLogin: "Kuingia kwa Wakala",
            stat1: "Mawakala Hai",
            stat2: "Imelipwa katika Tume",
            stat3: "Nchi"
        },
        testimonials: {
            badge: "Ushuhuda",
            title: "Inapendwa na",
            titleHighlight: "Wasafiri Duniani Kote",
            subtitle: "Tazama wateja wetu na mawakala wanavyosema kuhusu uzoefu wao"
        }
    },
    plans: {
        title: "Chagua Mpango Wako",
        subtitle: "Pata mpango kamili wa data kwa safari yako",
        filters: {
            country: "Nchi",
            dataAmount: "Kiasi cha Data",
            duration: "Muda",
            all: "Yote"
        },
        card: {
            popular: "Maarufu",
            validity: "siku",
            selectPlan: "Chagua Mpango",
            details: "Tazama Maelezo",
            coverage: "Upatikanaji",
            data: "Data",
            speed: "Kasi"
        }
    },
    auth: {
        login: {
            title: "Karibu Tena",
            subtitle: "Ingia kwenye akaunti yako",
            email: "Anwani ya Barua Pepe",
            phone: "Nambari ya Simu",
            password: "Nenosiri",
            loginButton: "Ingia",
            forgotPassword: "Umesahau nenosiri?",
            noAccount: "Huna akaunti?",
            signUp: "Jisajili",
            emailTab: "Barua Pepe",
            phoneTab: "Simu",
            requestOtp: "Omba OTP",
            verifyOtp: "Thibitisha OTP",
            enterOtp: "Weka OTP"
        },
        register: {
            title: "Unda Akaunti",
            subtitle: "Jiunge nasi leo",
            name: "Jina Kamili",
            email: "Anwani ya Barua Pepe",
            phone: "Nambari ya Simu",
            password: "Nenosiri",
            confirmPassword: "Thibitisha Nenosiri",
            registerButton: "Unda Akaunti",
            haveAccount: "Tayari una akaunti?",
            signIn: "Ingia"
        }
    },
    checkout: {
        title: "Kamilisha Agizo Lako",
        customerInfo: "Taarifa za Mteja",
        email: "Anwani ya Barua Pepe",
        phone: "Nambari ya Simu",
        optional: "si lazima",
        orderSummary: "Muhtasari wa Agizo",
        plan: "Mpango",
        country: "Nchi",
        data: "Data",
        validity: "Uhalali",
        days: "siku",
        price: "Bei",
        total: "Jumla",
        payNow: "Lipa Sasa",
        securePayment: "Malipo salama yanayoendeshwa na Stripe"
    },
    profile: {
        title: "Wasifu Wangu",
        personalInfo: "Taarifa Binafsi",
        name: "Jina",
        email: "Barua Pepe",
        phone: "Simu",
        myOrders: "Maagizo Yangu",
        orderHistory: "Historia ya Maagizo",
        noOrders: "Hakuna maagizo bado",
        orderId: "Nambari ya Agizo",
        date: "Tarehe",
        status: "Hali",
        amount: "Kiasi",
        viewDetails: "Tazama Maelezo"
    },
    admin: {
        dashboard: "Dashibodi",
        overview: "Maelezo",
        orders: "Maagizo",
        agents: "Mawakala",
        plans: "Mipango",
        settings: "Mipangilio",
        totalRevenue: "Mapato Jumla",
        totalOrders: "Maagizo",
        activeAgents: "Mawakala Hai",
        countries: "Nchi",
        fromLastMonth: "kutoka mwezi uliopita",
        revenueByCountry: "Mapato kwa Nchi",
        orderStatus: "Hali ya Agizo",
        monthlyTrend: "Mwelekeo wa Mapato ya Kila Mwezi"
    },
    agent: {
        dashboard: "Dashibodi ya Wakala",
        createSale: "Unda Mauzo",
        myOrders: "Maagizo Yangu",
        earnings: "Mapato",
        wallet: "Pochi",
        requestPayout: "Omba Malipo",
        totalEarnings: "Mapato Jumla",
        availableBalance: "Salio Linalopo",
        pendingCommission: "Tume Inayosubiri"
    },
    footer: {
        description: "Uamilishaji wa eSIM wa papo hapo kwa wasafiri wa kimataifa. Baki umeunganishwa katika nchi zaidi ya 190 na mipango ya data ya bei nafuu.",
        contactSupport: "Wasiliana na Msaada",
        subscribe: "Jiandikishe kwenye jarida letu",
        emailPlaceholder: "Weka barua pepe yako",
        product: "Bidhaa",
        company: "Kampuni",
        forAgents: "Kwa Mawakala",
        support: "Msaada",
        copyright: "Haki zote zimehifadhiwa.",
        privacyPolicy: "Sera ya Faragha",
        termsOfService: "Masharti ya Huduma",
        cookiePolicy: "Sera ya Vidakuzi",
        links: {
            coverage: "Upatikanaji",
            pricing: "Bei",
            howItWorks: "Jinsi Inavyofanya Kazi",
            devices: "Vifaa Vinavyoendana na eSIM",
            about: "Kuhusu Sisi",
            blog: "Blogu",
            careers: "Kazi",
            press: "Vifurushi vya Habari",
            becomeAgent: "Kuwa Wakala",
            agentLogin: "Kuingia kwa Wakala",
            agentResources: "Rasilimali za Mawakala",
            commission: "Muundo wa Tume",
            helpCenter: "Kituo cha Msaada",
            contactUs: "Wasiliana Nasi",
            faqs: "Maswali Yanayoulizwa Sana",
            installGuide: "Mwongozo wa Kusakinisha"
        }
    }
};
}),
"[project]/Downloads/travel-e-sim-system/lib/i18n/translations/am.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "am",
    ()=>am
]);
const am = {
    common: {
        loading: "በመጫን ላይ...",
        error: "ስህተት",
        success: "ተሳክቷል",
        save: "አስቀምጥ",
        cancel: "ሰርዝ",
        delete: "ሰርዝ",
        edit: "አስተካክል",
        search: "ፈልግ",
        filter: "አጣራ",
        viewDetails: "ዝርዝር ይመልከቱ",
        close: "ዝጋ",
        confirm: "አረጋግጥ",
        back: "ተመለስ",
        next: "ቀጣይ",
        submit: "ላክ",
        or: "ወይም"
    },
    nav: {
        home: "መነሻ",
        plans: "እቅዶች",
        about: "ስለእኛ",
        contact: "አግኙን",
        login: "ግባ",
        register: "ተመዝገብ",
        profile: "መገለጫ",
        logout: "ውጣ",
        dashboard: "ዳሽቦርድ"
    },
    home: {
        hero: {
            badge: "ፈጣን ማግበሪያ",
            typewriterText: "በየትኛውም ቦታ ተገናኝ",
            title: "በዓለም ዙሪያ",
            subtitle: "ከ190 በላይ አገሮች ለፈጣን eSIM መረጃ እቅዶች። የአካል SIM አያስፈልግም። በሰከንዶች ውስጥ ያግብሩ እና ያለችግር ዓለም አቀፍ ግንኙነት ያግኙ።",
            browsePlans: "እቅዶችን ያስሱ",
            exploreCoverage: "ሽፋንን ያስሱ",
            stat1Label: "አገሮች",
            stat2Label: "ደስተኛ ተጓዦች",
            stat3Label: "የተጠቃሚ ደረጃ",
            secureBadge: "ደህንነቱ የተጠበቀ",
            secureDesc: "256-ቢት ምስጠራ",
            instantBadge: "ፈጣን",
            instantDesc: "በ2 ደቂቃ ማግበር"
        },
        features: {
            badge: "ለምን እኛን ይምረጡ",
            title: "የሚፈልጉት ሁሉ",
            titleHighlight: "ለቀልጣፋ ጉዞ",
            subtitle: "ለዘመናዊ ተጓዦች የተነደፉ ባህሪያት ያለችግር ግንኙነት ይለማመዱ",
            instant: {
                title: "ፈጣን ማግበሪያ",
                description: "በ2 ደቂቃ ውስጥ ይገናኙ። QR ኮድን ይቃኙ እና ወዲያውኑ መረጃ መጠቀም ይጀምሩ።"
            },
            countries: {
                title: "ከ190+ አገሮች",
                description: "በሁሉም አህጉራት ዓለም አቀፍ ሽፋን። ለሁሉም የጉዞ ግንኙነት ፍላጎቶችዎ አንድ መድረክ።"
            },
            secure: {
                title: "ደህንነቱ የተጠበቀ እና አስተማማኝ",
                description: "የባንክ ደረጃ ምስጠራ እና 99.9% የመስራት ጊዜ። የእርስዎ መረጃ እና ግላዊነት የተጠበቀ ነው።"
            },
            affordable: {
                title: "ተመጣጣኝ እቅዶች",
                description: "ተወዳዳሪ ዋጋዎች ያለተደበቁ ክፍያዎች። የሚፈልጉትን ብቻ ይክፈሉ።"
            },
            management: {
                title: "ቀላል አስተዳደር",
                description: "ሁሉንም eSIMs በአንድ መተግበሪያ ያስተዳድሩ። አጠቃቀምን ይፈትሹ፣ እንደገና ይሙሉ እና ወዲያውኑ እቅዶችን ይቀይሩ።"
            },
            support: {
                title: "24/7 ድጋፍ",
                description: "በበርካታ ቋንቋዎች የ24 ሰዓት የደንበኛ ድጋፍ። እኛ እዚህ ለመርዳት ነን።"
            }
        },
        howItWorks: {
            badge: "ቀላል ሂደት",
            title: "ይገናኙ በ",
            titleHighlight: "4 ቀላል ደረጃዎች",
            subtitle: "ከግዢ እስከ ማግበር ድረስ፣ በጣም ቀላል አድርገናል",
            step1Title: "እቅድዎን ይምረጡ",
            step1Desc: "መድረሻዎን ይምረጡ እና ለጉዞዎ ጊዜ ፍጹም የመረጃ እቅድ ይምረጡ።",
            step2Title: "QR ኮድ ይቀበሉ",
            step2Desc: "ከክፍያ በኋላ የእርስዎን eSIM QR ኮድ ወዲያውኑ በኢሜይል ወይም በመተግበሪያ ያግኙ።",
            step3Title: "ይቃኙ እና ያግብሩ",
            step3Desc: "በስልክዎ ቅንብሮች ውስጥ QR ኮድን ይቃኙ እና eSIMዎን በሰከንዶች ያግብሩ።",
            step4Title: "ማዘዋወር ይጀምሩ",
            step4Desc: "ተገናኝተዋል! ወደ የትኛውም ቦታ በሚጓዙበት ጊዜ ከፍተኛ ፍጥነት መረጃ ያግኙ።"
        },
        countries: {
            badge: "ዓለም አቀፍ ሽፋን",
            title: "ይገናኙ በ",
            titleHighlight: "ከ190+ አገሮች",
            subtitle: "ከተንቀሳቃሽ ከተሞች እስከ ሩቅ መድረሻዎች፣ ጉዞዎ የት እንደሚወስድዎ ተገናኝተው ይቆዩ",
            popularTitle: "ታዋቂ መድረሻዎች",
            viewAll: "ሁሉንም ይመልከቱ",
            searchPlaceholder: "አገሮችን ይፈልጉ...",
            allRegions: "ሁሉም ክልሎች",
            showingResults: "በማሳየት ላይ",
            country: "አገር",
            countries: "አገሮች",
            plan: "እቅድ",
            plans: "እቅዶች",
            exploreAll: "ሁሉንም አገሮች ያስሱ",
            loadingCountries: "አገሮች በመጫን ላይ..."
        },
        coverage: {
            badge: "ዓለም አቀፍ ሽፋን",
            title: "ይገኛል በ",
            titleHighlight: "ከ190+ አገሮች",
            subtitle: "ከተንቀሳቃሽ ከተሞች እስከ ሩቅ መድረሻዎች፣ በየትኛውም ቦታ ተገናኝተው ይቆዩ",
            searchPlaceholder: "አገር ይፈልጉ...",
            viewAllCountries: "ሁሉንም አገሮች ይመልከቱ"
        },
        pricing: {
            badge: "ተለዋዋጭ ዋጋ",
            title: "ይምረጡ",
            titleHighlight: "ፍጹም እቅድዎን",
            subtitle: "ለእያንዳንዱ አይነት ተጓዥ ተመጣጣኝ የመረጃ እቅዶች። ያልተደበቁ ክፍያዎች፣ በማንኛውም ጊዜ ይሰርዙ።",
            mostPopular: "በጣም ታዋቂ",
            selected: "ተመርጧል",
            selectPlan: "እቅድ ይምረጡ",
            customPlan: "ብጁ እቅድ ያስፈልግዎታል? የሽያጭ ቡድናችንን ያነጋግሩ",
            contactSales: "ሽያጭን ያነጋግሩ"
        },
        agent: {
            badge: "የወኪል ፕሮግራም",
            title: "ወኪል ይሁኑ፣",
            titleHighlight: "የበለጠ ያግኙ",
            subtitle: "ለተጓዦች eSIMዎችን በመሸጥ ተጨማሪ ገቢ የሚያገኙ በሺዎች የሚቆጠሩ የታክሲ ሹፌሮች፣ የቱሪስት መመሪያዎች እና ሥራ ፈጣሪዎች ይቀላቀሉ።",
            earnTitle: "ኮሚሽን ያግኙ",
            earnDesc: "በሚሸጡት እያንዳንዱ eSIM ሽያጭ 15-25% ኮሚሽን ያግኙ",
            payoutsTitle: "ፈጣን ክፍያዎች",
            payoutsDesc: "በቀጥታ ወደ ቦርሳዎ ወይም የሞባይል ገንዘብ መለያዎ ይከፈሉ",
            appTitle: "ለመጠቀም ቀላል መተግበሪያ",
            appDesc: "በእኛ ቀላል የወኪል መተግበሪያ በሰከንዶች eSIMዎችን ይሽጡ",
            verifiedTitle: "የተረጋገጠ ወኪል",
            verifiedDesc: "ይፋዊ የወኪል ሁኔታ እና የግብይት ቁሳቁሶችን ያግኙ",
            becomeAgent: "ወኪል ይሁኑ",
            agentLogin: "የወኪል መግቢያ",
            stat1: "ንቁ ወኪሎች",
            stat2: "በኮሚሽን የተከፈለ",
            stat3: "አገሮች"
        },
        testimonials: {
            badge: "ምስክርነቶች",
            title: "የተወደደ በ",
            titleHighlight: "በዓለም ዙሪያ ተጓዦች",
            subtitle: "ደንበኞቻችን እና ወኪሎቻችን ስለ ልምዳቸው የሚሉትን ይመልከቱ"
        }
    },
    plans: {
        title: "እቅድዎን ይምረጡ",
        subtitle: "ለጉዞዎ ፍጹም የመረጃ እቅድ ያግኙ",
        filters: {
            country: "አገር",
            dataAmount: "የመረጃ መጠን",
            duration: "ጊዜ",
            all: "ሁሉም"
        },
        card: {
            popular: "ታዋቂ",
            validity: "ቀናት",
            selectPlan: "እቅድ ይምረጡ",
            details: "ዝርዝር ይመልከቱ",
            coverage: "ሽፋን",
            data: "መረጃ",
            speed: "ፍጥነት"
        }
    },
    auth: {
        login: {
            title: "እንኳን ደህና መጡ",
            subtitle: "ወደ መለያዎ ይግቡ",
            email: "የኢሜይል አድራሻ",
            phone: "የስልክ ቁጥር",
            password: "የይለፍ ቃል",
            loginButton: "ግባ",
            forgotPassword: "የይለፍ ቃል ረስተዋል?",
            noAccount: "መለያ የለዎትም?",
            signUp: "ይመዝገቡ",
            emailTab: "ኢሜይል",
            phoneTab: "ስልክ",
            requestOtp: "OTP ይጠይቁ",
            verifyOtp: "OTP ያረጋግጡ",
            enterOtp: "OTP ያስገቡ"
        },
        register: {
            title: "መለያ ይፍጠሩ",
            subtitle: "ዛሬ ይቀላቀሉን",
            name: "ሙሉ ስም",
            email: "የኢሜይል አድራሻ",
            phone: "የስልክ ቁጥር",
            password: "የይለፍ ቃል",
            confirmPassword: "የይለፍ ቃል ያረጋግጡ",
            registerButton: "መለያ ይፍጠሩ",
            haveAccount: "አስቀድመው መለያ አለዎት?",
            signIn: "ይግቡ"
        }
    },
    checkout: {
        title: "ትዕዛዝዎን ያጠናቅቁ",
        customerInfo: "የደንበኛ መረጃ",
        email: "የኢሜይል አድራሻ",
        phone: "የስልክ ቁጥር",
        optional: "አማራጭ",
        orderSummary: "የትዕዛዝ ማጠቃለያ",
        plan: "እቅድ",
        country: "አገር",
        data: "መረጃ",
        validity: "ትክክለኛነት",
        days: "ቀናት",
        price: "ዋጋ",
        total: "ጠቅላላ",
        payNow: "አሁን ይክፈሉ",
        securePayment: "በStripe የሚደገፍ ደህንነቱ የተጠበቀ ክፍያ"
    },
    profile: {
        title: "የእኔ መገለጫ",
        personalInfo: "የግል መረጃ",
        name: "ስም",
        email: "ኢሜይል",
        phone: "ስልክ",
        myOrders: "የእኔ ትዕዛዞች",
        orderHistory: "የትዕዛዝ ታሪክ",
        noOrders: "እስካሁን ትዕዛዞች የሉም",
        orderId: "የትዕዛዝ መታወቂያ",
        date: "ቀን",
        status: "ሁኔታ",
        amount: "መጠን",
        viewDetails: "ዝርዝር ይመልከቱ"
    },
    admin: {
        dashboard: "ዳሽቦርድ",
        overview: "አጠቃላይ እይታ",
        orders: "ትዕዛዞች",
        agents: "ወኪሎች",
        plans: "እቅዶች",
        settings: "ቅንብሮች",
        totalRevenue: "ጠቅላላ ገቢ",
        totalOrders: "ትዕዛዞች",
        activeAgents: "ንቁ ወኪሎች",
        countries: "አገሮች",
        fromLastMonth: "ካለፈው ወር",
        revenueByCountry: "በአገር ገቢ",
        orderStatus: "የትዕዛዝ ሁኔታ",
        monthlyTrend: "ወርሃዊ የገቢ አዝማሚያ"
    },
    agent: {
        dashboard: "የወኪል ዳሽቦርድ",
        createSale: "ሽያጭ ይፍጠሩ",
        myOrders: "የእኔ ትዕዛዞች",
        earnings: "ገቢዎች",
        wallet: "ቦርሳ",
        requestPayout: "ክፍያ ይጠይቁ",
        totalEarnings: "ጠቅላላ ገቢዎች",
        availableBalance: "ያለ ቀሪ ሂሳብ",
        pendingCommission: "በመጠባበቅ ላይ ያለ ኮሚሽን"
    },
    footer: {
        description: "ለዓለም አቀፍ ተጓዦች ፈጣን የeSIM ማግበሪያ። በተመጣጣኝ የመረጃ እቅዶች በ190+ አገሮች ተገናኝተው ይቆዩ።",
        contactSupport: "ድጋፍን ያነጋግሩ",
        subscribe: "ለጋዜጣችን ይመዝገቡ",
        emailPlaceholder: "ኢሜይልዎን ያስገቡ",
        product: "ምርት",
        company: "ድርጅት",
        forAgents: "ለወኪሎች",
        support: "ድጋፍ",
        copyright: "ሁሉም መብቶች የተጠበቁ ናቸው።",
        privacyPolicy: "የግላዊነት ፖሊሲ",
        termsOfService: "የአገልግሎት ውሎች",
        cookiePolicy: "የኩኪ ፖሊሲ",
        links: {
            coverage: "ሽፋን",
            pricing: "ዋጋ",
            howItWorks: "እንዴት እንደሚሰራ",
            devices: "eSIM ተኮር መሳሪያዎች",
            about: "ስለእኛ",
            blog: "ብሎግ",
            careers: "ሙያዎች",
            press: "የፕሬስ ኪት",
            becomeAgent: "ወኪል ይሁኑ",
            agentLogin: "የወኪል መግቢያ",
            agentResources: "የወኪል ግብዓቶች",
            commission: "የኮሚሽን መዋቅር",
            helpCenter: "የእገዛ ማዕከል",
            contactUs: "አግኙን",
            faqs: "ተደጋጋሚ ጥያቄዎች",
            installGuide: "የመጫኛ መመሪያ"
        }
    }
};
}),
"[project]/Downloads/travel-e-sim-system/lib/i18n/translations/ti.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ti",
    ()=>ti
]);
const ti = {
    common: {
        welcome: "እንቋዕ ብደሐን መጻእኩም",
        login: "እቶ",
        logout: "ውጻእ",
        register: "ምዝገባ",
        email: "ኢመይል",
        password: "መሕለፊ ቃል",
        submit: "ስደድ",
        cancel: "ሰርዝ",
        save: "ዓቅብ",
        delete: "ደምስስ",
        edit: "ኣረም",
        view: "ርአይ",
        search: "ድለ",
        filter: "ጽረግ",
        loading: "ይጽዕን ኣሎ...",
        error: "ጌጋ",
        success: "ዓወት"
    },
    nav: {
        home: "መበገሲ",
        plans: "ውጥናት",
        about: "ብዛዕባና",
        contact: "ርኸቡና",
        dashboard: "ዳሽቦርድ",
        profile: "መግለጺ"
    },
    home: {
        hero: {
            title: "ምስ ዓለም ተራኸብ",
            subtitle: "ንተጓዓዝቲ ዓለማዊ eSIMs",
            cta: "ውጥናት ርአይ"
        }
    }
};
}),
"[project]/Downloads/travel-e-sim-system/lib/i18n/translations/om.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "om",
    ()=>om
]);
const om = {
    common: {
        welcome: "Baga nagaan dhuftan",
        login: "Seeni",
        logout: "Ba'i",
        register: "Galmaa'i",
        email: "Imeelii",
        password: "Jecha icciitii",
        submit: "Ergi",
        cancel: "Dhiisi",
        save: "Olkaa'i",
        delete: "Haqi",
        edit: "Gulaal",
        view: "Ilaali",
        search: "Barbaadi",
        filter: "Cali",
        loading: "Fe'aa jira...",
        error: "Dogongora",
        success: "Milkaa'ina"
    },
    nav: {
        home: "Manaa",
        plans: "Karooraalee",
        about: "Waa'ee Keenya",
        contact: "Nu Quunnamaa",
        dashboard: "Daashboordii",
        profile: "Piroofaayilii"
    },
    home: {
        hero: {
            title: "Addunyaa Waliin Walqunnamsiisi",
            subtitle: "eSIMs Addunyaa Deemtootaaf",
            cta: "Karooraalee Ilaali"
        }
    }
};
}),
"[project]/Downloads/travel-e-sim-system/lib/i18n/translations/so.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "so",
    ()=>so
]);
const so = {
    common: {
        welcome: "Soo dhawoow",
        login: "Gal",
        logout: "Ka bax",
        register: "Isdiiwaangeli",
        email: "Iimaylka",
        password: "Furaha sirta ah",
        submit: "Dir",
        cancel: "Jooji",
        save: "Keydi",
        delete: "Tirtir",
        edit: "Wax ka bedel",
        view: "Fiiri",
        search: "Raadi",
        filter: "Kala saar",
        loading: "Waa la rarayo...",
        error: "Khalad",
        success: "Guul"
    },
    nav: {
        home: "Hoy",
        plans: "Qorsheeyaal",
        about: "Naga Soo Xidhiidh",
        contact: "Xiriir",
        dashboard: "Dashboard",
        profile: "Profile"
    },
    home: {
        hero: {
            title: "Adduunka La Xiriir",
            subtitle: "eSIMs Caalami ah Safareyaasha",
            cta: "Fiiri Qorsheeyaasha"
        }
    }
};
}),
"[project]/Downloads/travel-e-sim-system/lib/i18n/translations/index.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "translations",
    ()=>translations
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$i18n$2f$translations$2f$en$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-e-sim-system/lib/i18n/translations/en.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$i18n$2f$translations$2f$ar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-e-sim-system/lib/i18n/translations/ar.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$i18n$2f$translations$2f$fr$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-e-sim-system/lib/i18n/translations/fr.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$i18n$2f$translations$2f$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-e-sim-system/lib/i18n/translations/es.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$i18n$2f$translations$2f$pt$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-e-sim-system/lib/i18n/translations/pt.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$i18n$2f$translations$2f$zh$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-e-sim-system/lib/i18n/translations/zh.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$i18n$2f$translations$2f$sw$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-e-sim-system/lib/i18n/translations/sw.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$i18n$2f$translations$2f$am$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-e-sim-system/lib/i18n/translations/am.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$i18n$2f$translations$2f$ti$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-e-sim-system/lib/i18n/translations/ti.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$i18n$2f$translations$2f$om$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-e-sim-system/lib/i18n/translations/om.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$i18n$2f$translations$2f$so$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-e-sim-system/lib/i18n/translations/so.js [app-ssr] (ecmascript)");
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
;
const translations = {
    en: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$i18n$2f$translations$2f$en$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["en"],
    ar: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$i18n$2f$translations$2f$ar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ar"],
    fr: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$i18n$2f$translations$2f$fr$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fr"],
    es: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$i18n$2f$translations$2f$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["es"],
    pt: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$i18n$2f$translations$2f$pt$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["pt"],
    zh: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$i18n$2f$translations$2f$zh$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["zh"],
    sw: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$i18n$2f$translations$2f$sw$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sw"],
    am: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$i18n$2f$translations$2f$am$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["am"],
    ti: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$i18n$2f$translations$2f$ti$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ti"],
    om: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$i18n$2f$translations$2f$om$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["om"],
    so: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$i18n$2f$translations$2f$so$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["so"]
};
}),
"[project]/Downloads/travel-e-sim-system/lib/i18n/config.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEFAULT_LANGUAGE",
    ()=>DEFAULT_LANGUAGE,
    "LANGUAGES",
    ()=>LANGUAGES,
    "detectBrowserLanguage",
    ()=>detectBrowserLanguage,
    "isRTL",
    ()=>isRTL
]);
const LANGUAGES = [
    {
        code: "en",
        name: "English",
        nativeName: "English",
        flag: "🇬🇧",
        rtl: false
    },
    {
        code: "ar",
        name: "Arabic",
        nativeName: "العربية",
        flag: "🇸🇦",
        rtl: true
    },
    {
        code: "fr",
        name: "French",
        nativeName: "Français",
        flag: "🇫🇷",
        rtl: false
    },
    {
        code: "es",
        name: "Spanish",
        nativeName: "Español",
        flag: "🇪🇸",
        rtl: false
    },
    {
        code: "pt",
        name: "Portuguese",
        nativeName: "Português",
        flag: "🇵🇹",
        rtl: false
    },
    {
        code: "zh",
        name: "Chinese",
        nativeName: "中文",
        flag: "🇨🇳",
        rtl: false
    },
    {
        code: "sw",
        name: "Swahili",
        nativeName: "Kiswahili",
        flag: "🇰🇪",
        rtl: false
    },
    {
        code: "am",
        name: "Amharic",
        nativeName: "አማርኛ",
        flag: "🇪🇹",
        rtl: false
    },
    {
        code: "ti",
        name: "Tigrinya",
        nativeName: "ትግርኛ",
        flag: "🇪🇷",
        rtl: false
    },
    {
        code: "om",
        name: "Oromo",
        nativeName: "Afaan Oromoo",
        flag: "🇪🇹",
        rtl: false
    },
    {
        code: "so",
        name: "Somali",
        nativeName: "Soomaali",
        flag: "🇸🇴",
        rtl: false
    }
];
const DEFAULT_LANGUAGE = "en";
function detectBrowserLanguage() {
    if ("TURBOPACK compile-time truthy", 1) return DEFAULT_LANGUAGE;
    //TURBOPACK unreachable
    ;
    const browserLang = undefined;
    const supported = undefined;
}
function isRTL(languageCode) {
    const lang = LANGUAGES.find((l)=>l.code === languageCode);
    return lang?.rtl || false;
}
}),
"[project]/Downloads/travel-e-sim-system/contexts/LanguageContext.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LanguageProvider",
    ()=>LanguageProvider,
    "useLanguage",
    ()=>useLanguage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-e-sim-system/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-e-sim-system/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$i18n$2f$translations$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-e-sim-system/lib/i18n/translations/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$i18n$2f$config$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-e-sim-system/lib/i18n/config.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
const LanguageContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])();
function LanguageProvider({ children }) {
    const [language, setLanguage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$i18n$2f$config$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEFAULT_LANGUAGE"]);
    const [enabledLanguages, setEnabledLanguages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$i18n$2f$config$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LANGUAGES"].map((l)=>l.code));
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    // Load enabled languages from API and detect browser language
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const initLanguage = async ()=>{
            try {
                // Fetch enabled languages from admin settings
                const response = await fetch("/api/v1/settings/languages");
                if (response.ok) {
                    const data = await response.json();
                    if (data.enabled && data.enabled.length > 0) {
                        setEnabledLanguages(data.enabled);
                    }
                }
                // Check localStorage first
                const savedLang = localStorage.getItem("language");
                if (savedLang && __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$i18n$2f$translations$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["translations"][savedLang]) {
                    setLanguage(savedLang);
                } else {
                    // Auto-detect from browser
                    const detected = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$i18n$2f$config$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["detectBrowserLanguage"])();
                    setLanguage(detected);
                    localStorage.setItem("language", detected);
                }
            } catch (error) {
                console.error("[v0] Failed to load language settings:", error);
            } finally{
                setIsLoading(false);
            }
        };
        initLanguage();
    }, []);
    // Update HTML lang and dir attributes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (typeof document !== "undefined") {
            document.documentElement.lang = language;
            document.documentElement.dir = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$i18n$2f$config$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isRTL"])(language) ? "rtl" : "ltr";
        }
    }, [
        language
    ]);
    const changeLanguage = (newLang)=>{
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$i18n$2f$translations$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["translations"][newLang]) {
            setLanguage(newLang);
            localStorage.setItem("language", newLang);
        }
    };
    const t = (key)=>{
        const keys = key.split(".");
        let value = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$i18n$2f$translations$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["translations"][language];
        for (const k of keys){
            value = value?.[k];
            if (value === undefined) break;
        }
        // Fallback to English if translation not found
        if (value === undefined) {
            value = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$i18n$2f$translations$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["translations"][__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$i18n$2f$config$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEFAULT_LANGUAGE"]];
            for (const k of keys){
                value = value?.[k];
                if (value === undefined) break;
            }
        }
        return value || key;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(LanguageContext.Provider, {
        value: {
            language,
            changeLanguage,
            t,
            isRTL: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$i18n$2f$config$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isRTL"])(language),
            enabledLanguages,
            isLoading
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/Downloads/travel-e-sim-system/contexts/LanguageContext.jsx",
        lineNumber: 84,
        columnNumber: 5
    }, this);
}
function useLanguage() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used within LanguageProvider");
    }
    return context;
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__7011282f._.js.map