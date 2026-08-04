import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, Tab, Input, Checkbox, Divider } from "@heroui/react";
import { User, Mail } from "lucide-react";
import { AuthLayout } from "./AuthLayout";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { useSendOtpMutation } from "@/store/api/authApi";
import { useAppDispatch } from "@/store/hooks";
import { otpSent } from "@/store/slices/auth.slice";

export function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [sendOtp, { isLoading }] = useSendOtpMutation();

  const [mode, setMode] = useState<"mobile" | "email">("mobile");
  const [identifier, setIdentifier] = useState("");
  const [remember, setRemember] = useState(false);

  async function handleSubmit() {
    if (!identifier) return;
    const result = await sendOtp({ identifier }).unwrap();
    dispatch(otpSent(result));
    navigate("/otp");
  }

  return (
    <AuthLayout>
      <h2 className="font-display text-2xl font-bold text-text-primary">Welcome Back</h2>
      <p className="mt-1 text-sm text-text-secondary">Sign in to continue watching.</p>

      <Tabs
        selectedKey={mode}
        onSelectionChange={(key) => setMode(key as "mobile" | "email")}
        fullWidth
        radius="lg"
        size="lg"
        classNames={{
          tabList: "mt-6 bg-surface-raised p-1 gap-1 h-14",
          cursor: "bg-gradient-cta shadow-glow-cta",
          tab: "h-12 data-[hover=true]:opacity-100",
          tabContent:
            "font-semibold text-text-tertiary transition-colors group-data-[selected=true]:text-text-on-accent",
        }}
      >
        <Tab key="mobile" title="Mobile" />
        <Tab key="email" title="Email" />
      </Tabs>

      <div className="mt-5 flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-text-secondary">
            {mode === "mobile" ? "Mobile Number / Email" : "Email Address"}
          </label>
          <Input
            aria-label={mode === "mobile" ? "Mobile number or email" : "Email address"}
            placeholder={mode === "mobile" ? "Enter your mobile or email" : "you@example.com"}
            value={identifier}
            onValueChange={setIdentifier}
            startContent={
              mode === "mobile" ? (
                <User className="h-4 w-4 shrink-0 text-text-tertiary" />
              ) : (
                <Mail className="h-4 w-4 shrink-0 text-text-tertiary" />
              )
            }
            variant="flat"
            radius="lg"
            size="lg"
            classNames={{
              inputWrapper: cn(
                "h-14 bg-surface-raised px-4 transition-shadow duration-200",
                "data-[hover=true]:bg-surface-raised",
                "group-data-[focus=true]:bg-surface-raised group-data-[focus=true]:shadow-[0_0_0_2px_rgb(var(--accent-secondary))]",
              ),
              innerWrapper: "gap-2.5",
              input: "bg-transparent appearance-none text-base text-text-primary placeholder:text-text-tertiary",
            }}
          />
        </div>

        <Checkbox
          isSelected={remember}
          onValueChange={setRemember}
          size="sm"
          classNames={{ base: "w-full max-w-full justify-start", label: "text-sm text-text-secondary" }}
        >
          Remember Me
        </Checkbox>

        <Button
          variant="gradient"
          size="lg"
          radius="full"
          className="w-full"
          isLoading={isLoading}
          onPress={handleSubmit}
        >
          Send OTP
        </Button>

        <div className="flex items-center gap-3">
          <Divider className="flex-1 bg-border-subtle" />
          <span className="text-xs uppercase tracking-wide text-text-tertiary">
            Or continue with
          </span>
          <Divider className="flex-1 bg-border-subtle" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="flat"
            radius="lg"
            className="h-14 bg-surface-raised text-base font-semibold text-text-primary hover:bg-white/10"
          >
            Google
          </Button>
          <Button
            variant="flat"
            radius="lg"
            className="h-14 bg-surface-raised text-base font-semibold text-text-primary hover:bg-white/10"
          >
            Apple
          </Button>
        </div>

        <p className="text-center text-sm text-text-secondary">
          New to WatchNXT?{" "}
          <button className="font-semibold text-secondary hover:brightness-110">
            Create New Account
          </button>
        </p>
      </div>
    </AuthLayout>
  );
}
