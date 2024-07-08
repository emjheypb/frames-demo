import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const errorResponse = new NextResponse(
  `<!DOCTYPE html><html>
    <head>
    <title>Last Frame</title>
    <meta property="fc:frame" content="vNext"/>
    <meta property="fc:frame:image" content="${process.env.NEXT_PUBLIC_BASE_URL}/heart_empty.png}.png"/>
    <meta property="fc:frame:image:aspect_ratio" content="1:1"/>
    <meta property="fc:frame:button:1" content="START OVER"/>
    <meta property="fc:frame:post_url" content="${process.env.NEXT_PUBLIC_BASE_URL}/"/>
    </head>
    </html>`
);

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const request = await req.json();
    const email = request.untrustedData.inputText;

    console.log(email);
    // console.log(JSON.parse(request));

    const { data, error } = await resend.contacts.create({
      email: email,
      unsubscribed: false,
      audienceId: process.env.RESEND_AUDIENCE_ID!,
    });

    if (error) {
      return errorResponse;
    }

    return new NextResponse(
      `<!DOCTYPE html><html>
        <head>
        <title>Last Frame</title>
        <meta property="fc:frame" content="vNext"/>
        <meta property="fc:frame:image" content="${process.env.NEXT_PUBLIC_BASE_URL}/heart.png}.png"/>
        <meta property="fc:frame:image:aspect_ratio" content="1:1"/>
        <meta property="fc:frame:button:1" content="START OVER"/>
        <meta property="fc:frame:post_url" content="${process.env.NEXT_PUBLIC_BASE_URL}"/>
        </head>
        </html>`
    );
  } catch (error) {
    return errorResponse;
  }
}
