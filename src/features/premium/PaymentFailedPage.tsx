import { Link, useNavigate } from "react-router-dom";
import { AlertTriangle, ShieldCheck, Lock, Zap, Headset } from "lucide-react";
import { Footer } from "@/components/nav/Footer";
import { Button } from "@/components/ui/Button";

const causes = ["Bank declined transaction", "Network connection issue", "UPI timeout or invalid PIN", "Card verification failed"];

const trust = [
  { icon: ShieldCheck, label: "Secure Payments" },
  { icon: Lock, label: "256-bit Encryption" },
  { icon: Zap, label: "Instant Activation" },
  { icon: Headset, label: "24/7 Support" },
];

export function PaymentFailedPage() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex flex-col items-center px-6 py-16 md:px-10">
        <div className="w-full max-w-lg rounded-lg bg-surface p-8 text-center">
          <span className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-danger/10">
            <AlertTriangle className="h-7 w-7 text-danger" />
          </span>
          <h1 className="font-display text-2xl font-extrabold text-text-primary">Payment Failed</h1>
          <p className="mt-3 text-sm text-text-secondary">
            Your payment couldn't be completed. Don't worry — no amount has been deducted or your bank will
            automatically reverse any pending transaction if applicable.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-4 text-left sm:grid-cols-2">
            <div className="rounded-md bg-surface-raised p-4">
              <p className="mb-2 text-[11px] font-bold uppercase tracking-wide text-text-tertiary">Order Summary</p>
              <div className="flex justify-between text-sm">
                <span className="text-text-tertiary">Plan</span>
                <span className="font-semibold text-text-primary">Monthly Premium</span>
              </div>
              <div className="mt-1 flex justify-between text-sm">
                <span className="text-text-tertiary">Amount</span>
                <span className="font-semibold text-secondary">₹149</span>
              </div>
              <p className="mt-2 text-xs text-text-tertiary">ID: TXN-REF-8821</p>
            </div>
            <div className="rounded-md bg-surface-raised p-4">
              <p className="mb-2 text-[11px] font-bold uppercase tracking-wide text-text-tertiary">Possible Causes</p>
              <ul className="flex flex-col gap-1.5 text-sm text-text-secondary">
                {causes.map((c) => (
                  <li key={c}>⊗ {c}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <Button variant="gradient" radius="full" className="w-full" onPress={() => navigate("/checkout")}>
              Retry Payment ↻
            </Button>
            <Button variant="flat" radius="full" className="w-full bg-surface-raised text-secondary" onPress={() => navigate("/checkout")}>
              Change Payment Method
            </Button>
          </div>

          <div className="mt-4 flex items-center justify-center gap-4 text-xs text-text-tertiary">
            <Link to="/premium">← Back to Plans</Link>
            <span>•</span>
            <button>Chat with Support</button>
          </div>

          <div className="mt-8 grid grid-cols-4 gap-4 border-t border-white/5 pt-6">
            {trust.map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-1.5 text-[11px] text-text-tertiary">
                <Icon className="h-4 w-4" />
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
