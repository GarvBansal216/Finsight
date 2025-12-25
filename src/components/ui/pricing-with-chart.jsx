import { Button } from "./button";
import { CheckCircleIcon } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import { Link } from "react-router-dom";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./chart";

export function PricingWithChart() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      {/* Heading */}
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-white">
          Pricing that Scales with You
        </h1>
        <p className="text-muted-foreground mt-4 text-sm md:text-base text-white/80">
          Choose the right plan to unlock powerful tools and insights.
          Transparent pricing built for modern teams.
        </p>
      </div>

      {/* Pricing Grid */}
      <div className="bg-background grid rounded-xl border border-[#333333] md:grid-cols-6 bg-[#1a1a1a]">
        {/* Free Plan */}
        <div className="flex flex-col justify-between border-b border-[#333333] p-6 md:col-span-2 md:border-r md:border-b-0">
          <div className="space-y-4">
            <div>
              <h2 className="backdrop-blur-2 inline rounded-[2px] p-1 text-xl font-semibold text-white">
                Free
              </h2>
              <span className="my-3 block text-3xl font-bold text-purple-600">
                $0
              </span>
              <p className="text-muted-foreground text-sm text-white/70">
                Best for testing & understanding
              </p>
            </div>

            <Button asChild variant="outline" className="w-full border-white/20 text-white hover:bg-white/10 hover:text-white">
              <Link to="/signup">Get Started</Link>
            </Button>

            <div className="bg-border my-6 h-px w-full bg-[#333333]" />

            <ul className="text-muted-foreground space-y-3 text-sm text-white/70">
              {[
                "Basic Analytics Dashboard",
                "5GB Cloud Storage",
                "Email & Chat Support",
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-2">
                  <CheckCircleIcon className="h-4 w-4 text-purple-600" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Pro Plan */}
        <div className="z-10 grid gap-8 overflow-hidden p-6 md:col-span-4 lg:grid-cols-2">
          {/* Pricing + Chart */}
          <div className="flex flex-col justify-between space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-white">Pro Monthly Package</h2>
              <span className="my-3 block text-3xl font-bold text-purple-600">
                $299
              </span>
              <p className="text-muted-foreground text-sm text-white/70">
                Perfect for small businesses & startups
              </p>
            </div>
            <div className="bg-[#1a1a1a] h-fit w-full rounded-lg border border-[#333333] p-2">
              <InterestChart />
            </div>
          </div>
          {/* Features */}
          <div className="relative w-full">
            <div className="text-sm font-medium text-white">Everything in Free plus:</div>
            <ul className="text-muted-foreground mt-4 space-y-3 text-sm text-white/70">
              {[
                "Unlimited access to all tools",
                "Priority customer support",
                "Advanced analytics dashboard",
                "Team collaboration included",
                "Secure cloud storage",
                "Customizable workflows and automation",
                "Integration with popular third-party apps",
                "Role-based access control and permissions",
                "Offline access with automatic sync",
                "Regular updates with new features",
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-2">
                  <CheckCircleIcon className="h-4 w-4 text-purple-500" />
                  {item}
                </li>
              ))}
            </ul>

            {/* Call to Action */}
            <div className="mt-10 grid w-full grid-cols-2 gap-2.5">
              <Button
                asChild
                className="bg-purple-600 text-white hover:bg-purple-700 hover:text-white"
              >
                <Link to="/signup">Get Started</Link>
              </Button>
              <Button asChild variant="outline" className="border-white/20 text-white hover:bg-white/10 hover:text-white">
                <Link to="/signup">Start free trial</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InterestChart() {
  const chartData = [
    { month: "January", interest: 120 },
    { month: "February", interest: 180 },
    { month: "March", interest: 150 },
    { month: "April", interest: 210 },
    { month: "May", interest: 250 },
    { month: "June", interest: 300 },
    { month: "July", interest: 280 },
    { month: "August", interest: 320 },
    { month: "September", interest: 340 },
    { month: "October", interest: 390 },
    { month: "November", interest: 420 }, // pre-holiday spike
    { month: "December", interest: 500 }, // big holiday spike
  ];

  const chartConfig = {
    interest: {
      label: "Interest",
      color: "hsl(259, 94%, 51%)",
    },
  };

  return (
    <Card className="border-0 shadow-none bg-transparent">
      <CardHeader className="space-y-0 border-b border-[#333333] p-3 bg-transparent">
        <CardTitle className="text-lg text-white">Plan Popularity</CardTitle>
        <CardDescription className="text-xs text-white/70">
          Monthly trend of people considering this plan.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-3 bg-transparent">
        <ChartContainer config={chartConfig}>
          <LineChart data={chartData} margin={{ left: 12, right: 12 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#333333" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
              tick={{ fill: '#ffffff', fontSize: 12 }}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="interest"
              type="monotone"
              stroke="hsl(259, 94%, 51%)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

