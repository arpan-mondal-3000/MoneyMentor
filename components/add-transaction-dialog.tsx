"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Transaction {
  date: string
  type: "income" | "expense"
  category: string
  amount: number
  paymentMethod: "cash" | "upi"
  notes?: string
}

interface AddTransactionDialogProps {
  isOpen: boolean
  onClose: () => void
  onAddTransaction: (transaction: Transaction) => void
}

const expenseCategories = [
  "Food & Dining",
  "Transportation",
  "Shopping",
  "Entertainment",
  "Education",
  "Health",
  "Others",
]

const incomeCategories = ["Pocket Money", "Part-time Job", "Freelancing", "Scholarship", "Gift Money", "Others"]

export default function AddTransactionDialog({ isOpen, onClose, onAddTransaction }: AddTransactionDialogProps) {
  const [type, setType] = useState<"income" | "expense">("expense")
  const [category, setCategory] = useState("")
  const [amount, setAmount] = useState("")
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "upi">("upi")
  const [notes, setNotes] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!category || !amount) return

    const transaction: Transaction = {
      date: new Date().toISOString(),
      type,
      category,
      amount: Number.parseFloat(amount),
      paymentMethod,
      notes: notes.trim() || undefined,
    }

    onAddTransaction(transaction)

    // Reset form
    setCategory("")
    setAmount("")
    setNotes("")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Transaction</DialogTitle>
          <DialogDescription>Track your income and expenses to stay on budget.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Tabs value={type} onValueChange={(value) => setType(value as "income" | "expense")}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="expense" className="text-red-600">
                Expense
              </TabsTrigger>
              <TabsTrigger value="income" className="text-green-600">
                Income
              </TabsTrigger>
            </TabsList>

            <TabsContent value="expense" className="space-y-4">
              <div>
                <Label htmlFor="expense-category">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select expense category" />
                  </SelectTrigger>
                  <SelectContent>
                    {expenseCategories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>

            <TabsContent value="income" className="space-y-4">
              <div>
                <Label htmlFor="income-category">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select income category" />
                  </SelectTrigger>
                  <SelectContent>
                    {incomeCategories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>
          </Tabs>

          <div>
            <Label htmlFor="amount">Amount (₹)</Label>
            <Input
              id="amount"
              type="number"
              placeholder="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="payment-method">Payment Method</Label>
            <Select value={paymentMethod} onValueChange={(value) => setPaymentMethod(value as "cash" | "upi")}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="upi">UPI / Digital</SelectItem>
                <SelectItem value="cash">Cash</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Add any additional notes..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button
              type="submit"
              className={`flex-1 ${type === "income" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}`}
            >
              Add {type === "income" ? "Income" : "Expense"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
