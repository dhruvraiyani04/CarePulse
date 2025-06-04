
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { decryptKey, encryptKey } from "@/lib/utils";

export const PasskeyModal = () => {
  const [open, setOpen] = useState(true); // Modal starts as open
  const [passkey, setPasskey] = useState(""); // Passkey entered by user
  const [error, setError] = useState(""); // Error message
  const router = useRouter(); // For navigation

  // Function to handle passkey validation
  const handlePasskeySubmit = () => {
    if (passkey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
      const encryptedKey = encryptKey(passkey);
      localStorage.setItem("accessKey", encryptedKey); // Store passkey in localStorage
      router.push("/admin"); // Redirect to admin page
    } else {
      setError("Invalid passkey. Please try again."); // Show error message
      setOpen(false); // Set open state to false
      setTimeout(() => {
        setOpen(true); // Set open state to true after a brief moment
      }, 50);
      setPasskey(""); // Clear error state
    }
  };

  // Function to handle changes in the passkey input
  const handlePasskeyChange = (value: string) => {
    setPasskey(value); // Update passkey state
    setError(""); // Clear error message
  };

  const closeModal = () => {
    setOpen(false); // Close modal
    router.push("/"); // Redirect to home page
  };

  const set = () => {
    setOpen(true)
  }
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="shad-alert-dialog">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-start justify-between">
            Admin Access Verification
            <Image
              src="/assets/icons/close.svg"
              alt="close"
              width={20}
              height={20}
              onClick={closeModal} // Close modal and redirect to home
              className="cursor-pointer"
            />
          </AlertDialogTitle>
          <AlertDialogDescription>
            To access the admin page, please enter the passkey.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div>
          <InputOTP
            maxLength={6}
            value={passkey}
            onChange={(value) => handlePasskeyChange(value)} // Properly handle passkey input changes
          >
            <InputOTPGroup className="shad-otp">
              <InputOTPSlot className="shad-otp-slot" index={0} />
              <InputOTPSlot className="shad-otp-slot" index={1} />
              <InputOTPSlot className="shad-otp-slot" index={2} />
              <InputOTPSlot className="shad-otp-slot" index={3} />
              <InputOTPSlot className="shad-otp-slot" index={4} />
              <InputOTPSlot className="shad-otp-slot" index={5} />
            </InputOTPGroup>
          </InputOTP>
          {error && (
            <p className="shad-error text-14-regular mt-4 flex justify-center">
              {error} {/* Display error message */}
            </p>

          )
          }
        </div>

        <AlertDialogFooter>
          <AlertDialogAction
            onClick={handlePasskeySubmit} // Validate passkey on click
            className="shad-primary-btn w-full"
          >
            Enter Admin Passkey
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

