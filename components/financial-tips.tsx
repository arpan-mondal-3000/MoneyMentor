"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Lightbulb, TrendingUp, Shield, PiggyBank, CreditCard } from "lucide-react"

export default function FinancialTips() {
  const tips = [
    {
      category: "Budgeting",
      icon: <PiggyBank className="h-5 w-5" />,
      color: "bg-green-100 text-green-800",
      tips: [
        {
          title: "Track Every Expense",
          description: "Record even small purchases like tea, snacks, or auto rides. Small amounts add up quickly!",
          difficulty: "Easy",
        },
        {
          title: "Use the Envelope Method",
          description: "Allocate fixed amounts for different categories: food, transport, entertainment, etc.",
          difficulty: "Medium",
        },
        {
          title: "Plan Weekly Budgets",
          description: "Instead of monthly budgets, plan weekly. It's easier to track and adjust.",
          difficulty: "Easy",
        },
      ],
    },
    {
      category: "Smart Spending",
      icon: <CreditCard className="h-5 w-5" />,
      color: "bg-blue-100 text-blue-800",
      tips: [
        {
          title: "Compare Prices Online",
          description: "Before buying anything above ₹200, check prices on different platforms.",
          difficulty: "Easy",
        },
        {
          title: "Use Student Discounts",
          description: "Many brands offer student discounts. Always ask or check online for student deals.",
          difficulty: "Easy",
        },
        {
          title: "Buy Generic Brands",
          description: "For basic items like stationery, medicines, choose generic brands to save 30-50%.",
          difficulty: "Easy",
        },
      ],
    },
    {
      category: "Saving Strategies",
      icon: <TrendingUp className="h-5 w-5" />,
      color: "bg-purple-100 text-purple-800",
      tips: [
        {
          title: "Save First, Spend Later",
          description: "As soon as you get money, save 20% immediately. Spend from the remaining 80%.",
          difficulty: "Medium",
        },
        {
          title: "Use Loose Change Jar",
          description: "Put all coins and small notes in a jar. You'll be surprised how much you save!",
          difficulty: "Easy",
        },
        {
          title: "Automate Savings",
          description: "Set up automatic transfers to savings account right after getting pocket money.",
          difficulty: "Medium",
        },
      ],
    },
    {
      category: "Digital Safety",
      icon: <Shield className="h-5 w-5" />,
      color: "bg-red-100 text-red-800",
      tips: [
        {
          title: "Secure Your UPI",
          description: "Never share UPI PIN. Always verify merchant details before making payments.",
          difficulty: "Easy",
        },
        {
          title: "Check Bank Statements",
          description: "Review your bank statements weekly to catch any unauthorized transactions.",
          difficulty: "Easy",
        },
        {
          title: "Use Trusted Apps Only",
          description: "Download financial apps only from official app stores. Avoid third-party sources.",
          difficulty: "Easy",
        },
      ],
    },
  ]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-700"
      case "Medium":
        return "bg-orange-100 text-orange-700"
      case "Hard":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-6 w-6" />
            Financial Literacy Hub
          </CardTitle>
          <CardDescription className="text-indigo-100">
            Learn smart money management tips designed specifically for Indian students
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Tips by Category */}
      {tips.map((category, categoryIndex) => (
        <Card key={categoryIndex}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className={`p-2 rounded-full ${category.color}`}>{category.icon}</div>
              {category.category}
            </CardTitle>
            <CardDescription>Essential tips for {category.category.toLowerCase()}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {category.tips.map((tip, tipIndex) => (
                <div key={tipIndex} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-lg">{tip.title}</h4>
                    <Badge className={getDifficultyColor(tip.difficulty)}>{tip.difficulty}</Badge>
                  </div>
                  <p className="text-gray-600">{tip.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Quick Facts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-yellow-500" />
            Did You Know?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
              <h5 className="font-semibold text-yellow-800">UPI Growth in India</h5>
              <p className="text-yellow-700">
                UPI transactions have grown by 50%+ year-over-year, making digital payments the norm for students.
              </p>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
              <h5 className="font-semibold text-blue-800">Student Spending Habits</h5>
              <p className="text-blue-700">
                70% of student expenses go towards food and transportation. Track these categories closely!
              </p>
            </div>

            <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-400">
              <h5 className="font-semibold text-green-800">Power of Small Savings</h5>
              <p className="text-green-700">
                Saving just ₹20 per day can give you ₹7,300 in a year - enough for a new smartphone!
              </p>
            </div>

            <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-400">
              <h5 className="font-semibold text-purple-800">Financial Independence</h5>
              <p className="text-purple-700">
                Students who track expenses are 3x more likely to achieve their financial goals.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
