import { Metadata } from "next";
import { NextResponse } from "next/server";

export const metadata: Metadata = {
  title: "Frames Demo",
  description: "3rd attempt on frames",
  openGraph: {
    title: "Frames Demo",
    description: "3rd attempt on frames",
    images: [`${process.env.NEXT_PUBLIC_BASE_URL}/orc_red.png`],
  },
  other: {
    "fc:frame": "vNext",
    "fc:frame:image": `${process.env.NEXT_PUBLIC_BASE_URL}/orc_red.png`,
    "fc:frame:image:aspect_ratio": "1:1",
    "fc:frame:button:1": `START`,
    "fc:frame:post_url": `${process.env.NEXT_PUBLIC_BASE_URL}/api/frame?id=1`,
  },
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Hello, frames!
    </main>
  );
}
