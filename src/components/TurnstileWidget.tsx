"use client";

import Script from "next/script";
import { useEffect, useEffectEvent, useImperativeHandle, useRef, useState } from "react";

/** Explicit rendering, so the widget mounts/unmounts with the React component. */
const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

/** Subset of the Turnstile client API we use: https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/ */
interface TurnstileApi {
  render(
    container: HTMLElement,
    options: {
      sitekey: string;
      action?: string;
      theme?: "auto" | "light" | "dark";
      size?: "normal" | "flexible" | "compact";
      callback?: (token: string) => void;
      "expired-callback"?: () => void;
      "error-callback"?: (code: string) => void;
    }
  ): string | undefined;
  reset(widgetId: string): void;
  remove(widgetId: string): void;
}

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

export interface TurnstileHandle {
  /** Discard the current token and request a fresh one — tokens are single-use. */
  reset: () => void;
}

interface TurnstileWidgetProps {
  siteKey: string;
  /** Echoed back by siteverify so the server can check the token came from this form. */
  action: string;
  /** Receives each new token, or `null` once the current one expires, errors, or is reset. */
  onTokenChange: (token: string | null) => void;
  ref?: React.Ref<TurnstileHandle>;
  className?: string;
}

/** Cloudflare Turnstile bot check. Usually completes on its own; only suspicious visitors get a challenge. */
export default function TurnstileWidget({
  siteKey,
  action,
  onTokenChange,
  ref,
  className,
}: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [scriptState, setScriptState] = useState<"loading" | "ready" | "failed">("loading");

  const emitToken = useEffectEvent((token: string | null) => onTokenChange(token));

  useEffect(() => {
    const container = containerRef.current;
    if (scriptState !== "ready" || !container || !window.turnstile) return;

    const widgetId = window.turnstile.render(container, {
      sitekey: siteKey,
      action,
      theme: "light",
      size: "flexible",
      callback: (token) => emitToken(token),
      "expired-callback": () => emitToken(null),
      "error-callback": () => emitToken(null),
    });
    widgetIdRef.current = widgetId ?? null;

    return () => {
      if (widgetId) window.turnstile?.remove(widgetId);
      widgetIdRef.current = null;
      emitToken(null);
    };
  }, [scriptState, siteKey, action]);

  useImperativeHandle(ref, () => ({
    reset() {
      if (widgetIdRef.current) window.turnstile?.reset(widgetIdRef.current);
      onTokenChange(null);
    },
  }));

  return (
    <div className={className}>
      <Script
        src={SCRIPT_SRC}
        onReady={() => setScriptState("ready")}
        onError={() => setScriptState("failed")}
      />
      {/* Reserve the widget's height so the form doesn't jump when it renders. */}
      <div ref={containerRef} className={scriptState === "failed" ? "hidden" : "min-h-[65px]"} />
      {scriptState === "failed" && (
        <p className="text-sm text-red-900">
          The security check couldn&apos;t load. Please disable any content blockers for this page
          and refresh.
        </p>
      )}
    </div>
  );
}
