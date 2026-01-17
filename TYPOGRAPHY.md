# Typography System

## Overview

This project uses a modern, rhythmic typographic scale based on a **1.250 ratio (Major Third)** with fluid sizing that adapts across devices. The system ensures consistent vertical rhythm and harmonious proportions.

## Type Scale

### Font Sizes

All font sizes use `clamp()` for fluid typography that scales smoothly between mobile and desktop:

```css
--font-size-xs:   12-14px  (0.75-0.875rem)   - Captions, small labels
--font-size-sm:   14-16px  (0.875-1rem)      - Secondary text
--font-size-md:   16-18px  (1-1.125rem)      - Body text (base)
--font-size-lg:   20-24px  (1.25-1.5rem)     - Lead paragraphs
--font-size-xl:   25-32px  (1.563-2rem)      - Subheadings
--font-size-2xl:  31-44px  (1.953-2.75rem)   - H3
--font-size-3xl:  39-60px  (2.441-3.75rem)   - H2, Section titles
--font-size-4xl:  49-80px  (3.052-5rem)      - H1, Hero text
```

### Line Heights

Line heights create a consistent vertical rhythm:

```css
--line-height-tight:    1.1    - Headlines (H1-H3)
--line-height-snug:     1.25   - Subheads (H4-H5)
--line-height-normal:   1.5    - Body text, buttons
--line-height-relaxed:  1.75   - Paragraphs
--line-height-loose:    2      - Special cases
```

### Spacing Scale

Based on multiples of base unit (16px) for vertical rhythm:

```css
--space-xs:   4px    (0.25rem)
--space-sm:   8px    (0.5rem)
--space-md:   16px   (1rem)
--space-lg:   24px   (1.5rem)
--space-xl:   32px   (2rem)
--space-2xl:  48px   (3rem)
--space-3xl:  64px   (4rem)
--space-4xl:  96px   (6rem)
--space-5xl:  128px  (8rem)
```

## Usage Guidelines

### Headings

```css
h1: var(--font-size-4xl) + var(--line-height-tight)
h2: var(--font-size-3xl) + var(--line-height-tight)
h3: var(--font-size-2xl) + var(--line-height-tight)
h4: var(--font-size-xl)  + var(--line-height-snug)
h5: var(--font-size-lg)  + var(--line-height-snug)
h6: var(--font-size-md)  + var(--line-height-normal)
```

### Body Text

-   Default: `var(--font-size-md)` with `var(--line-height-normal)`
-   Paragraphs: Add `var(--line-height-relaxed)` for better readability
-   Small text: `var(--font-size-sm)` or `var(--font-size-xs)`

### Letter Spacing

-   Headlines (H1-H3): `-0.02em` to `-0.03em` for tighter, more impactful text
-   Body text: Default (0)
-   All caps: Consider adding `0.05em` for better readability

## Examples

### Component Typography

```css
.hero-title {
    font-size: var(--font-size-4xl);
    line-height: var(--line-height-tight);
    letter-spacing: -0.03em;
    margin-block-end: var(--space-xl);
}

.card-title {
    font-size: var(--font-size-xl);
    line-height: var(--line-height-snug);
    margin-block-end: var(--space-md);
}

.body-text {
    font-size: var(--font-size-md);
    line-height: var(--line-height-relaxed);
    margin-block-end: var(--space-xl);
}
```

## Benefits

1. **Consistency**: All typography follows a mathematical scale
2. **Responsive**: Fluid sizing adapts smoothly across all screen sizes
3. **Rhythm**: Line heights and spacing create visual harmony
4. **Maintainable**: Change the scale by adjusting CSS custom properties
5. **Accessible**: Respects user browser settings (uses rem units)
6. **Performance**: No JavaScript needed, pure CSS solution

## Responsive Behavior

The type scale automatically adjusts based on viewport width:

-   **Mobile (< 768px)**: Smaller end of the scale
-   **Tablet (768-1440px)**: Gradual fluid increase
-   **Desktop (> 1440px)**: Larger end of the scale

No additional media queries needed for font sizes!

## Migration Guide

When updating existing components:

1. Replace fixed `font-size` with appropriate scale variable
2. Replace fixed `line-height` with rhythm variable
3. Replace spacing values with spacing scale variables
4. Test across mobile, tablet, and desktop viewports

### Before:

```css
.title {
    font-size: 2.5rem;
    line-height: 1.2;
    margin-bottom: 2rem;
}
```

### After:

```css
.title {
    font-size: var(--font-size-2xl);
    line-height: var(--line-height-tight);
    margin-block-end: var(--space-xl);
}
```
