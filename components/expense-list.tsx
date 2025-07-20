"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowUpCircle, ArrowDownCircle, Smartphone, Banknote } from "lucide-react"

interface Transaction {
  id: string
  date: string
  type: "income" | "expense"
  category: string
  amount: number
  paymentMethod: "cash" | "upi"
  notes?: string
}

interface ExpenseListProps {
  transactions: Transaction[]
}

export default function ExpenseList({ transactions }: ExpenseListProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getCategoryEmoji = (category: string) => {
    const emojiMap: { [key: string]: string } = {
      "Food & Dining": "🍽️",
      Transportation: "🚗",
      Shopping: "🛍️",
      Entertainment: "🎬",
      Education: "📚",
      Health: "🏥",
      "Pocket Money": "💰",
      "Part-time Job": "💼",
      Freelancing: "💻",
      Scholarship: "🎓",
      "Gift Money": "🎁",
      Others: "📝",
    }
    return emojiMap[category] || "📝"
  }

  if (transactions.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <div className="text-6xl mb-4">📊</div>
          <h3 className="text-xl font-semibold mb-2">No Transactions Yet</h3>
          <p className="text-gray-600">Start tracking your income and expenses to see them here!</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Your latest income and expense records</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-full ${
                      transaction.type === "income" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                    }`}
                  >
                    {transaction.type === "income" ? (
                      <ArrowUpCircle className="h-4 w-4" />
                    ) : (
                      <ArrowDownCircle className="h-4 w-4" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{getCategoryEmoji(transaction.category)}</span>
                      <span className="font-medium">{transaction.category}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span>{formatDate(transaction.date)}</span>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        {transaction.paymentMethod === "upi" ? (
                          <Smartphone className="h-3 w-3" />
                        ) : (
                          <Banknote className="h-3 w-3" />
                        )}
                        <span className="capitalize">{transaction.paymentMethod}</span>
                      </div>
                    </div>
                    {transaction.notes && <p className="text-sm text-gray-500 mt-1">{transaction.notes}</p>}
                  </div>
                </div>
                <div className="text-right">
                  <div
                    className={`text-lg font-semibold ${
                      transaction.type === "income" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {transaction.type === "income" ? "+" : "-"}₹{transaction.amount.toLocaleString("en-IN")}
                  </div>
                  <Badge variant={transaction.type === "income" ? "default" : "secondary"} className="text-xs">
                    {transaction.type}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
