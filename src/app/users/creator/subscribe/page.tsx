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
  user: any
  handleCheckout: any
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
const PricingHeader = ({ title }: { title: string; }) => (
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
        toast('Failed to create checkout session')
        return
      }
    } catch (error) {
      console.error('Error during checkout:', error);
      toast('Error during checkout')
      return
    }
  };

  const plans = [
    {
      title: "Basic",
      monthlyPrice: 5000,
      description: "Essential features you need to get started",
      features: [
        "Access to standard content library",
        "Standard video quality (up to 720p)",
        "Single device streaming",
        "Limited offline downloads",
        "Basic customer support"
      ],
      priceIdMonthly: "https://buy.stripe.com/test_7sIdTgdWu9Zu0Sc4gj",
      actionLabel: "Get Started",
    },
    {
      title: "Pro",
      monthlyPrice: 10000,
      description: "Perfect for owners of small & medium businesses",
      features: [
        "Access to extended content library (including exclusive shows)",
        "High-definition video quality (up to 1080p)",
        "Multi-device streaming (up to 3 devices)",
        "Unlimited offline downloads",
        "Ad-free experience",
        "Priority customer support"
      ],
      actionLabel: "Get Started",
      priceIdMonthly: "https://buy.stripe.com/test_9AQbL89Ge4Fa0Sc3cg",
      popular: true,
    },
    {
      title: "Enterprise",
      monthlyPrice: 15000,
      description: "Dedicated support and infrastructure to fit your needs",
      features: [
        "Ultra-high-definition video quality (up to 4K and HDR)",
        "Multi-device streaming (up to 10 devices)",
        "Unlimited offline downloads",
        "Ad-free experience",
        "Dedicated account manager",
        "24/7 premium customer support",
        "Customizable user profiles",
        "Advanced analytics and reporting tools",
        "Content request options",
        "Special access to early releases and beta content"
      ],
      actionLabel: "Get Started",
      priceIdMonthly: "https://buy.stripe.com/test_4gwaH43hQefK1Wg8wx" ,
    }
  ];
  

  return (
    <div>
      <div className="absolute top-4 left-4 flex space-x-4">
       <a href="/users/creator"><FiHome /></a>
       <a href="/users/creator/profile"><BiArrowBack /></a>
      </div>
      <PricingHeader title="Pricing Plans"  />
      <section className="flex flex-col sm:flex-row sm:flex-wrap justify-center gap-8 mt-8">
        {plans.map((plan) => {
          return <PricingCard user={userId} handleCheckout={handleCheckout} key={plan.title} {...plan} />
        })}
      </section>
    </div>
  )
}
