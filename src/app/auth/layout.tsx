import NoneLayout from "@/components/layouts/NoneLayout"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <NoneLayout>{children}</NoneLayout>
}