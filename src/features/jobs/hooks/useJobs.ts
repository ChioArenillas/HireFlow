import { useQuery } from "@tanstack/react-query"
import { Job } from "../types/job"

async function fetchJobs(){
    const res = await fetch(
        "https://remotive.com/api/remote-jobs?search=frontend"
    )
    const data = await res.json()
    return data.jobs
}

export function useJobs(){
    return useQuery<Job[]>({
        queryKey: ["jobs"],
        queryFn: fetchJobs,
    })
}