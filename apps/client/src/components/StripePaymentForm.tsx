import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { PrimaryButton } from "./Button";

interface StripePaymentFormProps {
  amount: number;
  credits: number;
  onSuccess: (paymentResult: any) => void;
  onError: (error: string) => void;
  processing: boolean;
  setProcessing: (processing: boolean) => void;
}

const cardElementOptions = {
  style: {
    base: {
      fontSize: "16px",
      color: "#424770",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#9e2146",
    },
  },
};

const StripePaymentForm: React.FC<StripePaymentFormProps> = ({
  amount,
  credits,
  onSuccess,
  onError,
  processing,
  setProcessing,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);
    setCardError(null);

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      setProcessing(false);
      onError("Card element not found");
      return;
    }

    try {
      // Create payment method
      const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

      if (paymentMethodError) {
        setCardError(paymentMethodError.message || "Payment method creation failed");
        setProcessing(false);
        return;
      }

      if (!paymentMethod) {
        setProcessing(false);
        onError("Failed to create payment method");
        return;
      }

      // For testing purposes, we'll simulate different scenarios based on card number
      console.log("Payment method created:", paymentMethod.id);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate different test scenarios
      const cardNumber = paymentMethod.card?.last4;
      
      // Test failure scenarios
      if (cardNumber === "0002") {
        // Simulate card declined
        onError("Your card was declined. Please try a different card.");
        return;
      } else if (cardNumber === "9999") {
        // Simulate insufficient funds
        onError("Insufficient funds. Please try a different card.");
        return;
      }
      
      // Simulate success (replace with actual API call)
      const successResult = {
        paymentMethodId: paymentMethod.id,
        amount,
        credits,
        status: "succeeded",
      };
      
      onSuccess(successResult);
    } catch (error) {
      console.error("Payment error:", error);
      onError("Payment processing failed. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="bg-white border border-gray-300 rounded p-4">
        <CardElement options={cardElementOptions} />
      </div>
      
      {cardError && (
        <div className="text-red-600 text-sm">
          {cardError}
        </div>
      )}
      
      <PrimaryButton
        type="submit"
        label={processing ? "PROCESSING..." : "PAY"}
        disabled={!stripe || processing}
        className="!w-full"
      />
    </form>
  );
};

export default StripePaymentForm;
