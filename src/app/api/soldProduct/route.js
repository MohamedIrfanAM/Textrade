import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { productId } = await req.json();

        const existingProduct = await prismadb.products.findUnique({
            where: { id: productId },
        });

        if (!existingProduct) {
            return new NextResponse(JSON.stringify({ message: `Product with ID ${productId} not found.` }), { status: 404 })
        }

        const markSold = await prismadb.products.update({
            where: { id: productId },
            data: {
                sold: true,
            },
        });

        return new NextResponse(JSON.stringify(markSold), { status: 200 })

    }
    catch (error) {
        return new NextResponse(JSON.stringify({ error: error }), { status: 500 })
    }
}