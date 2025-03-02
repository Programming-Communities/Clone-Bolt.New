import { GenAiCode } from "@/configs/AiModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    console.log("Received prompt:", prompt);

    const result = await GenAiCode.sendMessage(prompt);

    if (!result?.response) {
      return NextResponse.json({ error: "Invalid response from AI service" }, { status: 500 });
    }

    console.log("AI Raw Response:", result.response);

    let resp;
    try {
      resp = await result.response.text();
    } catch (textError) {
      console.error("Error reading AI response:", textError);
      return NextResponse.json({ error: "Failed to read AI response" }, { status: 500 });
    }

    let jsonResp;
    try {
      jsonResp = JSON.parse(resp);
    } catch (parseError) {
      console.error("Error parsing AI response:", parseError);
      return NextResponse.json({ error: "Invalid JSON response from AI" }, { status: 500 });
    }

    console.log("AI Parsed Response:", jsonResp);
    return NextResponse.json(jsonResp);
  } catch (e) {
    console.error("API Error:", e);
    return NextResponse.json({ error: e.message || "Internal Server Error" }, { status: 500 });
  }
}