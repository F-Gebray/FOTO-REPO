import React, {
  InputHTMLAttributes,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

interface BaseProps {
  label: string;
  error?: string;
  required?: boolean;
}

interface InputProps extends BaseProps, InputHTMLAttributes<HTMLInputElement> {
  as?: "input";
}

interface SelectProps
  extends BaseProps, SelectHTMLAttributes<HTMLSelectElement> {
  as: "select";
  options: { value: string; label: string }[];
}

interface TextareaProps
  extends BaseProps, TextareaHTMLAttributes<HTMLTextAreaElement> {
  as: "textarea";
}

type FormFieldProps = InputProps | SelectProps | TextareaProps;

const baseClass =
  "bg-[#161612] border px-4 py-3 font-montserrat text-[11px] text-[#f0ede6] w-full outline-none transition-colors duration-300 placeholder:text-white/20";

const FormField = React.forwardRef<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement,
  FormFieldProps
>((props, ref) => {
  const { label, error, required, as = "input", ...rest } = props;

  const borderClass = error
    ? "border-red-500/60 focus:border-red-500"
    : "border-white/12 focus:border-[#c9a96e]/50";

  return (
    <div className="flex flex-col gap-1.5 mb-5">
      <label className="text-[8px] tracking-[2.5px] uppercase text-white/40 flex items-center gap-1">
        {label}
        {required && <span className="text-[#c9a96e]">*</span>}
      </label>

      {as === "select" ? (
        <select
          ref={ref as React.Ref<HTMLSelectElement>}
          className={`${baseClass} ${borderClass} cursor-pointer appearance-none`}
          {...(rest as SelectHTMLAttributes<HTMLSelectElement>)}
        >
          {(props as SelectProps).options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : as === "textarea" ? (
        <textarea
          ref={ref as React.Ref<HTMLTextAreaElement>}
          className={`${baseClass} ${borderClass} resize-none h-24 leading-[1.8]`}
          {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          ref={ref as React.Ref<HTMLInputElement>}
          className={`${baseClass} ${borderClass}`}
          {...(rest as InputHTMLAttributes<HTMLInputElement>)}
        />
      )}

      {error && (
        <p className="text-[10px] text-red-400 flex items-center gap-1">
          <span>⚠</span> {error}
        </p>
      )}
    </div>
  );
});
FormField.displayName = "FormField";

export default FormField;
