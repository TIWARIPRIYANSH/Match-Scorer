
const SettingsPage = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Settings</h2>

      <label className="block mb-2 font-medium">Preferred Theme:</label>
      <select className="w-full p-2 border rounded mb-4">
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="system">System Default</option>
      </select>

      <label className="block mb-2 font-medium">Preferred Sport:</label>
      <input type="text" className="w-full p-2 border rounded mb-4" placeholder="e.g. Kabaddi, Cricket" />

      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Save Settings
      </button>
    </div>
  );
}
export default SettingsPage;
