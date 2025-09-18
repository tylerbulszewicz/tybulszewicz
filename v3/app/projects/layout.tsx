import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects - tybulszewicz",
  description: "Tyler Bulszewicz Projects Portfolio",
};

export default function ProjectsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  );
}
