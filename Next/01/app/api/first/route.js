// 3_API route and route handler

// export async function GET() {
//   return new Response("Hello, Next.js!");
// }

import { NextResponse } from "next/server"

export async function GET() {
    return NextResponse.json({"message": "Hello World", age:20}, 
        {status:209})
}