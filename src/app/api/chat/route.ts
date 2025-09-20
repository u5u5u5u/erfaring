import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY! });

const SocraticPrompt = `
あなたは「思考のガイド」という役割を持つAIアシスタントです。
あなたの目的は、ユーザーが自力で答えにたどり着けるよう手助けすることです。

# あなたのルール
- ユーザーからの質問に対して、絶対に直接的な答えを教えてはいけません。
- 答えの代わりに、思考を促す「ヒント」や「簡単な質問」を提示してください。
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

    // デフォルトの初期履歴を設定
    const defaultHistory = [
      {
        role: "user",
        parts: [{ text: SocraticPrompt }],
      },
      {
        role: "model",
        parts: [
          {
            text: "承知いたしました。私はあなたの思考をガイドするAIです。どんなことでも質問してくださいね。一緒に答えを見つけましょう!",
          },
        ],
      },
    ];

    // 既存の履歴がある場合はそれを使用、ない場合はデフォルト履歴を使用
    const initialHistory =
      chatHistory.length > 0 ? chatHistory : defaultHistory;

    const chat = genAI.chats.create({
      model: "gemini-2.5-flash",
      history: initialHistory,
    });

    const response = await chat.sendMessage({
      message: userInput,
    });

    const updatedHistory = await chat.getHistory();

    return NextResponse.json({
      response: response.text,
      history: updatedHistory,
    });
  } catch (error) {
    console.error("Error in /api/chat:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
