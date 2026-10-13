
"use client"

import { useGame } from "../game/GameProvider"

export function WindowsSecurityApp() {
  const game = useGame()

  return (
    <div className="min-h-full bg-slate-50 p-8 text-slate-800">

      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="grid size-10 place-items-center rounded-full bg-blue-600 text-xl text-white">
          ✓
        </div>

        <div>
          <h1 className="text-xl font-semibold">
            Windows Security
          </h1>
          <p className="text-sm text-slate-500">
            Security and protection activity
          </p>
        </div>
      </div>

      {/* Normal security dashboard */}
      <section className="mt-7 rounded-xl border bg-white p-5 shadow-sm">
        <h2 className="font-semibold">
          Security overview
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          View your device protection and security status.
        </p>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">

          <div className="rounded-lg border p-4">
            <div className="text-2xl text-blue-600">⊙</div>
            <h3 className="mt-2 font-medium">
              Virus & threat protection
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              Manage protection against threats.
            </p>
          </div>

          <div className="rounded-lg border p-4">
            <div className="text-2xl text-blue-600">▣</div>
            <h3 className="mt-2 font-medium">
              App & browser control
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              Manage application and browser security.
            </p>
          </div>

          <div className="rounded-lg border p-4">
            <div className="text-2xl text-blue-600">♧</div>
            <h3 className="mt-2 font-medium">
              Firewall & network protection
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              Monitor network security settings.
            </p>
          </div>

          <div className="rounded-lg border p-4">
            <div className="text-2xl text-blue-600">✓</div>
            <h3 className="mt-2 font-medium">
              Device security
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              Review built-in device protection.
            </p>
          </div>

        </div>
      </section>

      {/* Final incident - only after all challenges */}
      {game.securityIncidentTriggered &&
        !game.finalIncidentCompleted && (

        <section className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-5">

          <h2 className="font-semibold text-amber-900">
            Security incident notification
          </h2>

          <p className="mt-2 text-sm text-amber-800">
            Security activity requires your attention.
            Please submit the final incident report.
          </p>

          <button
            onClick={game.reportFinalIncident}
            className="mt-5 rounded-lg bg-blue-700 px-5 py-3 text-sm font-medium text-white"
          >
            Submit incident report
          </button>

        </section>
      )}

      {/* Final confirmation */}
      {game.finalIncidentCompleted && (

        <section className="mt-5 rounded-xl border border-green-200 bg-green-50 p-5">

          <h2 className="font-semibold text-green-800">
            Incident report submitted
          </h2>

          <p className="mt-2 text-sm text-green-700">
            Your security incident report was
            submitted successfully.
          </p>

        </section>
      )}

    </div>
  )
}
