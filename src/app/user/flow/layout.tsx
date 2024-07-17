'use client';

import { ReactFlowProvider } from "reactflow"

export default function UserRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ReactFlowProvider>
      {children}
    </ReactFlowProvider>
  )
}