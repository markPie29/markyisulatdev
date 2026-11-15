import {
  Boxes,
  Cpu,
  Database,
  Film,
  Gamepad2,
  Image as ImageIcon,
  Mail,
  Palette,
  PenTool,
  Scan,
  Sparkles,
  Terminal,
  Workflow,
} from "lucide-react";
import {
  SiDocker,
  SiDotnet,
  SiElectron,
  SiExpress,
  SiFfmpeg,
  SiFigma,
  SiFirebase,
  SiFramer,
  SiGit,
  SiGithub,
  SiGsap,
  SiJavascript,
  SiLaravel,
  SiMeta,
  SiMysql,
  SiNetlify,
  SiNextdotjs,
  SiNodedotjs,
  SiPhp,
  SiPostgresql,
  SiPython,
  SiRadixui,
  SiReact,
  SiRender,
  SiShadcnui,
  SiSqlite,
  SiSupabase,
  SiTailwindcss,
  SiTanstack,
  SiTypescript,
  SiUnity,
  SiVercel,
  SiVite,
  SiYolo,
} from "react-icons/si";
import { cn } from "@/lib/utils";

type IconKey =
  | "react"
  | "nextjs"
  | "typescript"
  | "javascript"
  | "tailwind"
  | "electron"
  | "tanstack"
  | "supabase"
  | "postgresql"
  | "nodejs"
  | "express"
  | "python"
  | "laravel"
  | "php"
  | "sqlite"
  | "mysql"
  | "sqlserver"
  | "firebase"
  | "figma"
  | "photoshop"
  | "illustrator"
  | "canva"
  | "capcut"
  | "framer"
  | "gsap"
  | "zustand"
  | "shadcn"
  | "radix"
  | "unity"
  | "vuforia"
  | "docker"
  | "github"
  | "git"
  | "vercel"
  | "netlify"
  | "render"
  | "ffmpeg"
  | "vite"
  | "yolo"
  | "siglip"
  | "ai"
  | "dotnet"
  | "pygame"
  | "klaviyo"
  | "meta"
  | "api"
  | "fallback";

const EXACT_KEY_MAP: Record<string, IconKey> = {
  "react": "react",
  "react 19": "react",
  "react (exposure)": "react",
  "next.js": "nextjs",
  "nextjs": "nextjs",
  "typescript": "typescript",
  "javascript": "javascript",
  "javascript (es6+)": "javascript",
  "tailwind css": "tailwind",
  "tailwind css v4": "tailwind",
  "electron": "electron",
  "electron 34": "electron",
  "tanstack virtual": "tanstack",
  "supabase": "supabase",
  "supabase (postgresql / rls)": "supabase",
  "postgresql": "postgresql",
  "node.js": "nodejs",
  "node.js & express": "nodejs",
  "express.js": "express",
  "python": "python",
  "python 3.12": "python",
  "laravel": "laravel",
  "laravel & php": "laravel",
  "php": "php",
  "sqlite": "sqlite",
  "sqlite & mysql": "sqlite",
  "mysql": "mysql",
  "mysql & sql server": "mysql",
  "sql server": "sqlserver",
  "firebase": "firebase",
  "figma": "figma",
  "adobe photoshop": "photoshop",
  "adobe illustrator": "illustrator",
  "canva": "canva",
  "capcut": "capcut",
  "framer motion": "framer",
  "framer motion & gsap": "framer",
  "gsap": "gsap",
  "zustand": "zustand",
  "zustand & motion": "zustand",
  "shadcn ui": "shadcn",
  "shadcn ui & radix": "shadcn",
  "radix": "radix",
  "unity 3d": "unity",
  "unity 3d & vuforia ar": "unity",
  "vuforia ar": "vuforia",
  "docker": "docker",
  "docker, git & github": "docker",
  "git": "git",
  "git & github": "github",
  "github": "github",
  "vercel": "vercel",
  "vercel, netlify & render": "vercel",
  "netlify": "netlify",
  "render": "render",
  "ffmpeg": "ffmpeg",
  "vite": "vite",
  "yolo11": "yolo",
  "yolo11 & ghostfacenet": "yolo",
  "siglip 2": "siglip",
  "siglip 2 / meta dinov2": "siglip",
  "siglip 2 / yolo11 / local llm": "ai",
  "ibm granite 4.0 (llama.cpp)": "ai",
  "c#": "dotnet",
  "javascript (es6+) & java / c#": "javascript",
  "pygame": "pygame",
  "klaviyo": "klaviyo",
  "klaviyo & meta business suite": "klaviyo",
  "meta business suite": "meta",
  "restful & serverless apis": "api",
};

function resolveIconKey(name: string): IconKey {
  const key = name.trim().toLowerCase();
  if (key in EXACT_KEY_MAP) {
    return EXACT_KEY_MAP[key];
  }

  if (key.includes("tanstack")) return "tanstack";
  if (key.includes("next.js") || key.includes("nextjs")) return "nextjs";
  if (key.includes("react")) return "react";
  if (key.includes("typescript")) return "typescript";
  if (key.includes("javascript")) return "javascript";
  if (key.includes("tailwind")) return "tailwind";
  if (key.includes("electron")) return "electron";
  if (key.includes("supabase")) return "supabase";
  if (key.includes("postgres")) return "postgresql";
  if (key.includes("express")) return "express";
  if (key.includes("node")) return "nodejs";
  if (key.includes("python")) return "python";
  if (key.includes("laravel")) return "laravel";
  if (key.includes("php")) return "php";
  if (key.includes("sqlite")) return "sqlite";
  if (key.includes("mysql")) return "mysql";
  if (key.includes("firebase")) return "firebase";
  if (key.includes("figma")) return "figma";
  if (key.includes("photoshop")) return "photoshop";
  if (key.includes("illustrator")) return "illustrator";
  if (key.includes("canva")) return "canva";
  if (key.includes("capcut")) return "capcut";
  if (key.includes("framer") || key.includes("motion")) return "framer";
  if (key.includes("gsap")) return "gsap";
  if (key.includes("zustand")) return "zustand";
  if (key.includes("shadcn")) return "shadcn";
  if (key.includes("radix")) return "radix";
  if (key.includes("unity")) return "unity";
  if (key.includes("vuforia")) return "vuforia";
  if (key.includes("docker")) return "docker";
  if (key.includes("github")) return "github";
  if (key.includes("git")) return "git";
  if (key.includes("vercel")) return "vercel";
  if (key.includes("netlify")) return "netlify";
  if (key.includes("render")) return "render";
  if (key.includes("ffmpeg")) return "ffmpeg";
  if (key.includes("vite")) return "vite";
  if (key.includes("yolo")) return "yolo";
  if (key.includes("siglip") || key.includes("dinov2")) return "siglip";
  if (key.includes("granite") || key.includes("llm") || key.includes("ai")) return "ai";
  if (key.includes("meta")) return "meta";
  if (key.includes("klaviyo")) return "klaviyo";
  if (key.includes("pygame")) return "pygame";
  if (key.includes("c#")) return "dotnet";
  if (key.includes("sql")) return "sqlserver";
  if (key.includes("api")) return "api";

  return "fallback";
}

export interface TechIconProps {
  name: string;
  size?: number;
  className?: string;
}

/**
 * Maps tool and stack labels across portfolio data to crisp 14px monochrome icons.
 */
export function TechIcon({ name, size = 14, className }: TechIconProps) {
  const iconClass = cn("shrink-0 text-fg-muted", className);
  const iconKey = resolveIconKey(name);

  switch (iconKey) {
    case "react":
      return <SiReact size={size} aria-hidden className={iconClass} />;
    case "nextjs":
      return <SiNextdotjs size={size} aria-hidden className={iconClass} />;
    case "typescript":
      return <SiTypescript size={size} aria-hidden className={iconClass} />;
    case "javascript":
      return <SiJavascript size={size} aria-hidden className={iconClass} />;
    case "tailwind":
      return <SiTailwindcss size={size} aria-hidden className={iconClass} />;
    case "electron":
      return <SiElectron size={size} aria-hidden className={iconClass} />;
    case "tanstack":
      return <SiTanstack size={size} aria-hidden className={iconClass} />;
    case "supabase":
      return <SiSupabase size={size} aria-hidden className={iconClass} />;
    case "postgresql":
      return <SiPostgresql size={size} aria-hidden className={iconClass} />;
    case "nodejs":
      return <SiNodedotjs size={size} aria-hidden className={iconClass} />;
    case "express":
      return <SiExpress size={size} aria-hidden className={iconClass} />;
    case "python":
      return <SiPython size={size} aria-hidden className={iconClass} />;
    case "laravel":
      return <SiLaravel size={size} aria-hidden className={iconClass} />;
    case "php":
      return <SiPhp size={size} aria-hidden className={iconClass} />;
    case "sqlite":
      return <SiSqlite size={size} aria-hidden className={iconClass} />;
    case "mysql":
      return <SiMysql size={size} aria-hidden className={iconClass} />;
    case "sqlserver":
      return <Database size={size} aria-hidden className={iconClass} />;
    case "firebase":
      return <SiFirebase size={size} aria-hidden className={iconClass} />;
    case "figma":
      return <SiFigma size={size} aria-hidden className={iconClass} />;
    case "photoshop":
      return <ImageIcon size={size} aria-hidden className={iconClass} />;
    case "illustrator":
      return <PenTool size={size} aria-hidden className={iconClass} />;
    case "canva":
      return <Palette size={size} aria-hidden className={iconClass} />;
    case "capcut":
      return <Film size={size} aria-hidden className={iconClass} />;
    case "framer":
      return <SiFramer size={size} aria-hidden className={iconClass} />;
    case "gsap":
      return <SiGsap size={size} aria-hidden className={iconClass} />;
    case "zustand":
      return <Boxes size={size} aria-hidden className={iconClass} />;
    case "shadcn":
      return <SiShadcnui size={size} aria-hidden className={iconClass} />;
    case "radix":
      return <SiRadixui size={size} aria-hidden className={iconClass} />;
    case "unity":
      return <SiUnity size={size} aria-hidden className={iconClass} />;
    case "vuforia":
      return <Scan size={size} aria-hidden className={iconClass} />;
    case "docker":
      return <SiDocker size={size} aria-hidden className={iconClass} />;
    case "github":
      return <SiGithub size={size} aria-hidden className={iconClass} />;
    case "git":
      return <SiGit size={size} aria-hidden className={iconClass} />;
    case "vercel":
      return <SiVercel size={size} aria-hidden className={iconClass} />;
    case "netlify":
      return <SiNetlify size={size} aria-hidden className={iconClass} />;
    case "render":
      return <SiRender size={size} aria-hidden className={iconClass} />;
    case "ffmpeg":
      return <SiFfmpeg size={size} aria-hidden className={iconClass} />;
    case "vite":
      return <SiVite size={size} aria-hidden className={iconClass} />;
    case "yolo":
      return <SiYolo size={size} aria-hidden className={iconClass} />;
    case "siglip":
      return <Sparkles size={size} aria-hidden className={iconClass} />;
    case "ai":
      return <Cpu size={size} aria-hidden className={iconClass} />;
    case "dotnet":
      return <SiDotnet size={size} aria-hidden className={iconClass} />;
    case "pygame":
      return <Gamepad2 size={size} aria-hidden className={iconClass} />;
    case "klaviyo":
      return <Mail size={size} aria-hidden className={iconClass} />;
    case "meta":
      return <SiMeta size={size} aria-hidden className={iconClass} />;
    case "api":
      return <Workflow size={size} aria-hidden className={iconClass} />;
    case "fallback":
      return <Terminal size={size} aria-hidden className={iconClass} />;
  }
}
