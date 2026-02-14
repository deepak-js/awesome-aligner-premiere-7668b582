
# Fix Quiz Step 2 - Dental Condition Images

## Problem
The 7 dental condition images on Step 2 ("What are you looking to fix?") of the Smile Assessment quiz are incorrect -- they don't accurately represent the dental conditions they're labeled as.

## Solution
Replace all 7 PNG image imports with inline SVG illustrations that accurately depict each dental condition. This approach ensures:
- Accurate medical representations
- Crisp rendering at any size
- No dependency on external image files
- Consistent visual style across all options

## Changes

### 1. Create a new component: `src/components/quiz/DentalConditionIcon.tsx`
A reusable component that renders accurate SVG illustrations for each of the 7 conditions:
- **Crowded teeth** -- overlapping, misaligned front teeth
- **Gap between teeth** -- visible space (diastema) between front teeth
- **Overbite** -- upper teeth significantly overlapping lower teeth (side view)
- **Underbite** -- lower teeth protruding past upper teeth (side view)
- **Crossbite** -- upper and lower teeth misaligned laterally (front view)
- **Open bite** -- gap between upper and lower teeth when mouth is closed
- **Generally straighten** -- slightly uneven teeth needing minor alignment

Each SVG will use a clean, modern line-art style with soft pink gums and white teeth on a light background, consistent with premium dental branding.

### 2. Update `src/components/quiz/QuizModal.tsx`
- Remove the 7 PNG image imports (quiz-crowded-teeth.png, quiz-gap-teeth.png, etc.)
- Import the new `DentalConditionIcon` component
- Replace `<img>` tags in the image grid with `<DentalConditionIcon condition={option.value} />` for step 2 options
- Update the options data structure to use a `condition` key instead of `image`

## Technical Details

### DentalConditionIcon component
```
Props: { condition: string; className?: string }
```
Takes a condition value ("crowded", "gaps", "overbite", "underbite", "crossbite", "open_bite", "straighten") and renders the corresponding SVG.

### QuizModal changes
- Remove image imports (lines 22-28)
- Update question 2 options to remove `image` property, keep `value` and `label`
- In the rendering section, replace `<img src={option.image}>` with the SVG component
