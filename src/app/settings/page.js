export const metadata = {
    title:"Settings | DocReviewer",
    description: "Customize your theme, typography, AI preferences, and notifications."    
};

export default function SettingsPage(){
    return(
        <div className="p-8 max-w-2xl">
            <h1 className="text-3xl font-bold mb-4">Settings</h1>
            <p className="text-gray-600 mb-8">Customize your theme, typography, AI preferences, and notification settings</p>
            
            <div classs="space-y-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h2 className="text-gray-500 text-sm"> Light / Dark mode</h2>
                </div>
                <div className="bg-white border-gray-200 rounded-lg p-6">
                    <h2 className="font-semibold mb-2">Typography</h2>
                    <p className="text-gray-500 text-sm">Font size and font family settings (placeholder)</p>
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h2 className="font-semibold mb-2"> Ai preferences</h2>
                        <p className="text-gray-500 text-sm">Review level, auto-review, and suggestion strictness (placeholder)</p>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h2 className="font-semibold mb-2">Notifications</h2>
                        <p className="text-gray-500 text-sm">Notification frequency and types (placeholder)</p>
                    </div>
                </div>
            </div>
        </div>
    );
}