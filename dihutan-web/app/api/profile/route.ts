import { NextResponse } from "next/server";
import { getUserProfileFromDb, updateUserProfileInDb } from "@/lib/supabase-backend";

export async function GET() {
  try {
    const profile = await getUserProfileFromDb();
    return NextResponse.json({ success: true, data: profile });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const success = await updateUserProfileInDb(body);
    return NextResponse.json({ success });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

