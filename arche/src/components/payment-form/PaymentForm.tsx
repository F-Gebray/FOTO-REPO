import React, { useState } from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { PaymentSchema } from "../../hooks/useValidation";
import FormField from "../ui/FormField";

const months = Array.from({ length: 12 }, (_, i) => ({
  value: String(i + 1).padStart(2, "0"),
  label: String(i + 1).padStart(2, "0"),
}));

const years = Array.from({ length: 10 }, (_, i) => ({
  value: String(2025 + i),
  label: String(2025 + i),
}));

interface PaymentFormProps {
  register: UseFormRegister<PaymentSchema>;
  errors: FieldErrors<PaymentSchema>;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ register, errors }) => {
  const [method, setMethod] = useState<"credit" | "bank" | "crypto">("credit");

  const methods = [
    { id: "credit" as const, label: "Credit Card" },
    { id: "bank" as const, label: "Bank Transfer" },
    { id: "crypto" as const, label: "Crypto" },
  ];

  return (
    <div>
      <p className="text-[9px] tracking-[3px] uppercase text-[#c9a96e] mb-2">
        03 — Payment
      </p>

      <h2 className="font-cormorant text-[26px] font-light text-[#f0ede6] mb-6">
        How would you like to pay?
      </h2>

      <div className="flex gap-[1.5px] mb-5">
        {methods.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => setMethod(m.id)}
            className={`flex-1 py-[0.6rem] font-montserrat text-[9px] tracking-[1.5px] uppercase cursor-pointer transition-all duration-300 border bg-transparent ${
              method === m.id
                ? "border-[#c9a96e] text-[#c9a96e]"
                : "border-white/12 text-white/40 hover:border-white/30"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* CREDIT CARD */}
      {method === "credit" && (
        <>
          <div className="flex gap-2 mb-5">
            {["VISA", "MC", "AMEX"].map((b) => (
              <div
                key={b}
                className="bg-[#161612] border border-white/10 px-3 py-1 text-[9px] tracking-[1px] text-white/30"
              >
                {b}
              </div>
            ))}
          </div>

          <FormField
            label="Cardholder Name"
            required
            placeholder="As it appears on card"
            error={errors.cardHolder?.message}
            {...register("cardHolder")}
          />

          <FormField
            label="Card Number"
            required
            placeholder="0000 0000 0000 0000"
            error={errors.cardNumber?.message}
            {...register("cardNumber", {
              onChange: (e) => {
                const value = e.target.value.replace(/\D/g, "").slice(0, 16);
                e.target.value = value.replace(/(.{4})/g, "$1 ").trim();
              },
            })}
          />

          <div className="grid grid-cols-3 gap-4">
            <FormField
              as="select"
              label="Expiry Month"
              required
              error={errors.expiryMonth?.message}
              options={[{ value: "", label: "MM" }, ...months]}
              {...register("expiryMonth")}
            />

            <FormField
              as="select"
              label="Expiry Year"
              required
              error={errors.expiryYear?.message}
              options={[{ value: "", label: "YYYY" }, ...years]}
              {...register("expiryYear")}
            />

            <FormField
              label="CVV"
              required
              placeholder="•••"
              maxLength={4}
              error={errors.cvv?.message}
              {...register("cvv")}
            />
          </div>
        </>
      )}

      {/* BANK TRANSFER */}
      {method === "bank" && (
        <div className="bg-[#161612] p-5 border-l-[1.5px] border-[#c9a96e]">
          <p className="text-[9px] tracking-[2px] uppercase text-[#c9a96e] mb-2">
            Bank Transfer Details
          </p>
          <p className="text-[11px] text-white/50 leading-[1.9]">
            IBAN: IT60 X054 2811 1010 0000 0123 456
            <br />
            BIC/SWIFT: SELBIT2BXXX
            <br />
            Bank: Banca Archē S.p.A., Milan
          </p>
          <p className="text-[9px] text-white/30 mt-3">
            Please include your reservation ID as reference.
          </p>
        </div>
      )}

      {/* CRYPTO */}
      {method === "crypto" && (
        <div className="bg-[#161612] p-5 border-l-[1.5px] border-[#c9a96e]">
          <p className="text-[9px] tracking-[2px] uppercase text-[#c9a96e] mb-2">
            Accepted Currencies
          </p>
          <p className="text-[11px] text-white/50 leading-[1.9]">
            Bitcoin (BTC), Ethereum (ETH), USDC
            <br />
            Wallet address provided after reservation request.
          </p>
        </div>
      )}
    </div>
  );
};

export default PaymentForm;
