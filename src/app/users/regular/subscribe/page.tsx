// File path: /components/Pricing.tsx

"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../_components/card"
import { CheckCircle2 } from "lucide-react"
import React, { useState, useEffect } from "react"
import { cn } from "../../../../lib/utils"
import axios from "axios"
import { loadStripe } from "@stripe/stripe-js"
import { toast } from "react-hot-toast"
import { FiHome } from "react-icons/fi";
import { BiArrowBack } from "react-icons/bi";

type PricingCardProps = {
  user: string
  handleCheckout: (priceId: string, subscription: boolean) => void
  priceIdMonthly: string
  title: string
  monthlyPrice: number
  description: string
  features: string[]
  actionLabel: string
  popular?: boolean
  exclusive?: boolean
}

const PricingCard = ({ user, handleCheckout, title, priceIdMonthly, monthlyPrice, description, features, actionLabel, popular, exclusive }: PricingCardProps) => (
  <Card
    className={cn(`w-72 flex flex-col justify-between py-1 ${popular ? "border-rose-400" : "border-zinc-700"} mx-auto sm:mx-0`, {
      "animate-background-shine bg-white dark:bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] transition-colors":
        exclusive,
    })}>
    <div>
      <CardHeader className="pb-8 pt-4">
        <CardTitle className="text-zinc-700 dark:text-zinc-300 text-lg">{title}</CardTitle>
        <div className="flex gap-0.5">
          <h3 className="text-3xl font-bold">K{monthlyPrice}</h3>
          <span className="flex flex-col justify-end text-sm mb-1">/month</span>
        </div>
        <CardDescription className="pt-1.5 h-12">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {features.map((feature: string) => (
          <CheckItem key={feature} text={feature} />
        ))}
      </CardContent>
    </div>
    <CardFooter className="mt-2">
      <button onClick={() => handleCheckout(priceIdMonthly, true)} className="relative inline-flex w-full items-center justify-center rounded-md bg-black text-white dark:bg-white px-6 font-medium  dark:text-black transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
        <div className="absolute -inset-0.5 -z-10 rounded-lg bg-gradient-to-b from-[#c7d2fe] to-[#8678f9] opacity-75 blur" />
        {actionLabel}
      </button>
    </CardFooter>
  </Card>
)

const CheckItem = ({ text }: { text: string }) => (
  <div className="flex gap-2">
    <CheckCircle2 size={18} className="my-auto text-green-400" />
    <p className="pt-0.5 text-zinc-700 dark:text-zinc-300 text-sm">{text}</p>
  </div>
)

const PricingHeader = ({ title }: { title: string }) => (
  <section className="text-center">
    <h2 className="text-3xl lg:text-5xl font-bold">{title}</h2>
    <br />
  </section>
)

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

export default function Pricing() {
  const [userId, setUserId] = useState("null");
  const [email, setEmail] = useState("null");

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/me");
      setUserId(res.data.data.userId);
      setEmail(res.data.data.email);
    } catch (error) {
      toast.error("Failed to fetch user details");
    }
  };

  const handleCheckout = async (priceId: string, subscription: boolean) => {
    try {
      const { data } = await axios.post(`/api/payments/create-checkout-session`,
        { userId: userId, email: email, priceId, subscription });

      if (data.sessionId) {
        const stripe = await stripePromise;

        const response = await stripe?.redirectToCheckout({
          sessionId: data.sessionId,
        });

        return response
      } else {
        console.error('Failed to create checkout session');
        toast('Failed to create checkout session');
        return
      }
    } catch (error) {
      console.error('Error during checkout:', error);
      toast('Error during checkout');
      return
    }
  };

  const plans = [
    {
      title: "Basic",
      priceIdMonthly: "price_1",
      monthlyPrice: 5000,
      description: "Basic plan description",
      features: ["Feature 1", "Feature 2", "Feature 3"],
      actionLabel: "Choose Basic",
    },
    {
      title: "Pro",
      priceIdMonthly: "price_2",
      monthlyPrice: 10000,
      description: "Pro plan description",
      features: ["Feature A", "Feature B", "Feature C"],
      actionLabel: "Choose Pro",
      popular: true,
    },
    {
      title: "Premium",
      priceIdMonthly: "price_3",
      monthlyPrice: 15000,
      description: "Premium plan description",
      features: ["Feature X", "Feature Y", "Feature Z"],
      actionLabel: "Choose Premium",
      exclusive: true,
    }
  ];

  return (
    <div>
      <div className="absolute top-4 left-4 flex space-x-4">
       <a href="/users/regular"><FiHome /></a>
       <a href="/users/regular/profile"><BiArrowBack /></a>
      </div>
      <PricingHeader title="Pricing Plans" />
      <section className="flex flex-col sm:flex-row sm:flex-wrap justify-center gap-8 mt-8">
        {plans.map((plan) => {
          return <PricingCard user={userId} handleCheckout={handleCheckout} key={plan.title} {...plan} />
        })}
      </section>
    </div>
  )
}
