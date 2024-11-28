import React, { useState, useEffect } from "react";

const generateCaptcha = (length = 6) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let captcha = "";
  for (let i = 0; i < length; i++) {
    captcha += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return captcha;
};

const Captcha = ({
  onVerify,
  length = 6,
  refreshButtonClassName = "btn btn-outline btn-sm",
  verifyButtonClassName = "btn btn-outline hover:bg-[#D1A054] hover:text-white",
  inputClassName = "w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500",
}) => {
  const [captcha, setCaptcha] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    setCaptcha(generateCaptcha(length));
  }, [length]);

  // Handle CAPTCHA validation
  const handleCaptchaValidation = () => {
    if (captchaInput.toLowerCase() === captcha.toLowerCase()) {
      setIsVerified(true);
      alert("CAPTCHA verified successfully!");
      onVerify(true);
    } else {
      setIsVerified(false);
      setCaptchaInput("");
      alert("Incorrect CAPTCHA. Please try again.");
      onVerify(false);
    }
  };

  // Refresh CAPTCHA
  const handleRefreshCaptcha = () => {
    setCaptcha(generateCaptcha(length));
    setCaptchaInput("");
    setIsVerified(false);
    onVerify(false);
  };

  return (
    <div className="space-y-4">
      {/* CAPTCHA Display */}
      <div className="w-full pl-10 pr-4 py-4 rounded-lg border bg-white font-bold text-center tracking-widest">
        <div className="flex items-center justify-between gap-2">
          {captcha}
          <button
            type="button"
            onClick={handleRefreshCaptcha}
            className={refreshButtonClassName}
          >
            Refresh
          </button>
        </div>
      </div>

      {/* CAPTCHA Input */}
      <div className="flex items-center gap-2">
        <div className="relative flex-grow">
          <input
            type="text"
            value={captchaInput}
            onChange={(e) => setCaptchaInput(e.target.value)}
            maxLength={length}
            className={inputClassName}
            placeholder="Enter CAPTCHA"
            required
          />
        </div>

        <button
          type="button"
          onClick={handleCaptchaValidation}
          className={verifyButtonClassName}
        >
          Verify
        </button>
      </div>
    </div>
  );
};

export default Captcha;
