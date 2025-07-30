"use client"

import React, { useRef, useEffect, useState, useCallback } from "react"
import { Mail, Phone, Linkedin, Github, Code } from "lucide-react"
import type { ResumeData } from "@/app/page"

interface ResumePreviewProps {
  resumeData: ResumeData
}

// Define A4 dimensions in pixels (approximate for browser rendering at 96 DPI)
const A4_HEIGHT_PX = 1122.52 // 297mm * 3.779528px/mm
const TOP_MARGIN_PX = 37.79 // 10mm * 3.779528px/mm
const BOTTOM_MARGIN_PX = 56.69 // 15mm * 3.779528px/mm
const AVAILABLE_CONTENT_HEIGHT_PX = A4_HEIGHT_PX - TOP_MARGIN_PX - BOTTOM_MARGIN_PX

// Helper component to render a single page
const ResumePage: React.FC<{ children: React.ReactNode; showTruncationWarning: boolean }> = ({
  children,
  showTruncationWarning,
}) => (
  <div
    id="resume-preview"
    className="bg-white text-black shadow-lg mb-8 print:shadow-none print:mb-0 resume-page"
    style={{
      fontFamily: "Arial, Helvetica, sans-serif",
      width: "210mm",
      height: "297mm", // Fixed A4 height
      margin: "0 auto", // Center the page
      padding: `${TOP_MARGIN_PX}px 6mm ${BOTTOM_MARGIN_PX}px 8mm`, // Apply margins
      fontSize: "10pt",
      lineHeight: "1.2",
      color: "#000000",
      boxSizing: "border-box",
      overflow: "hidden", // Crucial for fixed page height - content will be clipped if it overflows
      position: "relative", // For absolute positioning of warning
      // Critical spacing settings
      textAlign: "left",
      textJustify: "none",
      textAlignLast: "left",
      wordSpacing: "normal",
      letterSpacing: "normal",
      whiteSpace: "normal",
      textRendering: "geometricPrecision",
      WebkitFontSmoothing: "subpixel-antialiased",
      MozOsxFontSmoothing: "auto",
      fontKerning: "normal",
      fontVariantLigatures: "none",
      fontFeatureSettings: "normal",
      textSizeAdjust: "none",
      WebkitTextSizeAdjust: "none",
      MozTextSizeAdjust: "none",
    }}
  >
    {children}
    {showTruncationWarning && (
      <div
        style={{
          position: "absolute",
          bottom: "10mm",
          left: "50%",
          transform: "translateX(-50%)",
          color: "red",
          fontSize: "8pt",
          textAlign: "center",
          width: "100%",
          background: "rgba(255, 255, 255, 0.8)",
          padding: "5px",
          border: "1px solid red",
        }}
      >
        Content truncated. Only one page supported.
      </div>
    )}
  </div>
)

// Function to get the height of a section
const getSectionHeight = (element: Element | null): number => {
  if (!element) return 0
  return element.getBoundingClientRect().height
}

export function ResumePreview({ resumeData }: ResumePreviewProps) {
  const [pageContent, setPageContent] = useState<React.ReactNode[]>([])
  const [showTruncationWarning, setShowTruncationWarning] = useState(false)
  const tempMeasurementDivRef = useRef<HTMLDivElement>(null)

  // Callback to render a section into a temporary div for measurement
  const renderSectionForMeasurement = useCallback((content: React.ReactNode) => {
    return <div className="section-to-measure">{content}</div>
  }, [])

  const allSectionsReactNodes: React.ReactNode[] = [
    // Header Section
    <React.Fragment key="header">
      <div
        className="header-section"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          width: "100%",
          marginBottom: "8px",
        }}
      >
        <h1
          className="name-heading font-bold uppercase tracking-wide"
          style={{
            fontSize: "20pt",
            lineHeight: "1.1",
            letterSpacing: "2px",
            fontFamily: "Arial, Helvetica, sans-serif",
            fontWeight: "bold",
            textTransform: "uppercase",
            marginBottom: "0px",
          }}
        >
          {resumeData.personalInfo.name || "YOUR NAME"}
        </h1>
        {resumeData.personalInfo.location && (
          <div
            className="location-text"
            style={{
              fontSize: "11pt",
              fontFamily: "Arial, Helvetica, sans-serif",
              marginBottom: "0px",
            }}
          >
            {resumeData.personalInfo.location}
          </div>
        )}
      </div>
      <div
        className="contact-info flex justify-center items-center flex-wrap gap-x-4 gap-y-1"
        style={{
          fontSize: "10pt",
          lineHeight: "1.2",
          fontFamily: "Arial, Helvetica, sans-serif",
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "4px 8px",
          marginTop: "0px",
          marginBottom: "8px",
        }}
      >
        {resumeData.personalInfo.phone && (
          <div
            className="contact-item flex items-center gap-1 whitespace-nowrap"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              whiteSpace: "nowrap",
              wordSpacing: "normal",
            }}
          >
            <Phone className="w-3 h-3 flex-shrink-0" />
            <a href={`tel:${resumeData.personalInfo.phone}`} style={{ textDecoration: "none", color: "#000000" }}>
              {resumeData.personalInfo.phone}
            </a>
          </div>
        )}
        {resumeData.personalInfo.email && (
          <div
            className="contact-item flex items-center gap-1 whitespace-nowrap"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              whiteSpace: "nowrap",
              wordSpacing: "normal",
            }}
          >
            <Mail className="w-3 h-3 flex-shrink-0" />
            <a
              href={`mailto:${resumeData.personalInfo.email}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", color: "#000000" }}
            >
              {resumeData.personalInfo.email}
            </a>
          </div>
        )}
        {resumeData.personalInfo.linkedin && (
          <div
            className="contact-item flex items-center gap-1 whitespace-nowrap"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              whiteSpace: "nowrap",
              wordSpacing: "normal",
            }}
          >
            <Linkedin className="w-3 h-3 flex-shrink-0" />
            <a
              href={`https://linkedin.com/in/${resumeData.personalInfo.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", color: "#000000" }}
            >
              {resumeData.personalInfo.linkedin}
            </a>
          </div>
        )}
        {resumeData.personalInfo.github && (
          <div
            className="contact-item flex items-center gap-1 whitespace-nowrap"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              whiteSpace: "nowrap",
              wordSpacing: "normal",
            }}
          >
            <Github className="w-3 h-3 flex-shrink-0" />
            <a
              href={`https://github.com/${resumeData.personalInfo.github}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", color: "#000000" }}
            >
              {resumeData.personalInfo.github}
            </a>
          </div>
        )}
        {resumeData.personalInfo.leetcode && (
          <div
            className="contact-item flex items-center gap-1 whitespace-nowrap"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              whiteSpace: "nowrap",
              wordSpacing: "normal",
            }}
          >
            <Code className="w-3 h-3 flex-shrink-0" />
            <a
              href={`https://leetcode.com/u/${resumeData.personalInfo.leetcode}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", color: "#000000" }}
            >
              leetcode
            </a>
          </div>
        )}
      </div>
    </React.Fragment>,
    // Education Section
    resumeData.education.length > 0 && (
      <React.Fragment key="education">
        <div className="section education-section" style={{ marginBottom: "8px" }}>
          <h2
            className="section-heading font-bold uppercase mb-2 border-b border-black pb-1"
            style={{
              fontSize: "12pt",
              borderBottomWidth: "1px",
              fontFamily: "Arial, Helvetica, sans-serif",
              textAlign: "left",
              wordSpacing: "normal",
              letterSpacing: "normal",
            }}
          >
            Education
          </h2>
          {resumeData.education.map((edu) => (
            <div key={edu.id} className="education-item" style={{ marginBottom: "8px" }}>
              <div
                className="flex justify-between items-start"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <div className="pr-6" style={{ flex: "auto", paddingRight: "24px" }}>
                  <h3
                    className="institution-name font-bold"
                    style={{
                      fontSize: "11pt",
                      marginBottom: "2px",
                      fontFamily: "Arial, Helvetica, sans-serif",
                      textAlign: "left",
                      wordSpacing: "normal",
                      fontWeight: "bold",
                    }}
                  >
                    {edu.institution}
                  </h3>
                  <p
                    className="degree-info"
                    style={{
                      fontSize: "10pt",
                      margin: "0",
                      fontFamily: "Arial, Helvetica, sans-serif",
                      textAlign: "left",
                      wordSpacing: "normal",
                    }}
                  >
                    {edu.degree}
                    {edu.gradeFormat &&
                      edu.gradeValue &&
                      `; ${edu.gradeFormat}: ${edu.gradeValue}${edu.gradeFormat === "Percentage" && !edu.gradeValue.endsWith("%") ? "%" : ""}`}
                  </p>
                </div>
                <div
                  className="education-meta text-right"
                  style={{
                    fontSize: "10pt",
                    flex: "0 0 auto",
                    paddingLeft: "8px",
                    fontFamily: "Arial, Helvetica, sans-serif",
                    textAlign: "right",
                  }}
                >
                  <div
                    className="duration font-bold"
                    style={{ fontWeight: "bold", whiteSpace: "nowrap", marginBottom: "0px" }}
                  >
                    {edu.duration}
                  </div>
                  <div className="location italic" style={{ fontStyle: "italic", margin: "0px" }}>
                    {edu.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </React.Fragment>
    ),
    // Technical Skills Section
    resumeData.technicalSkills.length > 0 && (
      <React.Fragment key="technical-skills">
        <div className="section skills-section" style={{ marginBottom: "8px" }}>
          <h2
            className="section-heading font-bold uppercase mb-2 border-b border-black pb-1"
            style={{
              fontSize: "12pt",
              borderBottomWidth: "1px",
              fontFamily: "Arial, Helvetica, sans-serif",
              textAlign: "left",
              wordSpacing: "normal",
              letterSpacing: "normal",
            }}
          >
            Technical Skills
          </h2>
          <div className="skills-list space-y-1">
            {resumeData.technicalSkills.map((skill) => (
              <div
                key={skill.id}
                className="skill-item"
                style={{
                  fontSize: "10pt",
                  margin: "2px 0",
                  fontFamily: "Arial, Helvetica, sans-serif",
                  textAlign: "left",
                  wordSpacing: "normal",
                  letterSpacing: "normal",
                }}
              >
                <span className="skill-category font-bold" style={{ fontWeight: "bold" }}>
                  {skill.category}:
                </span>{" "}
                <span className="skill-list">{skill.skills}</span>
              </div>
            ))}
          </div>
        </div>
      </React.Fragment>
    ),
    // Professional Experience Section
    resumeData.experience.length > 0 && (
      <React.Fragment key="experience">
        <div className="section experience-section" style={{ marginBottom: "8px" }}>
          <h2
            className="section-heading font-bold uppercase mb-2 border-b border-black pb-1"
            style={{
              fontSize: "12pt",
              borderBottomWidth: "1px",
              fontFamily: "Arial, Helvetica, sans-serif",
              textAlign: "left",
              wordSpacing: "normal",
              letterSpacing: "normal",
            }}
          >
            Professional Experience
          </h2>
          {resumeData.experience.map((exp) => (
            <div key={exp.id} className="experience-item" style={{ marginBottom: "8px" }}>
              <div
                className="experience-header flex justify-between items-start mb-1"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "4px",
                }}
              >
                <div
                  className="experience-info flex-1 pr-6"
                  style={{ flex: "1", paddingRight: "24px", maxWidth: "70%" }}
                >
                  <h3
                    className="company-name font-bold"
                    style={{
                      fontSize: "11pt",
                      marginBottom: "2px",
                      fontFamily: "Arial, Helvetica, sans-serif",
                      textAlign: "left",
                      wordSpacing: "normal",
                      fontWeight: "bold",
                    }}
                  >
                    {exp.company}
                  </h3>
                  <p
                    className="position-title font-bold"
                    style={{
                      fontSize: "10pt",
                      margin: "0",
                      fontFamily: "Arial, Helvetica, sans-serif",
                      textAlign: "left",
                      wordSpacing: "normal",
                      fontWeight: "bold",
                    }}
                  >
                    {exp.position}
                  </p>
                </div>
                <div
                  className="experience-meta text-right"
                  style={{
                    fontSize: "10pt",
                    flex: "0 0 auto",
                    paddingLeft: "8px",
                    fontFamily: "Arial, Helvetica, sans-serif",
                    textAlign: "right",
                  }}
                >
                  <div className="duration font-bold" style={{ fontWeight: "bold", whiteSpace: "nowrap" }}>
                    {exp.duration}
                  </div>
                  <div className="location italic" style={{ fontStyle: "italic" }}>
                    {exp.location}
                  </div>
                </div>
              </div>
              {exp.description && (
                <div
                  className="experience-description"
                  style={{
                    fontSize: "10pt",
                    lineHeight: "1.2",
                    fontFamily: "Arial, Helvetica, sans-serif",
                  }}
                >
                  {exp.description.split("\n").map((line, index) => (
                    <div
                      key={index}
                      className="bullet-point"
                      style={{
                        margin: "2px 0",
                        paddingLeft: "1em",
                        textIndent: "-1em",
                        textAlign: "left",
                        wordSpacing: "normal",
                        letterSpacing: "normal",
                        whiteSpace: "normal",
                      }}
                    >
                      • {line.replace(/^•\s*/, "")}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </React.Fragment>
    ),
    // Projects Section
    resumeData.projects.length > 0 && (
      <React.Fragment key="projects">
        <div className="section projects-section" style={{ marginBottom: "8px" }}>
          <h2
            className="section-heading font-bold uppercase mb-2 border-b border-black pb-1"
            style={{
              fontSize: "12pt",
              borderBottomWidth: "1px",
              fontFamily: "Arial, Helvetica, sans-serif",
              textAlign: "left",
              wordSpacing: "normal",
              letterSpacing: "normal",
            }}
          >
            Projects
          </h2>
          {resumeData.projects.map((project) => (
            <div key={project.id} className="project-item" style={{ marginBottom: "8px" }}>
              <div className="project-header flex justify-between items-start mb-1">
                <h3
                  className="project-title font-bold pr-4"
                  style={{
                    fontSize: "11pt",
                    flex: "1",
                    fontFamily: "Arial, Helvetica, sans-serif",
                    textAlign: "left",
                    wordSpacing: "normal",
                    fontWeight: "bold",
                    paddingRight: "16px",
                  }}
                >
                  {project.title}
                  {project.links && (
                    <span className="project-links" style={{ fontSize: "10pt", fontWeight: "normal" }}>
                      {" | "}
                      {project.links.split("|").map((link, index) => {
                        const trimmedLink = link.trim()
                        let displayLink = trimmedLink
                        let fullUrl = trimmedLink

                        if (trimmedLink.startsWith("github.com/")) {
                          displayLink = "GitHub"
                          fullUrl = `https://${trimmedLink}`
                        } else if (trimmedLink.startsWith("leetcode.com/")) {
                          displayLink = "LeetCode"
                          fullUrl = `https://${trimmedLink}`
                        } else if (!trimmedLink.startsWith("http")) {
                          fullUrl = `https://${trimmedLink}`
                        }

                        return (
                          <span key={index}>
                            {index > 0 && " | "}
                            <a
                              href={fullUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ textDecoration: "none", color: "#000000" }}
                            >
                              {displayLink}
                            </a>
                          </span>
                        )
                      })}
                    </span>
                  )}
                </h3>
              </div>
              {project.technologies && (
                <p
                  className="project-technologies"
                  style={{
                    fontSize: "10pt",
                    margin: "2px 0",
                    fontWeight: "500",
                    fontFamily: "Arial, Helvetica, sans-serif",
                    textAlign: "left",
                    wordSpacing: "normal",
                  }}
                >
                  {project.technologies}
                </p>
              )}
              {project.description && (
                <div
                  className="project-description"
                  style={{
                    fontSize: "10pt",
                    lineHeight: "1.2",
                    fontFamily: "Arial, Helvetica, sans-serif",
                  }}
                >
                  {project.description.split("\n").map((line, index) => (
                    <div
                      key={index}
                      className="bullet-point"
                      style={{
                        margin: "2px 0",
                        paddingLeft: "1em",
                        textIndent: "-1em",
                        textAlign: "left",
                        wordSpacing: "normal",
                        letterSpacing: "normal",
                        whiteSpace: "normal",
                      }}
                    >
                      • {line.replace(/^•\s*/, "")}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </React.Fragment>
    ),
    // Achievements Section
    resumeData.achievements.length > 0 && (
      <React.Fragment key="achievements">
        <div className="section achievements-section" style={{ marginBottom: "8px" }}>
          <h2
            className="section-heading font-bold uppercase mb-2 border-b border-black pb-1"
            style={{
              fontSize: "12pt",
              borderBottomWidth: "1px",
              fontFamily: "Arial, Helvetica, sans-serif",
              textAlign: "left",
              wordSpacing: "normal",
              letterSpacing: "normal",
            }}
          >
            Achievements
          </h2>
          {resumeData.achievements.map((achievement) => (
            <div key={achievement.id} className="achievement-item" style={{ marginBottom: "6px" }}>
              <h3
                className="achievement-title font-bold mb-1"
                style={{
                  fontSize: "11pt",
                  fontFamily: "Arial, Helvetica, sans-serif",
                  textAlign: "left",
                  wordSpacing: "normal",
                  fontWeight: "bold",
                  marginBottom: "2px",
                }}
              >
                {achievement.title}
              </h3>
              {achievement.description && (
                <div
                  className="achievement-description"
                  style={{
                    fontSize: "10pt",
                    lineHeight: "1.2",
                    fontFamily: "Arial, Helvetica, sans-serif",
                  }}
                >
                  {achievement.description.split("\n").map((line, index) => (
                    <div
                      key={index}
                      className="bullet-point"
                      style={{
                        margin: "2px 0",
                        paddingLeft: "1em",
                        textIndent: "-1em",
                        textAlign: "left",
                        wordSpacing: "normal",
                        letterSpacing: "normal",
                        whiteSpace: "normal",
                      }}
                    >
                      • {line.replace(/^•\s*/, "")}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </React.Fragment>
    ),
    // Extracurriculars Section
    resumeData.extracurriculars.length > 0 && (
      <React.Fragment key="extracurriculars">
        <div className="section extracurriculars-section" style={{ marginBottom: "8px" }}>
          <h2
            className="section-heading font-bold uppercase mb-2 border-b border-black pb-1"
            style={{
              fontSize: "12pt",
              borderBottomWidth: "1px",
              fontFamily: "Arial, Helvetica, sans-serif",
              textAlign: "left",
              wordSpacing: "normal",
              letterSpacing: "normal",
            }}
          >
            Extracurriculars
          </h2>
          {resumeData.extracurriculars.map((extra) => (
            <div key={extra.id} className="extracurricular-item" style={{ marginBottom: "8px" }}>
              <div
                className="extracurricular-header flex justify-between items-start mb-1"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "4px",
                }}
              >
                <div
                  className="extracurricular-info flex-1 pr-6"
                  style={{ flex: "1", paddingRight: "24px", maxWidth: "70%" }}
                >
                  <h3
                    className="organization-name font-bold"
                    style={{
                      fontSize: "11pt",
                      marginBottom: "2px",
                      fontFamily: "Arial, Helvetica, sans-serif",
                      textAlign: "left",
                      wordSpacing: "normal",
                      fontWeight: "bold",
                    }}
                  >
                    {extra.organization}
                  </h3>
                  <p
                    className="designation font-bold"
                    style={{
                      fontSize: "10pt",
                      margin: "0",
                      fontFamily: "Arial, Helvetica, sans-serif",
                      textAlign: "left",
                      wordSpacing: "normal",
                      fontWeight: "bold",
                    }}
                  >
                    {extra.designation}
                  </p>
                </div>
                <div
                  className="extracurricular-meta text-right"
                  style={{
                    fontSize: "10pt",
                    flex: "0 0 auto",
                    paddingLeft: "8px",
                    fontFamily: "Arial, Helvetica, sans-serif",
                    textAlign: "right",
                  }}
                >
                  <div className="duration font-bold" style={{ fontWeight: "bold", whiteSpace: "nowrap" }}>
                    {extra.duration}
                  </div>
                </div>
              </div>
              {extra.description && (
                <div
                  className="extracurricular-description"
                  style={{
                    fontSize: "10pt",
                    lineHeight: "1.2",
                    fontFamily: "Arial, Helvetica, sans-serif",
                  }}
                >
                  {extra.description.split("\n").map((line, index) => (
                    <div
                      key={index}
                      className="bullet-point"
                      style={{
                        margin: "2px 0",
                        paddingLeft: "1em",
                        textIndent: "-1em",
                        textAlign: "left",
                        wordSpacing: "normal",
                        letterSpacing: "normal",
                        whiteSpace: "normal",
                      }}
                    >
                      • {line.replace(/^•\s*/, "")}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </React.Fragment>
    ),
    // Custom Sections
    ...resumeData.customSections.map((customSection) => (
      <React.Fragment key={`custom-${customSection.id}`}>
        <div className="section custom-section" style={{ marginBottom: "8px" }}>
          <h2
            className="section-heading font-bold uppercase mb-2 border-b border-black pb-1"
            style={{
              fontSize: "12pt",
              borderBottomWidth: "1px",
              fontFamily: "Arial, Helvetica, sans-serif",
              textAlign: "left",
              wordSpacing: "normal",
              letterSpacing: "normal",
            }}
          >
            {customSection.title}
          </h2>
          {customSection.items.map((item) => (
            <div key={item.id} className="custom-item" style={{ marginBottom: "8px" }}>
              <div
                className="custom-header flex justify-between items-start mb-1"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "4px",
                }}
              >
                <div className="custom-info flex-1 pr-6" style={{ flex: "1", paddingRight: "24px", maxWidth: "70%" }}>
                  <h3
                    className="custom-title font-bold"
                    style={{
                      fontSize: "11pt",
                      marginBottom: "2px",
                      fontFamily: "Arial, Helvetica, sans-serif",
                      textAlign: "left",
                      wordSpacing: "normal",
                      fontWeight: "bold",
                    }}
                  >
                    {item.title}
                  </h3>
                  {item.subtitle && (
                    <p
                      className="custom-subtitle italic"
                      style={{
                        fontSize: "10pt",
                        margin: "0",
                        fontFamily: "Arial, Helvetica, sans-serif",
                        textAlign: "left",
                        wordSpacing: "normal",
                        fontStyle: "italic",
                      }}
                    >
                      {item.subtitle}
                    </p>
                  )}
                </div>
                <div
                  className="custom-meta text-right"
                  style={{
                    fontSize: "10pt",
                    flex: "0 0 auto",
                    paddingLeft: "8px",
                    fontFamily: "Arial, Helvetica, sans-serif",
                    textAlign: "right",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                  }}
                >
                  {item.duration && (
                    <div className="duration font-bold" style={{ fontWeight: "bold", whiteSpace: "nowrap" }}>
                      {item.duration}
                    </div>
                  )}
                  {item.location && (
                    <div className="location italic" style={{ fontStyle: "italic", whiteSpace: "normal" }}>
                      {item.location}
                    </div>
                  )}
                </div>
              </div>
              {item.description && (
                <div
                  className="custom-description"
                  style={{
                    fontSize: "10pt",
                    lineHeight: "1.2",
                    fontFamily: "Arial, Helvetica, sans-serif",
                  }}
                >
                  {item.description.split("\n").map((line, index) => (
                    <div
                      key={index}
                      className="bullet-point"
                      style={{
                        margin: "2px 0",
                        paddingLeft: "1em",
                        textIndent: "-1em",
                        textAlign: "left",
                        wordSpacing: "normal",
                        letterSpacing: "normal",
                        whiteSpace: "normal",
                      }}
                    >
                      • {line.replace(/^•\s*/, "")}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </React.Fragment>
    )),
  ].filter(Boolean) // Filter out any falsey values

  useEffect(() => {
    if (!tempMeasurementDivRef.current) return

    // Get the actual DOM elements from the hidden div for measurement
    const allSectionElements = Array.from(tempMeasurementDivRef.current.children)

    const currentPageContent: React.ReactNode[] = []
    let currentHeight = 0
    let truncated = false

    // Iterate through all sections and add them to the current page if they fit
    for (let i = 0; i < allSectionsReactNodes.length; i++) {
      const sectionReactNode = allSectionsReactNodes[i]
      const sectionElement = allSectionElements[i]
      const sectionHeight = getSectionHeight(sectionElement)

      if (currentHeight + sectionHeight <= AVAILABLE_CONTENT_HEIGHT_PX) {
        currentPageContent.push(sectionReactNode)
        currentHeight += sectionHeight
      } else {
        truncated = true
        break
      }
    }

    setPageContent(currentPageContent)
    setShowTruncationWarning(truncated)
  }, [resumeData])

  return (
    <>
      {/* Hidden div for measuring content heights */}
      <div
        ref={tempMeasurementDivRef}
        style={{
          position: "absolute",
          visibility: "hidden",
          height: "auto",
          width: "210mm",
          padding: `${TOP_MARGIN_PX}px 6mm ${BOTTOM_MARGIN_PX}px 8mm`,
        }}
      >
        {/* Render all sections here for measurement */}
        {allSectionsReactNodes.map((section, index) => renderSectionForMeasurement(section))}
      </div>

      {/* Render the single page content */}
      <ResumePage showTruncationWarning={showTruncationWarning}>{pageContent}</ResumePage>
    </>
  )
}
