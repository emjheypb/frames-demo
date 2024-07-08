import { NextRequest, NextResponse } from "next/server";

const images = [
  "orc_red",
  "sword_silver",
  "shield_silver",
  "book_blue",
  "orb_blue",
];

const getResponse = async (req: NextRequest): Promise<NextResponse> => {
  const searchParams = req.nextUrl.searchParams;
  const id: any = searchParams.get("id");
  const idAsNumber = parseInt(id);

  if (idAsNumber === images.length) {
    return new NextResponse(
      `<!DOCTYPE html><html>
        <head>
        <title>Last Frame</title>
        <meta property="fc:frame" content="vNext"/>
        <meta property="fc:frame:image" content="${
          process.env.NEXT_PUBLIC_BASE_URL
        }/${images[id - 1]}.png"/>
        <meta property="fc:frame:image:aspect_ratio" content="1:1"/>
        <meta property="fc:frame:input:text" content="EMAIL"/>
        <meta property="fc:frame:button:1" content="REGISTER"/>
        <meta property="fc:frame:post_url" content="${
          process.env.NEXT_PUBLIC_BASE_URL
        }/api/register"/>
        </head>
        </html>`
    );
  } else {
    return new NextResponse(
      `<!DOCTYPE html><html>
          <head>
          <title>Frame ${id}</title>
          <meta property="fc:frame" content="vNext"/>
          <meta property="fc:frame:image" content="${
            process.env.NEXT_PUBLIC_BASE_URL
          }/${images[id - 1]}.png"/>
        <meta property="fc:frame:image:aspect_ratio" content="1:1"/>
          <meta property="fc:frame:button:1" content="👈"/>
          <meta property="fc:frame:button:1:post_url" content="${
            process.env.NEXT_PUBLIC_BASE_URL
          }/api/frame?id=${idAsNumber === 1 ? 1 : idAsNumber - 1}"/>
          <meta property="fc:frame:button:2" content="👉"/>
          <meta property="fc:frame:button:2:post_url" content="${
            process.env.NEXT_PUBLIC_BASE_URL
          }/api/frame?id=${idAsNumber + 1}"/>
          </head>
          </html>`
    );
  }
};

export const POST = async (req: NextRequest): Promise<Response> => {
  return getResponse(req);
};

export const dynamic = "force-dynamic";
