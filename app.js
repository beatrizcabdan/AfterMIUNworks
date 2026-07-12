const config = {
    apiKey: "AIzaSyA9cXXYyo_xwcUsNjQvfdKHNEC_Y9GAJmE",
    calendarId: "3b0e3e3ec673d07cabf81acc94e952c3d4039a6e7d676cf244488a189864ce5c@group.calendar.google.com"
};

async function loadNextEvent() {

    const now = new Date().toISOString();

    const url =
        `https://www.googleapis.com/calendar/v3/calendars/` +
        `${encodeURIComponent(config.calendarId)}/events` +
        `?key=${config.apiKey}` +
        `&singleEvents=true` +
        `&orderBy=startTime` +
        `&timeMin=${encodeURIComponent(now)}` +
        `&maxResults=1`;

    try {

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();

        console.log(data);

        const eventDiv = document.getElementById("event");

        if (!data.items || data.items.length === 0) {
            eventDiv.textContent = "No upcoming events.";
            return;
        }

        const event = data.items[0];

        document.getElementById("title").textContent =
            event.summary || "";

        const start =
            event.start.dateTime || event.start.date;

        const end =
            event.end.dateTime || event.end.date;

        const options = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit"
        };

        document.getElementById("date").textContent =
            new Date(start).toLocaleString(undefined, options);

        document.getElementById("location").textContent =
            event.location || "Östersund";

        document.getElementById("description").textContent =
            event.description || "";

    } catch (err) {

        console.error(err);

        document.getElementById("event").textContent =
            "Unable to load calendar.";
    }
}

loadNextEvent();