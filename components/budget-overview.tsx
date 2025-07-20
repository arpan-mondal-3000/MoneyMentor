"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"

interface Transaction {
  id: string
  date: string
  type: "income" | "expense"
  category: string
  amount: number
  paymentMethod: "cash" | "upi"
  notes?: string
}

interface BudgetData {
  totalIncome: number
  totalExpenses: number
  remainingBudget: number
  dailyBudget: number
  savingsGoal: number
  currentSavings: number
}

interface BudgetOverviewProps {
  budgetData: BudgetData
  transactions: Transaction[]
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82CA9D", "#FFC658"]

export default function BudgetOverview({ budgetData, transactions }: BudgetOverviewProps) {
  // Calculate expense breakdown
  const expenseBreakdown = transactions
    .filter((t) => t.type === "expense")
    .reduce(
      (acc, transaction) => {
        acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount
        return acc
      },
      {} as Record<string, number>,
    )

  const pieData = Object.entries(expenseBreakdown).map(([category, amount]) => ({
    name: category,
    value: amount,
  }))

  // Calculate payment method breakdown
  const paymentMethodData = transactions
    .filter((t) => t.type === "expense")
    .reduce(
      (acc, transaction) => {
        acc[transaction.paymentMethod] = (acc[transaction.paymentMethod] || 0) + transaction.amount
        return acc
      },
      {} as Record<string, number>,
    )

  const paymentData = [
    { name: "UPI/Digital", amount: paymentMethodData.upi || 0 },
    { name: "Cash", amount: paymentMethodData.cash || 0 },
  ]

  const budgetUsedPercentage =
    budgetData.totalIncome > 0 ? (budgetData.totalExpenses / budgetData.totalIncome) * 100 : 0

  const savingsPercentage = budgetData.savingsGoal > 0 ? (budgetData.currentSavings / budgetData.savingsGoal) * 100 : 0

  return (
    <div className="grid gap-6">
      {/* Budget Progress */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Budget Usage</CardTitle>
            <CardDescription>How much of your income you've spent</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span>Spent: ₹{budgetData.totalExpenses.toLocaleString("en-IN")}</span>
                <span>Income: ₹{budgetData.totalIncome.toLocaleString("en-IN")}</span>
              </div>
              <Progress value={Math.min(budgetUsedPercentage, 100)} className="h-3" />
              <div className="text-center">
                <span
                  className={`text-lg font-semibold ${
                    budgetUsedPercentage > 90
                      ? "text-red-600"
                      : budgetUsedPercentage > 80
                        ? "text-orange-600"
                        : "text-green-600"
                  }`}
                >
                  {budgetUsedPercentage.toFixed(1)}% Used
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Savings Progress</CardTitle>
            <CardDescription>Progress towards your savings goal</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span>Saved: ₹{budgetData.currentSavings.toLocaleString("en-IN")}</span>
                <span>Goal: ₹{budgetData.savingsGoal.toLocaleString("en-IN")}</span>
              </div>
              <Progress value={Math.min(savingsPercentage, 100)} className="h-3" />
              <div className="text-center">
                <span className="text-lg font-semibold text-blue-600">{savingsPercentage.toFixed(1)}% Complete</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      {transactions.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Expense Breakdown */}
          {pieData.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Expense Breakdown</CardTitle>
                <CardDescription>Where your money is going</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `₹${Number(value).toLocaleString("en-IN")}`} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Payment Method Comparison */}
          <Card>
            <CardHeader>
              <CardTitle>Cash vs Digital</CardTitle>
              <CardDescription>Your spending pattern by payment method</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={paymentData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => `₹${Number(value).toLocaleString("en-IN")}`} />
                    <Bar dataKey="amount" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Quick Insights */}
      <Card>
        <CardHeader>
          <CardTitle>💡 Quick Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-800">Daily Spending Limit</h4>
              <p className="text-2xl font-bold text-blue-600">₹{Math.round(budgetData.dailyBudget)}</p>
              <p className="text-sm text-blue-700">Based on remaining budget</p>
            </div>

            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-800">Money Left</h4>
              <p className="text-2xl font-bold text-green-600">₹{budgetData.remainingBudget.toLocaleString("en-IN")}</p>
              <p className="text-sm text-green-700">Available to spend</p>
            </div>

            <div className="p-4 bg-purple-50 rounded-lg">
              <h4 className="font-semibold text-purple-800">Transactions</h4>
              <p className="text-2xl font-bold text-purple-600">{transactions.length}</p>
              <p className="text-sm text-purple-700">Total recorded</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
