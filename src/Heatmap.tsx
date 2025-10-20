import { useEffect, useState } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { isWeekend } from "./util";
import { Link } from "react-router-dom";

type ArchiveData = Record<string, boolean>;

function Heatmap() {
  const [data, setData] = useState<ArchiveData | null>(null);

  useEffect(() => {
    fetch("/archive.json")
      .then((res) => res.json())
      .then((json: ArchiveData) => setData(json))
      .catch((err) => console.error(err));
  }, []);

  if (!data) return;

  const entries = Object.entries(data);
  const firstDate = new Date(entries[0][0]);
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + 100);

  const values = entries.map(([date, hasFries]) => ({
    date,
    count: hasFries ? 1 : 0,
  }));

  const tooltipContent = (value: any) => {
    console.log(value);
    if (!value.date) return "Keine Daten";
    if (isWeekend(value.date)) return `${toGermanDate(value.date)}: 🛑 Wochenende`;
    return `${toGermanDate(value.date)}: ${value.count ? "✅ Pommes" : "❌ keine Pommes"}`;
  };

  const toGermanDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("de-DE");
  };

  return (
    <div className="bg-white border-4 rounded-md border-gray-600 mx-4 p-5">
      <Link to="/" className="text-blue-500 hover:underline mb-4 inline-block">
        &larr; Zurück
      </Link>
      <CalendarHeatmap
        startDate={firstDate}
        endDate={endDate}
        values={values}
        classForValue={(value) => {
          if (!value) return "color-empty";
          if (isWeekend(value.date)) return "color-weekend";
          return value.count ? "color-true" : "color-false";
        }}
        monthLabels={["Jan", "Feb", "Mä", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"]}
        tooltipDataAttrs={(value: any) => {
          if (!value) return {};
          return {
            "data-tooltip-id": "heatmap-tooltip",
            "data-tooltip-content": tooltipContent(value),
          } as any;
        }}
      />
      <ReactTooltip
        id="heatmap-tooltip"
        openOnClick
        clickable
        openEvents={{ mouseover: true, click: true }}
        closeEvents={{ mouseleave: true }}
      />
    </div>
  );
}

export default Heatmap;
