import { favicons } from "favicons";
import { writeFileSync } from "fs";

const source = "public/appify_brands_glow_logo2.png"; // your logo

const configuration = {
  path: "/", // path to icons
  appName: "AppifyBrands",
  appShortName: "AppifyBrands",
  appDescription: "We turn brands into apps",
  background: "#ffffff",
  theme_color: "#2563eb",
  icons: {
    android: true,
    appleIcon: true,
    favicons: true,
    windows: true,
  },
};

favicons(source, configuration)
  .then((response) => {
    response.images.forEach((image) =>
      writeFileSync(`public/${image.name}`, image.contents)
    );
    response.files.forEach((file) =>
      writeFileSync(`public/${file.name}`, file.contents)
    );
    console.log("✅ Favicon set generated in /public");
  })
  .catch(console.error);
