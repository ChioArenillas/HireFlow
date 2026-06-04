"use client";

import { JobCard } from "./JobCard";
import { useJobs } from "../hooks/useJobs";
import { JobCardSkeleton } from "./JobCardSkeleton";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

export default function JobsClient() {
  return(
    <div>Jobs working</div>
  // const { data: jobs, isLoading, isError } = useJobs();
    
  // const searchParams = useSearchParams()
  // const router = useRouter()
  // const pathname = usePathname()

  // const search = searchParams.get("search") ?? ""
  // const category = searchParams.get("category") ?? "all"
  // const type = searchParams.get("type") ?? "all"

  //   function updateParams(params: Record<string, string>){
  //       const current = new URLSearchParams(searchParams.toString())

  //       Object.entries(params).forEach(([key, value]) => {
  //           if(value === "all" || value === ""){
  //               current.delete(key)
  //           } else {
  //               current.set(key, value)
  //           }
  //       })
  //       router.push(`${pathname}?${current.toString()}`)
  //   }

  // if (isLoading) {
  //   return (
  //     <div className="space-y-4">
  //       {Array.from({ length: 6 }).map((_, i) => (
  //         <JobCardSkeleton key={i} />
  //       ))}
  //     </div>
  //   );
  // }

  // if (isError) return <p>There was an error loading jobs</p>;

  // const filteredJobs = (jobs ?? []).filter((job) => {
  //   const matchesSearch = job.title
  //     .toLowerCase()
  //     .includes(search.toLowerCase());

  //   const matchesCategory = category === "all" || job.category === category;

  //   const matchesType = type === "all" || job.job_type === type;

  //   return matchesSearch && matchesCategory && matchesType;
  // });

  // const categories = [
  //   ...new Set((jobs ?? []).map((job) => job.category))
  // ]
  // return (
  //   <div className="space-y-6">
  //     <input
  //       type="text"
  //       placeholder="Search jobs..."
  //       value={search}
  //       onChange={(e) => updateParams({ search: e.target.value})}
  //       className="border p-2 rounded w-full"
  //     />
  //     <select
  //       value={category}
  //       onChange={(e) =>  updateParams({ category: e.target.value})}
  //       className="border p-2 rounded mr-4"
  //     >
  //       <option value="all">All categories</option>
  //       {categories.map((category) => (
  //       <option key={category} value={category}>{category}</option>
  //       ))}
  //     </select>
  //     <select
  //       value={type}
  //       onChange={(e) =>  updateParams({ type: e.target.value})}
  //       className="border p-2 rounded"
  //     >
  //       <option value="all">All types</option>
  //       <option value="full_time">Full time</option>
  //       <option value="contract">Contract</option>
  //       <option value="part_time">Part time</option>
  //     </select>
  //     <div className="grid gap-4">
  //       {filteredJobs.length === 0 ? (
  //         <div className="rounded-lg border p-8 text-center">
  //           <h3 className="font-semibold">No jobs found</h3>
  //           <p className="text-muted-foreground">
  //             Try another search term or filter.
  //           </p>
  //         </div>
  //       ) : (
  //         filteredJobs.map((job) => <JobCard key={job.id} job={job} />)
  //       )}
  //     </div>{" "}
  //   </div>
  );
}
