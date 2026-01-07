'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, XCircle } from 'lucide-react'

interface QuizQuestion {
  question: string
  type: 'multiple-choice' | 'free-response'
  options?: string[]
  correctAnswer: string | string[]
  explanation?: string
}

interface QuizProps {
  questions: QuizQuestion[]
  onComplete: (passed: boolean) => void
}

export default function Quiz({ questions, onComplete }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [showResults, setShowResults] = useState(false)
  const [results, setResults] = useState<Record<number, boolean>>({})

  const handleAnswer = (answer: string) => {
    setAnswers({ ...answers, [currentQuestion]: answer })
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Check answers
      const newResults: Record<number, boolean> = {}
      let allCorrect = true

      questions.forEach((q, index) => {
        const userAnswer = answers[index]?.trim().toLowerCase()
        const correctAnswer = Array.isArray(q.correctAnswer)
          ? q.correctAnswer.map(a => a.trim().toLowerCase())
          : q.correctAnswer.trim().toLowerCase()

        if (q.type === 'multiple-choice') {
          const isCorrect = userAnswer === correctAnswer
          newResults[index] = isCorrect
          if (!isCorrect) allCorrect = false
        } else {
          // Free response - check if answer contains key concepts
          const correctAnswers = Array.isArray(correctAnswer) ? correctAnswer : [correctAnswer]
          const isCorrect = correctAnswers.some(ca => 
            userAnswer?.includes(ca) || ca.includes(userAnswer || '')
          )
          newResults[index] = isCorrect
          if (!isCorrect) allCorrect = false
        }
      })

      setResults(newResults)
      setShowResults(true)
      onComplete(allCorrect)
    }
  }

  const question = questions[currentQuestion]

  if (showResults) {
    return (
      <div className="mt-8 space-y-4">
        <h3 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark mb-4">
          Quiz Results
        </h3>
        {questions.map((q, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-4 rounded-xl border ${
              results[index]
                ? 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900/30'
                : 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900/30'
            }`}
          >
            <div className="flex items-start gap-3">
              {results[index] ? (
                <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-1" />
              ) : (
                <XCircle className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-1" />
              )}
              <div className="flex-1">
                <p className="font-semibold text-text-primary-light dark:text-text-primary-dark mb-2">
                  {q.question}
                </p>
                <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mb-1">
                  <strong>Your answer:</strong> {answers[index] || 'No answer provided'}
                </p>
                {!results[index] && (
                  <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mb-1">
                    <strong>Correct answer:</strong> {Array.isArray(q.correctAnswer) ? q.correctAnswer.join(' or ') : q.correctAnswer}
                  </p>
                )}
                {q.explanation && (
                  <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mt-2 italic">
                    {q.explanation}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    )
  }

  return (
    <div className="mt-8 glass rounded-2xl p-6 border border-border-light dark:border-border-dark">
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
            Question {currentQuestion + 1} of {questions.length}
          </span>
        </div>
        <h3 className="text-xl font-bold text-text-primary-light dark:text-text-primary-dark">
          {question.question}
        </h3>
      </div>

      {question.type === 'multiple-choice' && question.options ? (
        <div className="space-y-3 mb-6">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              className={`w-full text-left p-4 rounded-xl border transition-all ${
                answers[currentQuestion] === option
                  ? 'bg-primary-light dark:bg-border-dark border-primary text-primary dark:text-primary'
                  : 'bg-surface-light dark:bg-surface-dark border-border-light dark:border-border-dark hover:border-primary'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      ) : (
        <textarea
          value={answers[currentQuestion] || ''}
          onChange={(e) => handleAnswer(e.target.value)}
          placeholder="Type your answer here..."
          className="w-full p-4 rounded-xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark text-text-primary-light dark:text-text-primary-dark mb-6 min-h-[120px] focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      )}

      <div className="flex justify-between">
        <button
          onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
          disabled={currentQuestion === 0}
          className="px-4 py-2 rounded-xl border border-border-light dark:border-border-dark disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-light dark:hover:bg-border-dark transition"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={!answers[currentQuestion]}
          className="px-6 py-2 bg-primary hover:bg-primary-hover text-white rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          {currentQuestion === questions.length - 1 ? 'Submit' : 'Next'}
        </button>
      </div>
    </div>
  )
}




