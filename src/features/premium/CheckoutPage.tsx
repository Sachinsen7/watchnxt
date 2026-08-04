import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CreditCard, Landmark, Wallet, QrCode, ShieldCheck, Zap, Lock, CalendarX } from "lucide-react";
import { Input } from "@heroui/react";
import { Button } from "@/components/ui/Button";
import { useGetPricingPlansQuery } from "@/store/api/contentApi";

const steps = ["Choose Plan", "Payment", "Confirmation"];
const methods = [
  { key: "upi", label: "UPI", icon: QrCode },
  { key: "card", label: "Card", icon: CreditCard },
  { key: "netbanking", label: "Net Banking", icon: Landmark },
  { key: "wallets", label: "Wallets", icon: Wallet },
];

export function CheckoutPage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { data: plans = [] } = useGetPricingPlansQuery();
  const plan = plans.find((p) => p.id === params.get("plan")) ?? plans.find((p) => p.id === "p-monthly") ?? plans[0];
  const [method, setMethod] = useState("card");
  const [promo, setPromo] = useState("");

  if (!plan) return null;

  const price = Number(plan.price.replace(/[^0-9]/g, ""));

  return (
    <div className="mx-auto max-w-6xl px-6 py-10 md:px-10">
      <h1 className="font-display text-2xl font-bold text-text-primary">Checkout</h1>
      <p className="mt-1 text-sm text-text-secondary">Complete your purchase to unlock premium sports streaming.</p>

      <div className="mt-6 flex items-center gap-3">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                  i === 1 ? "bg-primary text-text-on-accent" : "bg-surface-raised text-text-tertiary"
                }`}
              >
                {i + 1}
              </span>
              <span className={i === 1 ? "text-sm font-semibold text-text-primary" : "text-sm text-text-tertiary"}>
                {s}
              </span>
            </div>
            {i < steps.length - 1 && <span className="h-px w-10 bg-white/10" />}
          </div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
        <div className="flex flex-col gap-6">
          <div className="rounded-lg bg-surface p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-display text-lg font-bold text-text-primary">👑 {plan.name}</p>
                <p className="mt-1">
                  <span className="font-display text-2xl font-extrabold text-text-primary">{plan.price}</span>
                  {plan.period && <span className="text-sm text-text-tertiary"> / {plan.period}</span>}
                </p>
              </div>
              <button className="text-sm font-semibold text-secondary">Change Plan</button>
            </div>
            <ul className="mt-4 grid grid-cols-2 gap-2 text-sm text-text-secondary">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <span className="text-secondary">✓</span> {f}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg bg-surface p-6">
            <p className="mb-3 text-xs font-bold uppercase tracking-wide text-text-tertiary">Payment Method</p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {methods.map((m) => (
                <button
                  key={m.key}
                  onClick={() => setMethod(m.key)}
                  className={`flex flex-col items-center gap-2 rounded-md p-4 text-sm font-medium transition-colors ${
                    method === m.key
                      ? "bg-surface-raised text-primary shadow-glow-card"
                      : "bg-surface-raised/50 text-text-secondary hover:text-text-primary"
                  }`}
                >
                  <m.icon className="h-5 w-5" />
                  {m.label}
                </button>
              ))}
            </div>

            {method === "card" && (
              <div className="mt-6 flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-text-secondary">Card Number</label>
                  <Input
                    aria-label="Card Number"
                    placeholder="XXXX XXXX XXXX XXXX"
                    size="lg"
                    radius="lg"
                    classNames={{
                      inputWrapper: "h-14 bg-surface-raised group-data-[focus=true]:shadow-[0_0_0_2px_rgb(var(--accent-secondary))]",
                      input: "bg-transparent appearance-none text-base",
                    }}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-text-secondary">Expiry Date</label>
                    <Input
                      aria-label="Expiry Date"
                      placeholder="MM / YY"
                      size="lg"
                      radius="lg"
                      classNames={{
                        inputWrapper: "h-14 bg-surface-raised group-data-[focus=true]:shadow-[0_0_0_2px_rgb(var(--accent-secondary))]",
                        input: "bg-transparent appearance-none text-base",
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-text-secondary">CVV</label>
                    <Input
                      aria-label="CVV"
                      placeholder="***"
                      size="lg"
                      radius="lg"
                      classNames={{
                        inputWrapper: "h-14 bg-surface-raised group-data-[focus=true]:shadow-[0_0_0_2px_rgb(var(--accent-secondary))]",
                        input: "bg-transparent appearance-none text-base",
                      }}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-text-secondary">Cardholder Name</label>
                  <Input
                    aria-label="Cardholder Name"
                    placeholder="As shown on card"
                    size="lg"
                    radius="lg"
                    classNames={{
                      inputWrapper: "h-14 bg-surface-raised group-data-[focus=true]:shadow-[0_0_0_2px_rgb(var(--accent-secondary))]",
                      input: "bg-transparent appearance-none text-base",
                    }}
                  />
                </div>
              </div>
            )}
            {method !== "card" && (
              <p className="mt-6 text-sm text-text-tertiary">
                You'll be redirected to complete this payment via {methods.find((m) => m.key === method)?.label}.
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="rounded-lg bg-surface p-6">
            <h2 className="font-display text-lg font-bold text-text-primary">Order Summary</h2>
            <div className="mt-4 flex flex-col gap-2 text-sm">
              <div className="flex justify-between text-text-secondary">
                <span>{plan.name}</span>
                <span>₹{price.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-text-secondary">
                <span>Taxes &amp; GST (18%)</span>
                <span>₹0.00</span>
              </div>
              <div className="flex justify-between text-secondary">
                <span>Discount</span>
                <span>-₹0.00</span>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-4">
              <span className="font-display text-lg font-bold text-text-primary">Total</span>
              <span className="font-display text-2xl font-extrabold text-[#EEDBFF]">₹{price.toFixed(2)}</span>
            </div>

            <div className="mt-4 flex gap-2">
              <Input
                placeholder="Promo Code"
                value={promo}
                onValueChange={setPromo}
                radius="lg"
                classNames={{ inputWrapper: "bg-surface-raised", input: "bg-transparent appearance-none" }}
              />
              <Button variant="flat" radius="lg" className="shrink-0 bg-surface-raised text-text-primary">
                Apply
              </Button>
            </div>

            <Button
              variant="gradient"
              radius="full"
              className="mt-4 w-full"
              onPress={() => navigate("/payment/success")}
            >
              Pay ₹{price.toFixed(2)} Securely
            </Button>

            <div className="mt-4 grid grid-cols-2 gap-y-2 text-xs text-text-tertiary">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5" /> 256-bit SSL
              </span>
              <span className="flex items-center gap-1.5">
                <Zap className="h-3.5 w-3.5" /> Instant Access
              </span>
              <span className="flex items-center gap-1.5">
                <Lock className="h-3.5 w-3.5" /> Encrypted
              </span>
              <span className="flex items-center gap-1.5">
                <CalendarX className="h-3.5 w-3.5" /> Cancel Anytime
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
