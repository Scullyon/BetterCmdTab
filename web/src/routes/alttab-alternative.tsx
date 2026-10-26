import { createFileRoute } from "@tanstack/react-router";

import { Article, articleHead } from "../sections/Article";

export const Route = createFileRoute("/alttab-alternative")({
  head: () =>
    articleHead(
      "/alttab-alternative/",
      "Free AltTab Alternative for Mac · BetterCmdTab",
      "BetterCmdTab is a free, open-source AltTab alternative for macOS: search, every layout and extra shortcuts without a Pro license, plus app launching and tiling.",
    ),
  component: AltTabAlternative,
});

function AltTabAlternative() {
  return (
    <Article
      title="A free AltTab alternative for macOS"
      lead="AltTab brought Windows-style window switching to the Mac, and it is still a good app. BetterCmdTab covers the same ground and includes the features AltTab sells as Pro, at no cost."
    >
      <h2>What you get without paying</h2>
      <p>
        AltTab is free and open source, but search, the icon and title layouts, auto-sizing and more
        than one shortcut need AltTab Pro: $9.99 one-time for the current major version, or $24.99
        for Pro Lifetime. In BetterCmdTab every feature is free, with no trial, license key or
        account.
      </p>
      <table>
        <thead>
          <tr>
            <th scope="col">Feature</th>
            <th scope="col">BetterCmdTab</th>
            <th scope="col">AltTab free</th>
            <th scope="col">AltTab Pro</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Switch windows with live previews</td>
            <td>Yes</td>
            <td>Yes</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>Type to search</td>
            <td>Yes</td>
            <td>No</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>App icon grid and title list layouts</td>
            <td>Yes</td>
            <td>No</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>More than one shortcut</td>
            <td>Yes</td>
            <td>No</td>
            <td>Yes, up to 9</td>
          </tr>
          <tr>
            <td>Cycle the front app's windows</td>
            <td>Yes, ⌘`</td>
            <td>No</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>Launch any installed app</td>
            <td>Yes</td>
            <td>No</td>
            <td>No</td>
          </tr>
          <tr>
            <td>Pick a single browser tab</td>
            <td>Yes</td>
            <td>No</td>
            <td>No</td>
          </tr>
          <tr>
            <td>Window tiling, move to another display</td>
            <td>Yes</td>
            <td>No</td>
            <td>No</td>
          </tr>
          <tr>
            <td>Force quit, reopen recently closed apps</td>
            <td>Yes</td>
            <td>No</td>
            <td>No</td>
          </tr>
          <tr>
            <td>Price</td>
            <td>Free</td>
            <td>Free</td>
            <td>$9.99 or $24.99</td>
          </tr>
        </tbody>
      </table>
      <p>
        Checked October 2026 against <a href="https://alt-tab.app/pricing">alt-tab.app/pricing</a>.
        The <a href="/#compare">full comparison</a> covers 31 features, with the built-in ⌘Tab too.
      </p>

      <h2>Switching from AltTab</h2>
      <ol>
        <li>
          Install BetterCmdTab with <code>brew install --cask bettercmdtab</code>, or download the
          .dmg and drag it into Applications.
        </li>
        <li>
          Open it and enable it under System Settings, Privacy &amp; Security, Accessibility. Live
          previews also ask for Screen Recording, the same permission AltTab uses for thumbnails.
        </li>
        <li>
          Press ⌘Tab. AltTab listens on ⌥Tab by default, so both can run side by side while you
          compare them.
        </li>
        <li>
          When you are done, quit AltTab and remove it from System Settings, General, Login Items.
        </li>
      </ol>
      <p>
        Every setting lives in a JSON file as well as in the app, so a setup can be versioned and
        moved between Macs. The <a href="/docs/">docs</a> list every option.
      </p>

      <h2>When AltTab is the better pick</h2>
      <ul>
        <li>
          You want the app in your language. AltTab is translated into far more languages;
          BetterCmdTab ships in English, German, Spanish, French, Polish, Russian and Simplified
          Chinese.
        </li>
        <li>
          You value a long track record. AltTab has around 16,000 GitHub stars and millions of
          downloads; BetterCmdTab is younger.
        </li>
      </ul>
    </Article>
  );
}
