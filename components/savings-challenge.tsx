"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Trophy, Target, TrendingUp, Star } from "lucide-react"

interface SavingsChallengeProps {
  currentSavings: number
  savingsGoal: number
}

export default function SavingsChallenge({ currentSavings, savingsGoal }: SavingsChallengeProps) {
  const progressPercentage = savingsGoal > 0 ? (currentSavings / savingsGoal) * 100 : 0
  const remainingAmount = Math.max(0, savingsGoal - currentSavings)

  const challenges = [
    {
      title: "₹10 Daily Challenge",
      description: "Save ₹10 every day for 30 days",
      target: 300,
      current: Math.min(currentSavings, 300),
      icon: "💰",
      difficulty: "Easy",
    },
    {
      title: "Skip One Treat",
      description: "Skip one expensive snack/drink daily",
      target: 500,
      current: Math.min(currentSavings, 500),
      icon: "🥤",
      difficulty: "Medium",
    },
    {
      title: "Transport Saver",
      description: "Walk/cycle instead of auto for short distances",
      target: 200,
      current: Math.min(currentSavings, 200),
      icon: "🚶",
      difficulty: "Easy",
    },
    {
      title: "Weekend Warrior",
      description: "Limit weekend entertainment spending",
      target: 800,
      current: Math.min(currentSavings, 800),
      icon: "🎬",
      difficulty: "Hard",
    },
  ]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "text-green-600 bg-green-100"
      case "Medium":
        return "text-orange-600 bg-orange-100"
      case "Hard":
        return "text-red-600 bg-red-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  return (
    <div className="space-y-6">
      {/* Main Savings Goal */}
      <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-6 w-6" />
            Your Savings Goal
          </CardTitle>
          <CardDescription className="text-blue-100">Track your progress towards financial freedom</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-lg">₹{currentSavings.toLocaleString("en-IN")} saved</span>
              <span className="text-lg">₹{savingsGoal.toLocaleString("en-IN")} goal</span>
            </div>
            <Progress value={Math.min(progressPercentage, 100)} className="h-3 bg-blue-200" />
            <div className="text-center">
              <div className="text-3xl font-bold">{progressPercentage.toFixed(1)}%</div>
              <div className="text-blue-100">₹{remainingAmount.toLocaleString("en-IN")} remaining</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Micro Savings Challenges */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            Micro-Saving Challenges
          </CardTitle>
          <CardDescription>
            Small steps towards big savings! Complete these challenges to build better habits.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {challenges.map((challenge, index) => {
              const challengeProgress = challenge.target > 0 ? (challenge.current / challenge.target) * 100 : 0
              const isCompleted = challengeProgress >= 100

              return (
                <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{challenge.icon}</span>
                      <div>
                        <h4 className="font-semibold flex items-center gap-2">
                          {challenge.title}
                          {isCompleted && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                        </h4>
                        <p className="text-sm text-gray-600">{challenge.description}</p>
                      </div>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(challenge.difficulty)}`}
                    >
                      {challenge.difficulty}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>
                        ₹{challenge.current} / ₹{challenge.target}
                      </span>
                      <span className={isCompleted ? "text-green-600 font-semibold" : "text-gray-600"}>
                        {challengeProgress.toFixed(0)}%
                      </span>
                    </div>
                    <Progress
                      value={Math.min(challengeProgress, 100)}
                      className={`h-2 ${isCompleted ? "bg-green-100" : ""}`}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Savings Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-500" />
            Smart Saving Tips for Students
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
              <span className="text-lg">💡</span>
              <div>
                <h5 className="font-medium">Use the 50-30-20 Rule</h5>
                <p className="text-sm text-gray-600">50% needs, 30% wants, 20% savings</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
              <span className="text-lg">🎯</span>
              <div>
                <h5 className="font-medium">Set Micro Goals</h5>
                <p className="text-sm text-gray-600">Start with ₹10-20 daily savings targets</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
              <span className="text-lg">📱</span>
              <div>
                <h5 className="font-medium">Track Every Rupee</h5>
                <p className="text-sm text-gray-600">Awareness is the first step to control</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
              <span className="text-lg">⏰</span>
              <div>
                <h5 className="font-medium">Wait 24 Hours</h5>
                <p className="text-sm text-gray-600">For any purchase above ₹500, sleep on it</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
