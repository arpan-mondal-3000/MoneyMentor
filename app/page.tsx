"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlusCircle, Wallet, Target, TrendingUp, AlertTriangle, Trophy } from "lucide-react"
import AddTransactionDialog from "@/components/add-transaction-dialog"
import ExpenseList from "@/components/expense-list"
import SavingsChallenge from "@/components/savings-challenge"
import FinancialTips from "@/components/financial-tips"
import BudgetOverview from "@/components/budget-overview"

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

export default function MoneyMentor() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [budgetData, setBudgetData] = useState<BudgetData>({
    totalIncome: 0,
    totalExpenses: 0,
    remainingBudget: 0,
    dailyBudget: 0,
    savingsGoal: 5000,
    currentSavings: 0,
  })

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedTransactions = localStorage.getItem("moneymentor-transactions")
    const savedBudgetData = localStorage.getItem("moneymentor-budget")

    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions))
    }

    if (savedBudgetData) {
      setBudgetData(JSON.parse(savedBudgetData))
    }
  }, [])

  // Calculate budget data whenever transactions change
  useEffect(() => {
    const totalIncome = transactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)

    const totalExpenses = transactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0)

    const remainingBudget = totalIncome - totalExpenses
    const dailyBudget = remainingBudget > 0 ? remainingBudget / 30 : 0
    const currentSavings = Math.max(0, remainingBudget)

    const newBudgetData = {
      ...budgetData,
      totalIncome,
      totalExpenses,
      remainingBudget,
      dailyBudget,
      currentSavings,
    }

    setBudgetData(newBudgetData)
    localStorage.setItem("moneymentor-budget", JSON.stringify(newBudgetData))
  }, [transactions])

  // Save transactions to localStorage
  useEffect(() => {
    localStorage.setItem("moneymentor-transactions", JSON.stringify(transactions))
  }, [transactions])

  const addTransaction = (transaction: Omit<Transaction, "id">) => {
    const newTransaction = {
      ...transaction,
      id: Date.now().toString(),
    }
    setTransactions((prev) => [newTransaction, ...prev])
  }

  const getBudgetStatus = () => {
    const spentPercentage = budgetData.totalIncome > 0 ? (budgetData.totalExpenses / budgetData.totalIncome) * 100 : 0

    if (spentPercentage >= 90) return { status: "danger", message: "Budget Exceeded!" }
    if (spentPercentage >= 80) return { status: "warning", message: "Budget Alert!" }
    return { status: "good", message: "On Track" }
  }

  const budgetStatus = getBudgetStatus()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto p-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">MoneyMentor</h1>
          <p className="text-lg text-gray-600">Smart Personal Finance for Students</p>
        </div>

        {/* Budget Status Alert */}
        {budgetStatus.status !== "good" && (
          <Card className="mb-6 border-l-4 border-l-orange-500 bg-orange-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                <span className="font-semibold text-orange-800">{budgetStatus.message}</span>
                <span className="text-orange-700">
                  You've spent ₹{budgetData.totalExpenses.toLocaleString("en-IN")} out of ₹
                  {budgetData.totalIncome.toLocaleString("en-IN")}
                </span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Total Income</p>
                  <p className="text-2xl font-bold">₹{budgetData.totalIncome.toLocaleString("en-IN")}</p>
                </div>
                <Wallet className="h-8 w-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-100">Total Expenses</p>
                  <p className="text-2xl font-bold">₹{budgetData.totalExpenses.toLocaleString("en-IN")}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-red-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Remaining</p>
                  <p className="text-2xl font-bold">₹{budgetData.remainingBudget.toLocaleString("en-IN")}</p>
                </div>
                <Target className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Daily Budget</p>
                  <p className="text-2xl font-bold">₹{Math.round(budgetData.dailyBudget).toLocaleString("en-IN")}</p>
                </div>
                <Trophy className="h-8 w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Add Transaction Button */}
        <div className="flex justify-center mb-8">
          <Button
            onClick={() => setIsAddDialogOpen(true)}
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full shadow-lg"
          >
            <PlusCircle className="mr-2 h-5 w-5" />
            Add Income / Expense
          </Button>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="savings">Savings</TabsTrigger>
            <TabsTrigger value="tips">Tips</TabsTrigger>
            <TabsTrigger value="challenges">Challenges</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <BudgetOverview budgetData={budgetData} transactions={transactions} />
          </TabsContent>

          <TabsContent value="transactions">
            <ExpenseList transactions={transactions} />
          </TabsContent>

          <TabsContent value="savings">
            <SavingsChallenge currentSavings={budgetData.currentSavings} savingsGoal={budgetData.savingsGoal} />
          </TabsContent>

          <TabsContent value="tips">
            <FinancialTips />
          </TabsContent>

          <TabsContent value="challenges">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-yellow-500" />
                    Weekly Challenges
                  </CardTitle>
                  <CardDescription>Complete these challenges to improve your financial habits</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                      <div>
                        <h4 className="font-semibold">₹10 Daily Challenge</h4>
                        <p className="text-sm text-gray-600">Save ₹10 every day for a week</p>
                      </div>
                      <Badge variant="secondary">7 days</Badge>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                      <div>
                        <h4 className="font-semibold">No Impulse Buying</h4>
                        <p className="text-sm text-gray-600">Think twice before any purchase above ₹100</p>
                      </div>
                      <Badge variant="secondary">3 days</Badge>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                      <div>
                        <h4 className="font-semibold">Track Everything</h4>
                        <p className="text-sm text-gray-600">Record every expense for 5 days</p>
                      </div>
                      <Badge variant="secondary">5 days</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Add Transaction Dialog */}
        <AddTransactionDialog
          isOpen={isAddDialogOpen}
          onClose={() => setIsAddDialogOpen(false)}
          onAddTransaction={addTransaction}
        />
      </div>
    </div>
  )
}
