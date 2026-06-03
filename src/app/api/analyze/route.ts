import { NextResponse } from "next/server";


const skills = [
  "React",
  "TypeScript",
  "Next.js",
  "Node.js",
  "Docker",
  "AWS",
  "GraphQL",
  "Laravel",
  "PHP",
  "Docker",
]

export async function POST(request: Request){
    const { cv, jobDescription } = await request.json()


    const requiredSkills = skills.filter((skill) =>
    jobDescription?.toLowerCase().includes(skill.toLowerCase()))

    const foundSkills = requiredSkills.filter((skill) =>
      cv.toLowerCase().includes(skill.toLowerCase()),
    )

    const missingSkills = requiredSkills.filter(
      (skill) => !foundSkills.includes(skill),
    )

    const score = 
    requiredSkills.length === 0
    ? 0
    : Math.round((foundSkills.length / requiredSkills.length) * 100)

    return NextResponse.json({
      score,
      missingSkills,
      feedback:
        score >= 80
          ? "Strong match for this role."
          : score >= 50
            ? "Good foundation, but some skills are missing."
            : "Your profile needs more alignment with the job requirements.",
    });
}

