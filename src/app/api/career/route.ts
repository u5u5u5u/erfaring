import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

const genAI = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY! });

const CareerPrompt = `
あなたはキャリアアドバイザーです。
学生とAIの対話履歴を分析し、その学生に適したキャリアを提案してください。

# 出力形式
以下のJSON形式で出力してください：
{
  "name": "キャリア名（30文字以内）",
  "description": "キャリアの詳細説明（200文字以内で、なぜこのキャリアが適しているか、どのようなスキルが活かせるか）"
}

# ルール
- 学生の質問内容、興味関心、考え方から適したキャリアを推測してください
- 具体的で実現可能なキャリアを提案してください
- ポジティブで前向きな表現を使ってください
- JSON形式のみを出力し、余計な説明は含めないでください
`;

export async function POST(request: NextRequest) {
  try {
    const { chatId } = await request.json();

    if (!chatId) {
      return NextResponse.json(
        { error: "chatId is required" },
        { status: 400 }
      );
    }

    // メッセージ履歴を取得
    const supabase = await createClient();
    const { data: messages, error: messagesError } = await supabase
      .from("messages")
      .select("role, content")
      .eq("chat_id", chatId)
      .order("created_at", { ascending: true });

    if (messagesError || !messages || messages.length === 0) {
      return NextResponse.json(
        { error: "Failed to fetch messages" },
        { status: 500 }
      );
    }

    // メッセージ履歴を整形
    const conversationHistory = messages
      .map((msg) => `${msg.role === "user" ? "学生" : "AI"}: ${msg.content}`)
      .join("\n\n");

    // Gemini APIでキャリアを生成
    const chat = genAI.chats.create({
      model: "gemini-2.5-flash",
      history: [],
    });

    const response = await chat.sendMessage({
      message: `${CareerPrompt}\n\n# 対話履歴\n${conversationHistory}`,
    });

    const responseText = response.text;

    if (!responseText) {
      return NextResponse.json(
        { error: "No response from AI" },
        { status: 500 }
      );
    }

    // JSONをパース
    let careerData;
    try {
      // マークダウンのコードブロックを削除
      const jsonText = responseText
        .replace(/```json\s*/g, "")
        .replace(/```\s*/g, "")
        .trim();
      careerData = JSON.parse(jsonText);
    } catch (parseError) {
      console.error("Failed to parse career data:", parseError);
      return NextResponse.json(
        { error: "Failed to parse career data" },
        { status: 500 }
      );
    }

    if (!careerData.name || !careerData.description) {
      return NextResponse.json(
        { error: "Invalid career data format" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      name: careerData.name,
      description: careerData.description,
    });
  } catch (error) {
    console.error("Error in /api/career:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
