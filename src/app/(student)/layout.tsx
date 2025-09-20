import AppLayout from "@/components/AppLayout";
import { createClient } from "@/utils/supabase/server";

export default async function StudentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  console.log(data);
  const { data: avatarUrl } = await supabase
    .from("profiles")
    .select("avatar_url")
    .eq("id", data?.user?.id)
    .single();

  return (
    <AppLayout avatarUrl={avatarUrl?.avatar_url || ""}>{children}</AppLayout>
  );
}
