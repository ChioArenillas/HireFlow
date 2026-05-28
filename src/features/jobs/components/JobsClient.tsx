"use client"

import { useState } from "react"
import { JobCard } from "./JobCard"
import { useJobs } from "../hooks/useJobs"


export default function JobsClient() {
    const { data: jobs, isLoading, isError} = useJobs()
    const [search, setSearch] = useState("")

    if (isLoading) return <p>Loading jobs...</p>
    if(isError) return <p>There was an error loading jobs</p>

    const filteredJobs = (jobs ?? []).filter((job: any) => 
        job.title.toLowerCase().includes(search.toLowerCase())
    )
  return (
    <div className="space-y-6">
        <input 
            type="text"
            placeholder="Search jobs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-2 rounded w-full"
        />
        <div className="grid gap-4">
            {filteredJobs.map((job: any) => (
                <JobCard key={job.id} job={job}/>
            ))}

        </div>
      
    </div>
  )
}
