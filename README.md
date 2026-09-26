# 🥬 Good Things Market

### Fresh finds. Feel-good food. Right to your door. 🍓

Good Things Market brings a little market-day magic to your neighborhood. Browse just-picked produce, warm bakery favorites, everyday essentials, and easy dinner kits in a bright shop with fresh white space, electric green highlights, and fruit that bounces when you say hello.

**[Visit the live market](https://isaac1376.github.io/Selenium-test/)**

## 🛒 What's in the basket

- Fresh groceries, bakery treats, dairy, and ready-to-cook dinner ideas
- Search and category filters to find your next favorite
- Interactive basket with item quantities and live subtotals
- Playful floating produce, responsive layouts, and a neighborhood feel

## 🌱 Run it locally

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. To create a production build, run `npm run build`.

## 🧪 Selenium smoke test

Install Selenium with `python -m pip install selenium`, start the Vite server, then run:

```sh
python -m unittest discover -s tests -v
```

The test checks the catalog, filtering, search, basket totals, playful produce interaction, newsletter form, and mobile overflow.

## 🚀 Publishing

Pushing to `main` builds the site and deploys it to [GitHub Pages](https://isaac1376.github.io/Selenium-test/) with GitHub Actions.