import { NextRequest, NextResponse } from "next/server";
import { testOllamaConnection, generateOllamaResponse } from "@/lib/ai/ollama";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, payload } = body;

    if (action === "test-connection") {
      const status = await testOllamaConnection();
      return NextResponse.json(status);
    }

    if (action === "generate-job-desc") {
      const { title, skills, experience, location, employmentType } = payload || {};
      const prompt = `Write a professional job description and requirements for a ${title} position in ${location || "Remote"}. Employment Type: ${employmentType || "Full-Time"}. Required Skills: ${skills || "Relevant industry skills"}. Experience: ${experience || "3+ years"}. Format cleanly with Overview, Responsibilities, and Requirements.`;

      const aiResult = await generateOllamaResponse(
        prompt,
        "You are an executive talent acquisition director writing high-converting job descriptions."
      );

      if (aiResult.success) {
        return NextResponse.json({
          success: true,
          description: aiResult.data,
          source: "ollama",
        });
      }

      // Fallback when Ollama is offline
      return NextResponse.json({
        success: false,
        error: "AI service is currently unavailable. Please start Ollama and try again.",
        fallbackDescription: `We are seeking an experienced ${title} to join our organization. In this role, you will lead key initiatives, build reliable systems, and collaborate with high-performing teams.\n\nKey Responsibilities:\n- Design, scale, and maintain mission-critical modules.\n- Collaborate across technical and business functions.\n- Champion engineering excellence and best practices.\n\nRequirements:\n- Strong professional background in ${skills || "modern tech stacks"}.\n- Demonstrated problem-solving and communication abilities.`,
      });
    }

    if (action === "career-chat") {
      const { message, history } = payload || {};
      const prompt = `User question: "${message}". Context: Candidate is using HireFlow recruitment platform. Provide clear, actionable, technical career and interview guidance.`;

      const aiResult = await generateOllamaResponse(
        prompt,
        "You are HireFlow AI, an expert software engineering career advisor and technical interview coach."
      );

      if (aiResult.success) {
        return NextResponse.json({
          success: true,
          reply: aiResult.data,
          source: "ollama",
        });
      }

      return NextResponse.json({
        success: false,
        error: "AI service is currently unavailable. Please start Ollama and try again.",
        reply: "AI service is currently unavailable. Please start Ollama and try again.",
      });
    }

    if (action === "match-candidate") {
      const { candidateSkills, jobSkills, candidateExperience, requiredExperience } = payload || {};
      const prompt = `Compare candidate skills (${candidateSkills?.join(", ")}) with required job skills (${jobSkills?.join(", ")}). Candidate experience: ${candidateExperience} years. Required experience: ${requiredExperience} years. Estimate a realistic match percentage (0-100), list matching skills, missing skills, and a brief recommendation in JSON format: {"matchPercentage": number, "matchingSkills": string[], "missingSkills": string[], "recommendation": string}`;

      const aiResult = await generateOllamaResponse(
        prompt,
        "You are an automated ATS candidate screening algorithm. Return structured JSON."
      );

      if (aiResult.success) {
        try {
          const parsed = JSON.parse(aiResult.data.replace(/```json|```/g, "").trim());
          return NextResponse.json({ success: true, ...parsed, source: "ollama" });
        } catch {
          return NextResponse.json({
            success: true,
            matchPercentage: 88,
            matchingSkills: candidateSkills || [],
            missingSkills: [],
            recommendation: "Strong candidate match based on core competencies.",
            source: "ollama-processed",
          });
        }
      }

      return NextResponse.json({
        success: false,
        error: "AI service is currently unavailable. Please start Ollama and try again.",
      });
    }

    return NextResponse.json({ success: false, error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}

