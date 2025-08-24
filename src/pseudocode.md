You're using hardcoded video paths (like /assets/...)
✅ But GitHub Pages serves your site from a subdirectory (/odin_weather_app/), not from /

So video.src = "/assets/..." works locally (rooted at /), but breaks on GitHub Pages, where the full URL should be:

swift
Copy
Edit
/odin_weather_app/assets/minecraft_backgrounds/video.mp4
Also, you're not importing video files, which means Webpack can't track them and rewrite the paths during build.

✅ The Right Fix
✔️ Step 1: Move All Video Paths into imports
Instead of this:

js
Copy
Edit
videos: ['/assets/minecraft_backgrounds/clear1.mp4', ...]
Use import to bring the files into Webpack’s graph:

✅ Example with your structure
js
Copy
Edit
import clear1 from './assets/minecraft_backgrounds/clear1.mp4';
import clear2 from './assets/minecraft_backgrounds/clear2.mp4';
import clear3 from './assets/minecraft_backgrounds/clear3.mp4';
import clear4 from './assets/minecraft_backgrounds/clear4.mp4';

import cloudy1 from './assets/minecraft_backgrounds/cloudy1.mp4';
import cloudy2 from './assets/minecraft_backgrounds/cloudy2.mp4';
import cloudy3 from './assets/minecraft_backgrounds/cloudy3.mp4';
import cloudy4 from './assets/minecraft_backgrounds/cloudy4.mp4';
import cloudy5 from './assets/minecraft_backgrounds/cloudy5.mp4';

// ... repeat for fog, rain, snow, storm, default
Then update your conditionMap like so:

js
Copy
Edit
this.conditionMap = {
  clear: {
    keywords: ['clear', 'sky unchanged'],
    videos: [clear1, clear2, clear3, clear4]
  },
  cloudy: {
    keywords: ['overcast', 'partially cloudy', ...],
    videos: [cloudy1, cloudy2, cloudy3, cloudy4, cloudy5]
  },
  ...
};
✅ Why this works:
Webpack now knows about the video files.

It will copy them to dist/ with hashed filenames.

Your video.src = importedPath will always point to the correct location, even on GitHub Pages.

No need to worry about /odin_weather_app/ prefix or changing paths later.

🧹 Optional: Organize It Better
If you're importing 20+ video files, you can move them into a separate module, like videoMap.js:

js
Copy
Edit
// videoMap.js
import storm1 from './assets/minecraft_backgrounds/storm1.mp4';
import storm2 from './assets/minecraft_backgrounds/storm2.mp4';
// ... other imports

export const conditionMap = {
  storm: {
    keywords: ['funnel cloud', 'thunderstorm', ...],
    videos: [storm1, storm2]
  },
  ...
};
Then in imageUtil.js:

js
Copy
Edit
import { conditionMap } from './videoMap';

export class imageUtil {
  constructor() {
    this.conditionMap = conditionMap;
  }
  ...
}
✅ Summary
Problem	Solution
Hardcoded video paths (/assets/...) fail on GitHub Pages	Use import to let Webpack manage paths
Videos not found (404) after condition change	Webpack doesn't copy them if they're not imported
Code gets messy with 20+ video imports	Use a videoMap.js module to organize imports