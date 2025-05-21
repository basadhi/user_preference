async function updatePreferences(data, type) {
    await fetch(`http://localhost:8000/api/preferences/${type}/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
  }
  