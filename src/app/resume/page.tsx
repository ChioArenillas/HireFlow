"use client";

export default function ResumePage() {
  return <div>Resume page</div>;
}// "use client"

// import { DashboardLayout } from "@/components/layout/Layout"
// import { useSearchParams } from "next/navigation"
// import { useEffect, useState } from "react"
// import { useJobs } from "@/features/jobs/hooks/useJobs"
// import { useAnalysisStore } from "@/store/useAnalysis"
// import { Upload } from "lucide-react"

// export default function ResumePage() {
//   const searchParams = useSearchParams()
//   const jobId = searchParams.get("jobId")

//   const { data: jobs } = useJobs()
//   const job = jobs?.find((j) => String(j.id) === jobId)

//   const [file, setFile] = useState<File | null>(null)
//   const [isDragging, setIsDragging] = useState(false)

//   const [isAnalyzing, setIsAnalyzing] = useState(false)
//   const [showResult, setShowResult] = useState(false)

//   const { setAnalysis, getAnalysis } = useAnalysisStore()

//   const [mounted, setMounted] = useState(false)

//   useEffect(() => {
//     setMounted(true)
//   }, [])

//   const savedAnalysis =
//     mounted && jobId ? getAnalysis(jobId) : null

//   const analysisToShow =
//     mounted
//       ? showResult
//         ? getAnalysis(jobId!)
//         : savedAnalysis
//       : null

//   async function handleAnalyze() {
//     if (!file || !job?.description) return

//     setIsAnalyzing(true)

//     try {
//       const formData = new FormData()

//       formData.append("file", file)
//       formData.append("jobDescription", job.description)

//       const response = await fetch("/api/analyze", {
//         method: "POST",
//         body: formData,
//       })

//       const text = await response.text()

//       if (!response.ok) {
//         console.error("API ERROR RAW:", text)
//         return
//       }

//       const result = JSON.parse(text)

//       if (jobId) {
//         setAnalysis(jobId, result)
//       }

//       setShowResult(true)
//     } finally {
//       setIsAnalyzing(false)
//     }
//   }

//   const scoreColor = analysisToShow
//     ? analysisToShow.score >= 80
//       ? "bg-green-700"
//       : analysisToShow.score >= 50
//         ? "bg-yellow-500"
//         : "bg-red-700"
//     : "bg-gray-300"

//   return (
//     <DashboardLayout>
//       <div className="space-y-6 max-w-3xl">
//         <h1 className="text-2xl font-bold">Resume Analyzer</h1>

//         {job ? (
//           <p className="text-muted-foreground">
//             Analyzing:{" "}
//             <span className="text-lg font-bold text-foreground">
//               {job.title}
//             </span>
//           </p>
//         ) : (
//           <p className="text-muted-foreground">Select a job to analyze</p>
//         )}

//         <div
//           onDragOver={(e) => {
//             e.preventDefault()
//             setIsDragging(true)
//           }}
//           onDragLeave={() => setIsDragging(false)}
//           onDrop={(e) => {
//             e.preventDefault()
//             setIsDragging(false)

//             const droppedFile = e.dataTransfer.files?.[0]
//             if (droppedFile) setFile(droppedFile)
//           }}
//           onClick={() => document.getElementById("cv-upload")?.click()}
//           className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition ${
//             isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
//           }`}
//         >
//           <Upload className="mx-auto mb-2 text-gray-400" />

//           <p className="font-medium">
//             {file ? file.name : "Drag & drop your CV here"}
//           </p>

//           <p className="text-sm text-muted-foreground mt-2">
//             or click to upload (PDF, DOCX)
//           </p>

//           <input
//             id="cv-upload"
//             type="file"
//             accept=".pdf,.doc,.docx"
//             className="hidden"
//             onChange={(e) => {
//               const selectedFile = e.target.files?.[0] ?? null
//               setFile(selectedFile)
//             }}
//           />
//         </div>

//         <button
//           onClick={handleAnalyze}
//           disabled={isAnalyzing || !job || !file}
//           className="px-4 py-2 border rounded hover:bg-muted transition disabled:opacity-50"
//         >
//           {isAnalyzing ? "Analyzing..." : "Analyze CV"}
//         </button>

//         {isAnalyzing && (
//           <div className="flex items-center justify-center gap-2 py-2 text-sm text-muted-foreground">
//             <div className="h-5 w-5 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent" />
//             <span>Analyzing CV with AI...</span>
//           </div>
//         )}

//         {analysisToShow && (
//           <div className="rounded-lg border p-6 space-y-4">
//             <h2 className="text-xl font-semibold">
//               Match Score: {analysisToShow.score}%
//             </h2>

//             <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
//               <div
//                 className={`h-full ${scoreColor} transition-all`}
//                 style={{ width: `${analysisToShow.score}%` }}
//               />
//             </div>

//             <div>
//               <h3 className="font-semibold">Missing Skills:</h3>
//               <ul className="list-disc pl-5">
//                 {analysisToShow.missingSkills?.map((skill: string) => (
//                   <li key={skill}>{skill}</li>
//                 ))}
//               </ul>
//             </div>

//             <div>
//               <h3 className="font-semibold">Feedback:</h3>
//               <p>{analysisToShow.feedback}</p>
//             </div>
//           </div>
//         )}
//       </div>
//     </DashboardLayout>
//   )
// }