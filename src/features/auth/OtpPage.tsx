import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import { AuthLayout } from "./AuthLayout";
import { OtpInput } from "@/components/ui/OtpInput";
import { Button } from "@/components/ui/Button";
import { useVerifyOtpMutation } from "@/store/api/authApi";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { otpVerified } from "@/store/slices/auth.slice";

const RESEND_SECONDS = 30;

export function OtpPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { pendingIdentifier, maskedTarget } = useAppSelector((s) => s.auth);
  const [verifyOtp, { isLoading, error }] = useVerifyOtpMutation();

  const [digits, setDigits] = useState<string[]>(Array(6).fill(""));
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const t = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [secondsLeft]);

  async function handleVerify() {
    const code = digits.join("");
    try {
      const result = await verifyOtp({ identifier: pendingIdentifier ?? "", code }).unwrap();
      dispatch(otpVerified(result.user));
      navigate("/");
    } catch {
      // surfaced via the `error` state from useVerifyOtpMutation
    }
  }

  return (
    <AuthLayout>
      <h2 className="font-display text-2xl font-bold text-text-primary">Verify OTP</h2>
      <p className="mt-1 text-sm text-text-secondary">
        We've sent a 6-digit verification code to:{" "}
        <span className="font-semibold text-secondary">{maskedTarget ?? "your device"}</span>
      </p>

      <div className="mt-6">
        <OtpInput value={digits} onChange={setDigits} />
      </div>

      {error ? (
        <p className="mt-3 text-sm text-danger">Enter the full 6-digit code to continue.</p>
      ) : null}

      <div className="mt-5 flex items-center justify-between text-sm">
        <span className="text-text-tertiary">
          {secondsLeft > 0 ? (
            <>
              Resend OTP in{" "}
              <span className="font-semibold text-text-secondary">
                00:{String(secondsLeft).padStart(2, "0")}
              </span>
            </>
          ) : (
            <button
              onClick={() => setSecondsLeft(RESEND_SECONDS)}
              className="font-semibold text-secondary hover:brightness-110"
            >
              Resend OTP
            </button>
          )}
        </span>
        <button onClick={() => navigate("/login")} className="text-text-secondary hover:text-text-primary">
          Change Mobile Number
        </button>
      </div>

      <Button
        variant="gradient"
        size="lg"
        radius="full"
        className="mt-6 w-full"
        isLoading={isLoading}
        onPress={handleVerify}
      >
        Verify &amp; Continue →
      </Button>

      <div className="mt-5 flex items-center gap-2 rounded-md bg-surface-raised px-4 py-3">
        <ShieldCheck className="h-5 w-5 shrink-0 text-secondary" />
        <div>
          <p className="text-sm font-semibold text-text-primary">Secure OTP Verification</p>
          <p className="text-xs text-text-tertiary">256-bit encrypted authentication</p>
        </div>
      </div>
    </AuthLayout>
  );
}
