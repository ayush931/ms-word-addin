# Writing Assistant Word Add-in

A static Microsoft Word task pane add-in that scans document paragraphs, finds grammar and spelling suggestions, and lets the user accept or reject each suggestion.

## Run locally

```powershell
npm run certs
npm run trust:certs
npm run start
```

The add-in is served at `https://localhost:3000/taskpane.html`.

## Sideload in Word

1. Start the local server.
2. In Word, sideload `manifest.xml`.
3. Open the `Writing Assistant` command from the Home ribbon.

## Notes

- The task pane uses LanguageTool when the `LanguageTool` toggle is enabled.
- If the remote checker is unavailable, local checks still catch common spelling mistakes, repeated words, repeated verbs, lowercase `i`, and punctuation spacing.
- Accepting a suggestion searches the original paragraph text and replaces the matched text in Word.
- Large documents are scanned in batches with limited remote concurrency so the add-in stays responsive on files with thousands of paragraphs.
- Scan results appear progressively after each batch of 50 paragraphs instead of waiting for the full document scan to finish.
- Suggestions are paginated at 50 items per page so large result sets stay responsive in the task pane.
- Applying visible suggestions runs in a single Word batch per page for faster bulk edits on large files.
