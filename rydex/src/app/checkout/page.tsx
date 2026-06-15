import { Suspense } from "react";
import CheckoutClient from "./CheckoutClient";

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-zinc-100 flex items-center justify-center">
      <div className="text-zinc-500 font-semibold">Loading checkout...</div>
    </div>}>
      <CheckoutClient />
    </Suspense>
  );
}
