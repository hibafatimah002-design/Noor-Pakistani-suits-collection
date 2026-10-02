# NOORÉ Studio — COD clothing shop starter

This is a custom static website with a product list, size choices, a shopping bag, and cash-on-delivery order requests sent to the shop’s WhatsApp. It does not take online payments.

## Add your suits and your own photos

1. Open the whole `pakistani-suit-website` folder in VS Code.
2. Put your own product photos inside the `images` folder. Use simple filenames such as `gulnaar-front.jpg`. Use photos the business has permission to publish. The site starts with an illustrated fabric placeholder, not model photos.
3. Open `products.js`. Each object in `PRODUCT_LIST` represents one suit. Copy an object to add another product or edit the sample entries. Example:

```js
{ id: 'rose-embroidered', name: 'Rose Embroidered Suit', description: 'Embroidered 3-piece suit', price: 4200, currency: 'INR', category: 'occasion', sizes: ['S', 'M', 'L'], image: 'images/rose-embroidered.jpg', label: 'NEW' }
```

Use a unique short `id` for each suit. `price` is a number without a currency symbol. Set `currency` to the three-letter code used by `Intl.NumberFormat`, such as `INR`, `PKR` or `GBP`. Keep one currency code for all products so the bag total is correct. Categories are `occasion`, `everyday` and `sets`, matching the collection filters. Put the image path relative to this folder in `image`. Use a descriptive product name and description, and remove any sizes or label that do not apply. Delete the sample objects before launch if you do not sell those suits.

4. In `script.js`, replace `BRAND_NAME` and `WHATSAPP_NUMBER`. Enter the real WhatsApp number with country calling code and digits only (no plus sign, spaces or hyphens). Example format for India: `919876543210`. The COD order button is intentionally disabled from sending to WhatsApp while the example number remains.
5. Replace all NOORÉ story/brand wording in `index.html`, and update the business description, delivery area, hours, and return/exchange wording so they are accurate. Replace `YOUR-DOMAIN.example` in `index.html`, `robots.txt`, and `sitemap.xml` after you know the final address.

## How COD ordering works

Customers add suits and sizes to the bag. The bag keeps its contents in that customer’s browser. When they choose **Continue COD order on WhatsApp**, WhatsApp opens a prepared message listing suits, sizes, quantities, and the item total. The customer sends the message and shares their delivery details in the chat. The shop owner confirms stock, delivery charge, final amount, and delivery timing, then collects cash when delivering the order.

This starter does not have a private admin dashboard, shared inventory, or an order database. To add/change products, you edit `products.js` in VS Code and publish the updated files again. Orders arrive in the shop’s WhatsApp rather than being stored in a website admin panel. This keeps the starter simple and avoids asking customers to type their address into a public static page. Do not promise COD or delivery where the business cannot provide it.

## Preview in VS Code

1. Open the project folder in VS Code (**File → Open Folder…**).
2. For easy preview, install the **Live Server** extension, right-click `index.html` and choose **Open with Live Server**. Or open `index.html` in your browser.
3. Add a suit, open the bag, change quantity, and try the COD button after adding the real WhatsApp number. Test with the shop owner’s consent before sharing the published link. On the shop owner’s phone/computer, the WhatsApp button will open their WhatsApp app; on the customer’s device it opens the customer’s WhatsApp to send the order message to the shop number.

## Publish on a browser for free with GitHub Pages

1. Create/sign into an account at [GitHub](https://github.com/).
2. Create a **public** repository named exactly `YOUR-GITHUB-USERNAME.github.io` (replace the words with the account username).
3. Upload the contents of this folder to the top level of the repository, so `index.html`, `products.js`, `script.js`, and `styles.css` are visible at the top level. Never publish passwords, private keys, or customer/order records in this repository.
4. Open repository **Settings → Pages**. Under **Build and deployment**, select **Deploy from a branch**; choose branch `main` and folder `/(root)`, then save.
5. Wait for GitHub Pages to publish and open the website address shown in the Pages panel. Changes you upload to the repository will update the live site after it deploys.
6. Share the `https://...github.io/` address. A custom domain is optional and typically costs money. Once the real address is final, replace the placeholder domain in the three SEO files mentioned above.

See [GitHub’s current Pages setup instructions](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site) if the settings are named differently.

## Google Search

After the public site is live, add its exact HTTPS address as a property in [Google Search Console](https://search.google.com/search-console/) and verify ownership. Submit `https://YOUR-LIVE-ADDRESS/sitemap.xml` in the Sitemaps section. You can inspect the homepage and request indexing with URL Inspection. Google may take time to crawl the site; submitting a sitemap or requesting indexing does not guarantee that it will be indexed or appear at a particular rank. See Google’s guides for [ownership verification](https://support.google.com/webmasters/answer/9008080), [sitemap submission](https://support.google.com/webmasters/answer/7451001), and [URL inspection/indexing requests](https://support.google.com/webmasters/answer/9012289).

## Before launch

- Replace every sample name, suit, photo, size, price, currency and WhatsApp number.
- Check the website on a phone and desktop, including the complete COD WhatsApp message.
- Decide delivery areas, delivery charges, exchange/return terms, and how orders will be confirmed.
- This is a small-shop storefront, not an Amazon/Myntra marketplace. It does not include online card payments, automatic shipping labels, customer accounts, or a website order dashboard.
