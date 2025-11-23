export default function SuccessLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-600 mx-auto"></div>
        <p className="text-lg text-muted-foreground">Loading your eSIM details...</p>
      </div>
    </div>
  )
}
