import { useState } from "react";

export default function InputEmail(props) {
  const [isValid, setIsValid] = useState(false);
  const validateEmail = (email) => {
    // Regular expression to match email format
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValid(regex.test(email));
  };

  return (
    <div style={{ width: "100%" }}>
      <input
        {...props}
        type="text"
        onChange={(e) => {
          props.onChange(e);
          validateEmail(e.target.value);
        }}
      />
      {!isValid && (
        <div className="error-message">Please enter a valid email.</div>
      )}
    </div>
  );
}
