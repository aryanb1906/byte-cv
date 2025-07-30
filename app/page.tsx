"use client"

import { useState, useEffect } from "react"
import { ResumeForm } from "@/components/resume-form"
import { ResumePreview } from "@/components/resume-preview"
import { Button } from "@/components/ui/button"
import { Download, RotateCcw, Save, CheckCircle } from "lucide-react"
import { generateHTMLToDOCX } from "@/lib/html-to-docx-generator"
import { ThemeToggle } from "@/components/theme-toggle"

export interface PersonalInfo {
  name: string
  location: string
  phone: string
  email: string
  linkedin: string
  github: string
  leetcode: string
}

export interface Education {
  id: string
  institution: string
  degree: string
  duration: string
  location: string
  gradeFormat?: "CGPA" | "Percentage" | ""
  gradeValue?: string
}

export interface TechnicalSkill {
  id: string
  category: string
  skills: string
}

export interface Project {
  id: string
  title: string
  technologies: string
  description: string
  links?: string
}

export interface Experience {
  id: string
  company: string
  position: string
  duration: string
  location: string
  description: string
}

export interface Achievement {
  id: string
  title: string
  description: string
}

export interface Extracurricular {
  id: string
  organization: string
  designation: string
  duration: string
  description: string
}

export interface CustomSection {
  id: string
  title: string
  items: {
    id: string
    title: string
    subtitle?: string
    description: string
    duration?: string
    location?: string
  }[]
}

export interface ResumeData {
  personalInfo: PersonalInfo
  education: Education[]
  technicalSkills: TechnicalSkill[]
  projects: Project[]
  experience: Experience[]
  achievements: Achievement[]
  extracurriculars: Extracurricular[]
  customSections: CustomSection[]
  sectionOrder: string[]
}

const initialData: ResumeData = {
  personalInfo: {
    name: "",
    location: "",
    phone: "",
    email: "",
    linkedin: "",
    github: "",
    leetcode: "",
  },
  education: [],
  technicalSkills: [],
  projects: [],
  experience: [],
  achievements: [],
  extracurriculars: [],
  customSections: [],
  sectionOrder: ["education", "technicalSkills", "experience", "projects", "achievements", "extracurriculars"],
}

const STORAGE_KEY = "bytecv-resume-data"
const AUTO_SAVE_DELAY = 2000 // 2 seconds

export default function ResumePage() {
  const [resumeData, setResumeData] = useState<ResumeData>(initialData)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [isAutoSaving, setIsAutoSaving] = useState(false)

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY)
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData)
        // Ensure sectionOrder exists for backward compatibility
        if (!parsed.sectionOrder) {
          parsed.sectionOrder = [
            "education",
            "technicalSkills",
            "experience",
            "projects",
            "achievements",
            "extracurriculars",
          ]
        }
        if (!parsed.customSections) {
          parsed.customSections = []
        }
        setResumeData(parsed)
        setLastSaved(new Date(parsed.lastSaved || Date.now()))
      } catch (error) {
        console.error("Error loading saved data:", error)
      }
    }
  }, [])

  // Auto-save functionality
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsAutoSaving(true)
      const dataToSave = {
        ...resumeData,
        lastSaved: Date.now(),
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave))
      setLastSaved(new Date())
      setTimeout(() => setIsAutoSaving(false), 500)
    }, AUTO_SAVE_DELAY)

    return () => clearTimeout(timeoutId)
  }, [resumeData])

  const handleDownloadHTMLDOCX = async () => {
    await generateHTMLToDOCX(resumeData)
  }

  const handleReset = () => {
    if (confirm("Are you sure you want to reset all data? This action cannot be undone.")) {
      setResumeData(initialData)
      localStorage.removeItem(STORAGE_KEY)
      setLastSaved(null)
    }
  }

  const handleManualSave = () => {
    const dataToSave = {
      ...resumeData,
      lastSaved: Date.now(),
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave))
    setLastSaved(new Date())
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-background border-b border-border px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-foreground rounded-lg flex items-center justify-center">
              <span className="text-background font-bold text-sm">CV</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">ByteCV</h1>
              <p className="text-sm text-muted-foreground">
                Created by{" "}
                <a
                  href="https://www.linkedin.com/in/aryan-bhargava/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-muted-foreground"
                >
                  Aryan Bhargava
                </a>
                {" & "}
                <a
                  href="https://www.linkedin.com/in/aryankumar102907/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-muted-foreground"
                >
                  Aryan Kumar
                </a>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* Auto-save status */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              {isAutoSaving ? (
                <>
                  <Save className="w-4 h-4 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : lastSaved ? (
                <>
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Saved {lastSaved.toLocaleTimeString()}</span>
                </>
              ) : (
                <span>Not saved</span>
              )}
            </div>
            <Button
              onClick={handleManualSave}
              variant="outline"
              size="sm"
              className="border-border text-foreground hover:bg-accent bg-transparent"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Now
            </Button>
            <ThemeToggle />
            <Button
              onClick={handleReset}
              variant="outline"
              size="sm"
              className="border-border text-foreground hover:bg-accent bg-transparent"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>

            {/* Single Word Download Button */}
            <Button onClick={handleDownloadHTMLDOCX} size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
              <Download className="w-4 h-4 mr-2" />
              Download Word
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6 h-[calc(100vh-120px)]">
          {/* Form Section */}
          <div className="bg-card rounded-xl shadow-lg border border-border overflow-hidden">
            <ResumeForm resumeData={resumeData} setResumeData={setResumeData} />
          </div>

          {/* Preview Section */}
          <div className="bg-card rounded-xl shadow-lg border border-border overflow-hidden">
            <div className="h-full flex flex-col">
              <div className="bg-muted px-6 py-4 border-b border-border">
                <h2 className="text-lg font-semibold text-foreground">Live Preview</h2>
              </div>
              <div className="flex-1 p-4 overflow-y-auto">
                <div
                  className="w-full max-w-[210mm] mx-auto shadow-lg"
                  style={{
                    transform: "scale(0.9)",
                    transformOrigin: "top center",
                    minHeight: "297mm",
                  }}
                >
                  <ResumePreview resumeData={resumeData} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
