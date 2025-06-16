'use client'
import { useState } from "react"

export default function Counter() {
    const [count, setCount] = useState(0)
    return (
        <div className="flex items-center space-x-3">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Count: <span className="text-lg font-bold text-blue-600 dark:text-blue-400">{count}</span>
            </p>
            <button 
                onClick={() => setCount(count + 1)}
                className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
                Increment
            </button>
        </div>
    )
}
