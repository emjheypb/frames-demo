import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const searchParams = new URLSearchParams({
  title: "Valid Email Required",
});

const errorResponse = new NextResponse(
  `<!DOCTYPE html><html>
    <head>
    <title>Error Registering</title>
    <meta property="fc:frame" content="vNext"/>
    <meta property="fc:frame:image" content="${process.env.NEXT_PUBLIC_BASE_URL}/og?${searchParams}"/>
    <meta property="fc:frame:image:aspect_ratio" content="1:1"/>
    <meta property="fc:frame:input:text" content="EMAIL"/>
    <meta property="fc:frame:button:1" content="TRY AGAIN"/>
    <meta property="fc:frame:post_url" content="${process.env.NEXT_PUBLIC_BASE_URL}/api/register"/>
    </head>
    </html>`
);

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const request = await req.json();
    const email = request.untrustedData.inputText;

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      return errorResponse;
    }

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
        <title>Register Successful</title>
        <meta property="fc:frame" content="vNext"/>
        <meta property="fc:frame:image" content="${process.env.NEXT_PUBLIC_BASE_URL}/heart.png"/>
        <meta property="fc:frame:image:aspect_ratio" content="1:1"/>
        </head>
        </html>`
    );
  } catch (error) {
    return errorResponse;
  }
}
