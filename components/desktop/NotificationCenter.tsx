"use client"
import { useEffect, useState } from "react"
type Note={title:string;body:string;id:number}
export function NotificationCenter(){const [notes,setNotes]=useState<Note[]>([]);useEffect(()=>{const on=(e:Event)=>{const d=(e as CustomEvent).detail as Omit<Note,"id">;const id=Date.now();setNotes(n=>[...n,{...d,id}]);window.setTimeout(()=>setNotes(n=>n.filter(x=>x.id!==id)),5500)};window.addEventListener("cyber-notification",on);return()=>window.removeEventListener("cyber-notification",on)},[]);return <div className="pointer-events-none fixed bottom-14 right-5 z-[80] grid gap-2">{notes.map(n=><div key={n.id} className="w-80 rounded-lg border border-slate-300 bg-white p-4 text-slate-800 shadow-2xl"><div className="text-xs font-semibold">{n.title}</div><div className="mt-1 text-xs text-slate-500">{n.body}</div></div>)}</div>}
export function notify(title:string,body:string){window.dispatchEvent(new CustomEvent("cyber-notification",{detail:{title,body}}))}
