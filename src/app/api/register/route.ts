import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const request = await req.json();
    const email = request.untrustedData.inputText;

    if (!email || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      const searchParams = new URLSearchParams({
        title: "Invalid Email",
      });

      return new NextResponse(
        `<!DOCTYPE html><html>
          <head>
          <title>Error Registering</title>
          <meta property="fc:frame" content="vNext"/>
          <meta property="fc:frame:image" content="${process.env.NEXT_PUBLIC_BASE_URL}/og?${searchParams}"/>
          <meta property="fc:frame:image:aspect_ratio" content="1:1"/>
          <meta property="fc:frame:input:text" content="EMAIL"/>
          <meta property="fc:frame:button:1" content="BACK"/>
          <meta property="fc:frame:button:1:post_url" content="${process.env.NEXT_PUBLIC_BASE_URL}/api/start"/>
          <meta property="fc:frame:button:2" content="REGISTER"/>
          <meta property="fc:frame:button:2:post_url" content="${process.env.NEXT_PUBLIC_BASE_URL}/api/register"/>
          </head>
          </html>`
      );
    }

    const { data, error } = await resend.contacts.create({
      email: email,
      unsubscribed: false,
      audienceId: process.env.RESEND_AUDIENCE_ID!,
    });

    if (error) {
      const searchParams = new URLSearchParams({
        title: "An error occurred. Try again.",
      });

      return new NextResponse(
        `<!DOCTYPE html><html>
          <head>
          <title>Error Registering</title>
          <meta property="fc:frame" content="vNext"/>
          <meta property="fc:frame:image" content="${process.env.NEXT_PUBLIC_BASE_URL}/og?${searchParams}"/>
          <meta property="fc:frame:image:aspect_ratio" content="1:1"/>
          <meta property="fc:frame:input:text" content="EMAIL"/>
          <meta property="fc:frame:button:1" content="BACK"/>
          <meta property="fc:frame:button:1:post_url" content="${process.env.NEXT_PUBLIC_BASE_URL}/api/start"/>
          <meta property="fc:frame:button:2" content="REGISTER"/>
          <meta property="fc:frame:button:2:post_url" content="${process.env.NEXT_PUBLIC_BASE_URL}/api/register"/>
          </head>
          </html>`
      );
    }

    return new NextResponse(
      `<!DOCTYPE html><html>
        <head>
        <title>Register Successful</title>
        <meta property="fc:frame" content="vNext"/>
        <meta property="fc:frame:image" content="${process.env.NEXT_PUBLIC_BASE_URL}/heart.png"/>
        <meta property="fc:frame:image:aspect_ratio" content="1:1"/>
        <meta property="fc:frame:button:1" content="HOME"/>
        <meta property="fc:frame:post_url" content="${process.env.NEXT_PUBLIC_BASE_URL}"/>
        </head>
        </html>`
    );
  } catch (error) {
    const searchParams = new URLSearchParams({
      title: "An error occurred. Try again.",
    });

    return new NextResponse(
      `<!DOCTYPE html><html>
        <head>
        <title>Error Registering</title>
        <meta property="fc:frame" content="vNext"/>
        <meta property="fc:frame:image" content="${process.env.NEXT_PUBLIC_BASE_URL}/og?${searchParams}"/>
        <meta property="fc:frame:image:aspect_ratio" content="1:1"/>
        <meta property="fc:frame:input:text" content="EMAIL"/>
          <meta property="fc:frame:button:1" content="BACK"/>
          <meta property="fc:frame:button:1:post_url" content="${process.env.NEXT_PUBLIC_BASE_URL}/api/start"/>
          <meta property="fc:frame:button:2" content="REGISTER"/>
          <meta property="fc:frame:button:2:post_url" content="${process.env.NEXT_PUBLIC_BASE_URL}/api/register"/>
        </head>
        </html>`
    );
  }
}
