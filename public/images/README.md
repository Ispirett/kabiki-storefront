# Images Directory

This folder contains local static images for the Kabiki storefront.

## Structure

- **collections/** - Collection hero images and banners
- **products/** - Product images (if not using Medusa backend images)
- **placeholders/** - Fallback/placeholder images

## Usage

Reference images in your code using paths starting with `/images/`:

```tsx
<Image src="/images/collections/lavender.jpg" alt="Lavender Collection" />
```

## Image Guidelines

- **Format**: Use WebP for best performance, with JPG/PNG fallbacks
- **Size**: Optimize before uploading
  - Collections: 1600x1000px (16:10 aspect ratio)
  - Products: 800x800px (square)
  - Placeholders: 400x400px
- **Compression**: Use tools like TinyPNG or ImageOptim
- **Naming**: Use lowercase with hyphens (e.g., `lavender-collection.jpg`)

## Notes

- Images in `/public` are served directly at the root URL
- Don't prefix paths with `/public` in code
- These images are included in deployment bundles
