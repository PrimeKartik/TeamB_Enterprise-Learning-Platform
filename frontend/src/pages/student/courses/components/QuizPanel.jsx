import { CheckCircle } from 'lucide-react'

export default function QuizPanel() {

  return (

    <div className="rounded-2xl bg-white p-6 shadow">

      <div className="mb-5 flex items-center gap-3">

        <CheckCircle
          className="text-green-600"
          size={24}
        />

        <h2 className="text-xl font-bold">
          Lesson Quiz
        </h2>

      </div>

      <p className="text-gray-600">

        Quiz functionality will be connected to the backend.

      </p>

      <div className="mt-6 space-y-4">

        <div className="rounded-xl border p-4">

          <p className="font-medium">

            Sample Question

          </p>

          <div className="mt-4 space-y-2">

            <label className="flex gap-2">

              <input type="radio" name="q1" />

              Option A

            </label>

            <label className="flex gap-2">

              <input type="radio" name="q1" />

              Option B

            </label>

            <label className="flex gap-2">

              <input type="radio" name="q1" />

              Option C

            </label>

            <label className="flex gap-2">

              <input type="radio" name="q1" />

              Option D

            </label>

          </div>

        </div>

      </div>

      <button
        className="mt-6 rounded-lg bg-green-600 px-5 py-2 text-white transition hover:bg-green-700"
      >
        Submit Quiz
      </button>

    </div>

  )

}