const api = "http://localhost:3000/api";

// Fetch data function
async function fetchData(endpoint) {
  try {
    console.log(`Fetching data from endpoint: ${endpoint}`);
    const res = await fetch(`${api}/${endpoint}`);

    // Check if the response is empty or not successful
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const text = await res.text(); // Get response as text
    console.log("Raw response text:", text); // Log raw response

    // If the response is empty, throw an error
    if (!text) {
      throw new Error("Empty response body");
    }

    // Parse the text into JSON
    const data = JSON.parse(text);
    console.log(`Data received from ${endpoint}:`, data);

    // Check if the response contains the "data" field and return it
    if (data.success && data.data) {
      return data.data;
    } else {
      console.error(`Error: Missing 'data' field in response for ${endpoint}`);
      return [];
    }
  } catch (err) {
    console.error(`Error fetching ${endpoint}:`, err);
    return [];
  }
}

// Render charts function
async function renderCharts() {
  // 1. Weekly Summary
  console.log("Fetching weekly summary data..."); // Added console log
  const summary = await fetchData("weekly-summary");

  if (!Array.isArray(summary)) {
    console.error("Weekly Summary data is not an array:", summary);
    return;
  }

  const week = summary.map((s) => new Date(s.week_start).toLocaleDateString());
  console.log("Rendering weekly summary chart with data:", { week, summary });

  new Chart(document.getElementById("weeklySummaryChart"), {
    type: "bar",
    data: {
      labels: week,
      datasets: [
        {
          label: "Plastic",
          data: summary.map((s) => s.plastic),
          backgroundColor: "#4CAF50",
        },
        {
          label: "Organic",
          data: summary.map((s) => s.bio),
          backgroundColor: "#FFC107",
        },
        {
          label: "General",
          data: summary.map((s) => s.non_bio),
          backgroundColor: "#F44336",
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "Weekly Waste Summary by Type (kg)",
        },
      },
    },
  });

  // 2. Weekly Peaks
  console.log("Fetching weekly peaks data...");
  const peaks = await fetchData("weekly-peaks");

  if (!Array.isArray(peaks)) {
    console.error("Weekly Peaks data is not an array:", peaks);
    return;
  }

  const peakDays = peaks.map(
    (p) => `${p.day_of_week.trim()} (ID: ${p.dustbin_id})`
  );
  console.log("Rendering weekly peaks chart with data:", { peakDays, peaks });

  new Chart(document.getElementById("weeklyPeaksChart"), {
    type: "bar",
    data: {
      labels: peakDays,
      datasets: [
        {
          label: "Avg Fill (%)",
          data: peaks.map((p) => p.avg_fill),
          backgroundColor: "#2196F3",
        },
      ],
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: "Weekly Peaks per Dustbin",
        },
      },
    },
  });

  // 3. Average Fill by Hour
  console.log("Fetching average fill by hour data...");
  const hourly = await fetchData("avg-fill-hour");

  if (!Array.isArray(hourly)) {
    console.error("Average Fill by Hour data is not an array:", hourly);
    return;
  }

  const groupedByBin = {};
  hourly.forEach((item) => {
    if (!groupedByBin[item.dustbin_id])
      groupedByBin[item.dustbin_id] = { hours: [], fills: [] };
    groupedByBin[item.dustbin_id].hours.push(item.hour_of_day);
    groupedByBin[item.dustbin_id].fills.push(item.avg_fill);
  });

  const datasets = Object.entries(groupedByBin).map(([id, data], i) => ({
    label: `Dustbin ${id}`,
    data: data.fills,
    borderColor: `hsl(${i * 60}, 70%, 50%)`,
    fill: false,
  }));

  console.log("Rendering average fill by hour chart with data:", {
    hourly,
    groupedByBin,
    datasets,
  });

  new Chart(document.getElementById("avgFillByHourChart"), {
    type: "line",
    data: {
      labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
      datasets,
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: "Average Fill by Hour",
        },
      },
    },
  });

  // 4. Daily Fill Trend
  console.log("Fetching daily fill trends data...");
  const trends = await fetchData("daily-fill-trends");

  if (!Array.isArray(trends)) {
    console.error("Daily Fill Trends data is not an array:", trends);
    return;
  }

  const days = trends.map((d) => `${d.day_of_week.trim()} (${d.date})`);
  console.log("Rendering daily fill trends chart with data:", { days, trends });

  new Chart(document.getElementById("dailyFillTrendChart"), {
    type: "line",
    data: {
      labels: days,
      datasets: [
        {
          label: "Avg Fill (%)",
          data: trends.map((t) => t.avg_fill),
          borderColor: "#9C27B0",
          fill: false,
        },
      ],
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: "Daily Fill Trends (All Dustbins)",
        },
      },
    },
  });
}

// Initialize chart rendering
console.log("Initializing chart rendering...");
renderCharts();
