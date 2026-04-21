import { memo } from "react";
import styles from "./Button.module.css";

const Button = memo(function Button({
  children,
  onClick,
  variant = "primary",
  size = "md",
  disabled = false,
  fullWidth = false,
  type = "button",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={[
        styles.btn,
        styles[variant],
        styles[size],
        fullWidth ? styles.fullWidth : "",
      ].join(" ")}
    >
      {children}
    </button>
  );
});

export default Button;
