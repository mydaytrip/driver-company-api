Daytrip driver company API documentation
========================================

The published documentation for `GET /driver-company/v1/trips`, the API that
lets a partner transport company pull the trips assigned to it.

Published at **https://mydaytrip.github.io/driver-company-api**.

Editing
-------

- **Content lives in `source/includes/*.md`.** One file per section; the order
  they appear in is set by `source/index.yml`. That is the only place to edit.
- **Never edit `docs/`.** GitHub Pages serves the `main` branch's `/docs`
  folder, and it is generated output — the next build overwrites anything
  typed into it by hand.

Working locally
---------------

```shell
npm install
npm start
```

`npm start` builds the site and serves it at http://localhost:4567, rebuilding
as you edit. `npm run build` builds without serving, into `build/`.

`npm test` lints the gulpfile and checks that every JSON example in the source
parses. CI runs it on every push.

Publishing
----------

```shell
npm run publish-docs
```

That builds the site and copies `build/3-rev` into `docs/`. Commit the `docs/`
change and merge to `main`; GitHub Pages picks it up within a minute or two.

**`deploy.sh` is dead.** It publishes to a `gh-pages` branch this repository
does not use. Ignore it.

---

Built on [node-slate](https://github.com/center-key/node-slate). See
[LICENSE.txt](LICENSE.txt) for its copyright and licence.
