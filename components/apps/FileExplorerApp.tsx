
"use client"

import { useEffect, useState } from "react"
import { useGame } from "../game/GameProvider"
import { notify } from "../desktop/NotificationCenter"

type Folder = "desktop" | "thispc" | "documents" | "downloads"
type ContextTarget = {
  name: string
  x: number
  y: number
}

const USB_FILES = [
  "Q4_Presentation.pptx",
  "Meeting_Notes.docx",
  "Employee_List.xlsx",
  "Salary_Adjustments.pdf",
  "Payroll_Update.pdf.exe",
]

export function FileExplorerApp({
  onOpenEdge,
}: {
  onOpenEdge?: (url: string) => void
}) {
  const game = useGame()

  const [folder, setFolder] = useState<Folder>("desktop")
  const [showExtensions, setShowExtensions] = useState(false)
  const [context, setContext] = useState<ContextTarget | null>(null)
  const [properties, setProperties] = useState<string | null>(null)
  const [document, setDocument] = useState<string | null>(null)
  const [pdfDialog, setPdfDialog] = useState(false)
  const [smartScreen, setSmartScreen] = useState(false)
  const [moreInfo, setMoreInfo] = useState(false)
  const [installing, setInstalling] = useState(false)
  const [reportSoftwareOpen, setReportSoftwareOpen] = useState(false)
  const [reportUsbOpen, setReportUsbOpen] = useState(false)

  const usbConnected = game.unknownUsbInserted
  const usbFileName = showExtensions
    ? "Payroll_Update.pdf.exe"
    : "Payroll_Update.pdf"

  useEffect(() => {
    const handler = (event: Event) => {
      const detail = (event as CustomEvent).detail

      if (detail?.folder === "downloads") {
        setFolder("downloads")
      }
    }

    window.addEventListener("cyber-open-explorer", handler)

    return () => {
      window.removeEventListener("cyber-open-explorer", handler)
    }
  }, [])

  const navigate = (target: Folder) => {
    setFolder(target)
    setContext(null)
    setProperties(null)
  }

  const openContext = (
    event: React.MouseEvent,
    name: string
  ) => {
    event.preventDefault()
    event.stopPropagation()

    const container = event.currentTarget.closest(
      "[data-explorer-root]"
    )

    const rect = container?.getBoundingClientRect()

    setContext({
      name,
      x: rect
        ? Math.max(8, Math.min(event.clientX - rect.left, rect.width - 220))
        : 100,
      y: rect
        ? Math.max(8, Math.min(event.clientY - rect.top, rect.height - 230))
        : 100,
    })
  }

  const runUsbFile = () => {
    game.executeMaliciousFile()

    notify(
      "Windows Security",
      "Suspicious activity detected. An application attempted to make unexpected system changes."
    )
  }

  const openInstaller = () => {
    game.executeSuspiciousInstaller()
    setSmartScreen(true)
    setMoreInfo(false)
  }

  const runInstallerAnyway = () => {
    game.bypassSmartScreen()
    setSmartScreen(false)
    setInstalling(true)

    window.setTimeout(() => {
      setInstalling(false)

      notify(
        "Windows Security",
        "Potentially unwanted application detected. Action recommended."
      )
    }, 1600)
  }

  const reportSoftware = () => {
    game.reportSuspiciousSoftware()
    setReportSoftwareOpen(false)

    notify(
      "Software reported for security review",
      "PDFMaster_Setup.exe was submitted to Security Operations."
    )
  }

  const reportUsb = () => {
    game.reportUsb()
    setReportUsbOpen(false)

    notify(
      "Security concern reported",
      "Suspicious removable media was reported to Security Operations."
    )
  }

  const openFile = (name: string) => {
    if (name === "This PC") {
      navigate("thispc")
      return
    }

    if (name === "Documents") {
      navigate("documents")
      return
    }

    if (name === "Downloads") {
      navigate("downloads")
      return
    }

    if (name === "USB Drive (E:)") {
      navigate("thispc")
      return
    }

    if (name === "Vendor_Contract_Protected.pdf") {
      setPdfDialog(true)
      return
    }

    if (name === "PDFMaster_Setup.exe") {
      openInstaller()
      return
    }

    if (name === "Payroll_Update.pdf.exe" ||
        name === "Payroll_Update.pdf") {
      runUsbFile()
      return
    }

    if (name === "Local Disk (C:)") {
      setProperties(name)
      return
    }

    setDocument(name)
  }

  const fileIcon = (name: string) => {
    if (
      name === "This PC" ||
      name === "Local Disk (C:)"
    ) {
      return "💻"
    }

    if (name === "USB Drive (E:)") return "💾"

    if (
      name === "Documents" ||
      name === "Downloads"
    ) {
      return "📁"
    }

    if (name.endsWith(".exe")) return "⚙️"
    if (name.endsWith(".pdf")) return "📕"
    if (name.endsWith(".docx")) return "📄"
    if (name.endsWith(".xlsx")) return "📗"
    if (name.endsWith(".pptx")) return "📙"

    return "📄"
  }

  const FileItem = ({
    name,
  }: {
    name: string
  }) => (
    <button
      type="button"
      onDoubleClick={() => openFile(name)}
      onContextMenu={(event) => openContext(event, name)}
      className="flex min-h-28 flex-col items-center justify-start rounded-lg p-3 text-center hover:bg-blue-50 focus:bg-blue-100"
      title={name}
    >

{ name.endsWith(".docx") ? (
  <svg
    width="42"
    height="48"
    viewBox="0 0 42 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8 2H28L39 13V44C39 45.1 38.1 46 37 46H8C6.9 46 6 45.1 6 44V4C6 2.9 6.9 2 8 2Z"
      fill="#E8F1FB"
      stroke="#185ABD"
      strokeWidth="1.5"
    />
    <path d="M28 2V13H39" fill="#B8D4F5" />
    <path d="M28 2V13H39" stroke="#185ABD" strokeWidth="1.5" />
    <rect x="1" y="17" width="27" height="23" rx="2" fill="#185ABD" />
    <path
      d="M6 23L9 34H12L14.5 27L17 34H20L23 23H19.8L18.3 30L16 23H13L10.7 30L9.2 23H6Z"
      fill="white"
    />
  </svg>
) : (
  <div className="text-4xl">{fileIcon(name)}</div>
)}

      <div className="mt-3 break-all text-xs leading-5">
        {name === "Payroll_Update.pdf.exe"
          ? usbFileName
          : name}
      </div>
    </button>
  )

  return (
    <div
      data-explorer-root
      className="relative flex h-full min-h-[420px] bg-white text-slate-800"
      onClick={() => {
        if (context) setContext(null)
      }}
    >
      {/* Sidebar */}
      <aside className="w-48 shrink-0 border-r bg-slate-50 p-4 text-sm">
        <div className="mb-4 font-semibold">
          Quick access
        </div>

        {[
          ["Desktop", "desktop"],
          ["Documents", "documents"],
          ["Downloads", "downloads"],
          ["This PC", "thispc"],
        ].map(([label, target]) => (
          <button
            key={target}
            onClick={() => navigate(target as Folder)}
            className={`mb-1 block w-full rounded px-3 py-2 text-left hover:bg-blue-50 ${
              folder === target
                ? "bg-blue-100 font-medium text-blue-800"
                : ""
            }`}
          >
            {target === "desktop" ? "▣" : "📁"} {label}
          </button>
        ))}

        {usbConnected && (
          <>
            <div className="mt-6 border-t pt-4 text-xs font-semibold text-slate-500">
              Devices and drives
            </div>

            <button
              onClick={() => navigate("thispc")}
              onContextMenu={(event) =>
                openContext(event, "USB Drive (E:)")
              }
              className="mt-3 block w-full rounded px-3 py-2 text-left text-xs hover:bg-blue-50"
            >
              💾 USB Drive (E:)
            </button>
          </>
        )}
      </aside>

      {/* Main area */}
      <main className="min-w-0 flex-1 overflow-y-auto p-5">
        {/* Toolbar */}
        <div className="flex items-center gap-4 border-b pb-3 text-xs">
          <button
            onClick={() => navigate("desktop")}
            className="hover:text-blue-700"
          >
            Home
          </button>

          <button
            onClick={() => setShowExtensions(!showExtensions)}
            className="hover:text-blue-700"
          >
            View ▾
          </button>

          <button
            onClick={() => setShowExtensions(!showExtensions)}
            className="hover:text-blue-700"
          >
            {showExtensions
              ? "Hide file extensions"
              : "Show file extensions"}
          </button>

          <span className="ml-auto text-slate-400">
            {folder === "desktop"
              ? "Desktop"
              : folder === "thispc"
              ? "This PC"
              : folder === "documents"
              ? "Documents"
              : "Downloads"}
          </span>
        </div>

        {/* Breadcrumb */}
        <div className="mt-4 rounded-lg bg-slate-50 px-4 py-2 text-xs text-slate-500">
          This PC
          <span className="mx-2">›</span>
          {folder === "desktop"
            ? "Desktop"
            : folder === "thispc"
            ? "Devices and drives"
            : folder === "documents"
            ? "Documents"
            : "Downloads"}
        </div>



        {/* Desktop */}
        {folder === "desktop" && (
        <div className="mt-6">
            <div className="grid grid-cols-4 gap-4">
            <FileItem name="Daily_Tasks.docx" />
            </div>
        </div>
        )}



        {/* This PC */}
        {folder === "thispc" && (
          <div className="mt-6">
            <h2 className="text-sm font-semibold">
              Devices and drives
            </h2>

            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <FileItem name="Local Disk (C:)" />

              {usbConnected && (
                <FileItem name="USB Drive (E:)" />
              )}
            </div>

            {usbConnected && (
              <section className="mt-8 border-t pt-5">
                <h3 className="mb-4 text-sm font-semibold">
                  USB Drive (E:)
                </h3>

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
                  {USB_FILES.map((name) => (
                    <FileItem key={name} name={name} />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}

        {/* Documents */}
        {folder === "documents" && (
          <div className="mt-6">
            <h2 className="mb-4 text-sm font-semibold">
              Documents
            </h2>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <FileItem name="Vendor_Contract_Protected.pdf" />
              <FileItem name="Project_Notes.docx" />
            </div>
          </div>
        )}

      {/* Downloads */}
      {folder === "downloads" && (
        <div className="mt-6">
          <h2 className="mb-4 text-sm font-semibold">
            Downloads
          </h2>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <FileItem name="PDFMaster_Setup.exe" />
          </div>
        </div>
      )}
    </main>

      {/* Right-click menu */}
      {context && (
        <div
          className="absolute z-30 w-52 rounded-lg border bg-white py-1 text-xs shadow-xl"
          style={{
            left: context.x,
            top: context.y,
          }}
          onClick={(event) => event.stopPropagation()}
        >
          <button
            onClick={() => {
              const name = context.name
              setContext(null)
              openFile(name)
            }}
            className="block w-full px-4 py-2 text-left hover:bg-slate-50"
          >
            Open
          </button>

          <button
            onClick={() => {
              setProperties(context.name)
              setContext(null)
            }}
            className="block w-full px-4 py-2 text-left hover:bg-slate-50"
          >
            Properties
          </button>

          {context.name === "PDFMaster_Setup.exe" && (
            <button
              onClick={() => {
                setContext(null)
                setReportSoftwareOpen(true)
              }}
              className="block w-full px-4 py-2 text-left hover:bg-slate-50"
            >
              Report security concern
            </button>
          )}

          {(context.name === "USB Drive (E:)" ||
            context.name.includes("Payroll_Update")) && (
            <button
              onClick={() => {
                setContext(null)
                setReportUsbOpen(true)
              }}
              className="block w-full px-4 py-2 text-left hover:bg-slate-50"
            >
              Report security concern
            </button>
          )}
        </div>
      )}

      {/* File properties */}
      {properties && (
        <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/30 p-4">
          <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-2xl">
            <h3 className="font-semibold">
              {properties}
            </h3>

            <div className="mt-5 space-y-2 text-sm text-slate-500">
              {properties === "PDFMaster_Setup.exe" ? (
                <>
                  <p>Type: Application (.exe)</p>
                  <p>Publisher: Unknown</p>
                  <p>Source: pdfmaster-download.com</p>
                  <p>Size: 18.4 MB</p>
                </>
              ) : properties.includes("Payroll_Update") ? (
                <>
                  <p>Type: Application (.exe)</p>
                  <p>Location: E:\</p>
                  <p>Size: 1.8 MB</p>
                  <p>Publisher: Unknown</p>
                </>
              ) : properties === "USB Drive (E:)" ? (
                <>
                  <p>Type: Removable drive</p>
                  <p>Location: E:\</p>
                </>
              ) : (
                <>
                  <p>Type: File or folder</p>
                  <p>Location: This PC</p>
                </>
              )}
            </div>

            <button
              onClick={() => setProperties(null)}
              className="mt-6 rounded-lg border px-4 py-2 text-sm"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Simulated document viewer */}
      {document && (
        <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/40 p-4">
          <div className="flex max-h-[90%] w-full max-w-2xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl">
            <div className="flex items-center justify-between bg-[#234c85] px-5 py-3 text-white">
              <div className="text-sm font-semibold">
                Word · {document}
              </div>

              <button
                onClick={() => setDocument(null)}
                className="rounded px-3 py-1 hover:bg-white/20"
              >
                ✕
              </button>
            </div>

            <div className="overflow-y-auto bg-slate-100 p-6">
              <div className="mx-auto min-h-72 max-w-lg bg-white p-8 shadow">
                {document === "Daily_Tasks.docx" ? (
                  <>
                    <h2 className="text-xl font-bold">
                      Daily Tasks
                    </h2>

                    <p className="mt-3 text-sm text-slate-500">
                      Employee work checklist
                    </p>

                    <ul className="mt-6 list-disc space-y-3 pl-5 text-sm leading-6">
                      <li>Review incoming emails.</li>
                      <li>Check pending work requests.</li>
                      <li>Review project documents.</li>
                      <li>Follow company cybersecurity policies.</li>
                      <li>
                        Report suspicious activity through approved channels.
                      </li>
                    </ul>
                  </>
                ) : (
                  <>
                    <h2 className="text-xl font-bold">
                      Project Notes
                    </h2>

                    <p className="mt-5 text-sm leading-7">
                      Review current project tasks, update meeting notes,
                      and coordinate outstanding work items with the team.
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PDF editor prompt */}
      {pdfDialog && (
        <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/30 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl">
            <h3 className="text-lg font-semibold">
              Vendor Contract
            </h3>

            <p className="mt-4 text-sm text-slate-600">
              This document contains editable form fields.
            </p>

            <p className="mt-2 text-sm text-slate-600">
              A compatible PDF editor is required to edit this document.
            </p>

            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setPdfDialog(false)}
                className="rounded-lg border px-4 py-2 text-sm"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  setPdfDialog(false)
                  onOpenEdge?.(
                    "https://www.bing.com/search?q=free+pdf+editor+download"
                  )
                }}
                className="rounded-lg bg-blue-700 px-4 py-2 text-sm text-white"
              >
                Search for an app
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SmartScreen warning */}
      {smartScreen && (
        <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md bg-[#0878d1] p-8 text-white shadow-2xl">
            <div className="text-5xl">▣</div>

            <h2 className="mt-6 text-2xl font-semibold">
              Windows protected your PC
            </h2>

            <p className="mt-4 text-sm text-blue-50">
              Microsoft Defender SmartScreen prevented an unrecognized
              app from starting. Running this app might put your PC at risk.
            </p>

            {moreInfo && (
              <div className="mt-5 text-sm">
                <p>App: PDFMaster_Setup.exe</p>
                <p>Publisher: Unknown publisher</p>
              </div>
            )}

            <div className="mt-8 flex flex-wrap gap-3">
              {moreInfo && (
                <button
                  onClick={runInstallerAnyway}
                  className="border border-white/70 px-5 py-2 text-sm"
                >
                  Run anyway
                </button>
              )}

              <button
                onClick={() => setSmartScreen(false)}
                className="border border-white/70 px-5 py-2 text-sm"
              >
                Don't run
              </button>

              {!moreInfo && (
                <button
                  onClick={() => setMoreInfo(true)}
                  className="px-3 py-2 text-sm underline"
                >
                  More info
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Installer simulation */}
      {installing && (
        <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/30 p-4">
          <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-2xl">
            <h3 className="font-semibold">
              PDFMaster Pro Setup
            </h3>

            <p className="mt-4 text-sm text-slate-500">
              Installing...
            </p>

            <div className="mt-3 h-2 overflow-hidden rounded bg-slate-200">
              <div className="h-full w-4/5 animate-pulse bg-blue-600" />
            </div>
          </div>
        </div>
      )}

      {/* Software report */}
      {reportSoftwareOpen && (
        <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/30 p-4">
          <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-2xl">
            <h3 className="text-lg font-semibold">
              Report software
            </h3>

            <div className="mt-4 space-y-2 text-sm text-slate-600">
              <p>File: PDFMaster_Setup.exe</p>
              <p>Publisher: Unknown</p>
              <p>Source: pdfmaster-download.com</p>
              <p>Reason: Suspicious or unapproved software</p>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setReportSoftwareOpen(false)}
                className="rounded-lg border px-4 py-2 text-sm"
              >
                Cancel
              </button>

              <button
                onClick={reportSoftware}
                className="rounded-lg bg-blue-700 px-4 py-2 text-sm text-white"
              >
                Submit report
              </button>
            </div>
          </div>
        </div>
      )}

      {/* USB report */}
      {reportUsbOpen && (
        <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/30 p-4">
          <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-2xl">
            <h3 className="text-lg font-semibold">
              Report security concern
            </h3>

            <p className="mt-4 text-sm text-slate-600">
              Report suspicious activity involving removable media
              to Security Operations?
            </p>

            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setReportUsbOpen(false)}
                className="rounded-lg border px-4 py-2 text-sm"
              >
                Cancel
              </button>

              <button
                onClick={reportUsb}
                className="rounded-lg bg-blue-700 px-4 py-2 text-sm text-white"
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
