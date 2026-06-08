import { NextRequest, NextResponse } from "next/server";
import connectDb from "@/lib/db";
// ... keep your other model imports at the top exactly as they are

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> } // 1. Treat params as a Promise
) {
  await connectDb();

  // 2. Await the params promise to extract the id safely
  const { id } = await context.params; 

  try {
    // ... 
    // REST OF YOUR CODE STAYS EXACTLY THE SAME
    // Just make sure it uses the 'id' variable we extracted above
    // ...
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
