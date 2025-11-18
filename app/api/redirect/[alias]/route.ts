import { redirect } from "next/navigation";
import getCollection, { LINKS_COLLECTION } from "@/db";

export async function GET(
    _req: Request,
    { params }: { params: Promise<{ alias: string }> }
) {
    const { alias } = await params; 
    const collection = await getCollection(LINKS_COLLECTION);
    const entry = await collection.findOne({ alias });

    if (!entry) {
        return new Response("Alias not found", { status: 404 });
    }

    redirect(entry.url);
}