import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");

  if (!secret || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  try {
    const body = await request.json().catch(() => ({}));
    const slug = body.slug as string | undefined;

    revalidatePath("/", "layout");
    revalidatePath("/blog");
    revalidatePath("/sitemap-index.xml");
    revalidatePath("/sitemap.xml");
    revalidatePath("/image-sitemap.xml");
    revalidateTag("wordpress", "max");

    if (slug) {
      revalidatePath(`/${slug}`);
    }

    return NextResponse.json({ revalidated: true, slug: slug ?? "all" });
  } catch {
    return NextResponse.json({ message: "Revalidation failed" }, { status: 500 });
  }
}
