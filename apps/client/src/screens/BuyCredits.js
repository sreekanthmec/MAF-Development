import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import BackIcon from "../components/BackIcon";
import { PrimaryButton } from "../components/Button";
import { SingleInput } from "../components/InputComponents";

const stripePromise = loadStripe(
  "pk_test_51PpktVDR2pvMyQSx1nuDphfPYavVb5gH06T3bHMjQdwCUECtN2f6TSXjknsR9wZBrBn3GV4XzHOhSZDebg0dbAfO00mSx8xUcg"
); // Your Stripe publishable key

const BuyCredits = () => {
  const navigate = useNavigate();
  const [credits, setCredits] = useState(10);
  const [isProcessing, setIsProcessing] = useState(false);

  const creditCost = 30; // Assume each credit costs $30
  const totalCost = credits * creditCost * 100; // Stripe works with the smallest currency unit (e.g., cents)

  const handlePay = async () => {
    setIsProcessing(true);

    try {
      // Create a Checkout Session on the server
      const response = await fetch(
        "http://localhost:3002/create-checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount: totalCost }),
        }
      );

      const { id } = await response.json();

      // Load the Stripe object
      const stripe = await stripePromise;

      if (!stripe) {
        console.error("Stripe.js failed to load.");
        return;
      }

      // Redirect to Stripe Checkout
      const { error } = await stripe.redirectToCheckout({
        sessionId: id,
      });

      if (error) {
        console.error(error);
        alert("Payment failed");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 relative">
      <header className="flex items-center mb-4">
        <BackIcon />
      </header>

      <section className="mb-4">
        <h1 className="text-2xl font-bold mb-6">Buy Credits</h1>

        <div className="flex justify-center items-center mb-4">
          <button
            onClick={() => setCredits(credits - 1)}
            className="p-2 bg-[#EB2726] text-white rounded"
            disabled={credits <= 1}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M19 13H5V11H19V13Z" fill="white" />
            </svg>
          </button>
          <span className="text-xl mx-4">{credits}</span>
          <button
            onClick={() => setCredits(credits + 1)}
            className="p-2 bg-[#EB2726] text-white rounded"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z"
                fill="white"
              />
            </svg>
          </button>
        </div>

        <SingleInput
          label="Select Credit Amount"
          options={[20, 50, 100, 250]}
          selected={credits}
          onSelect={(value) => setCredits(value)}
        />

        <div className="bg-yellow-100 p-4 rounded-md mb-4 flex justify-between items-center">
          <div className="flex items-center">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                fill="#FFD700"
              />
            </svg>
            <span className="ml-2 font-bold">1 Credit = ${creditCost}</span>
          </div>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
              fill="#FFD700"
            />
          </svg>
        </div>

        <div className="flex justify-between items-center mb-4">
          <p className="text-gray-600">Total cost</p>
          <p className="text-xl font-bold">${totalCost / 100}</p>
        </div>

        <PrimaryButton
          label={isProcessing ? "Processing..." : "PAY"}
          onClick={handlePay}
          disabled={isProcessing || !stripePromise}
        />
      </section>
    </div>
  );
};

export default BuyCredits;
