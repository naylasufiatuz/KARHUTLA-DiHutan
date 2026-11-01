import { NextResponse } from "next/server";
import { getMonitoringLocationsFromDb } from "@/lib/supabase-backend";

export async function GET() {
  try {
    const locations = await getMonitoringLocationsFromDb();
    return NextResponse.json({ success: true, data: locations });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

