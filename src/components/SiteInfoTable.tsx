const siteInfo = [
  { label: "Website", value: "apkcorner.com.pk" },
  { label: "Platform", value: "Android" },
  { label: "Category", value: "APK Downloads" },
  { label: "Region", value: "Pakistan" },
  { label: "Content", value: "Guides & Reviews" },
  { label: "Language", value: "English, Urdu" },
  { label: "Price", value: "Free" },
  { label: "Updates", value: "Regular" },
];

export default function SiteInfoTable() {
  return (
    <div className="panel overflow-hidden rounded-2xl">
      <div className="panel-header px-4 py-3 sm:px-5">
        <p className="section-label">Site Overview</p>
        <p className="mt-0.5 text-sm font-semibold text-foreground">apkcorner.com.pk</p>
      </div>
      <table className="w-full text-xs sm:text-sm">
        <tbody>
          {siteInfo.map((row, index) => (
            <tr
              key={row.label}
              className={
                index !== siteInfo.length - 1 ? "border-b border-border" : ""
              }
            >
              <th
                className={`w-[42%] px-4 py-2.5 text-left font-medium text-muted sm:px-5 sm:py-3 ${
                  index % 2 === 0 ? "bg-surface-alt" : "bg-surface"
                }`}
              >
                {row.label}
              </th>
              <td
                className={`px-4 py-2.5 text-left font-medium text-foreground sm:px-5 sm:py-3 ${
                  index % 2 === 0 ? "bg-surface" : "bg-surface-alt"
                }`}
              >
                {row.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
