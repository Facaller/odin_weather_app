How the Flow Should Work (High-Level Logic)
Here’s how the flow would ideally look, logically:

User submits input (DOM module)

checkInput() ensures it's not empty (DOM module)

DOM calls await fetchData(input) (API module)

That stores rawData internally

DOM then calls validateData() (API module)

That checks if rawData is structured correctly / usable

If valid → DOM calls getWeatherData() to extract and store processed data (API module)

DOM updates the UI

All API calls, raw/processed storage, and structural validation = API module's job

All input checking, user feedback, and UI updates = DOM module's job