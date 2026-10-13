
"use client"

import { useState } from "react"
import { useGame } from "../game/GameProvider"
import { warnUnsafe } from "../desktop/UnsafeActionWarning"
import { notify } from "../desktop/NotificationCenter"

const permissions = [
  {
    name: "Read and change data on all websites",
    detail: "Can access sensitive information in corporate web applications.",
  },
  {
    name: "Read browsing history",
    detail: "Can see websites visited by the employee.",
  },
  {
    name: "Read clipboard contents",
    detail: "May access confidential information copied from other applications.",
  },
  {
    name: "Display notifications",
    detail: "Can display messages while browsing.",
  },
]

export function EdgeApp({
  onNavigate,
}: {
  onNavigate?: (url: string) => void
}) {
  const game = useGame()

  const [page, setPage] = useState<"portal" | "extension">("portal")
  const [extensionsOpen, setExtensionsOpen] = useState(false)
  const [permissionsOpen, setPermissionsOpen] = useState(false)
  const [installOpen, setInstallOpen] = useState(false)
  const [reportOpen, setReportOpen] = useState(false)
  const [reason, setReason] = useState("")

  const completed = game.edgeCompleted

  const attemptInstall = () => {
    setInstallOpen(false)
    game.preventUnsafeAction("suspicious-extension-install")
    warnUnsafe(
      "Installing this extension was blocked. " +
      "It requests excessive permissions. No extension was installed."
    )
  }

  const submitReport = () => {
    if (!reason || completed) return

    game.reportUnsafeWebsite()
    setReportOpen(false)

    notify(
      "Security report submitted",
      "Suspicious browser extension reported to Security Operations."
    )
  }

  return (
    <div className="relative flex h-full min-h-[450px] flex-col bg-white text-slate-800">

      {/* Browser toolbar */}
      <div className="flex items-center gap-3 border-b bg-slate-100 px-4 py-3 text-sm">
        <button
          onClick={() => {
            setPage("portal")
            setExtensionsOpen(false)
          }}
          title="Home"
          className="rounded px-2 py-1 hover:bg-slate-200"
        >
          ⌂
        </button>

        <button
          onClick={() => setPage("portal")}
          title="Refresh"
          className="rounded px-2 py-1 hover:bg-slate-200"
        >
          ↻
        </button>

        <div className="flex-1 truncate rounded-full border bg-white px-4 py-2 text-xs text-slate-500">
          {page === "portal"
            ? "https://intranet.sdaia.gov.sa"
            : "edge://extensions"}
        </div>

        <button
          onClick={() => setExtensionsOpen(!extensionsOpen)}
          title="Extensions"
          aria-label="Extensions"
          className="rounded-lg border border-transparent px-3 py-2 hover:border-slate-300 hover:bg-white"
        >
          <svg
            width="21"
            height="21"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 3h3a2 2 0 0 1 4 0h3a2 2 0 0 1 2 2v4h-3a2 2 0 0 0 0 4h3v6a2 2 0 0 1-2 2h-6v-3a2 2 0 0 0-4 0v3H5a2 2 0 0 1-2-2v-6h3a2 2 0 0 0 0-4H3V5a2 2 0 0 1 2-2h4Z" />
          </svg>
        </button>

        <span className="text-slate-500">⋯</span>
      </div>

      {/* Extensions dropdown */}
      {extensionsOpen && (
        <div className="absolute right-8 top-14 z-30 w-72 rounded-xl border bg-white p-4 shadow-xl">
          <h3 className="font-semibold">Extensions</h3>
          <p className="mt-1 text-xs text-slate-500">
            Extensions available in this browser
          </p>

          <button
            onClick={() => {
              setPage("extension")
              setExtensionsOpen(false)
            }}
            className="mt-4 flex w-full items-center gap-3 rounded-lg border p-3 text-left hover:bg-blue-50"
          >
            <span className="rounded-lg bg-blue-100 p-3 text-xl text-blue-700">
              ▤
            </span>
            <span className="flex-1">
              <span className="block text-sm font-semibold">
                Northstar PDF Helper
              </span>
              <span className="block text-xs text-slate-500">
                Review extension details
              </span>
            </span>
            <span>›</span>
          </button>
        </div>
      )}

      {page === "portal" ? (
        <div className="flex-1 overflow-y-auto bg-slate-50">
          <header className="bg-[#123B57] px-8 py-6 text-white">
            <div className="text-xs uppercase tracking-widest text-blue-200">
              SDAIA · Training Simulation
            </div>
            <h1 className="mt-2 text-2xl font-bold">
              SDAIA Employee Portal
            </h1>
            <p className="mt-2 text-sm text-blue-100">
              Internal services and employee resources
            </p>
          </header>

          <main className="mx-auto max-w-4xl p-8">
            <div className="rounded-xl border bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold">
                Welcome to your workspace
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Access internal services, announcements, and employee tools.
              </p>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {[
                ["Employee Services", "HR and self-service requests"],
                ["IT Support", "Technical support and service requests"],
                ["Announcements", "Latest internal updates"],
              ].map(([title, description]) => (
                <div
                  key={title}
                  className="rounded-xl border bg-white p-5 shadow-sm"
                >
                  <div className="mb-4 text-2xl text-blue-700">▦</div>
                  <h3 className="font-semibold">{title}</h3>
                  <p className="mt-2 text-xs text-slate-500">
                    {description}
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-8 text-center text-xs text-slate-400">
              Simulated employee portal for cybersecurity awareness training.
            </p>
          </main>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto p-7">
          <button
            onClick={() => setPage("portal")}
            className="mb-5 text-sm text-blue-700 hover:underline"
          >
            ← Back to portal
          </button>

          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-start gap-4">
              <div className="rounded-xl bg-blue-100 p-4 text-3xl text-blue-700">
                ▤
              </div>

              <div className="min-w-0 flex-1">
                <h2 className="text-xl font-semibold">
                  Northstar PDF Productivity Helper
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Publisher: Productivity Tools Ltd.
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  Version 2.4.1 · 1,200+ users
                </p>
              </div>

              <button
                onClick={() => setInstallOpen(true)}
                className="rounded-lg bg-blue-700 px-4 py-2 text-sm text-white"
              >
                Add extension
              </button>
            </div>

            <p className="mt-5 text-sm text-slate-600">
              Edit PDFs, convert documents, and boost productivity.
            </p>

            <button
              onClick={() => setPermissionsOpen(!permissionsOpen)}
              className="mt-5 rounded-lg border px-4 py-2 text-sm font-medium hover:bg-slate-50"
            >
              {permissionsOpen ? "Hide permissions" : "View permissions"}
            </button>

            {permissionsOpen && (
              <div className="mt-5 space-y-3">
                <h3 className="font-semibold">Requested permissions</h3>

                {permissions.map((permission) => (
                  <div key={permission.name} className="rounded-lg border p-4">
                    <p className="text-sm font-semibold">
                      {permission.name}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {permission.detail}
                    </p>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6 border-t pt-5">
              <button
                onClick={() => setReportOpen(true)}
                disabled={completed}
                className="rounded-lg border border-blue-600 px-4 py-2 text-sm text-blue-700 disabled:opacity-50"
              >
                {completed
                  ? "Security concern reported"
                  : "Report security concern"}
              </button>

              {completed && (
                <p className="mt-3 text-sm text-green-700">
                  Extension reported successfully. +200 points.
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Install confirmation */}
      {installOpen && (
        <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl">
            <h3 className="text-lg font-semibold">
              Add Northstar PDF Helper?
            </h3>

            <p className="mt-3 text-sm text-slate-600">
              This extension can:
            </p>

            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm">
              {permissions.map((p) => (
                <li key={p.name}>{p.name}</li>
              ))}
            </ul>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setInstallOpen(false)}
                className="rounded border px-4 py-2 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={attemptInstall}
                className="rounded bg-blue-700 px-4 py-2 text-sm text-white"
              >
                Add extension
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Report dialog */}
      {reportOpen && (
        <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl">
            <h3 className="text-lg font-semibold">
              Report suspicious extension
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Select a reason for the report.
            </p>

            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="mt-4 w-full rounded-lg border p-3 text-sm"
            >
              <option value="">Select reason</option>
              <option value="permissions">Excessive permissions</option>
              <option value="unapproved">Unapproved extension</option>
              <option value="data">Potential data exposure</option>
              <option value="publisher">Unverified publisher</option>
            </select>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setReportOpen(false)}
                className="rounded border px-4 py-2 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={submitReport}
                disabled={!reason}
                className="rounded bg-blue-700 px-4 py-2 text-sm text-white disabled:opacity-40"
              >
                Submit report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
