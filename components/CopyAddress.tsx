"use client";
import { useState } from "react";
/**
 * The only interactive part of Follow, isolated so the panel itself
 * stays a server component and the record set never reaches the client
 * bundle. Without JavaScript the button simply does not appear useful —
 * which is why the address is always printed as selectable text beside
 * it rather than hidden behind the copy.
 */
export function CopyAddress({ value }: { value: string }) {
 const [copied, setCopied] = useState(false);
 return (
  <button type="button" aria-live="polite" onClick={async () => {
   try { await navigator.clipboard.writeText(value); setCopied(true); setTimeout(() => setCopied(false), 2500); } catch { setCopied(false); }
  }}>{copied ? "ADDRESS COPIED" : "COPY ADDRESS"}</button>
 );
}
