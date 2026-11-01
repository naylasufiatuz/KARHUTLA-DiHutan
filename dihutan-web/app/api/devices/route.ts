import { NextResponse } from "next/server";
import { getIotDevicesFromDb, updateDeviceStatusInDb } from "@/lib/supabase-backend";

export async function GET() {
  try {
    const devices = await getIotDevicesFromDb();
    return NextResponse.json({ success: true, data: devices });
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
    const { deviceId, connectionStatus, operationStatus } = body;

    if (!deviceId) {
      return NextResponse.json(
        { success: false, error: "ID perangkat wajib disertakan." },
        { status: 400 }
      );
    }

    const updated = await updateDeviceStatusInDb(deviceId, {
      connectionStatus,
      operationStatus,
    });

    return NextResponse.json({ success: updated });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

