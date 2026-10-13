"use client"
import { useGame } from "./GameProvider"
export function GameHUD(){const {score,elapsedTime}=useGame();const mm=String(Math.floor(elapsedTime/60)).padStart(2,"0"),ss=String(elapsedTime%60).padStart(2,"0");return <div className="fixed left-5 top-4 z-50 flex items-center gap-4 rounded-full border border-white/10 bg-black/35 px-4 py-2 text-[11px] tracking-[.18em] text-white/70 backdrop-blur"><span>TIME {mm}:{ss}</span><span className="h-3 w-px bg-white/20"/><span>SCORE {score.toLocaleString()}</span></div>}
