import React from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { GuestInfoSchema } from "../../hooks/useValidation";
import FormField from "../ui/FormField";

const nationalities = ["Select nationality","American","British","Canadian","Ethiopian","French","German","Greek","Indonesian","Italian","Japanese","Moroccan","Norwegian","Spanish","Other"];

interface GuestFormProps {
  register: UseFormRegister<GuestInfoSchema>;
  errors: FieldErrors<GuestInfoSchema>;
}

const GuestForm: React.FC<GuestFormProps> = ({ register, errors }) => {
  return (
    <div>
      <p className="text-[9px] tracking-[3px] uppercase text-[#c9a96e] mb-2">01 — Guest Information</p>
      <h2 className="font-cormorant text-[26px] font-light text-[#f0ede6] mb-6">Who is staying?</h2>

      <div className="grid grid-cols-2 gap-4">
        <FormField label="First Name" required placeholder="e.g. Fitwi" error={errors.firstName?.message} {...register("firstName")} />
        <FormField label="Last Name" required placeholder="e.g. Gebray" error={errors.lastName?.message} {...register("lastName")} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <FormField label="Email Address" required type="email" placeholder="your@email.com" error={errors.email?.message} {...register("email")} />
        <FormField label="Phone Number" required type="tel" placeholder="+1 000 000 0000" error={errors.phone?.message} {...register("phone")} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <FormField as="select" label="Nationality" required error={errors.nationality?.message}
          options={nationalities.map((n) => ({ value: n, label: n }))}
          {...register("nationality")} />
        <FormField as="select" label="Number of Guests" required error={errors.guests?.message}
          options={[2,4,6,8,10,12].map((n) => ({ value: String(n), label: `${n} guests` }))}
          {...register("guests", { valueAsNumber: true })} />
      </div>
      <FormField as="textarea" label="Special Requests" placeholder="Dietary requirements, accessibility needs, arrival preferences..." {...register("specialRequests")} />
    </div>
  );
};

export default GuestForm;
