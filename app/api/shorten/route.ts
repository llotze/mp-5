import { NextRequest, NextResponse } from "next/server";
import getCollection, { LINKS_COLLECTION } from "@/db";

function isValidUrl(url: string) {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

export async function POST(request: NextRequest) {
    const { url, alias } = await request.json();

    if (!isValidUrl(url)) {
        return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
    }

    const collection = await getCollection(LINKS_COLLECTION);

    const existing = await collection.findOne({ alias });
    if (existing) {
        return NextResponse.json({ error: "Alias already taken" }, { status: 409 });
    }

    await collection.insertOne({ url, alias });
    return NextResponse.json({ success: true });
}