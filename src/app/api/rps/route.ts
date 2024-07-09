import { NextResponse } from "next/server";

export const POST = async (): Promise<NextResponse> => {
  const searchParams = new URLSearchParams({
    title: "Under Construction",
  });

  return new NextResponse(
    `<!DOCTYPE html><html>
        <head>
        <title>Error Registering</title>
        <meta property="fc:frame" content="vNext"/>
        <meta property="fc:frame:image" content="${process.env.NEXT_PUBLIC_BASE_URL}/og?${searchParams}"/>
        <meta property="fc:frame:image:aspect_ratio" content="1:1"/>
        <meta property="fc:frame:button:1" content="BACK"/>
        <meta property="fc:frame:post_url" content="${process.env.NEXT_PUBLIC_BASE_URL}/api/frame?id=1"/>
        </head>
        </html>`
  );
};
