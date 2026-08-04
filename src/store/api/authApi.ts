import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";

interface SendOtpArgs {
  identifier: string;
}
interface SendOtpResult {
  identifier: string;
  maskedTarget: string;
}
interface VerifyOtpArgs {
  identifier: string;
  code: string;
}
interface VerifyOtpResult {
  token: string;
  user: { id: string; name: string; tier: "Free" | "Pro Member" };
}

const delay = <T>(data: T, ms = 400) =>
  new Promise<{ data: T }>((resolve) => setTimeout(() => resolve({ data }), ms));

function maskIdentifier(identifier: string) {
  if (identifier.includes("@")) {
    const [name, domain] = identifier.split("@");
    return `${name.slice(0, 2)}${"•".repeat(Math.max(name.length - 2, 3))}@${domain}`;
  }
  return `+91 ${"•".repeat(Math.max(identifier.length - 4, 4))}${identifier.slice(-4)}`;
}

/** No backend yet — any 6-digit code verifies successfully. */
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    sendOtp: builder.mutation<SendOtpResult, SendOtpArgs>({
      queryFn: ({ identifier }) => delay({ identifier, maskedTarget: maskIdentifier(identifier) }),
    }),
    verifyOtp: builder.mutation<VerifyOtpResult, VerifyOtpArgs>({
      queryFn: async ({ code }) => {
        if (code.length !== 6) {
          return { error: { status: 400, data: "Enter the full 6-digit code" } };
        }
        const result = await delay({
          token: "mock-session-token",
          user: { id: "u-1", name: "Sachin", tier: "Pro Member" as const },
        });
        return result;
      },
    }),
  }),
});

export const { useSendOtpMutation, useVerifyOtpMutation } = authApi;
