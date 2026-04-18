# Writing Assistant Word Add-in

A static Microsoft Word task pane add-in that scans document paragraphs, finds grammar and spelling suggestions, and lets the user accept or reject each suggestion.

## Run locally

```powershell
npm run start
```

The add-in is served at `http://localhost:3000/taskpane.html`.

## Sideload in Word

1. Start the local server.
2. In Word, sideload `manifest.xml`.
3. Open the `Writing Assistant` command from the Home ribbon.

## Notes

- The task pane uses LanguageTool when the `LanguageTool` toggle is enabled.
- If the remote checker is unavailable, local checks still catch common spelling mistakes, repeated words, repeated verbs, lowercase `i`, and punctuation spacing.
- Accepting a suggestion searches the original paragraph text and replaces the matched text in Word.
