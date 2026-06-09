import { describe, it, expect, vi } from "vitest";
import * as analtyzeResumeModule from "@/features/resume/services/analyzeResume";

vi.mock("@/features/resume/services/extractResumeText", () => ({
  extractResumeText: vi.fn(async () => "mock cv text"),
}));

vi.mock("@/features/resume/services/analyzeResume", () => ({
  analyzeResume: vi.fn(async () =>
    JSON.stringify({
      score: 80,
      missingSkills: ["Docker"],
      feedback: "Good candidate",
    }),
  ),
}));

import { POST } from "../route";

describe("POST /api/analyze", () => {

  it("returns analysis result", async () => {
    const formData = {
      get: (key: string) => {
        if (key === "file") {
          return new File(["dummy content"], "cv.pdf", {
            type: "application/pdf",
          });
        }

        if (key === "jobDescription") {
          return "frontend developer";
        }

        return null;
      },
    };
    const request = {
      formData: async () => formData,
    } as any;

    const response = await POST(request as any);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.score).toBe(80);
    expect(data.missingSkills).toContain("Docker");
    expect(data.feedback).toBe("Good candidate");
  });


  it("returns 400 when file is missing", async () => {
    const formData = {
      get: (key: string) => {
        if (key === "jobDescription") {
          return "frontend developer";
        }

        return null;
      },
    };

    const request = {
      formData: async () => formData,
    } as any;

    const response = await POST(request);

    expect(response.status).toBe(400);

    const data = await response.json();

    expect(data.error).toBe("No file");
  });


  it("returns error for unsupported file type", async () => {
    const formData = {
      get: (key: string) => {
        if (key === "file") {
          return new File(["dummy"], "virus.exe", {
            type: "application/octet-stream",
          });
        }
        if (key === "jobDescription") {
          return "frontend developer";
        }
        return null;
      },
    };
    const request = {
      formData: async () => formData,
    } as any;
    const response = await POST(request);
    expect(response.status).toBe(500);
    const data = await response.json();
    expect(data.message).toContain("Unsupported file type");
  });


  it("returns 500 when AI analysis fails", async () => {
    vi.spyOn(analtyzeResumeModule, "analyzeResume").mockRejectedValueOnce(
      new Error("Groq unavailable"),
    );
    const formData = {
      get: (key: string) => {
        if (key === "file") {
          return new File(["dummy"], "cv.pdf", {
            type: "application/pdf",
          });
        }
        if (key === "jobDescription") {
          return "frontend developer";
        }
        return null;
      },
    };
    const request = {
      formData: async () => formData,
    } as any;
    const response = await POST(request);
    expect(response.status).toBe(500);
    const data = await response.json();
    expect(data.message).toContain("Groq unavailable");
  });

  
  it("returns 500 when model returns invalid JSON", async () => {
    vi.spyOn(
        analtyzeResumeModule,
        "analyzeResume"
    ).mockResolvedValueOnce(
        "I am not JSON"
    )
    const formData = {
        get: (key: string) => {
            if(key === "file"){
                return new File(
                    ["dummy"],
                    "cv.pdf",
                    {
                        type: "application/pdf"
                    }
                )
            }
            if(key === "jobDescription") {
                return "frontend developer"
            }
            return null
        }
    }
    const request = {
        formData: async () => formData
    } as any
    const response = await POST(request)
    expect(response.status).toBe(500)
  })
});
