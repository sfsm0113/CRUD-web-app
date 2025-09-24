import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { ProfileForm } from "@/components/profile/profile-form"

export default function ProfilePage() {
  return (
    <DashboardLayout>
      <div className="max-w-2xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground">Profile</h1>
          <p className="text-muted-foreground">Manage your account settings and personal information</p>
        </div>

        <ProfileForm />
      </div>
    </DashboardLayout>
  )
}
