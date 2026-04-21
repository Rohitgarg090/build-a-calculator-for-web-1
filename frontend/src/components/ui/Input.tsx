import React, { forwardRef, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      fullWidth = false,
      disabled = false,
      className = "",
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    const baseInputStyles: React.CSSProperties = {
      width: "100%",
      padding: leftIcon ? "10px 12px 10px 40px" : rightIcon ? "10px 40px 10px 12px" : "10px 12px",
      backgroundColor: "#1c1c1f",
      border: `1px solid ${error ? "#f87171" : "#2e2e33"}`,
      borderRadius: "8px",
      color: disabled ? "#6b7280" : "#f4f4f5",
      fontSize: "14px",
      lineHeight: "1.5",
      outline: "none",
      transition: "border-color 0.2s ease, box-shadow 0.2s ease",
      cursor: disabled ? "not-allowed" : "text",
      opacity: disabled ? 0.6 : 1,
      boxSizing: "border-box",
    };

    const containerStyles: React.CSSProperties = {
      display: "flex",
      flexDirection: "column",
      gap: "6px",
      width: fullWidth ? "100%" : "auto",
      position: "relative",
    };

    const labelStyles: React.CSSProperties = {
      fontSize: "13px",
      fontWeight: 500,
      color: disabled ? "#6b7280" : "#a78bfa",
      letterSpacing: "0.02em",
    };

    const wrapperStyles: React.CSSProperties = {
      position: "relative",
      display: "flex",
      alignItems: "center",
    };

    const iconBaseStyles: React.CSSProperties = {
      position: "absolute",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#6b7280",
      pointerEvents: "none",
      top: "50%",
      transform: "translateY(-50%)",
    };

    const leftIconStyles: React.CSSProperties = {
      ...iconBaseStyles,
      left: "12px",
    };

    const rightIconStyles: React.CSSProperties = {
      ...iconBaseStyles,
      right: "12px",
    };

    const errorStyles: React.CSSProperties = {
      fontSize: "12px",
      color: "#f87171",
      display: "flex",
      alignItems: "center",
      gap: "4px",
    };

    const helperStyles: React.CSSProperties = {
      fontSize: "12px",
      color: "#6b7280",
    };

    return (
      <div style={containerStyles} className={className}>
        {label && (
          <label htmlFor={inputId} style={labelStyles}>
            {label}
          </label>
        )}
        <div style={wrapperStyles}>
          {leftIcon && <span style={leftIconStyles}>{leftIcon}</span>}
          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={
              error
                ? `${inputId}-error`
                : helperText
                ? `${inputId}-helper`
                : undefined
            }
            style={baseInputStyles}
            onFocus={(e) => {
              if (!disabled) {
                e.currentTarget.style.borderColor = error ? "#f87171" : "#6366f1";
                e.currentTarget.style.boxShadow = error
                  ? "0 0 0 3px rgba(248, 113, 113, 0.15)"
                  : "0 0 0 3px rgba(99, 102, 241, 0.2)";
              }
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = error ? "#f87171" : "#2e2e33";
              e.currentTarget.style.boxShadow = "none";
              props.onBlur?.(e);
            }}
            {...props}
          />
          {rightIcon && <span style={rightIconStyles}>{rightIcon}</span>}
        </div>
        {error && (
          <span id={`${inputId}-error`} style={errorStyles} role="alert">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <circle cx="6" cy="6" r="5.5" stroke="#f87171" />
              <path
                d="M6 3.5V6.5"
                stroke="#f87171"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
              <circle cx="6" cy="8.5" r="0.6" fill="#f87171" />
            </svg>
            {error}
          </span>
        )}
        {helperText && !error && (
          <span id={`${inputId}-helper`} style={helperStyles}>
            {helperText}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;