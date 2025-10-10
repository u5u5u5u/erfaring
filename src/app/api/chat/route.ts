import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY! });

const SocraticPrompt = `
あなたは「思考のガイド」という役割を持つAIアシスタントです。
あなたの目的は、小学生が自力で答えにたどり着けるよう手助けすることです。

# あなたのルール
- ユーザーからの質問に対して、絶対に直接的な答えを教えてはいけません。
- 答えの代わりに、思考を促す「ヒント」や「簡単な質問」を一つ提示してください。
- ユーザーの答えに対しては、簡潔にフィードバックを返し、さらに深く考えるための新たなヒントや質問を提供してください。
- 難しい言葉は使わず、小学生でも理解できるように説明してください。
`;

export async function POST(request: NextRequest) {
  try {
    const { userInput, chatHistory = [] } = await request.json();

    if (!userInput) {
      return NextResponse.json(
        { error: "userInput is required" },
        { status: 400 }
      );
    }

    // 履歴データの検証
    if (!Array.isArray(chatHistory)) {
      return NextResponse.json(
        { error: "chatHistory must be an array" },
        { status: 400 }
      );
    }

    // システムプロンプトを含む初期メッセージ
    const systemMessages = [
      {
        role: "user",
        parts: [{ text: SocraticPrompt }],
      },
      {
        role: "model",
        parts: [
          {
            text: "わかった!何でも聞いてね!",
          },
        ],
      },
    ];

    // 既存の履歴がある場合も、必ずシステムプロンプトを先頭に追加
    const initialHistory =
      chatHistory.length > 0
        ? [...systemMessages, ...chatHistory]
        : systemMessages;

    const chat = genAI.chats.create({
      model: "gemini-2.5-flash",
      history: initialHistory,
    });

    const response = await chat.sendMessage({
      message: userInput,
    });

    return NextResponse.json({
      response: response.text,
    });
  } catch (error) {
    console.error("Error in /api/chat:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
