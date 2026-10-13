"use client"
import { useState } from "react"
import { WindowManager } from "./WindowManager"
import { Taskbar } from "./Taskbar"
import { NotificationCenter, notify } from "./NotificationCenter"
import { useGame, type AppId } from "../game/GameProvider"

export function WindowsDesktop(){
  const [openApps,setOpenApps]=useState<AppId[]>([])
  const [edgeUrl,setEdgeUrl]=useState("https://intranet.sdaia.gov.sa")
  const g=useGame()
  const open=(id:AppId,url?:string)=>{if(id==="edge"&&url)setEdgeUrl(url);setOpenApps(a=>a.includes(id)?a:[...a,id])}
  const close=(id:AppId)=>setOpenApps(a=>a.filter(x=>x!==id))
  const insertUsb=()=>{if(g.unknownUsbInserted)return;g.insertUnknownUsb();notify("USB Drive (E:)","Removable drive connected. Open File Explorer to view files.")}
  return <main className="relative h-screen overflow-hidden bg-[radial-gradient(circle_at_30%_20%,#254a6b,#122b45_44%,#071525)] text-white">
    <div className="absolute inset-0 opacity-20" style={{backgroundImage:"linear-gradient(120deg,transparent 0 45%,rgba(255,255,255,.18) 46%,transparent 47%),linear-gradient(20deg,transparent 0 55%,rgba(0,0,0,.35) 56%,transparent 57%)",backgroundSize:"720px 520px"}}/>
    <div className="relative flex h-full items-center justify-center pb-16">
      <div className="absolute left-7 top-24 grid gap-6">
        <button onDoubleClick={()=>open("explorer")} className="grid w-20 justify-items-center gap-2 rounded-lg p-2 text-xs hover:bg-white/10"><span className="grid size-12 place-items-center rounded-xl bg-yellow-400 text-2xl text-slate-800">▣</span>File Explorer</button>
        <button onDoubleClick={()=>open("security")} className="grid w-20 justify-items-center gap-2 rounded-lg p-2 text-xs hover:bg-white/10"><span className="grid size-12 place-items-center rounded-xl bg-blue-500 text-2xl">✓</span>Security</button>
      </div>
      {!g.unknownUsbInserted&&<button onClick={insertUsb} title="USB flash drive" className="absolute right-8 top-28 grid w-20 justify-items-center gap-2 rounded-lg p-2 text-xs text-white/80 hover:bg-white/10"><span className="grid h-12 w-7 place-items-center rounded-sm border border-white/30 bg-slate-700 text-lg">▯</span>USB Drive</button>}
      <WindowManager openApps={openApps} onClose={close} onOpen={open} edgeUrl={edgeUrl}/>
    </div>
    <Taskbar onOpen={open}/><NotificationCenter/>
  </main>
}
